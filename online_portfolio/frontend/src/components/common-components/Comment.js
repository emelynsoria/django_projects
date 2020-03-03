import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";

import jwt from "jsonwebtoken";
import DeleteDialog from "./DeleteDialog";
import SnackBar from "./SnackBar";
import { wordBreak } from "./include/css";
import { hdate } from "./include/exports";
import { updateComment, postComment, removeComment } from "./include/requests";

const uiStyles = theme => ({
  wordBreak,
  commentRoot: {
    width: "100%",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  commentInput: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  comments: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    padding: "5px 10px"
  }
});

const decoded_id = jwt.decode(localStorage.getItem("token"));

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: "",
      comment: "",
      date: null,
      anchorEl: null,
      commentId: "",
      openEdit: false,
      openDelete: false,
      success: false,
      severity_type: "",
      message: ""
    };
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  submitComment = () => {
    if (this.state.newComment.length !== 0) {
      postComment(
        decoded_id.user_id,
        this.props.blog_id,
        this.state.newComment
      ).then(res => {
        if (res !== {}) {
          this.setState({
            newComment: ""
          });
          this.props.fetchAllComments();
        }
      });
    } else {
      return;
    }
  };

  // menu for modifying comment
  openMenu = (e, id, content) => {
    this.setState({
      anchorEl: e,
      commentId: id,
      comment: content
    });
  };

  closeMenu = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleEditDialog = () => {
    this.setState({
      openEdit: true,
      anchorEl: null
    });
  };

  closeEdit = () => {
    this.setState({
      openEdit: false
    });
  };

  handleDeleteDialog = () => {
    this.setState({
      openDelete: true,
      anchorEl: null
    });
  };

  closeDelete = () => {
    this.setState({
      openDelete: false
    });
  };

  handleDelete = () => {
    removeComment(this.state.commentId)
      .then(() => {
        this.setState({
          openDelete: false
        });
        setTimeout(() => {
          this.props.fetchAllComments();
        }, 1000);
      })
      .catch(error => console.log(error));
  };

  handleSnackBar = () => {
    this.setState(prevState => ({
      success: !prevState.success
    }));
  };

  handleUpdateComment = () => {
    if (this.state.comment.length !== 0) {
      updateComment(
        this.state.commentId,
        decoded_id.user_id,
        this.props.blog_id,
        this.state.comment
      )
        .then(res => {
          if (res !== {}) {
            setTimeout(() => {
              this.props.fetchAllComments();
            }, 1200);
            this.setState({
              success: true,
              severity_type: "success",
              message: "Comment updated successfully!",
              comment: "",
              openEdit: false
            });
          } else {
            this.setState({
              success: true,
              severity_type: "error",
              message: "Error updating comment"
            });
          }
        })
        .catch(err => {
          this.setState({
            success: true,
            severity_type: "error",
            message: "Error updating comment"
          });
        });
    } else {
      this.setState({
        success: true,
        severity_type: "warning",
        message: "Please complete the form!"
      });
    }
  };

  render() {
    const { classes, comments, profile } = this.props;
    const openAnchor = Boolean(this.state.anchorEl);

    return (
      <React.Fragment>
        <div
          style={{
            marginBottom: ".5em"
          }}
        >
          <Paper
            elevation={2}
            component="form"
            className={classes.commentRoot}
            style={{
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
            <InputBase
              className={classes.commentInput}
              placeholder="Write a comment"
              multiline
              rowsMax={15}
              required
              value={this.state.newComment}
              onChange={e => this.handleChange("newComment", e.target.value)}
            />
            <IconButton
              variant="contained"
              color="primary"
              onClick={this.submitComment}
            >
              <SendIcon />
            </IconButton>
          </Paper>
        </div>
        <List>
          {this.state.openEdit ? (
            <React.Fragment>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rowsMax={25}
                label="Enter comment here"
                value={this.state.comment}
                onChange={e => this.handleChange("comment", e.target.value)}
                required
              />
              <Button
                variant="contained"
                color="inherit"
                onClick={this.closeEdit}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "10px", float: "right" }}
                onClick={this.handleUpdateComment}
              >
                Save
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {comments.map((data, idx) => (
                <React.Fragment key={idx}>
                  <ListItem
                    className={classes.wordBreak}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      {profile.map((pic, idx) =>
                        data.user["id"] === pic.user["id"] ? (
                          <Avatar
                            key={idx}
                            alt="Profile Picture"
                            src={pic.user_photo}
                          />
                        ) : null
                      )}
                    </ListItemAvatar>
                    <React.Fragment>
                      <Paper className={classes.comments}>
                        {data.user["id"] === decoded_id.user_id ? (
                          <IconButton
                            edge="end"
                            style={{
                              float: "right"
                            }}
                            onClick={e =>
                              this.openMenu(e.target, data.id, data.content)
                            }
                          >
                            <MoreVertIcon />
                          </IconButton>
                        ) : null}

                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="caption"
                                color="textPrimary"
                              >
                                {profile.map((pic, idx) =>
                                  data.user["id"] === pic.user["id"] ? (
                                    <b>
                                      {pic.user["first_name"] +
                                        " " +
                                        pic.user["last_name"]}
                                    </b>
                                  ) : null
                                )}
                              </Typography>
                              &emsp;
                              <Typography
                                component="span"
                                color="textSecondary"
                                variant="caption"
                              >
                                {hdate.relativeTime(data.created_on)}
                              </Typography>
                            </React.Fragment>
                          }
                          secondary={data.content.split("\n").map(text => (
                            <Typography
                              variant="subtitle1"
                              // color="textPrimary"
                              className={classes.wordBreak}
                            >
                              {text}
                              <br />
                            </Typography>
                          ))}
                        />
                      </Paper>
                    </React.Fragment>
                  </ListItem>
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
        </List>
        <Menu
          anchorEl={this.state.anchorEl}
          open={openAnchor}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.handleEditDialog}>Edit</MenuItem>
          <MenuItem onClick={this.handleDeleteDialog}>Delete</MenuItem>
        </Menu>
        <DeleteDialog
          confirmDelete={this.state.openDelete}
          closeDialog={this.closeDelete}
          title=""
          handleDelete={this.handleDelete}
        />
        <SnackBar
          open={this.state.success}
          handleClose={this.handleSnackBar}
          severity_type={this.state.severity_type}
          message={this.state.message}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(uiStyles)(Comment);
