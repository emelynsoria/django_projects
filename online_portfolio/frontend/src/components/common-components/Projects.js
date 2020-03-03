import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
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
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import ProjectDetails from "./ProjectDetails";
import NoDataFound from "./NoDataFound";
import { goBack } from "./include/exports";
import { ellipseWord } from "./include/css";
import { getUserAwards } from "./include/requests";

const uiStyles = theme => ({
  "@global": {
    body: {
      background:
        "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://cdn.hipwallpaper.com/i/50/72/SsRWfy.jpg') no-repeat fixed",
      backgroundSize: "100% 100%"
    }
  },
  main: {
    backgroundSize: "100% 100%",
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    overflowX: "hidden"
  },
  fabButton: {
    left: 45,
    top: 100,
    position: "fixed",
    "@media screen and (max-width: 320px)": {
      left: 5,
      top: 80
    }
  },
  cont: {
    width: "80%",
    margin: "10% 10% 5.8% 10%",
    "@media screen and (max-width: 320px)": {
      width: "86%",
      margin: "30% 7% 5.8% 7%"
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
  card: {
    height: 370,
    "&:hover": {
      opacity: 0.8
    }
  },
  media: {
    height: 300
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
  cardNoImage: {
    height: "100%"
  },
  ellipseWord
});

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      awards: [],
      openView: false,
      projTitle: "",
      projDescription: "",
      projPhoto: ""
    };
  }

  componentDidMount() {
    getUserAwards(localStorage.getItem("portfolio_id")).then(res => {
      this.setState({
        awards: res
      });
    });
  }

  viewProjectDetails = (title, description, photo) => {
    this.setState({
      openView: true,
      projTitle: title,
      projDescription: description,
      projPhoto: photo
    });
  };

  closeDetails = () => {
    this.setState({
      openView: false
    });
  };

  render() {
    const { classes, projects } = this.props;

    return (
      <div className={classes.main}>
        <React.Fragment>
          <Fab
            color="inherit"
            aria-label="add"
            className={classes.fabButton}
            onClick={goBack}
          >
            <ArrowBackIcon />
          </Fab>
          <React.Fragment>
            <Grid
              container
              spacing={3}
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.cont}
            >
              {projects.length === 0 ? (
                <Grid item xs={12} sm={12}>
                  <NoDataFound />
                </Grid>
              ) : (
                projects.map((proj, id) => (
                  <React.Fragment key={id}>
                    <Grid item xs={12} sm={4}>
                      <Card
                        className={classes.card}
                        onClick={() =>
                          this.viewProjectDetails(
                            proj.project_title,
                            proj.project_description,
                            proj.project_photo
                          )
                        }
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
                                  {proj.project_title.toUpperCase()}
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
                  <Grid item xs={12} sm={12}>
                    <NoDataFound />
                  </Grid>
                ) : (
                  this.state.awards.map((data, id) => (
                    <React.Fragment key={id}>
                      {window.innerWidth < 760 ? (
                        <Grid item xs={12}>
                          <Tooltip
                            title={data.award_title}
                            placement="top"
                            arrow
                          >
                            <Chip
                              className={classes.awards}
                              label={<b>{data.award_title}</b>}
                              component="a"
                              clickable
                            />
                          </Tooltip>
                        </Grid>
                      ) : (
                        <Grid item>
                          <Chip
                            className={classes.awards}
                            label={<b>{data.award_title}</b>}
                            component="a"
                            clickable
                          />
                        </Grid>
                      )}
                    </React.Fragment>
                  ))
                )}
              </Grid>
            </Paper>
          </React.Fragment>
          <ProjectDetails
            open={this.state.openView}
            onClose={this.closeDetails}
            projTitle={this.state.projTitle}
            projDescription={this.state.projDescription}
            projPhoto={this.state.projPhoto}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(uiStyles)(Projects);
