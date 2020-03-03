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

import {
  getProjectDetails,
  updateProject
} from "../common-components/include/requests";
import { img } from "../common-components/include/css";
import { displayImage } from "../common-components/include/exports";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  img
});

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      photo: null
    };
  }

  componentDidMount() {
    getProjectDetails().then(res => {
      this.setState({
        title: res.project_title,
        description: res.project_description,
        photo: res.project_photo
      });
    });
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
      photo: e.target.files[0]
    });
  };

  submitData = () => {
    var formData = new FormData();
    formData.append("project_title", this.state.title);
    formData.append("project_description", this.state.description);
    if (this.state.photo !== {}) {
      formData.append("project_photo", this.state.photo);
    }
    formData.append("project_photo", "");

    updateProject(formData)
      .then(res => console.log(res))
      .then(window.location.reload(true))
      .catch(err => console.log("ERROR", err));
  };

  render() {
    const { classes, open, handleClose } = this.props;

    return (
      <Dialog
        fullScreen={window.innerWidth < 760 ? true : false}
        fullWidth={true}
        maxWidth="md"
        open={open}
      >
        <React.Fragment>
          <DialogTitle className={classes.dialogTitle}>
            Edit Project
            <IconButton className={classes.closeButton} onClick={handleClose}>
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
                  value={this.state.title}
                  onChange={e => this.handleChange("title", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  label="Description"
                  value={this.state.description}
                  multiline
                  rowsMax={20}
                  onChange={e =>
                    this.handleChange("description", e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <center>
                  <img
                    alt={this.state.photo === null ? "" : "project image"}
                    id="imageOutput"
                    className={classes.img}
                    src={this.state.photo}
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

export default withStyles(uiStyles)(EditProject);
