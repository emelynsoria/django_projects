import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { HashRouter, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import SnackBar from "./common-components/SnackBar";
import { titleCase } from "./common-components/include/exports";
import { register, postProfile } from "./common-components/include/requests";

const regStyles = theme => ({
  "@global": {
    body: {
      background:
        "linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url('https://source.unsplash.com/1600x900/?crafts') no-repeat fixed",
      backgroundColor: "white",
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
    padding: "1.5em",
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
    marginTop: theme.spacing(3)
  },
  submit: {
    fontWeight: "bold",
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#4b7a9c"
  },
  back_link: {
    color: "red"
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
    color: "#32556e"
  }
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      errorUname: false,
      errorPass: false,
      success_register: false,
      severity_type: "",
      message: ""
    };
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  handleRegister = () => {
    this.setState(prevState => ({
      success_register: !prevState.success_register
    }));
  };

  register = e => {
    e.preventDefault();

    if (
      (this.state.firstname &&
        this.state.lastname &&
        this.state.username &&
        this.state.password) !== ""
    ) {
      register(
        titleCase(this.state.firstname),
        titleCase(this.state.lastname),
        this.state.username,
        this.state.password
      )
        .then(res => {
          if (res !== {}) {
            this.setState(
              {
                success_register: true,
                severity_type: "success",
                message: "Account created successfully!",
                firstname: "",
                lastname: "",
                username: "",
                password: ""
              },
              () => {
                setTimeout(function() {
                  window.location.replace("/");
                }, 2500);
              },
              this.createProfile(res.id)
            );
          } else {
            this.setState({
              success_register: true,
              severity_type: "error",
              message: "Error creating account!"
            });
          }
        })
        .catch(err => {
          this.setState({
            success_register: true,
            severity_type: "error",
            message: "Error creating account!"
          });
        });
    } else {
      // return;
      this.setState({
        success_register: true,
        severity_type: "warning",
        message: "Please complete the form!"
      });
    }
  };

  createProfile = id => {
    var data = new FormData();
    data.append("user", id);

    postProfile(data).catch(err => console.log(err));
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
                Create an Account
              </Typography>
              <form
                className={classes.form}
                onSubmit={event => event.preventDefault()}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.outline}
                      variant="outlined"
                      required
                      fullWidth
                      type="text"
                      id="firstname"
                      label="First Name"
                      autoComplete="firstname"
                      InputLabelProps={{ required: false }}
                      value={this.state.firstname}
                      onChange={e =>
                        this.handleChange("firstname", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.outline}
                      variant="outlined"
                      required
                      fullWidth
                      type="text"
                      id="lastname"
                      label="Last Name"
                      autoComplete="lastname"
                      InputLabelProps={{ required: false }}
                      value={this.state.lastname}
                      onChange={e =>
                        this.handleChange("lastname", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.outline}
                      variant="outlined"
                      required
                      fullWidth
                      type="text"
                      id="username"
                      label="Username"
                      autoComplete="username"
                      InputLabelProps={{ required: false }}
                      value={this.state.username}
                      onChange={e =>
                        this.handleChange("username", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.outline}
                      variant="outlined"
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      id="password"
                      InputLabelProps={{ required: false }}
                      value={this.state.password}
                      onChange={e =>
                        this.handleChange("password", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  onClick={e => this.register(e)}
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item xs>
                    <HashRouter>
                      <Link to="/" className={classes.links}>
                        Already have an account? Log In
                      </Link>
                    </HashRouter>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Paper>
        </Container>
        <SnackBar
          open={this.state.success_register}
          handleClose={this.handleRegister}
          severity_type={this.state.severity_type}
          message={this.state.message}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(regStyles)(Register);
