import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";

import TopNav from "./common-components/TopNav";
import Remove from "./common-components/DeleteDialog";
import EditProject from "./Dialog/EditProject";
import Footer from "./common-components/Footer";
import { wordBreak } from "./common-components/include/css";
import {
  getProjectDetails,
  removeProject
} from "./common-components/include/requests";

const uiStyles = {
  "@global": {
    body: {
      backgroundColor: "#f1f6f9"
    }
  },
  wordBreak,
  main: {
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden"
  },
  top: {
    color: "white",
    minHeight: "12.5em",
    height: "auto",
    minWidth: "100%",
    margin: "3% 0 0 0",
    padding: "5% 5% 0 5%",
    background:
      "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://cdn.hipwallpaper.com/i/50/72/SsRWfy.jpg') fixed no-repeat",
    backgroundSize: "100% 90%",
    backgroundColor: "black",
    "@media screen and (max-width: 320px)": {
      margin: "15% 0 0 0",
      padding: "15% 5% 0 5%"
    }
  },
  cont: {
    width: "80%",
    margin: "5% 10% 11.4% 10%",
    "@media screen and (max-width: 320px)": {
      width: "86%",
      margin: "30% 7% 32% 7%"
    }
  },
  photo: {
    position: "relative",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    boxShadow:
      "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)"
  },
  fabButton: {
    right: 105,
    top: 100,
    position: "fixed",
    "@media screen and (max-width: 320px)": {
      right: 8,
      top: 80
    }
  },
  fabButton2: {
    right: 40,
    top: 100,
    position: "fixed",
    "@media screen and (max-width: 320px)": {
      right: 8,
      top: 128
    }
  },
  title: {
    textTransform: "upperCase",
    margin: "1% 5% 0 0",
    padding: "1% 5% 0 2%",
    "@media screen and (max-width: 320px)": {
      margin: "5% 18% 0 0"
    },
    "@media screen and (min-width: 320px)": {
      fontSize: "calc(24px + 6 * ((100vw - 320px) / 680))"
    },
    "@media screen and (min-width: 1000px)": {
      fontSize: "64px"
    }
  }
};

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proj_id: "",
      proj_title: "",
      content: {},
      title: "",
      description: [],
      openEdit: false
    };
  }

  componentDidMount() {
    this.setState({
      proj_id: localStorage.getItem("projectId")
    });
    this.fetchContent();
  }

  fetchContent = () => {
    getProjectDetails().then(res => {
      this.setState({
        content: res,
        title: res["project_title"],
        description: res["project_description"].split("\n")
      });
    });
  };

  handleUpdate = () => {
    this.setState({
      openEdit: true
    });
  };

  closeUpdate = () => {
    this.setState({
      openEdit: false
    });
  };

  openDeleteDialog = title => {
    this.setState({
      openDelete: true,
      proj_title: title
    });
  };

  closeDelete = () => {
    this.setState({
      openDelete: false
    });
  };

  handleDelete = () => {
    removeProject().catch(error => console.log(error));
    localStorage.removeItem("projectId");
    this.props.history.replace("/projects");
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <React.Fragment>
          <TopNav logout={() => this.logout()} />
          <Tooltip arrow title="Edit project" placement="top">
            <Fab
              color="inherit"
              className={classes.fabButton}
              onClick={this.handleUpdate}
              size={window.innerWidth < 800 ? "small" : "large"}
            >
              <EditIcon />
            </Fab>
          </Tooltip>
          <Tooltip arrow title="Delete project" placement="top">
            <Fab
              color="inherit"
              className={classes.fabButton2}
              onClick={() =>
                this.openDeleteDialog(this.state.content["project_title"])
              }
              size={window.innerWidth < 800 ? "small" : "large"}
            >
              <DeleteIcon />
            </Fab>
          </Tooltip>
          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Paper className={classes.top}>
              <Grid item xs={12} sm={12}>
                <Typography
                  component="p"
                  variant="h2"
                  className={classes.title}
                >
                  {this.state.title}
                </Typography>
              </Grid>
            </Paper>
          </Grid>

          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.cont}
          >
            <React.Fragment>
              <Grid item>
                <Typography
                  variant="h6"
                  style={{
                    lineHeight: "25px",
                    color: "#121212",
                    textAlign: "justify"
                  }}
                >
                  {this.state.description.map((data, id) => (
                    <p key={id}>{data}</p>
                  ))}
                </Typography>
              </Grid>
              <Grid item>
                <img
                  className={classes.photo}
                  src={this.state.content.project_photo}
                />
              </Grid>
            </React.Fragment>
          </Grid>
          <EditProject
            open={this.state.openEdit}
            handleClose={this.closeUpdate}
          />
          <Remove
            confirmDelete={this.state.openDelete}
            closeDialog={this.closeDelete}
            title={this.state.proj_title}
            handleDelete={this.handleDelete}
          />
          <Footer />
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(uiStyles)(ProjectDetail);
