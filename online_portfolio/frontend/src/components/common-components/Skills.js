import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import NoDataFound from "./NoDataFound";
import SkillDetails from "./SkillDetails";
import { goBack } from "./include/exports";
import { getUserSkills } from "./include/requests";
import { imgMargin, wordBreak } from "./include/css";

const uiStyles = {
  "@global": {
    body: {
      backgroundColor: "#e6eaec"
    }
  },
  main: {
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    overflowX: "hidden"
  },
  wordBreak,
  cont: {
    width: "80%",
    margin: "3% 10%",
    "@media screen and (max-width: 320px)": {
      width: "84%"
    }
  },
  skillPaper: {
    width: "80%",
    margin: "10% 10% 5.8% 10%",
    "@media screen and (max-width: 320px)": {
      width: "84%",
      margin: "30% 8%"
    }
  },
  skills: {
    padding: "3px 8px",
    border: "3px solid black",
    borderWidth: "thin",
    borderSpacing: "10px 20px",
    textTransform: "uppercase",
    textAlign: "center",
    display: "flex"
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
  imgMargin
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: []
    };
  }

  componentDidMount() {
    getUserSkills(localStorage.getItem("portfolio_id")).then(res => {
      this.setState({
        skills: res
      });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Fab
          color="inherit"
          aria-label="add"
          className={classes.fabButton}
          onClick={goBack}
        >
          <ArrowBackIcon />
        </Fab>
        {this.state.skills.length === 0 ? (
          <Grid
            container
            justify="center"
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
                      <SkillDetails portfolio={true} data={data} />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Paper>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withStyles(uiStyles)(Home);
