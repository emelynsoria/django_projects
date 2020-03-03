import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";

import TopNav from "./common-components/TopNav";
import Footer from "./common-components/Footer";
import NoDataFound from "./common-components/NoDataFound";
import AddExperience from "./Dialog/AddExperience";
import EditExperience from "./Dialog/EditExperience";
import DeleteDialog from "./common-components/DeleteDialog";
import jwt from "jsonwebtoken";
import {
  getUserExperience,
  removeExperience
} from "./common-components/include/requests";

const uiStyles = theme => ({
  "@global": {
    body: {
      background:
        "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://greenhouse.ae/wp-content/uploads/2015/10/1a0425f.jpg') no-repeat fixed",
      // backgroundSize: "100% 100%",
      backgroundColor: "black"
    }
  },
  main: {
    display: "flex",
    flexWrap: "wrap",
    overflowX: "hidden",
    overflowY: "hidden",
    fontFamily: "Andale Mono, monospace"
  },
  fabButton: {
    right: 45,
    top: 100,
    position: "fixed",
    "@media screen and (max-width: 320px)": {
      right: 10,
      top: 80
    }
  },
  cont: {
    width: "80%",
    margin: "10% 10% 6.2% 10%",
    "@media screen and (max-width: 320px)": {
      width: "84%",
      margin: "45% 8%"
    }
  },
  paperCont: {
    backgroundColor: "#505c62",
    opacity: 1,
    padding: "14px 5px",
    display: "flex",
    flexWrap: "wrap",
    minHeight: "25em",
    "@media screen and (max-width: 480px)": {
      width: "96%",
      margin: "0 2%"
    }
  },
  paper: {
    margin: "2em",
    padding: "1.5em",
    width: "100%",
    "@media screen and (max-width: 480px)": {
      margin: "5px",
      padding: "20px 10px"
    }
  }
});

var decoded_id = "";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: [],
      activeStep: 0,
      openAdd: false,
      user_id: "",
      anchorEl: null,
      openEdit: false,
      openDelete: false,
      workId: "",
      jobTitle: ""
    };
  }

  componentDidMount() {
    decoded_id = jwt.decode(localStorage.getItem("token"));

    getUserExperience(decoded_id.user_id).then(res => {
      this.setState({
        experience: res
      });
    });
  }

  addExperience = () => {
    this.setState({
      openAdd: true,
      user_id: decoded_id.user_id
    });
  };

  closeAdd = () => {
    this.setState({
      openAdd: false
    });
  };

  openMenu = (e, expId, expJob) => {
    this.setState({
      anchorEl: e.target,
      workId: expId,
      jobTitle: expJob
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
      openDelete: true
    });
  };

  closeDelete = () => {
    this.setState({
      openDelete: false
    });
  };

  openDelConfirmation(id, title) {
    this.setState({
      confirmDelete: true,
      postTitle: title
    });
  }

  closeDelConfirmation() {
    this.setState({
      confirmDelete: false
    });
  }

  handleDelete(id) {
    removeExperience(id)
      .catch(error => console.log(error))
      .then(window.location.reload(true));
  }

  render() {
    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl);

    return (
      <div className={classes.main}>
        <React.Fragment>
          <TopNav />
          <React.Fragment>
            <Fab
              color="inherit"
              aria-label="add"
              className={classes.fabButton}
              onClick={this.addExperience}
            >
              <AddIcon />
            </Fab>
            <Grid container spacing={3} className={classes.cont}>
              <Grid item xs={12}>
                {this.state.experience.length === 0 ? (
                  <NoDataFound />
                ) : (
                  <Paper className={classes.paperCont}>
                    {this.state.experience.map((data, id) => (
                      <React.Fragment key={id}>
                        <Paper className={classes.paper}>
                          <IconButton
                            onClick={e =>
                              this.openMenu(e, data.id, data.job_title)
                            }
                            style={{ float: "right" }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <center>
                            <CheckCircleIcon />
                            <Typography variant="h6">
                              <b>{data.job_title}</b>
                            </Typography>
                            <Typography>
                              {data.location}&emsp;&emsp;&emsp;
                              <small>
                                {data.inclusive_dates.split(" – ")[0]}
                                &nbsp;–&nbsp;
                                {data.inclusive_dates.split(" – ")[1]}
                              </small>
                            </Typography>
                          </center>
                          <Divider />
                          <br />
                          <br />
                          <Typography>
                            {data.work_description.split("\n").map(row => (
                              <p>{row}</p>
                            ))}
                          </Typography>
                        </Paper>
                      </React.Fragment>
                    ))}
                  </Paper>
                )}
              </Grid>
            </Grid>
          </React.Fragment>
          <Footer portfolio={false} />
        </React.Fragment>
        <Menu
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.handleEditDialog}>Edit</MenuItem>
          <MenuItem onClick={this.handleDeleteDialog}>Delete</MenuItem>
        </Menu>
        {/* dialog for adding */}
        <AddExperience
          open={this.state.openAdd}
          onClose={this.closeAdd}
          userId={this.state.user_id}
        />
        {/* dialog for editing */}
        <EditExperience
          open={this.state.openEdit}
          closeEdit={this.closeEdit}
          workId={this.state.workId}
        />
        {/* dialog for deleting */}
        <DeleteDialog
          confirmDelete={this.state.openDelete}
          closeDialog={this.closeDelete}
          title={this.state.jobTitle}
          handleDelete={() => this.handleDelete(this.state.workId)}
        />
      </div>
    );
  }
}

export default withStyles(uiStyles)(Experience);
