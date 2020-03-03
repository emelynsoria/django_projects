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
import Divider from "@material-ui/core/Divider";

import moment from "moment";
import { img } from "../common-components/include/css";
import { displayImage } from "../common-components/include/exports";
import {
  getBlogDetails,
  updateBlog
} from "../common-components/include/requests";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  editBtn: {
    margin: "20px 20px"
  },
  textContent: {
    textAlign: "justify"
  },
  img
});

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogId: "",
      newTitle: "",
      newContent: "",
      newPhoto: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.blog_id !== prevProps.blog_id) {
      this.setState({
        blogId: this.props.blog_id
      });
      this.fetchData(this.props.blog_id);
    }
  }

  fetchData(blogId) {
    getBlogDetails(blogId).then(res => {
      this.setState({
        newTitle: res.title,
        newContent: res.content,
        newPhoto: res.blog_photo
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
      newPhoto: e.target.files[0]
    });
  };

  submit = (blogId, newTitle, newContent, newPhoto) => {
    var currentDate = moment().format();

    const data = new FormData();
    data.append("title", newTitle);
    data.append("content", newContent);
    if (newPhoto !== null) {
      data.append("blog_photo", newPhoto);
    }
    data.append("blog_photo", "");

    if (this.props.is_draft) {
      data.append("is_draft", false);
      data.append("date_posted", currentDate);
    } else {
      data.append("is_draft", false);
    }

    updateBlog(blogId, data)
      .then(window.location.reload(true))
      .catch(err => console.log("ERROR", err));
  };

  render() {
    const { classes, open, onClose } = this.props;

    return (
      <Dialog
        fullScreen={window.innerWidth < 760 ? true : false}
        fullWidth={true}
        // maxWidth="md"
        open={open}
        onClose={onClose}
      >
        <DialogTitle className={classes.dialogTitle}>
          Edit blog details
          <IconButton className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item xs={12} sm={12}>
              <center>
                <img
                  alt={this.state.newPhoto === null ? "" : "blog image"}
                  id="imageOutput"
                  className={classes.img}
                  src={this.state.newPhoto}
                />
              </center>
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="normal"
                label="Title"
                value={this.state.newTitle}
                onChange={e => this.handleChange("newTitle", e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                multiline
                rowsMax={13}
                label="Content"
                value={this.state.newContent}
                onChange={e => this.handleChange("newContent", e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <input
                type="file"
                accept="image/*"
                name="blog_photo"
                onChange={this.changePhoto}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.btnCont}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.createBtn}
            type="submit"
            onClick={() =>
              this.submit(
                this.state.blogId,
                this.state.newTitle,
                this.state.newContent,
                this.state.newPhoto
              )
            }
            disabled={!this.state.newContent}
          >
            {this.props.is_draft ? "Post" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(uiStyles)(EditPost);
