import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import clsx from "clsx";
import BlogDetails from "./BlogDetails";
import { hdate, goBack } from "./include/exports";
import { ellipseWord } from "./include/css";
import NoDataFound from "./NoDataFound";

const uiStyles = {
  main: {
    backgroundSize: "100% 100%",
    display: "flex",
    flexWrap: "wrap"
  },
  cont: {
    width: "80%",
    margin: "6% 10% 10.35% 10%",
    "@media screen and (max-width: 320px)": {
      width: "84%",
      margin: "40% 8%"
    }
  },
  card: {
    maxWidth: "100%",
    height: 480,
    maxHeight: 580,
    margin: "2em 5%",
    padding: "1em 5%",
    "&:hover": {
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
  fabButton: {
    left: 45,
    top: 100,
    position: "fixed",
    "@media screen and (max-width: 320px)": {
      left: 5,
      top: 80
    }
  },
  ellipseWord
};

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_id: "",
      title: "",
      content: "",
      date_posted: "",
      blog_photo: "",
      openViewDetails: false
    };
  }

  viewDetails = (id, title, content, date_posted, photo) => {
    this.setState({
      openViewDetails: true,
      blog_id: id,
      title: title,
      content: content,
      date_posted: date_posted,
      blog_photo: photo
    });
  };

  closeDetails = () => {
    this.setState({
      openViewDetails: false
    });
  };

  render() {
    const { classes, blogs } = this.props;

    return (
      <div className={classes.main}>
        <React.Fragment>
          <Fab
            color="inherit"
            aria-label="add"
            className={classes.fabButton}
            onClick={goBack}
          >
            <ArrowBackIcon />
          </Fab>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.cont}
          >
            {blogs.length === 0 ? (
              <Grid item xs={12} sm={12}>
                <NoDataFound />
              </Grid>
            ) : (
              blogs.map((data, id) => (
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
              ))
            )}
          </Grid>
          <BlogDetails
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
