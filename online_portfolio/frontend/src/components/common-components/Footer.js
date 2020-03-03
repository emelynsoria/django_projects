import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import CodeIcon from "@material-ui/icons/Code";
import ExtensionIcon from "@material-ui/icons/Extension";

import jwt from "jsonwebtoken";
import { titleCase } from "./include/exports";
import {
  getUserProfile,
  getUserContacts,
  getUserOtherContacts
} from "./include/requests";

const uiStyles = theme => ({
  linksCont: {
    opacity: 0.8,
    textAlign: "center",
    margin: "1% 0 4px 0",
    fontFamily: "Andale Mono, monospace",
    "@media screen and (max-width: 480px)": {
      width: "84%",
      margin: "2.1% 8% 0 8%"
    }
  },
  footerAppBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "#354652",
    margin: "2% 0 0 0",
    padding: "0"
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
      site_link: ""
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const decoded_id = jwt.decode(localStorage.getItem("token"));
    var profileId = "";

    if (this.props.portfolio === true) {
      profileId = this.props.userId;
    } else {
      profileId = decoded_id.user_id;
    }

    getUserProfile(profileId).then(res => {
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

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <AppBar
          position="static"
          color="primary"
          className={classes.footerAppBar}
          component="footer"
        >
          <Toolbar>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justify="space-evenly"
            >
              <Grid item xs={12} className={classes.linksCont}>
                <Typography variant="h4">Get In Touch</Typography>
              </Grid>
              <Grid item xs={12} sm={1} />
              <Grid item xs={12} sm={4}>
                {this.state.contacts.map((con, id) =>
                  con.contact_type.length !== "" ? (
                    <React.Fragment key={id}>
                      {con.contact_type === "mobile" ? (
                        <Typography>
                          <b>Mobile</b>&emsp;&emsp;{con.contact_details}
                        </Typography>
                      ) : con.contact_type === "email" ? (
                        <Typography>
                          <b>Email</b>&emsp;&emsp;
                          {con.contact_details}
                        </Typography>
                      ) : con.contact_type === "website" ? (
                        <Typography>
                          <b>Website</b>&emsp;&emsp;
                          <a
                            href={"https://" + con.contact_details}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#FFFF" }}
                          >
                            {con.contact_details}
                          </a>
                        </Typography>
                      ) : con.contact_type === "address" ? (
                        <Typography>
                          <b>Address</b>&emsp;&emsp;{con.contact_details}
                        </Typography>
                      ) : null}
                    </React.Fragment>
                  ) : null
                )}
              </Grid>
              <Grid item xs={12} sm={2} />
              <Grid item xs={12} sm={4}>
                {this.state.other_contacts.map((other, id) =>
                  other.site.length !== "" ? (
                    <IconButton
                      key={id}
                      color="inherit"
                      href={"https://" + other.link}
                      target="_blank"
                    >
                      {[
                        other.site === "fb" ? (
                          <Tooltip
                            key={id}
                            title="Facebook"
                            placement="top"
                            arrow
                          >
                            <FacebookIcon fontSize="large" />
                          </Tooltip>
                        ) : other.site === "ig" ? (
                          <Tooltip
                            key={id}
                            title="Instagram"
                            placement="top"
                            arrow
                          >
                            <InstagramIcon fontSize="large" />
                          </Tooltip>
                        ) : other.site === "git" ? (
                          <Tooltip
                            key={id}
                            title="Github"
                            placement="top"
                            arrow
                          >
                            <GitHubIcon fontSize="large" />
                          </Tooltip>
                        ) : other.site === "yt" ? (
                          <Tooltip
                            key={id}
                            title="Youtube"
                            placement="top"
                            arrow
                          >
                            <YouTubeIcon fontSize="large" />
                          </Tooltip>
                        ) : other.site === "tw" ? (
                          <Tooltip
                            key={id}
                            title="Twitter"
                            placement="top"
                            arrow
                          >
                            <TwitterIcon fontSize="large" />
                          </Tooltip>
                        ) : other.site === "bit" ? (
                          <Tooltip
                            key={id}
                            title="Bitbucket"
                            placement="top"
                            arrow
                          >
                            <CodeIcon fontSize="large" />
                          </Tooltip>
                        ) : other.site === "li" ? (
                          <Tooltip
                            key={id}
                            title="Linkedin"
                            placement="top"
                            arrow
                          >
                            <LinkedInIcon fontSize="large" />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            key={id}
                            title={other.link}
                            placement="top"
                            arrow
                          >
                            <ExtensionIcon fontSize="large" />
                          </Tooltip>
                        )
                      ]}
                    </IconButton>
                  ) : null
                )}
              </Grid>
              <Grid item xs={12} sm={1} />
              <Grid item xs={12} className={classes.linksCont}>
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
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default withStyles(uiStyles)(Home);
