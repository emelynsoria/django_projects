import React, { Component } from "react";
import { HashRouter, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import { login } from "./common-components/include/requests";
import SnackBar from "./common-components/SnackBar";

const loginFormStyles = theme => ({
  "@global": {
    body: {
      background:
        "linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url('https://source.unsplash.com/1600x900/?crafts') no-repeat fixed",
      backgroundSize: "100% 100%"
    }
  },
  paper: {
    color: "white",
    backgroundColor: "#3a586e",
    marginTop: theme.spacing(20),
    padding: "3.5em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media screen and (max-width: 320px)": {
      padding: "1em"
    }
  },
  paper2: {
    backgroundColor: "white",
    padding: "2em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#6f9ebf"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    fontWeight: "bold",
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#4b7a9c"
  },
  outline: {
    "& label.Mui-focused": {
      color: "#4b7a9c"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#4b7a9c"
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#4b7a9c"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4b7a9c"
      }
    }
  },
  links: {
    color: "#4b7a9c"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      pass: "",
      errorUname: false,
      errorPass: false,
      showSpinner: false,
      loginError: false,
      success_login: false,
      severity_type: "",
      message: ""
    };
  }

  getUname = e => {
    this.setState({
      uname: e
    });
  };

  getPass = e => {
    this.setState({
      pass: e
    });
  };

  focusUname = value => {
    this.setState({
      errorUname: value
    });
  };

  focusPass = value => {
    this.setState({
      errorPass: value
    });
  };

  displayErrorU = val => {
    if (val === false) {
      if (this.state.uname !== "") {
        this.setState({ errorUname: false });
      } else {
        this.setState({ errorUname: true });
      }
    }
  };

  displayErrorP = val => {
    if (val === false) {
      if (this.state.pass !== "") {
        this.setState({ errorPass: false });
      } else {
        this.setState({ errorPass: true });
      }
    }
  };

  closeSnackBar = () => {
    this.setState(prevState => ({
      success_login: !prevState.success_login
    }));
  };

  login = (uname, pass) => {
    if ((uname && pass) !== "") {
      login(uname, pass)
        .then(res => {
          if (res.access) {
            localStorage.setItem("token", res.access);
            window.location.replace("/#/home");
            window.location.reload();
          } else {
            this.setState({
              success_login: true,
              severity_type: "error",
              message: "Incorrect Credentials"
            });
          }
        })
        .catch(err => {
          this.setState({
            success_login: true,
            severity_type: "error",
            message: "Error logging in",
            uname: "",
            pass: ""
          });
        });
    } else {
      // return;
      this.setState({
        success_login: true,
        severity_type: "warning",
        message: "Please complete the form first!"
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Container component="main" maxWidth="sm">
          <Paper className={classes.paper} elevation={6}>
            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              style={{ marginBottom: "1.2em" }}
            >
              Online Portfolio
            </Typography>
            <Paper className={classes.paper2} elevation={4}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <form className={classes.form} onSubmit={e => e.preventDefault()}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      className={classes.outline}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="text"
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      InputLabelProps={{ required: false }}
                      error={this.state.errorUname}
                      onChange={e => this.getUname(e.target.value)}
                      onFocus={() => this.focusUname(false)}
                      onBlur={() => this.displayErrorU(this.state.errorUname)}
                      helperText={
                        this.state.errorUname ? "Username is required" : ""
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
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      InputLabelProps={{ required: false }}
                      error={this.state.errorPass}
                      onChange={e => this.getPass(e.target.value)}
                      onFocus={() => this.focusPass(false)}
                      onBlur={() => this.displayErrorP(this.state.errorPass)}
                      helperText={
                        this.state.errorPass ? "Password is required" : ""
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  onClick={() => this.login(this.state.uname, this.state.pass)}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <HashRouter>
                      <Link to="/register" className={classes.links}>
                        Don't have an account? Register Now
                      </Link>
                    </HashRouter>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Paper>
        </Container>
        <SnackBar
          open={this.state.success_login}
          handleClose={this.closeSnackBar}
          severity_type={this.state.severity_type}
          message={this.state.message}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(loginFormStyles)(Login);
