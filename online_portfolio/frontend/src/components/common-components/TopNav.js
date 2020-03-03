import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import AccountIcon from "@material-ui/icons/AccountCircle";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { ElevationScroll } from "./include/appBarFunction";
import { menu } from "./include/menu";

const topNavStyles = theme => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "#354652"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: "",
      mobileMoreAnchorEl: null
    };
  }

  handleProfileMenuOpen = () => {
    this.setState({
      anchorEl: true
    });
  };

  handleProfileMenuClose = () => {
    this.setState({
      anchorEl: false
    });
  };

  handleMobileMenuOpen = e => {
    this.setState({
      mobileMoreAnchorEl: e.target
    });
  };

  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null
    });
  };

  logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  openProfile = () => {
    window.location.replace("/#/account");
  };

  render() {
    const { classes, props } = this.props;
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

    return (
      <React.Fragment>
        <div className={classes.grow}>
          <ElevationScroll {...props}>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar variant={window.innerWidth < 880 ? "dense" : "regular"}>
                <FolderSharedIcon
                  className={classes.menuButton}
                  color="inherit"
                />
                <Typography className={classes.title} variant="h6">
                  Online Portfolio
                </Typography>
                <div className={classes.grow} />
                <IconButton
                  className={classes.menuButton}
                  href="/#/home"
                  color="inherit"
                >
                  <HomeIcon />
                </IconButton>
                <div className={classes.sectionDesktop}>
                  {menu.map((data, idx) => (
                    <Button key={idx} color="inherit" href={data.path}>
                      {data.name}
                    </Button>
                  ))}
                  <IconButton
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="inherit"
                    onClick={this.handleProfileMenuOpen}
                  >
                    <AccountIcon className={classes.icon} />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-haspopup="true"
                    onClick={this.handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <Menu
                  elevation={0}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleProfileMenuClose}
                >
                  <MenuItem>
                    <ListItemIcon color="inherit" onClick={this.logout}>
                      <AccountIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Profile"
                      onClick={this.openProfile}
                    />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" onClick={this.logout} />
                  </MenuItem>
                </Menu>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
          {/* menu for mobile */}
          <Menu
            anchorEl={this.state.mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={this.handleMobileMenuClose}
          >
            {menu.map((data, idx) => (
              <MenuItem key={idx}>
                <Button color="inherit" href={data.path}>
                  {data.name}
                </Button>
              </MenuItem>
            ))}
            <MenuItem onClick={this.handleProfileMenuOpen}>
              <ListItemIcon color="inherit">
                <AccountIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" onClick={this.openProfile} />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" onClick={this.logout} />
            </MenuItem>
          </Menu>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(topNavStyles)(TopNav);
