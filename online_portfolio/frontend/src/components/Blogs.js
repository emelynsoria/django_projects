import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import jwt from "jsonwebtoken";
import clsx from "clsx";
import TopNav from "./common-components/TopNav";
import Footer from "./common-components/Footer";
import NoDataFound from "./common-components/NoDataFound";
import BlogDetails from "./Dialog/BlogDetails";
import { hdate } from "./common-components/include/exports";
import { ellipseWord } from "./common-components/include/css";
import { getUserBlogs } from "./common-components/include/requests";

const uiStyles = {
  "@global": {
    body: {
      background:
        "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://cdn.hipwallpaper.com/i/50/72/SsRWfy.jpg') no-repeat fixed",
      backgroundSize: "100% 100%"
    }
  },
  main: {
    display: "flex",
    flexWrap: "wrap"
  },
  btns: {
    left: 100,
    top: 80,
    position: "fixed",
    "@media screen and (max-width: 320px)": {
      left: 100,
      top: 80
    }
  },
  cont: {
    width: "80%",
    height: "auto",
    margin: "6% 10% 6% 10%",
    "@media screen and (max-width: 320px)": {
      width: "94%",
      margin: "30% 3%"
    }
  },
  card: {
    maxWidth: "100%",
    height: 480,
    maxHeight: 580,
    margin: "2em 5%",
    padding: "1em 5%",
    "&:hover": {
      //   opacity: 0.8
      filter: "alpha((opacity = -50))"
    },
    "@media screen and (max-width: 320px)": {
      margin: "0.5em"
    }
  },
  media: {
    height: 340,
    objectFit: "contain"
  },
  imgText: {
    position: "absolute",
    backgroundColor: "#1c272b",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "5px solid white",
    padding: "10px 50px",
    color: "#FFFFFF",
    opacity: 0,
    "&:hover": {
      opacity: 200
    }
  },
  viewBtn: {
    width: "40%",
    color: "#429ca6"
  },
  ellipseWord
};

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      drafts: [],
      blog_id: "",
      title: "",
      content: "",
      date_posted: "",
      blog_photo: "",
      openViewDetails: false,
      viewAll: true
    };
  }

  componentDidMount() {
    const decoded_id = jwt.decode(localStorage.getItem("token"));

    getUserBlogs(decoded_id.user_id, false).then(res => {
      this.setState({
        blogs: res
      });
    });

    getUserBlogs(decoded_id.user_id, true).then(res => {
      this.setState({
        drafts: res
      });
    });
  }

  viewDetails = (id, title, content, date_posted, photo) => {
    this.setState({
      openViewDetails: true,
      blog_id: id,
      title: title,
      content: content,
      date_posted: hdate.relativeTime(date_posted),
      blog_photo: photo
    });
  };

  closeDetails = () => {
    this.setState({
      openViewDetails: false
    });
  };

  displayAllBlogs = () => {
    this.setState({
      viewAll: true
    });
  };

  closeViewAllBlogs = () => {
    this.setState({
      viewAll: false
    });
  };

  render() {
    const { classes } = this.props;
    var items = [];
    var is_draft = false;
    if (this.state.viewAll) {
      items = this.state.blogs;
      is_draft = false;
    } else {
      items = this.state.drafts;
      is_draft = true;
    }

    return (
      <div className={classes.main}>
        <React.Fragment>
          <TopNav logout={() => this.logout()} />
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.cont}
          >
            <Grid item xs={12} sm={12} className={classes.btns}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.displayAllBlogs}
              >
                All Blogs
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.closeViewAllBlogs}
              >
                Drafts
              </Button>
            </Grid>
            {items.length === 0 ? (
              <Grid item xs={12} sm={12} style={{ marginTop: "5em" }}>
                <NoDataFound />
              </Grid>
            ) : (
              <React.Fragment>
                {items.map((data, id) => (
                  <React.Fragment key={id}>
                    <Grid item xs={12} sm={4}>
                      <Card className={classes.card}>
                        <CardHeader
                          title={
                            data.title.length !== 0 ? (
                              <small>
                                {data.title.length > 40
                                  ? data.title.slice(0, 40) + "..."
                                  : data.title}
                              </small>
                            ) : (
                              <br />
                            )
                          }
                          subheader={
                            <small>
                              <small>
                                {hdate.relativeTime(data.date_posted)}
                              </small>
                            </small>
                          }
                        />
                        {data.blog_photo !== null ? (
                          <React.Fragment>
                            <CardMedia
                              className={classes.media}
                              image={data.blog_photo}
                              title={data.title}
                            />
                            <CardContent>
                              <center>
                                <Button
                                  className={classes.viewBtn}
                                  variant="outlined"
                                  color="inherit"
                                  onClick={() =>
                                    this.viewDetails(
                                      data.id,
                                      data.title,
                                      data.content,
                                      data.date_posted,
                                      data.blog_photo
                                    )
                                  }
                                >
                                  View
                                </Button>
                              </center>
                            </CardContent>
                          </React.Fragment>
                        ) : (
                          <CardContent>
                            <center>
                              <Typography
                                className={clsx(
                                  classes.media,
                                  classes.ellipseWord
                                )}
                              >
                                {data.content}
                              </Typography>
                              <Button
                                className={classes.viewBtn}
                                variant="outlined"
                                color="inherit"
                                onClick={() =>
                                  this.viewDetails(
                                    data.id,
                                    data.title,
                                    data.content,
                                    data.date_posted,
                                    data.blog_photo
                                  )
                                }
                              >
                                View
                              </Button>
                            </center>
                          </CardContent>
                        )}
                      </Card>
                    </Grid>
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
          </Grid>
          <Footer portfolio={false} />

          <BlogDetails
            is_draft={is_draft}
            open={this.state.openViewDetails}
            onClose={this.closeDetails}
            blog_id={this.state.blog_id}
            title={this.state.title}
            content={this.state.content}
            date_posted={this.state.date_posted}
            blog_photo={this.state.blog_photo}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(uiStyles)(Blogs);
