import React, { Component } from "react";
import { withStyles, fade } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import CommentIcon from "@material-ui/icons/Comment";
import DraftsIcon from "@material-ui/icons/Drafts";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import jwt from "jsonwebtoken";
import TopNav from "./common-components/TopNav";
import EditPost from "./Dialog/EditPost";
import Drafts from "./Dialog/Drafts";
import DeleteDialog from "./common-components/DeleteDialog";
import BlogDetails from "./common-components/BlogDetails";
import {
  hdate,
  titleCase,
  datetime
} from "./common-components/include/exports";
import { ScrollTop } from "./common-components/include/appBarFunction";
import {
  getUserProfile,
  getAllUsers,
  getAllProfile,
  getUserBlogs,
  getPostComments,
  postBlog,
  removeBlog
} from "./common-components/include/requests";

const uiStyles = theme => ({
  "@global": {
    body: {
      background:
        "linear-gradient(to right top, #0d2b34, #173641, #22414f, #2e4c5d, #3a576b) fixed"
    }
  },
  main: {
    padding: 0,
    display: "flex",
    overflowX: "hidden",
    overflowY: "hidden"
  },
  blogsMain: {
    paddingTop: "5%",
    paddingBottom: "3%",
    "@media screen and (max-width: 480px)": {
      marginTop: "20%"
    }
  },
  users: {
    backgroundColor: "#ebf1f5",
    width: "100%",
    "@media screen and (max-width: 480px)": {
      width: "88%",
      margin: "20% 6% 5% 6%",
      padding: theme.spacing(2)
    }
  },
  ownPostPaper: {
    width: "50%",
    margin: `${theme.spacing(4)}px auto`,
    padding: theme.spacing(2),
    "@media screen and (max-width: 480px)": {
      width: "88%",
      margin: "10% 6%"
    }
  },
  postPaper: {
    width: "50%",
    overflowX: "auto",
    margin: `${theme.spacing(4)}px auto`,
    padding: theme.spacing(2),
    "@media screen and (max-width: 480px)": {
      width: "88%",
      margin: "10% 6%"
    }
  },
  postAppBar: {
    borderCollapse: "collapse",
    display: "flex",
    backgroundColor: "#50738c	"
  },
  contentTextArea: {
    width: "100%"
  },
  postTextArea: {
    width: "100%",
    borderStyle: "none",
    margin: "5% 2%",
    "& label.Mui-focused": {
      borderColor: "grey !important"
    }
  },
  titleArea: {
    width: "100%",
    borderStyle: "none",
    margin: "0 2%",
    borderColor: "green !important"
  },
  postButtons: {
    justifyContent: "space-between"
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  btn: {
    color: "#1a6eb9",
    marginLeft: "-7px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#ecf6ff"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.info.light, 0.12),
    "&:hover": {
      backgroundColor: fade(theme.palette.action.hover, 0.07)
    },
    marginRight: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 6),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  draftsIcon: {
    left: 50,
    bottom: 10,
    position: "fixed",
    "@media screen and (max-width: 320px)": {
      left: -13,
      bottom: 730
    }
  }
});

var decoded_id = "";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      own_profile: {},
      own_data: {},
      basic_profile: [],
      profile_pic: [],
      blogs: [],
      comments: [],
      formData: {},
      blogId: "",
      blogTitle: "",
      blogContent: "",
      blogDate: "",
      blogPhoto: "",
      titleEntered: "",
      contentEntered: "",
      photo: null,
      datetime: datetime,
      openCreate: false,
      anchorEl: null,
      openEdit: false,
      openDelete: false,
      openPortfolio: false,
      user: "",
      tabValue: 0,
      openContent: false,
      openDrafts: false,
      openAlert: false,
      // for drafts
      drafts: [],
      items: 0
      // loading: false
    };
  }

  componentDidMount() {
    decoded_id = jwt.decode(localStorage.getItem("token"));

    if (localStorage.getItem("token")) {
      this.fetchData();
      this.fetchBlogs();
      this.fetchUserDrafts();
    } else {
      window.location.replace("/#/");
    }
  }

  fetchData = () => {
    getUserProfile(decoded_id.user_id).then(profile => {
      this.setState({
        own_profile: profile[0],
        own_data: profile[0]["user"]
      });
    });
  };

  fetchBlogs = () => {
    getPostComments("").then(res => {
      this.setState(
        {
          blogs: res
        },
        () => {
          getAllUsers().then(res => {
            this.setState({
              basic_profile: res
            });
          });
        },
        getAllProfile().then(res => {
          this.setState({
            profile_pic: res
          });
        })
      );
    });
  };

  fetchUserDrafts = () => {
    getUserBlogs(decoded_id.user_id, true).then(res => {
      this.setState({
        drafts: res,
        items: res.length
      });
    });
  };

  getBlogDetails = data => {
    this.setState({
      blogId: data.id,
      blogTitle: data.title,
      blogContent: data.content,
      blogDate: data.date_posted,
      blogPhoto: data.blog_photo
    });
  };

  handleReadMore = blogDetails => {
    this.setState({
      openContent: true
    });
    this.getBlogDetails(blogDetails);
  };

  closeReadMore = () => {
    this.setState({
      openContent: false
    });
    this.fetchData();
    this.fetchBlogs();
  };

  changeTab = (e, val) => {
    this.setState({
      tabValue: val
    });
  };

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  changePhoto = e => {
    this.setState({
      photo: e.target.files[0]
    });
  };

  submitPost = value => {
    if (
      this.state.contentEntered !== ""
    ) {
      var formData = new FormData();
      var severity = "";
      var message = "";
      formData.append("user", decoded_id.user_id);
      formData.append("title", this.state.titleEntered);
      formData.append("content", this.state.contentEntered);
      if (this.state.photo !== null) {
        formData.append("blog_photo", this.state.photo);
      }
      if (value) {
        formData.append("is_draft", value);
        severity = "info";
        message = "Blog saved to drafts!";
      } else {
        formData.append("is_draft", value);
        severity = "success";
        message = "Posted successfully!";
      }

      postBlog(formData)
        .then(res => {
          if (res !== {}) {
            this.setState({
              titleEntered: "",
              contentEntered: "",
              photo: "",
              openAlert: true,
              alertSeverity: severity,
              alertMessage: message
            });
            this.fetchData();
            this.fetchBlogs();
            this.fetchUserDrafts();
          } else {
            window.location.reload();
          }
        })
        .catch(res => {
          console.log(res);
          window.location.reload();
        });
    } else {
      this.setState({
        openAlert: true,
        alertSeverity: "error",
        alertMessage: "Please enter content first!"
      });
    }
  };

  // menu for edit post
  openMenu = (e, blogDetails) => {
    this.setState({
      anchorEl: e
    });
    this.getBlogDetails(blogDetails);
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
    removeBlog(this.state.blogId)
      .then(() => {
        this.setState({
          openDelete: false
        });
        setTimeout(() => {
          this.fetchData();
          this.fetchBlogs();
        }, 1000);
      })
      .catch(error => {
        console.log(error);
        window.location.reload(true);
      });
  };

  handlePortfolio = id => {
    this.setState({
      openPortfolio: true,
      user: id
    });
    localStorage.setItem("portfolio_id", id);
  };

  openDraftsDialog = () => {
    this.setState({
      openDrafts: true
    });
  };

  closeDraftsDialog = () => {
    this.setState({
      openDrafts: false
    });
  };

  closeAlert = () => {
    this.setState(prevState => ({
      openAlert: !prevState.openAlert
    }));
  };

  render() {
    const { classes, props } = this.props;
    const open = Boolean(this.state.anchorEl);

    return (
      <div className={classes.main} id="back-to-top-anchor">
        <React.Fragment>
          {this.state.openPortfolio ? (
            <Redirect to={"/user/" + this.state.user + "/portfolio"} />
          ) : null}
          <TopNav logout={() => this.logout()} />
          <Grid container spacing={1} className={classes.grid}>
            <Grid item xs={11} sm={12}>
              <Container className={classes.blogsMain}>
                {/* composing a post ui */}
                <Paper elevation={6} className={classes.users}>
                  <Tabs
                    value={this.state.tabValue}
                    onChange={this.changeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                  >
                    {this.state.basic_profile.map((data, idx) =>
                      this.state.profile_pic.map((profile, idx) =>
                        data.is_superuser === false &&
                        profile.user === data.id ? (
                          <Tooltip arrow title="View portfolio" placement="top">
                            <Tab
                              onClick={() => this.handlePortfolio(data.id)}
                              style={{ textTransform: "lowercase" }}
                              label={data.first_name + " " + data.last_name}
                              icon={
                                <Avatar
                                  alt={data.first_name + "" + data.last_name}
                                  src={profile.user_photo}
                                />
                              }
                            />
                          </Tooltip>
                        ) : null
                      )
                    )}
                  </Tabs>
                </Paper>
                <Tooltip arrow title="Drafts">
                  <IconButton
                    onClick={this.openDraftsDialog}
                    className={classes.draftsIcon}
                  >
                    <DraftsIcon
                      color="inherit"
                      style={{ color: "#FFFFFF" }}
                      fontSize="large"
                    />
                  </IconButton>
                </Tooltip>
                <Card className={classes.ownPostPaper}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="profile"
                        src={this.state.own_profile["user_photo"]}
                      />
                    }
                    title={titleCase(
                      this.state.own_data["first_name"] +
                        " " +
                        this.state.own_data["last_name"]
                    )}
                  />
                  <CardContent>
                    <Container className={classes.contentTextArea}>
                      <Snackbar
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center"
                        }}
                        open={this.state.openAlert}
                        autoHideDuration={2500}
                        onClose={this.closeAlert}
                      >
                        <Alert
                          elevation={6}
                          variant="filled"
                          severity={this.state.alertSeverity}
                        >
                          {this.state.alertMessage}
                        </Alert>
                      </Snackbar>
                      <InputBase
                        className={classes.titleArea}
                        placeholder="Title"
                        name="title"
                        inputProps={{ "aria-label": "write a comment" }}
                        value={this.state.titleEntered}
                        onChange={e =>
                          this.handleChange("titleEntered", e.target.value)
                        }
                      />
                      <TextField
                        className={classes.postTextArea}
                        multiline
                        rowsMax={25}
                        variant="outlined"
                        name="content"
                        placeholder="Enter text here"
                        value={this.state.contentEntered}
                        onChange={e =>
                          this.handleChange("contentEntered", e.target.value)
                        }
                        required
                      />
                    </Container>
                  </CardContent>
                  <CardActions disableSpacing className={classes.postButtons}>
                    <Grid container justify="space-between">
                      <Grid item xs={12} sm={12}>
                        <input
                          type="file"
                          accept="image/*"
                          name="blog_photo"
                          onChange={this.changePhoto}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} style={{ marginTop: "1em" }}>
                        <Button
                          style={{ float: "right" }}
                          variant="contained"
                          color="primary"
                          onClick={() => this.submitPost(false)}
                          // disabled={!this.state.contentEntered}
                        >
                          <b>Post</b>
                        </Button>
                        <Button
                          style={{ float: "right", margin: "0 5px" }}
                          variant="contained"
                          onClick={() => this.submitPost(true)}
                        >
                          <b>Cancel</b>
                        </Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
                {/* end of composing a post ui */}

                {/* display all blogs*/}
                {this.state.blogs.map((row, idx) =>
                  row.is_draft === false ? (
                    <React.Fragment key={idx}>
                      <Card className={classes.postPaper}>
                        <CardHeader
                          avatar={
                            // this.state.loading ? (
                            //   <Skeleton
                            //     animation="wave"
                            //     variant="circle"
                            //     width={40}
                            //     height={40}
                            //   />
                            // ) : (
                            this.state.profile_pic.map((res, key) =>
                              row.user["id"] === res.user ? (
                                <Avatar
                                  key={key}
                                  aria-label="profile-pic"
                                  src={res.user_photo}
                                />
                              ) : null
                            )
                            // )
                          }
                          action={
                            row.user["id"] === decoded_id.user_id ? (
                              <IconButton
                                onClick={e => this.openMenu(e.target, row)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            ) : null
                          }
                          title={
                            <Tooltip
                              title="View portfolio"
                              arrow
                              placement="right"
                            >
                              <Button
                                onClick={() =>
                                  this.handlePortfolio(row.user.id)
                                }
                                className={classes.btn}
                              >
                                {titleCase(
                                  row.user["first_name"] +
                                    " " +
                                    row.user["last_name"]
                                )}
                              </Button>
                            </Tooltip>
                          }
                          subheader={hdate.relativeTime(row.date_posted)}
                        />
                        {row.blog_photo !== null ? (
                          <CardMedia
                            className={classes.media}
                            component="img"
                            alt="photo"
                            image={row.blog_photo}
                          />
                        ) : null}
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {row.title}
                          </Typography>
                          {row.content.length > 700 ? (
                            <React.Fragment>
                              {row.content
                                .slice(0, 699)
                                .split("\n")
                                .map((text, idx) => (
                                  <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    key={idx}
                                  >
                                    {text}
                                    <br />
                                  </Typography>
                                ))}
                              <Tooltip
                                arrow
                                title="View comments"
                                placement="top"
                              >
                                <IconButton
                                  style={{
                                    margin: "8px 0 0 -8px",
                                    color: "grey",
                                    float: "right"
                                  }}
                                  color="inherit"
                                  onClick={() => this.handleReadMore(row)}
                                >
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {row.comments.length}
                                  </Typography>
                                  <CommentIcon />
                                </IconButton>
                              </Tooltip>
                              ...
                              <br />
                              <Button
                                color="primary"
                                style={{ margin: "8px 0 0 -8px" }}
                                onClick={() => this.handleReadMore(row)}
                              >
                                Read more
                              </Button>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              {row.content.split("\n").map((text, idx) => (
                                <Typography
                                  variant="body1"
                                  color="textPrimary"
                                  key={idx}
                                >
                                  {text}
                                  <br />
                                </Typography>
                              ))}
                              <Tooltip
                                arrow
                                title="View comments"
                                placement="top"
                              >
                                <IconButton
                                  style={{
                                    margin: "8px 0 0 -8px",
                                    color: "grey",
                                    float: "right"
                                  }}
                                  color="inherit"
                                  onClick={() => this.handleReadMore(row)}
                                >
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {row.comments.length}
                                  </Typography>
                                  <CommentIcon />
                                </IconButton>
                              </Tooltip>
                            </React.Fragment>
                          )}
                        </CardContent>
                      </Card>
                    </React.Fragment>
                  ) : null
                )}
              </Container>
            </Grid>
          </Grid>
          <ScrollTop {...props}>
            <Fab color="inherit" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
          <Menu
            anchorEl={this.state.anchorEl}
            open={open}
            onClose={this.closeMenu}
          >
            <MenuItem onClick={this.handleEditDialog}>Edit</MenuItem>
            <MenuItem onClick={this.handleDeleteDialog}>Delete</MenuItem>
          </Menu>
          <Drafts
            drafts={this.state.drafts}
            items={this.state.items}
            fetchUserDrafts={this.fetchUserDrafts}
            open={this.state.openDrafts}
            onClose={this.closeDraftsDialog}
          />
          <BlogDetails
            open={this.state.openContent}
            onClose={this.closeReadMore}
            blog_id={this.state.blogId}
            title={this.state.blogTitle}
            content={this.state.blogContent}
            date_posted={this.state.blogDate}
            blog_photo={this.state.blogPhoto}
          />
          <EditPost
            open={this.state.openEdit}
            onClose={this.closeEdit}
            blog_id={this.state.blogId}
          />
          <DeleteDialog
            confirmDelete={this.state.openDelete}
            closeDialog={this.closeDelete}
            title={this.state.blogTitle}
            handleDelete={this.handleDelete}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(uiStyles)(Home);
