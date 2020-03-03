import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";

import TopNav from "./common-components/TopNav";
import Footer from "./common-components/Footer";
import EditProfile from "./Dialog/EditProfile";
import { titleCase } from "./common-components/include/exports";
import jwt from "jsonwebtoken";
import { getUserProfile } from "./common-components/include/requests";

const uiStyles = theme => ({
  "@global": {
    body: {
      background:
        "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.8)), url('https://source.unsplash.com/1600x900/?crafts') no-repeat fixed",
      backgroundSize: "100% 100%",
      backgroundColor: "black"
    }
  },
  main: {
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    overflowX: "hidden",
    overflowY: "hidden"
  },
  profile_photo: {
    padding: theme.spacing(1),
    borderRadius: "50%",
    width: 220,
    height: 270,
    margin: "0 0 1% 0",
    boxShadow:
      "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
    "@media screen and (max-width: 1024px)": {
      margin: "8% 0 2% 0"
    },
    "@media screen and (max-width: 320px)": {
      margin: "20% 0 2% 0",
      width: 180,
      height: 230
    }
  },
  profileAbout: {
    color: "#FFFFFF",
    backgroundColor: "#505c62",
    opacity: 0.95,
    textAlign: "center",
    fontFamily: "Andale Mono, monospace",
    width: "70%",
    margin: "0 15%",
    minHeight: "32em",
    padding: "14px 25px",
    "@media screen and (max-width: 480px)": {
      width: "84%",
      margin: "0 8%",
      padding: 0
    }
  },
  noImg: {
    marginTop: "8%",
    "@media screen and (max-width: 480px)": {
      marginTop: "40%"
    }
  },
  name: {
    marginTop: "-10px"
  },
  jobTitle: {
    borderTop: "3px solid white",
    borderWidth: "thin",
    borderSpacing: "60px 60px",
    width: "54%",
    margin: "-2.5% 25% 6% 23%",
    textTransform: "uppercase",
    textAlign: "center"
  },
  fabButton: {
    right: 35,
    top: 100,
    position: "fixed",
    "@media screen and (max-width: 320px)": {
      right: 5,
      top: 80
    }
  },
  editImg: {
    height: 220,
    width: 380
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basic_profile: {},
      profile: {},
      about: "",
      profile_id: "",
      openUpdate: false
    };
  }

  componentDidMount() {
    const decoded_id = jwt.decode(localStorage.getItem("token"));

    getUserProfile(decoded_id.user_id).then(res => {
      this.setState({
        profile: res[0],
        basic_profile: res[0]["user"],
        about: res[0]["about"]
      });
    });
  }

  updateAbout = id => {
    this.setState({
      profile_id: id,
      openUpdate: true
    });
  };

  closeUpdate = () => {
    this.setState({
      openUpdate: false
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <React.Fragment>
          <TopNav />
          <Fab
            color="inherit"
            aria-label="add"
            className={classes.fabButton}
            onClick={() => this.updateAbout(this.state.profile["id"])}
          >
            <EditIcon />
          </Fab>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ marginTop: "5%" }}>
                {this.state.profile.length !== "" ? (
                  <React.Fragment>
                    {this.state.profile["user_photo"] !== null ? (
                      <center>
                        <img
                          className={classes.profile_photo}
                          src={this.state.profile["user_photo"]}
                          alt="Profile Photo"
                        />
                      </center>
                    ) : (
                      <img className={classes.noImg} />
                    )}

                    <Paper className={classes.profileAbout} elevation={3}>
                      <br />
                      <Typography
                        variant="h2"
                        gutterBottom
                        className={classes.name}
                      >
                        {titleCase(
                          this.state.basic_profile["first_name"] +
                            " " +
                            this.state.basic_profile["last_name"]
                        )}
                      </Typography>
                      <Typography
                        variant="h5"
                        gutterBottom
                        className={classes.jobTitle}
                      >
                        {this.state.profile["profession"]}
                      </Typography>
                      {this.state.about.split("\n").map((row, idx) => (
                        <Typography key={idx} variant="h6" gutterBottom>
                          {row}
                          <br />
                        </Typography>
                      ))}
                    </Paper>
                  </React.Fragment>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <center>
                  <Link href="/#/projects">
                    <Button
                      variant="contained"
                      color="inherit"
                      style={{ textDecoration: "none", marginBottom: "3%" }}
                    >
                      View Projects
                    </Button>
                  </Link>
                </center>
              </Grid>
            </Grid>
            <Footer portfolio={false} />
          </React.Fragment>
          <EditProfile
            profileId={this.state.profile_id}
            open={this.state.openUpdate}
            handleClose={this.closeUpdate}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(uiStyles)(Home);
