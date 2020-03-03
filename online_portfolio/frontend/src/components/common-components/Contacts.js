import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import CodeIcon from "@material-ui/icons/Code";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExtensionIcon from "@material-ui/icons/Extension";
import Tooltip from "@material-ui/core/Tooltip";

import TopNav from "./TopNav";
import NoDataFound from "./NoDataFound";
import EditContact from "../Dialog/EditContact";
import jwt from "jsonwebtoken";
import { titleCase, goBack } from "./include/exports";
import {
  getUserProfile,
  getUserContacts,
  getUserOtherContacts
} from "./include/requests";

const uiStyles = theme => ({
  "@global": {
    body: {
      background:
        "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png') no-repeat fixed",
      backgroundSize: "100% 100%",
      backgroundColor: "black"
    }
  },
  main: {
    fontFamily: "Andale Mono, monospace",
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
    overflow: "hidden"
  },
  paper: {
    margin: "12em 20% 5% 20%",
    width: "60%",
    minHeight: "37em",
    "@media screen and (max-width: 320px)": {
      margin: "12em 10% 5% 10%",
      width: "80%"
    }
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
  img: {
    position: "relative",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  imgSize: {
    maxWidth: 400,
    "@media screen and (max-width: 320px)": {
      width: "90%",
      margin: "15% 5% 9.2em 5%"
    }
  },
  linksCont: {
    textAlign: "center",
    margin: "3% 0 0 0",
    "@media screen and (max-width: 320px)": {
      width: "84%",
      margin: "5% 8% 0 8%"
    }
  },
  footerAppBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "#354652",
    margin: "2% 0 0 0",
    padding: "0"
  },
  textCont: {
    padding: theme.spacing(2),
    textAlign: "right"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basic_profile: {},
      profile: {},
      contacts: [],
      other_contacts: [],
      site_link: "",
      openEdit: false,
      contactId: ""
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const decoded_id = jwt.decode(localStorage.getItem("token"));
    var userId = "";

    if (this.props.portfolio === true) {
      userId = this.props.userId;
    } else {
      userId = decoded_id.user_id;
    }
    getUserProfile(userId).then(res => {
      this.setState(
        {
          profile: res[0],
          basic_profile: res[0]["user"]
        },
        () => {
          getUserContacts(res[0]["id"]).then(cont => {
            this.setState({
              contacts: cont
            });
          });
        },
        getUserOtherContacts(res[0]["id"]).then(cont => {
          this.setState({
            other_contacts: cont
          });
        })
      );
    });
  };

  handleUpdate = () => {
    this.setState({
      openEdit: true
    });
  };

  closeUpdate = () => {
    this.setState({
      openEdit: false
    });
  };

  render() {
    const { classes, portfolio } = this.props;

    return (
      <div className={classes.main}>
        {portfolio === true ? (
          <Fab
            color="inherit"
            aria-label="add"
            className={classes.fabButton}
            onClick={goBack}
          >
            <ArrowBackIcon />
          </Fab>
        ) : (
          <TopNav />
        )}
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Paper elevation={4} className={classes.paper}>
            {portfolio === true ? null : (
              <Grid item xs={12}>
                <IconButton
                  color="inherit"
                  style={{ float: "right" }}
                  onClick={this.handleUpdate}
                >
                  <EditIcon />
                </IconButton>
              </Grid>
            )}
            <Grid item xs={12} className={classes.linksCont}>
              <Typography variant="h3">Get In Touch</Typography>
            </Grid>
            {this.state.contacts.length === 0 &&
            this.state.other_contacts.length === 0 ? (
              <Grid item xs={12} sm={12} style={{ margin: "1% 3%" }}>
                <NoDataFound />
              </Grid>
            ) : (
              <React.Fragment>
                <div style={{ minHeight: "18em" }}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    style={{
                      margin: "4% 0 2% 0"
                    }}
                  >
                    {this.state.contacts.map((con, idx) =>
                      con.contact_type.length !== "" ? (
                        <React.Fragment key={idx}>
                          {con.contact_type === "mobile" ? (
                            <Typography>
                              <b>Mobile</b>
                              <br />
                              {con.contact_details}
                            </Typography>
                          ) : con.contact_type === "email" ? (
                            <Typography>
                              <b>Email</b>
                              <br />
                              {con.contact_details}
                            </Typography>
                          ) : con.contact_type === "website" ? (
                            <Typography>
                              <b>Website</b>
                              <br />
                              <a
                                href={"https://" + con.contact_details}
                                target="_blank"
                                style={{ color: "#000000" }}
                              >
                                {con.contact_details}
                              </a>
                            </Typography>
                          ) : con.contact_type === "address" ? (
                            <Typography>
                              <b>Address</b>
                              <br />
                              {con.contact_details}
                            </Typography>
                          ) : null}
                        </React.Fragment>
                      ) : null
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {this.state.other_contacts.map((other, idx) =>
                      other.site.length !== "" ? (
                        <IconButton
                          key={idx}
                          color="inherit"
                          href={"https://" + other.link}
                          target="_blank"
                        >
                          {[
                            other.site === "fb" ? (
                              <Tooltip title="Facebook" placement="top" arrow>
                                <FacebookIcon key={idx} fontSize="large" />
                              </Tooltip>
                            ) : other.site === "ig" ? (
                              <Tooltip title="Instagram" placement="top" arrow>
                                <InstagramIcon key={idx} fontSize="large" />
                              </Tooltip>
                            ) : other.site === "git" ? (
                              <Tooltip title="Github" placement="top" arrow>
                                <GitHubIcon key={idx} fontSize="large" />
                              </Tooltip>
                            ) : other.site === "yt" ? (
                              <Tooltip title="Youtube" placement="top" arrow>
                                <YouTubeIcon key={idx} fontSize="large" />
                              </Tooltip>
                            ) : other.site === "tw" ? (
                              <Tooltip title="Twitter" placement="top" arrow>
                                <TwitterIcon key={idx} fontSize="large" />
                              </Tooltip>
                            ) : other.site === "bit" ? (
                              <Tooltip title="Bitbucket" placement="top" arrow>
                                <CodeIcon key={idx} fontSize="large" />
                              </Tooltip>
                            ) : other.site === "li" ? (
                              <Tooltip title="Linkedin" placement="top" arrow>
                                <LinkedInIcon key={idx} fontSize="large" />
                              </Tooltip>
                            ) : (
                              <Tooltip title={other.link} placement="top" arrow>
                                <ExtensionIcon key={idx} fontSize="large" />
                              </Tooltip>
                            )
                          ]}
                        </IconButton>
                      ) : null
                    )}
                  </Grid>
                </div>
              </React.Fragment>
            )}
            <Grid
              item
              xs={12}
              className={classes.linksCont}
              style={{ marginTop: "10%" }}
            >
              <Typography>
                Copyright 2020 &copy; &nbsp;
                {titleCase(
                  this.state.basic_profile["first_name"] +
                    " " +
                    this.state.basic_profile["last_name"]
                )}
                &nbsp; All Rights Reserved
              </Typography>
            </Grid>
          </Paper>
        </Grid>

        <EditContact
          open={this.state.openEdit}
          handleClose={this.closeUpdate}
          update={this.state.contacts.length !== 0 ? true : false}
          contacts={this.state.contacts}
          profile={this.state.profile["id"]}
          other_contacts={this.state.other_contacts}
        />
      </div>
    );
  }
}

export default withStyles(uiStyles)(Home);
