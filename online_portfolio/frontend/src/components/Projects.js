import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";

import TopNav from "./common-components/TopNav";
import Footer from "./common-components/Footer";
import NoDataFound from "./common-components/NoDataFound";
import EditAward from "./Dialog/EditAward";
import DeleteAward from "./common-components/DeleteDialog";
import AddProject from "./Dialog/AddProject";
import AddAward from "./Dialog/AddAward";
import jwt from "jsonwebtoken";
import { ellipseWord } from "./common-components/include/css";
import {
  getUserProjects,
  getUserAwards,
  removeAward
} from "./common-components/include/requests";

const uiStyles = theme => ({
  "@global": {
    body: {
      backgroundColor: "#f1f6f9",
      background:
        "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://cdn.hipwallpaper.com/i/50/72/SsRWfy.jpg') no-repeat fixed",
      backgroundSize: "100% 100%"
    }
  },
  main: {
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden"
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
  cont: {
    width: "80%",
    margin: "10% 10% 5.8% 10%",
    "@media screen and (max-width: 320px)": {
      width: "86%",
      margin: "35% 7% 5.8% 7%"
    }
  },
  skillPaper: {
    width: "80%",
    margin: "10% 10% 5.8% 10%",
    backgroundColor: "#505c62",
    "@media screen and (max-width: 320px)": {
      margin: "30% 8%"
    }
  },
  skill: {
    width: "80%",
    margin: "5% 10% 3% 10%",
    "@media screen and (max-width: 320px)": {
      width: "86%",
      margin: "30% 7% 5.8% 7%"
    }
  },
  skills: {
    border: "3px solid white",
    borderWidth: "thin",
    borderSpacing: "10px 20px",
    color: "white",
    textTransform: "uppercase",
    textAlign: "center"
  },
  card: {
    maxWidth: 345,
    maxHeight: 268,
    "&:hover": {
      opacity: 0.8
    }
  },
  media: {
    height: 200
  },
  imgText: {
    position: "absolute",
    backgroundColor: "#1c272b",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "5px solid white",
    padding: "10px 50px",
    color: "#FFFFFF",
    opacity: 0,
    "&:hover": {
      opacity: 200
    }
  },
  awards: {
    border: "2px solid white",
    borderSpacing: "10px 20px",
    fontSize: "15px",
    textTransform: "uppercase",
    textAlign: "center",
    display: "flex"
  },
  editImg: {
    height: 220,
    width: 380
  },
  cardNoImage: {
    height: 270,
    padding: "10px 10px"
  },
  ellipseWord
});

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // projects
      projects: [],
      awards: [],
      hover: false,
      projId: "",
      openAddProj: false,
      openProj: false,
      // awards
      award_id: "",
      award_title: "",
      delete_id: "",
      delete_title: "",
      openAddAward: false,
      openEditAward: false,
      openDelete: false
    };
  }

  componentDidMount() {
    const decoded_id = jwt.decode(localStorage.getItem("token"));

    getUserProjects(decoded_id.user_id).then(res => {
      this.setState({
        projects: res
      });
    });

    getUserAwards(decoded_id.user_id).then(res => {
      this.setState({
        awards: res
      });
    });
  }

  viewProjectDetails = id => {
    this.setState({
      openProj: true,
      projId: id
    });
    localStorage.setItem("projectId", id);
  };

  addProject = () => {
    this.setState({
      openAddProj: true
    });
  };

  closeAddProj = () => {
    this.setState({
      openAddProj: false
    });
  };

  // awards
  addAward = () => {
    this.setState({
      openAddAward: true
    });
  };

  closeAddAward = () => {
    this.setState({
      openAddAward: false
    });
  };

  handleUpdate = (id, title) => {
    this.setState({
      openEditAward: true,
      award_id: id,
      award_title: title
    });
  };

  closeUpdate = () => {
    this.setState({
      openEditAward: false
    });
  };

  openDeleteDialog = (id, title) => {
    this.setState({
      openDelete: true,
      delete_id: id,
      delete_title: title
    });
  };

  closeDelete = () => {
    this.setState({
      openDelete: false
    });
  };

  handleDelete = () => {
    removeAward(this.state.delete_id)
      .catch(error => console.log(error))
      .then(window.location.reload(true));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Fab
          color="inherit"
          aria-label="add"
          className={classes.fabButton}
          onClick={this.addProject}
          size={window.innerWidth < 800 ? "small" : "large"}
        >
          <AddIcon />
        </Fab>
        <React.Fragment>
          {this.state.openProj ? (
            <Redirect to={"/project/" + this.state.projId + "/detail"} />
          ) : null}

          <TopNav logout={() => this.logout()} />
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.cont}
          >
            {this.state.projects.length === 0 ? (
              <Grid item xs={12} sm={12}>
                <NoDataFound />
              </Grid>
            ) : (
              this.state.projects.map((proj, id) => (
                <React.Fragment key={id}>
                  <Grid item xs={12} sm={3}>
                    <Card
                      className={classes.card}
                      onClick={() => this.viewProjectDetails(proj.id)}
                    >
                      {proj.project_photo !== null ? (
                        <React.Fragment>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={proj.project_photo}
                              title={proj.project_title}
                            />
                            <Typography
                              gutterBottom
                              className={classes.imgText}
                              variant="h4"
                            >
                              View
                            </Typography>
                            <CardContent
                              style={{ display: "flex", flexWrap: "wrap" }}
                            >
                              <Typography
                                gutterBottom
                                variant="subtitle1"
                                className={classes.ellipseWord}
                              >
                                {proj.project_title.length > 45 ? (
                                  <small>
                                    {proj.project_title.toUpperCase()}
                                  </small>
                                ) : (
                                  proj.project_title.toUpperCase()
                                )}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <CardActionArea className={classes.cardNoImage}>
                            <CardContent>
                              <Typography
                                gutterBottom
                                className={classes.imgText}
                                variant="h4"
                              >
                                View
                              </Typography>
                              <Typography
                                variant="h5"
                                component="h2"
                                style={{
                                  textAlign: "center"
                                }}
                                className={classes.ellipseWord}
                              >
                                {proj.project_title.toUpperCase()}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </React.Fragment>
                      )}
                    </Card>
                  </Grid>
                </React.Fragment>
              ))
            )}
          </Grid>
          <Paper className={classes.skillPaper}>
            <StarIcon fontSize="large" />
            <IconButton
              style={{ float: "right", color: "white" }}
              onClick={this.addAward}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
            <center>
              <Typography
                color="initial"
                style={{ color: "white" }}
                variant="h3"
              >
                Awards
              </Typography>
            </center>
            <Grid
              container
              spacing={3}
              className={classes.skill}
              direction="row"
              justify="center"
              alignItems="center"
            >
              {this.state.awards.length === 0 ? (
                <Grid item>
                  <NoDataFound />
                </Grid>
              ) : (
                this.state.awards.map((data, id) => (
                  <React.Fragment key={id}>
                    {window.innerWidth < 760 ? (
                      <Grid item xs={12}>
                        <Tooltip title="EDIT" placement="top" arrow>
                          <Chip
                            className={classes.awards}
                            label={<b>{data.award_title}</b>}
                            component="a"
                            clickable
                            onClick={() =>
                              this.handleUpdate(data.id, data.award_title)
                            }
                            onDelete={() =>
                              this.openDeleteDialog(data.id, data.award_title)
                            }
                          />
                        </Tooltip>
                      </Grid>
                    ) : (
                      <Grid item>
                        <Tooltip title="EDIT" placement="top" arrow>
                          <Chip
                            className={classes.awards}
                            label={<b>{data.award_title}</b>}
                            component="a"
                            clickable
                            onClick={() =>
                              this.handleUpdate(data.id, data.award_title)
                            }
                            onDelete={() =>
                              this.openDeleteDialog(data.id, data.award_title)
                            }
                          />
                        </Tooltip>
                      </Grid>
                    )}
                  </React.Fragment>
                ))
              )}
            </Grid>
          </Paper>
          <Footer />

          <AddProject
            open={this.state.openAddProj}
            onClose={this.closeAddProj}
          />
          <AddAward
            open={this.state.openAddAward}
            onClose={this.closeAddAward}
          />
          <EditAward
            open={this.state.openEditAward}
            handleClose={this.closeUpdate}
            awardId={this.state.award_id}
          />
          <DeleteAward
            confirmDelete={this.state.openDelete}
            closeDialog={this.closeDelete}
            title={this.state.delete_title}
            handleDelete={this.handleDelete}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(uiStyles)(Projects);
