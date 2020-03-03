import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SchoolIcon from "@material-ui/icons/School";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import TopNav from "./common-components/TopNav";
import Footer from "./common-components/Footer";
import NoDataFound from "./common-components/NoDataFound";
import AddEducation from "./Dialog/AddEducation";
import EditDetails from "./Dialog/EditEducation";
import DeleteDialog from "./common-components/DeleteDialog";
import jwt from "jsonwebtoken";
import {
  getUserEducation,
  removeEducation
} from "./common-components/include/requests";

const uiStyles = theme => ({
  "@global": {
    body: {
      background:
        "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png') no-repeat fixed 100% 100%",
      backgroundColor: "black"
    }
  },
  main: {
    display: "flex",
    flexWrap: "wrap",
    overflowX: "hidden",
    overflowY: "hidden"
  },
  educCont: {
    width: "80%",
    margin: "10% 10% 6.4% 10%",
    "@media screen and (max-width: 320px)": {
      width: "84%",
      margin: "35% 8%"
    }
  },
  educPaper: {
    color: "#edf2f2",
    backgroundColor: "#505c62",
    textAlign: "center",
    fontFamily: "Andale Mono, monospace",
    padding: "20px 15px 15px 15px",
    marginTop: "2em",
    "@media screen and (max-width: 320px)": {
      marginTop: 22
    }
  },
  schoolText: {
    textAlign: "justify",
    margin: "1em 5px 5px 5px",
    padding: "10px 2em"
  },
  fabButton: {
    right: 45,
    top: 100,
    position: "fixed",
    "@media screen and (max-width: 320px)": {
      right: 5,
      top: 80
    }
  },
  moreIcon: {
    float: "right",
    margin: "-12px -1em 0 0"
  }
});

var decoded_id = "";

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      education: [],
      anchorEl: null,
      openAdd: false,
      openEdit: false,
      openDelete: false,
      confirmDelete: false,
      userId: "",
      schoolId: "",
      schoolName: ""
    };
  }

  componentDidMount() {
    decoded_id = jwt.decode(localStorage.getItem("token"));

    getUserEducation(decoded_id.user_id).then(res => {
      this.setState({
        education: res
      });
    });
  }

  openMenu = (e, schoolId, schoolName) => {
    this.setState({
      anchorEl: e,
      schoolId: schoolId,
      schoolName: schoolName
    });
  };

  closeMenu = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleEditDialog = () => {
    this.setState({
      openEdit: true,
      anchorEl: null
    });
  };

  closeEdit = () => {
    this.setState({
      openEdit: false
    });
  };

  handleDeleteDialog = () => {
    this.setState({
      openDelete: true,
      anchorEl: null
    });
  };

  closeDelete = () => {
    this.setState({
      openDelete: false
    });
  };

  handleDelete(id) {
    removeEducation(id)
      .catch(error => console.log(error))
      .then(window.location.reload(true));
  }

  addExperience = () => {
    this.setState({
      openAdd: true,
      userId: decoded_id.user_id
    });
  };

  closeAdd = () => {
    this.setState({
      openAdd: false
    });
  };

  render() {
    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl);

    return (
      <div className={classes.main}>
        <React.Fragment>
          <TopNav />
          <Fab
            color="inherit"
            className={classes.fabButton}
            onClick={this.addExperience}
          >
            <AddIcon />
          </Fab>
          <Grid container spacing={3} className={classes.educCont}>
            {this.state.education.length === 0 ? (
              <Grid item xs={12} sm={12}>
                <NoDataFound />
              </Grid>
            ) : (
              this.state.education.map((educ, id) =>
                educ.school_name.length !== "" ? (
                  <React.Fragment key={id}>
                    <Grid item xs={12} sm={12}>
                      <Paper className={classes.educPaper}>
                        <IconButton
                          color="inherit"
                          className={classes.moreIcon}
                          onClick={e =>
                            this.openMenu(e.target, educ.id, educ.school_name)
                          }
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <br />
                        <br />
                        <SchoolIcon />
                        <Typography variant="h6" gutterBottom>
                          {educ.school_name}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                          {educ.school_duration}
                        </Typography>
                        <Typography gutterBottom className={classes.schoolText}>
                          {educ.school_description.split("\n").map(row => (
                            <p>{row}</p>
                          ))}
                        </Typography>
                      </Paper>
                    </Grid>
                  </React.Fragment>
                ) : null
              )
            )}
          </Grid>
          <Footer portfolio={false} />

          <Menu
            anchorEl={this.state.anchorEl}
            open={open}
            onClose={this.closeMenu}
          >
            <MenuItem onClick={this.handleEditDialog}>Edit</MenuItem>
            <MenuItem onClick={this.handleDeleteDialog}>Delete</MenuItem>
          </Menu>
          {/* dialog for adding */}
          <AddEducation
            open={this.state.openAdd}
            onClose={this.closeAdd}
            userId={this.state.userId}
          />
          {/* dialog for editing */}
          <EditDetails
            open={this.state.openEdit}
            closeEdit={this.closeEdit}
            schoolId={this.state.schoolId}
          />
          {/* dialog for deleting */}
          <DeleteDialog
            confirmDelete={this.state.openDelete}
            closeDialog={this.closeDelete}
            title={this.state.schoolName}
            handleDelete={() => this.handleDelete(this.state.schoolId)}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(uiStyles)(Education);
