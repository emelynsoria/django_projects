import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { goBack } from "./include/exports";
import NoDataFound from "./NoDataFound";
import { getUserExperience } from "./include/requests";

const uiStyles = {
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
    margin: "10% 10% 6.9% 10%",
    "@media screen and (max-width: 320px)": {
      width: "84%",
      margin: "45% 8%"
    }
  },
  paperCont: {
    background: "transparent",
    opacity: 1,
    padding: "14px 5px",
    display: "flex",
    flexWrap: "wrap",
    "@media screen and (max-width: 480px)": {
      width: "96%",
      margin: "0 2%"
    }
  },
  paper: {
    backgroundColor: "#bfced8",
    margin: "2em",
    padding: "1.5em",
    width: "100%",
    "@media screen and (max-width: 480px)": {
      margin: "5px",
      padding: "20px 10px"
    }
  }
};

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: []
    };
  }

  componentDidMount() {
    getUserExperience(localStorage.getItem("portfolio_id")).then(res => {
      this.setState({
        experience: res
      });
    });
  }

  render() {
    const { classes } = this.props;

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
          <Grid container spacing={3} className={classes.cont}>
            <Grid item xs={12}>
              <div className={classes.paperCont}>
                {this.state.experience.length === 0 ? (
                  <Grid item xs={12} sm={12}>
                    <NoDataFound />
                  </Grid>
                ) : (
                  this.state.experience.map((data, idx) => (
                    <React.Fragment key={idx}>
                      <Paper className={classes.paper}>
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
                  ))
                )}
              </div>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(uiStyles)(Experience);
