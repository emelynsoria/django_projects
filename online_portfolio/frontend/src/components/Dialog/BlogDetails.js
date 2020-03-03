import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import clsx from "clsx";
import moment from "moment";
import DeleteDialog from "../common-components/DeleteDialog";
import Comment from "../common-components/Comment";
import SnackBar from "../common-components/SnackBar";
import { displayImage } from "../common-components/include/exports";
import { img } from "../common-components/include/css";
import {
  getBlogDetails,
  updateBlog,
  removeBlog,
  getBlogComments,
  getUserProfile
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
  maxSize: {
    maxHeight: "18em",
    maxWidth: "18em"
  },
  img
});

class BlogDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      profile: [],
      blogId: "",
      checked: false,
      newTitle: "",
      newContent: "",
      newPhoto: null,
      // for delete
      confirmDelete: false,
      deleteId: "",
      postTitle: "",
      // snackbar
      success: false,
      severity_type: "",
      message: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.blog_id !== prevProps.blog_id) {
      this.setState({
        blogId: this.props.blog_id
      });
      this.fetchData(this.props.blog_id);
      this.fetchAllComments(this.props.blog_id);
    }
  }

  fetchAllComments = blogId => {
    getBlogComments("", blogId).then(res => {
      this.setState(
        {
          comments: res
        },
        () => {
          getUserProfile("").then(res => {
            this.setState({
              profile: res
            });
          });
        }
      );
    });
  };

  handleButton = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  fetchData = blogId => {
    getBlogDetails(blogId).then(res => {
      this.setState({
        newTitle: res.title,
        newContent: res.content,
        newPhoto: res.blog_photo
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
      newPhoto: e.target.files[0]
    });
  };

  submit = (blogId, newTitle, newContent, newPhoto) => {
    var currentDate = moment().format();

    // console.log("img", newPhoto);
    const data = new FormData();
    data.append("title", newTitle);
    data.append("content", newContent);
    if (newPhoto !== {}) {
      data.append("blog_photo", newPhoto);
    }
    data.append("blog_photo", "");

    if (this.props.is_draft) {
      data.append("is_draft", false);
      data.append("date_posted", currentDate);
    } else {
      data.append("is_draft", false);
    }

    if (newContent.length !== 0) {
      updateBlog(blogId, data)
        .then(res => {
          console.log("ddd", res);
          if (res !== {}) {
            this.setState({
              success: true,
              severity_type: "success",
              message: "Blog updated successfully!",
              checked: !this.state.checked,
              newPhoto: ""
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1500);
          } else {
            this.setState({
              success: true,
              severity_type: "error",
              message: "Error updating blog!"
            });
          }
        })
        .catch(err => {
          this.setState({
            success: true,
            severity_type: "error",
            message: "Error updating blog!"
          });
        });
    } else {
      // return;
      this.setState({
        success: true,
        severity_type: "warning",
        message: "Please complete the form!"
      });
    }
  };

  openDelConfirmation(id, title) {
    this.setState({
      confirmDelete: true,
      deleteId: id,
      postTitle: title
    });
  }

  closeDelConfirmation() {
    this.setState({
      confirmDelete: false
    });
  }

  handleDelete(blogId) {
    removeBlog(blogId)
      .then(window.location.reload(true))
      .catch(error => {
        console.log(error);
      });
  }

  closeSnackBar = () => {
    this.setState(prevState => ({
      success: !prevState.success
    }));
  };

  render() {
    const {
      classes,
      blog_id,
      open,
      onClose,
      title,
      content,
      date_posted,
      blog_photo,
      is_draft
    } = this.props;

    return (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          fullScreen={window.innerWidth < 800 ? true : false}
          maxWidth={blog_photo === null ? "sm" : "lg"}
          open={open}
          onClose={onClose}
        >
          {!this.state.checked ? (
            <React.Fragment>
              <DialogTitle>
                {title}
                <br />
                <Typography variant="caption" color="textSecondary">
                  {date_posted}
                </Typography>
              </DialogTitle>

              <IconButton className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
              </IconButton>
              <DialogContent>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  {blog_photo === null && title.length === 0 ? (
                    <React.Fragment>
                      <Grid item xs={12} sm={12}>
                        <DialogContentText
                          className={clsx(
                            classes.textContent,
                            classes.wordBreak
                          )}
                        >
                          {content.split("\n").map((row, id) => (
                            <Typography key={id}>
                              {row}
                              <br />
                            </Typography>
                          ))}
                        </DialogContentText>
                        {is_draft ? null : (
                          <Comment
                            blog_id={this.state.blogId}
                            fetchAllComments={() =>
                              this.fetchAllComments(this.state.blogId)
                            }
                            comments={this.state.comments}
                            profile={this.state.profile}
                          />
                        )}
                      </Grid>
                    </React.Fragment>
                  ) : title === "" ? (
                    <React.Fragment>
                      <Grid item xs={12} sm={6}>
                        <center>
                          <img
                            alt=""
                            className={classes.img}
                            style={{
                              maxHeight: "47em",
                              width: "100%"
                            }}
                            src={blog_photo}
                          />
                        </center>
                        <DialogContentText
                          className={clsx(
                            classes.textContent,
                            classes.wordBreak
                          )}
                        >
                          {content.split("\n").map((row, id) => (
                            <Typography key={id}>
                              {row}
                              <br />
                            </Typography>
                          ))}
                        </DialogContentText>
                      </Grid>
                      {is_draft ? null : (
                        <Grid item xs={12} sm={6}>
                          <Comment
                            blog_id={this.state.blogId}
                            fetchAllComments={() =>
                              this.fetchAllComments(this.state.blogId)
                            }
                            comments={this.state.comments}
                            profile={this.state.profile}
                          />
                        </Grid>
                      )}
                    </React.Fragment>
                  ) : blog_photo === null ? (
                    <React.Fragment>
                      <Grid item xs={12} sm={12}>
                        <DialogContentText
                          className={clsx(
                            classes.textContent,
                            classes.wordBreak
                          )}
                        >
                          {content.split("\n").map((row, id) => (
                            <Typography key={id}>
                              {row}
                              <br />
                            </Typography>
                          ))}
                        </DialogContentText>
                        {is_draft ? null : (
                          <Comment
                            blog_id={this.state.blogId}
                            fetchAllComments={() =>
                              this.fetchAllComments(this.state.blogId)
                            }
                            comments={this.state.comments}
                            profile={this.state.profile}
                          />
                        )}
                      </Grid>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Grid item xs={12} sm={6} className={classes.img}>
                        <center>
                          <img
                            alt=""
                            className={classes.img}
                            style={{
                              maxHeight: "47em",
                              width: "100%"
                            }}
                            src={blog_photo}
                          />
                        </center>
                        <DialogContentText
                          className={clsx(
                            classes.textContent,
                            classes.wordBreak
                          )}
                        >
                          {content.split("\n").map((row, id) => (
                            <Typography key={id}>
                              {row}
                              <br />
                            </Typography>
                          ))}
                        </DialogContentText>
                      </Grid>
                      {is_draft ? null : (
                        <Grid item xs={12} sm={6}>
                          <Comment
                            blog_id={this.state.blogId}
                            fetchAllComments={() =>
                              this.fetchAllComments(this.state.blogId)
                            }
                            comments={this.state.comments}
                            profile={this.state.profile}
                          />
                        </Grid>
                      )}
                    </React.Fragment>
                  )}
                </Grid>
              </DialogContent>
            </React.Fragment>
          ) : (
            <Fade in={this.state.checked}>
              <React.Fragment>
                {this.state.confirmDelete === false ? (
                  // dialog for editing
                  <React.Fragment>
                    <DialogTitle className={classes.dialogTitle}>
                      {is_draft ? "Edit Draft" : "Edit blog details"}
                      <IconButton
                        className={classes.closeButton}
                        onClick={onClose}
                      >
                        <CloseIcon />
                      </IconButton>
                      <Divider />
                    </DialogTitle>
                    <DialogContent>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs>
                          <center>
                            <img
                              alt="blog image"
                              id="imageOutput"
                              className={clsx(classes.maxSize, classes.img)}
                              src={this.state.newPhoto}
                            />
                          </center>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            margin="normal"
                            label="Title"
                            value={this.state.newTitle}
                            onChange={e =>
                              this.handleChange("newTitle", e.target.value)
                            }
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
                            onChange={e =>
                              this.handleChange("newContent", e.target.value)
                            }
                            variant="outlined"
                            fullWidth
                            required
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
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => this.openDelConfirmation(blog_id, title)}
                      >
                        Delete
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
                        // disabled={!this.state.newContent}
                      >
                        {is_draft ? "Post" : "Save"}
                      </Button>
                    </DialogActions>
                  </React.Fragment>
                ) : (
                  // dialog for deleting
                  <DeleteDialog
                    confirmDelete={this.state.confirmDelete}
                    closeDialog={() => this.closeDelConfirmation()}
                    title={this.state.postTitle}
                    handleDelete={() => this.handleDelete(this.state.deleteId)}
                  />
                )}
              </React.Fragment>
            </Fade>
          )}
          <center>
            <FormControlLabel
              className={classes.editBtn}
              control={
                <Switch
                  checked={this.state.checked}
                  onChange={this.handleButton}
                />
              }
              label={<b>{!this.state.checked ? "VIEW" : "EDIT"}</b>}
            />
          </center>
        </Dialog>
        <SnackBar
          open={this.state.success}
          handleClose={this.closeSnackBar}
          severity_type={this.state.severity_type}
          message={this.state.message}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(uiStyles)(BlogDetails);
