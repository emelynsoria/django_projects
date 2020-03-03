import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import TopNav from "./common-components/TopNav";
import Footer from "./common-components/Footer";
import NoDataFound from "./common-components/NoDataFound";
import AddSkill from "./Dialog/AddSkill";
import SkillDetails from "./common-components/SkillDetails";
import jwt from "jsonwebtoken";
import { getUserSkills } from "./common-components/include/requests";
import { imgMargin } from "./common-components/include/css";

const uiStyles = {
  "@global": {
    body: {
      background:
        "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png') no-repeat fixed 100% 100%",
      backgroundColor: "black"
    }
  },
  main: {
    display: "flex",
    flexWrap: "wrap"
  },
  cont: {
    width: "80%",
    margin: "3% 10% 5.4% 10%",
    "@media screen and (max-width: 320px)": {
      width: "84%"
    }
  },
  skillPaper: {
    width: "80%",
    margin: "10% 10% 5.8% 10%",
    backgroundColor: "#505c62",
    minHeight: "30em",
    "@media screen and (max-width: 320px)": {
      width: "84%",
      margin: "40% 8%"
    }
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
  imgMargin
};

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      openAdd: false
    };
  }

  componentDidMount() {
    const decoded_id = jwt.decode(localStorage.getItem("token"));

    getUserSkills(decoded_id.user_id).then(res => {
      this.setState({
        skills: res
      });
    });
  }

  addExperience = () => {
    this.setState({
      openAdd: true
    });
  };

  closeAdd = () => {
    this.setState({
      openAdd: false
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <React.Fragment>
          <TopNav logout={() => this.logout()} />
          <Fab
            color="inherit"
            className={classes.fabButton}
            onClick={this.addExperience}
            size={window.innerWidth < 800 ? "small" : "large"}
          >
            <AddIcon />
          </Fab>
          {this.state.skills.length === 0 ? (
            <Grid
              container
              justify="center"
              style={{ marginBottom: "7.2%" }}
              className={classes.imgMargin}
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <NoDataFound />
              </Grid>
            </Grid>
          ) : (
            <React.Fragment>
              <Paper className={classes.skillPaper} elevation={4}>
                <Grid
                  container
                  spacing={3}
                  className={classes.cont}
                  justify="center"
                  alignItems="center"
                >
                  {this.state.skills.map((data, id) => (
                    <React.Fragment key={id}>
                      {data.skill_photo !== null ? (
                        <Grid item>
                          <img
                            src={data.skill_photo}
                            alt={data.skill}
                            width="100"
                            height="95"
                            style={{ borderRadius: "50%" }}
                          />
                        </Grid>
                      ) : null}
                    </React.Fragment>
                  ))}
                  <Grid item xs={12} sm={12} style={{ marginTop: "3em" }} />

                  {this.state.skills.map((data, idx) => (
                    <React.Fragment key={idx}>
                      <Grid item xs={12} sm={6}>
                        {/* details in expansion panel */}
                        <SkillDetails portfolio={false} data={data} />
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Paper>
            </React.Fragment>
          )}
          <Footer />
          <AddSkill open={this.state.openAdd} onClose={this.closeAdd} />
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(uiStyles)(Skills);
