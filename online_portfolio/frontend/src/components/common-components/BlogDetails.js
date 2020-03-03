import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";

import Comment from "./Comment";
import { wordBreak } from "./include/css";
import { getBlogComments, getUserProfile } from "./include/requests";
import { hdate } from "./include/exports";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  img2: {
    maxHeight: "47em",
    width: "auto",
    "@media screen and (max-width: 320px)": {
      maxHeight: "auto",
      width: "100%"
    }
  },
  textContent: {
    textAlign: "justify"
  },
  wordBreak,
  commentRoot: {
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

class BlogDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      newComment: "",
      blogId: "",
      profile: [],
      name: "",
      anchorEl: null,
      commentId: "",
      openEdit: false,
      openDelete: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.blog_id !== prevProps.blog_id) {
      this.setState({
        blogId: this.props.blog_id
      });
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

  render() {
    const {
      classes,
      open,
      onClose,
      title,
      content,
      date_posted,
      blog_photo
    } = this.props;

    return (
      <Dialog
        fullWidth={true}
        fullScreen={window.innerWidth < 800 ? true : false}
        maxWidth={blog_photo === null ? "sm" : "lg"}
        open={open}
        onClose={onClose}
      >
        <React.Fragment>
          <DialogTitle>
            {title}
            <br />
            <Typography variant="caption" color="textSecondary">
              {hdate.relativeTime(date_posted)}
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
                      className={clsx(classes.textContent, classes.wordBreak)}
                    >
                      {content.split("\n").map((row, id) => (
                        <Typography key={id}>
                          {row}
                          <br />
                        </Typography>
                      ))}
                    </DialogContentText>
                    <Comment
                      blog_id={this.state.blogId}
                      fetchAllComments={() =>
                        this.fetchAllComments(this.state.blogId)
                      }
                      comments={this.state.comments}
                      profile={this.state.profile}
                    />
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
                      className={clsx(classes.textContent, classes.wordBreak)}
                    >
                      {content.split("\n").map((row, id) => (
                        <Typography key={id}>
                          {row}
                          <br />
                        </Typography>
                      ))}
                    </DialogContentText>
                  </Grid>
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
                </React.Fragment>
              ) : blog_photo === null ? (
                <React.Fragment>
                  <Grid item xs={12} sm={12}>
                    <DialogContentText
                      className={clsx(classes.textContent, classes.wordBreak)}
                    >
                      {content.split("\n").map((row, id) => (
                        <Typography key={id}>
                          {row}
                          <br />
                        </Typography>
                      ))}
                    </DialogContentText>
                    <Comment
                      blog_id={this.state.blogId}
                      fetchAllComments={() =>
                        this.fetchAllComments(this.state.blogId)
                      }
                      comments={this.state.comments}
                      profile={this.state.profile}
                    />
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
                      className={clsx(classes.textContent, classes.wordBreak)}
                    >
                      {content.split("\n").map((row, id) => (
                        <Typography key={id}>
                          {row}
                          <br />
                        </Typography>
                      ))}
                    </DialogContentText>
                  </Grid>
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
                </React.Fragment>
              )}
            </Grid>
          </DialogContent>
        </React.Fragment>
      </Dialog>
    );
  }
}

export default withStyles(uiStyles)(BlogDetails);
