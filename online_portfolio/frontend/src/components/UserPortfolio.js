import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import TopNav from "./common-components/TopNav";
import Experience from "./common-components/Experience";
import Education from "./common-components/Education";
import Projects from "./common-components/Projects";
import Skills from "./common-components/Skills";
import Blogs from "./common-components/Blogs";
import Footer from "./common-components/Footer";
import Contacts from "./common-components/Contacts";
import { ellipseWord } from "./common-components/include/css";
import { titleCase } from "./common-components/include/exports";
import {
  getUserProfile,
  getUserProjects,
  getUserBlogs
} from "./common-components/include/requests";

const uiStyles = theme => ({
  "@global": {
    body: {
      backgroundColor: "#f1f6f9"
    }
  },
  ellipseWord,
  main: {
    padding: 0,
    overflowX: "hidden",
    overflowY: "hidden",
    minHeight: "100vh"
  },
  profile_photo: {
    borderRadius: "50%",
    width: 180,
    height: 210,
    margin: "7% 0 .5% 0",
    border: "4px solid white"
  },
  profileAbout: {
    color: "#FFFFFF",
    opacity: 0.95,
    textAlign: "center",
    fontFamily: "Andale Mono, monospace",
    width: "70%",
    margin: "0 15%",
    padding: "14px 25px",
    "@media screen and (max-width: 480px)": {
      width: "84%",
      margin: "0 8%",
      padding: 0
    }
  },
  about: {
    width: "60%",
    margin: "0 20%",
    "@media screen and (max-width: 320px)": {
      width: "80%",
      margin: "0 10%",
      textAlign: "justify"
    }
  },
  top: {
    color: "white",
    height: "auto",
    minHeight: "57em",
    width: "100%",
    paddingBottom: "2%",
    textAlign: "center",
    background:
      "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.8)), url('https://source.unsplash.com/1600x900/?crafts') no-repeat fixed",
    backgroundSize: "100% 100%",
    backgroundColor: "black",
    "@media screen and (max-width: 320px)": {
      margin: "20% 0 0 0"
    }
  },
  cont: {
    width: "80%",
    margin: "4% 10% 5.8% 10%",
    "@media screen and (max-width: 320px)": {
      width: "84%",
      margin: "45% 8%"
    }
  },
  menuButton: {
    right: 45,
    top: 100,
    position: "fixed",
    "@media screen and (max-width: 320px)": {
      right: 7,
      top: 75
    }
  },
  cardNoImage: {
    textAlign: "center",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  card: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  btn: {
    width: "12em",
    height: "3.5em",
    color: "#FFFF",
    backgroundColor: "#354652",
    "&:hover": {
      color: "#354652",
      backgroundColor: "#ebf5fc"
    }
  }
});

class UserPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      profile: {},
      basic_data: {},
      about: "",
      experience: [],
      education: [],
      projects: [],
      blogs: [],
      menu: ""
    };
  }

  componentDidMount() {
    this.fetchProfile();
    this.fetchProjects();
    this.fetchBlogs();
  }

  fetchProfile = () => {
    getUserProfile(localStorage.getItem("portfolio_id")).then(res => {
      this.setState({
        profile: res[0],
        basic_data: res[0]["user"],
        about: res[0]["about"]
      });
    });
  };

  fetchProjects = () => {
    getUserProjects(localStorage.getItem("portfolio_id")).then(res => {
      this.setState({
        projects: res
      });
    });
  };

  fetchBlogs = () => {
    getUserBlogs(localStorage.getItem("portfolio_id"), false).then(res => {
      this.setState({
        blogs: res
      });
    });
  };

  handleOpenDrawer = () => {
    this.setState({
      openDrawer: true
    });
  };

  closeDrawer = () => {
    this.setState({
      openDrawer: false
    });
  };

  goToPage = menu => {
    this.setState({
      menu: menu
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <React.Fragment>
          <TopNav logout={() => this.logout()} />

          {this.state.menu === "About" ? (
            window.location.reload()
          ) : this.state.menu === "Experience" ? (
            <Experience />
          ) : this.state.menu === "Education" ? (
            <Education />
          ) : this.state.menu === "Skills" ? (
            <Skills />
          ) : this.state.menu === "Projects" ? (
            <Projects projects={this.state.projects} />
          ) : this.state.menu === "Blog" ? (
            <Blogs blogs={this.state.blogs} />
          ) : this.state.menu === "Contacts" ? (
            <Contacts
              userId={localStorage.getItem("portfolio_id")}
              portfolio={true}
            />
          ) : (
            <React.Fragment>
              {/* main page/profile */}
              <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.grid}
              >
                <Grid item xs={12}>
                  <Paper className={classes.top}>
                    {this.state.profile["user_photo"] !== null ? (
                      <center>
                        <img
                          className={classes.profile_photo}
                          src={this.state.profile["user_photo"]}
                          alt="Profile Photo"
                        />
                      </center>
                    ) : (
                      <img style={{ marginTop: "15%" }} />
                    )}
                    {this.state.profile["profession"] !== "" ? (
                      <Typography
                        variant="h4"
                        style={{
                          marginTop: "2%"
                        }}
                      >
                        {titleCase(
                          this.state.basic_data["first_name"] +
                            " " +
                            this.state.basic_data["last_name"]
                        )}
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          textTransform: "uppercase",
                          fontSize: "4.5em"
                        }}
                      >
                        {titleCase(
                          this.state.basic_data["first_name"] +
                            " " +
                            this.state.basic_data["last_name"]
                        )}
                      </Typography>
                    )}
                    <Divider />
                    <Typography
                      style={{
                        textTransform: "uppercase",
                        fontSize: "4em",
                        fontWeight: "bold"
                      }}
                    >
                      {this.state.profile["profession"]}
                    </Typography>
                    {this.state.about.split("\n").map((row, id) => (
                      <Typography
                        key={id}
                        variant="h6"
                        className={classes.about}
                      >
                        {row}
                        <br />
                      </Typography>
                    ))}
                    <Tooltip title="Open Menu" placement="bottom" arrow>
                      <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        style={{
                          backgroundColor: "black"
                        }}
                        onClick={this.handleOpenDrawer}
                      >
                        <MenuIcon />
                      </IconButton>
                    </Tooltip>
                    <SwipeableDrawer
                      anchor="right"
                      open={this.state.openDrawer}
                      onClose={this.closeDrawer}
                      onOpen={this.handleOpenDrawer}
                    >
                      <br />
                      <Typography
                        style={{ textAlign: "center", width: "10em" }}
                      >
                        Portfolio
                      </Typography>
                      <Divider />
                      <List>
                        {[
                          "About",
                          "Experience",
                          "Education",
                          "Skills",
                          "Projects",
                          "Blog",
                          "Contacts"
                        ].map((menu, idx) => (
                          <ListItem
                            key={idx}
                            button
                            component="button"
                            onClick={() => this.goToPage(menu)}
                          >
                            <ListItemText primary={menu} />
                          </ListItem>
                        ))}
                      </List>
                    </SwipeableDrawer>
                  </Paper>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.cont}
              >
                {/* ----------- projects ---------- */}
                {this.state.projects.length === 0 &&
                this.state.blogs.length === 0 ? (
                  <Typography variant="h4">
                    No recent projects and blogs
                  </Typography>
                ) : (
                  <React.Fragment>
                    {this.state.projects.length !== 0 ? (
                      <React.Fragment>
                        <Grid item sm={12} xs={12}>
                          <Typography
                            variant="h3"
                            style={{
                              textAlign: "center"
                            }}
                            gutterBottom
                          >
                            Recent Projects
                          </Typography>
                        </Grid>
                        {this.state.projects.slice(0, 9).map((proj, idx) => (
                          <React.Fragment key={idx}>
                            <Grid item xs={12} sm={4}>
                              <Card
                                style={{
                                  height: 380
                                }}
                                className={classes.card}
                              >
                                {proj.project_photo !== null ? (
                                  <React.Fragment>
                                    <CardMedia
                                      style={{ height: 300 }}
                                      image={proj.project_photo}
                                      title={proj.project_title}
                                    />
                                    <CardContent
                                      style={{
                                        display: "flex",
                                        flexWrap: "wrap"
                                      }}
                                    >
                                      <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                        className={classes.ellipseWord}
                                      >
                                        {proj.project_title.length > 45 ? (
                                          <small>
                                            {proj.project_title.toUpperCase()}
                                          </small>
                                        ) : (
                                          proj.project_title.toUpperCase()
                                        )}
                                      </Typography>
                                    </CardContent>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <CardContent
                                      className={classes.cardNoImage}
                                    >
                                      <Typography variant="h5" component="h2">
                                        {proj.project_title.toUpperCase()}
                                      </Typography>
                                    </CardContent>
                                  </React.Fragment>
                                )}
                              </Card>
                            </Grid>
                          </React.Fragment>
                        ))}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          style={{ textAlign: "center", margin: "0 0 10em 0" }}
                        >
                          <Button
                            variant="contained"
                            color="default"
                            className={classes.btn}
                            onClick={() => this.goToPage("Projects")}
                          >
                            <b>View all</b>
                          </Button>
                        </Grid>
                      </React.Fragment>
                    ) : null}

                    {/* ----------- blogs ----------  */}
                    {this.state.blogs.length !== 0 ? (
                      <React.Fragment>
                        <Grid item xs={12} sm={12}>
                          <Typography
                            variant="h3"
                            style={{
                              textAlign: "center"
                            }}
                            gutterBottom
                          >
                            Recent Blogs
                          </Typography>
                        </Grid>
                        {this.state.blogs.slice(0, 9).map((proj, idx) =>
                          proj.blog_photo !== null ? (
                            <Grid item xs={12} sm={4} key={idx}>
                              <Card className={classes.card}>
                                <CardMedia
                                  style={{ height: 500 }}
                                  image={proj.blog_photo}
                                  title={proj.title}
                                />
                              </Card>
                            </Grid>
                          ) : null
                        )}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          style={{ textAlign: "center" }}
                        >
                          <Button
                            variant="contained"
                            color="inherit"
                            className={classes.btn}
                            onClick={() => this.goToPage("Blog")}
                          >
                            <b>View all</b>
                          </Button>
                        </Grid>
                      </React.Fragment>
                    ) : null}
                  </React.Fragment>
                )}
              </Grid>
            </React.Fragment>
          )}
          {this.state.menu !== "Contacts" ? (
            <Footer
              userId={localStorage.getItem("portfolio_id")}
              portfolio={true}
            />
          ) : null}
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(uiStyles)(UserPortfolio);
