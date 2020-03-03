import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import jwt from "jsonwebtoken";
import clsx from "clsx";
import { img } from "../common-components/include/css";
import { displayImage } from "../common-components/include/exports";
import {
  getUserDetails,
  getProfileDetails,
  updateUser,
  updateProfile
} from "../common-components/include/requests";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  imgSize: {
    maxHeight: "20em",
    maxWidth: "18em"
  },
  img
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      about: "",
      pic: null,
      profession: "",
      profile_id: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.profileId !== prevProps.profileId) {
      this.setState({
        profile_id: this.props.profileId
      });
      this.fetchProfile(this.props.profileId);
    }
  }

  fetchProfile = profileId => {
    const decoded_id = jwt.decode(localStorage.getItem("token"));

    getUserDetails(decoded_id.user_id).then(res => {
      this.setState({
        fname: res.first_name,
        lname: res.last_name
      });
    });

    getProfileDetails(profileId).then(res => {
      this.setState({
        about: res.about,
        pic: res.user_photo,
        profession: res.profession
      });
    });
  };

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  changePhoto = e => {
    const preview = document.getElementById("imageOutput");
    const file = document.querySelector("input[type=file]").files[0];
    displayImage(preview, file); // function to display image selected

    this.setState({
      pic: e.target.files[0]
    });
  };

  // submit profile
  submitData = () => {
    const decoded_id = jwt.decode(localStorage.getItem("token"));

    if (
      (this.state.fname && this.state.lname && this.state.about).length !== 0
    ) {
      var data = JSON.stringify({
        first_name: this.state.fname,
        last_name: this.state.lname
      });

      updateUser(decoded_id.user_id, data)
        .then(res => {
          var profileData = new FormData();
          profileData.append("about", this.state.about);
          profileData.append("profession", this.state.profession);
          if (this.state.pic !== null) {
            profileData.append("user_photo", this.state.pic);
          }
          profileData.append("user_photo", "");

          updateProfile(this.state.profile_id, profileData)
            .then(window.location.reload(true))
            .then(res => console.log(res))
            .catch(err => {
              window.location.reload(true);
            });
        })
        .catch(err => {
          console.log(err);
          window.location.reload(true);
        });
    } else {
      alert("Please complete the form");
    }
  };

  handleClose = () => {};

  render() {
    const { classes, open, handleClose } = this.props;

    return (
      <Dialog
        fullScreen={window.innerWidth < 760 ? true : false}
        fullWidth={true}
        open={open}
      >
        <React.Fragment>
          <DialogTitle className={classes.dialogTitle}>
            Edit Profile
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1} alignItems="center" justify="center">
              <Grid item xs={12} sm={12}>
                <center>
                  <img
                    id="imageOutput"
                    className={clsx(classes.img, classes.imgSize)}
                    alt={this.state.pic === null ? "" : "profile picture"}
                    src={this.state.pic}
                  />
                </center>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  label="First Name"
                  variant="outlined"
                  value={this.state.fname}
                  onChange={e => this.handleChange("fname", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  label="Last Name"
                  variant="outlined"
                  value={this.state.lname}
                  onChange={e => this.handleChange("lname", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  label="Profession"
                  variant="outlined"
                  value={this.state.profession}
                  onChange={e =>
                    this.handleChange("profession", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  label="About Yourself"
                  variant="outlined"
                  multiline
                  rowsMax={20}
                  value={this.state.about}
                  onChange={e => this.handleChange("about", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <input
                  type="file"
                  accept="image/*"
                  name="user_photo"
                  // multiple
                  onChange={this.changePhoto}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              onClick={this.submitData}
            >
              Save
            </Button>
          </DialogActions>
        </React.Fragment>
      </Dialog>
    );
  }
}

export default withStyles(uiStyles)(EditProfile);
