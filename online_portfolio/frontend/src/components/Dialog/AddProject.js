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
import { img } from "../common-components/include/css";
import { displayImage } from "../common-components/include/exports";
import { addProject } from "../common-components/include/requests";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  editImg: {
    height: 220,
    width: 380
  },
  img
});

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectTitle: "",
      projectDescription: "",
      projectPhoto: ""
    };
  }

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
      projectPhoto: e.target.files[0]
    });
  };

  submitData = () => {
    const decoded_id = jwt.decode(localStorage.getItem("token"));

    var formData = new FormData();
    formData.append("project_title", this.state.projectTitle);
    formData.append("project_description", this.state.projectDescription);
    formData.append("project_photo", this.state.projectPhoto);
    formData.append("user", decoded_id.user_id);

    addProject(formData)
      .then(res => console.log(res))
      .then(window.location.reload(true));
  };

  render() {
    const { classes, open, onClose } = this.props;

    return (
      <React.Fragment>
        <Dialog
          fullScreen={window.innerWidth < 760 ? true : false}
          open={open}
          onClose={onClose}
        >
          <React.Fragment>
            <DialogTitle className={classes.dialogTitle}>
              Add Project
              <IconButton className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Title of Project"
                    variant="outlined"
                    onChange={e =>
                      this.handleChange("projectTitle", e.target.value)
                    }
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Description"
                    multiline
                    rowsMax={25}
                    onChange={e =>
                      this.handleChange("projectDescription", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs>
                  <center>
                    <img
                      alt={
                        this.state.projectPhoto === "" ? "" : "project image"
                      }
                      id="imageOutput"
                      className={classes.img}
                      src={this.state.projectPhoto}
                    />
                  </center>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <input
                    type="file"
                    accept="image/*"
                    name="blog_photo"
                    // multiple
                    onChange={e => this.changePhoto(e)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="primary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                onClick={this.submitData}
                disabled={
                  !(this.state.projectTitle && this.state.projectDescription)
                }
              >
                Save
              </Button>
            </DialogActions>
          </React.Fragment>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(uiStyles)(AddProject);
