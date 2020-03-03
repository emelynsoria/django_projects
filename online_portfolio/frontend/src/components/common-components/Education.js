import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SchoolIcon from "@material-ui/icons/School";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import NoDataFound from "./NoDataFound";
import { goBack } from "./include/exports";
import { getUserEducation } from "./include/requests";

const uiStyles = theme => ({
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
    backgroundColor: "#bfced8",
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
    left: 45,
    top: 100,
    position: "fixed",
    "@media screen and (max-width: 320px)": {
      left: 5,
      top: 80
    }
  }
});

class Education extends Component {
  constructor() {
    super();
    this.state = {
      education: []
    };
  }

  componentDidMount() {
    getUserEducation(localStorage.getItem("portfolio_id")).then(res => {
      this.setState({
        education: res
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
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(uiStyles)(Education);
