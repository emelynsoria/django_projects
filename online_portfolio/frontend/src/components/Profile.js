import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";

import TopNav from "./common-components/TopNav";
import Footer from "./common-components/Footer";
import SnackBar from "./common-components/SnackBar";
import { titleCase } from "./common-components/include/exports";
import jwt from "jsonwebtoken";
import {
  getUserDetails,
  changePassword,
  updateUser
} from "./common-components/include/requests";

const uiStyles = theme => ({
  main: {
    background:
      "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png') no-repeat fixed 100% 100%",
    backgroundColor: "black",
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    overflowX: "hidden",
    overflowY: "hidden"
  },
  paper: {
    color: "#FFFFFF",
    backgroundColor: "#505c62",
    opacity: 0.95,
    textAlign: "center",
    fontFamily: "Andale Mono, monospace",
    width: "60%",
    margin: "0 20% 10% 20%",
    minHeight: "28em",
    padding: "4% 15% 0 15%",
    display: "flex",
    flexWrap: "wrap",
    "@media screen and (max-width: 320px)": {
      width: "84%",
      margin: "0 8% 20% 8%",
      padding: "10% 5%"
    }
  },
  outline: {
    color: "#FFFFFF",
    "& label": {
      color: "#FFFFFF"
    },
    "& input": {
      color: "#FFFFFF"
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white"
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
  },
  btn: {
    color: "#000000",
    margin: "4%",
    "&:hover": {
      backgroundColor: "#7d95a1",
      color: "#ffffff"
    }
  }
});

var decoded_id = "";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      currentPass: "",
      newPass: "",
      confirmPass: "",
      openUpdate: false,
      success: false,
      severity_type: "",
      message: ""
    };
  }

  componentDidMount() {
    decoded_id = jwt.decode(localStorage.getItem("token"));

    getUserDetails(decoded_id.user_id).then(res => {
      this.setState({
        name: titleCase(res.first_name + " " + res.last_name),
        username: res.username
      });
    });
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  openUpdateAccount = () => {
    this.setState({
      openUpdate: true
    });
  };

  closeUpdate = () => {
    this.setState({
      openUpdate: false,
      currentPass: "",
      newPass: "",
      confirmPass: ""
    });
  };

  handleSnackBar = () => {
    this.setState(prevState => ({
      success: !prevState.success
    }));
  };

  submitUpdate = () => {
    if ((this.state.newPass && this.state.confirmPass).length >= 8) {
      changePassword(
        this.state.currentPass,
        this.state.newPass,
        this.state.confirmPass
      )
        .then(res => {
          if (res.status === "ok") {
            this.setState(
              {
                success: true,
                severity_type: "success",
                message: res.result,
                openUpdate: false,
                currentPass: "",
                newPass: "",
                confirmPass: ""
              },
              () => {
                var data = JSON.stringify({
                  username: this.state.username
                });
                updateUser(decoded_id.user_id, data).then(res =>
                  console.log("username", res)
                );
              }
            );
          } else {
            this.setState({
              success: true,
              severity_type: "error",
              message: "Please try again!"
            });
          }
        })
        .catch(err => {
          window.location.reload(true);
        });
    } else if (
      this.state.currentPass.length === 0 ||
      this.state.newPass.length === 0 ||
      this.state.confirmPass.length === 0
    ) {
      this.setState({
        success: true,
        severity_type: "warning",
        message: "Please complete the form!"
      });
    } else {
      this.setState({
        success: true,
        severity_type: "error",
        message: "Please try again!"
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <React.Fragment>
          <Container style={{ marginTop: "10em", alignItems: "center" }}>
            <TopNav />
            <Grid container spacing={3} alignContent="center" justify="center">
              <React.Fragment>
                <Paper className={classes.paper} elevation={3}>
                  <Grid item xs={12}>
                    <center>
                      <Avatar>
                        <LockOutlinedIcon />
                      </Avatar>
                    </center>
                    <Typography variant="h5" gutterBottom>
                      <h1>{this.state.name}</h1>
                    </Typography>
                  </Grid>
                  {this.state.openUpdate ? (
                    <>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          className={classes.outline}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          label="Username"
                          InputLabelProps={{ shrink: true }}
                          value={this.state.username}
                          onChange={e =>
                            this.handleChange("username", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          className={classes.outline}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          label="Current Password"
                          type="password"
                          value={this.state.currentPass}
                          onChange={e =>
                            this.handleChange("currentPass", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          className={classes.outline}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          label="New Password"
                          type="password"
                          value={this.state.newPass}
                          onChange={e =>
                            this.handleChange("newPass", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          className={classes.outline}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          label="Confirm Password"
                          type="password"
                          value={this.state.confirmPass}
                          onChange={e =>
                            this.handleChange("confirmPass", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button
                          onClick={this.closeUpdate}
                          color="inherit"
                          className={classes.btn}
                          variant="contained"
                        >
                          <b>Cancel</b>
                        </Button>
                        <Button
                          onClick={this.submitUpdate}
                          color="inherit"
                          className={classes.btn}
                          variant="contained"
                        >
                          <b>Save</b>
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={12} sm={12}>
                      <Button
                        onClick={this.openUpdateAccount}
                        color="inherit"
                        className={classes.btn}
                        variant="contained"
                      >
                        <b>Update account</b>
                      </Button>
                    </Grid>
                  )}
                </Paper>
              </React.Fragment>
            </Grid>
          </Container>
          <Footer portfolio={false} />
        </React.Fragment>
        <SnackBar
          open={this.state.success}
          handleClose={this.handleSnackBar}
          severity_type={this.state.severity_type}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default withStyles(uiStyles)(Profile);
