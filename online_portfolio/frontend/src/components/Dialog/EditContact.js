import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import CodeIcon from "@material-ui/icons/Code";
import LinkIcon from "@material-ui/icons/Link";
import AppBar from "@material-ui/core/AppBar";

import SnackBar from "../common-components/SnackBar";
import DeleteDialog from "../common-components/DeleteDialog";
import {
  contact_menu,
  other_cont_menu
} from "../common-components/include/menu";
import {
  addContact,
  addOtherContact,
  updateContact,
  updateOtherContact,
  removeContact,
  removeOtherContact
} from "../common-components/include/requests";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  margin: {
    width: "100%",
    position: "relative",
    transition: theme.transitions.create(["border-color", "box-shadow"])
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactId: "",
      contactType: "",
      contactDetails: "",
      profileId: "",
      otherId: "",
      site: "",
      link: "",
      success_register: false,
      severity_type: "",
      message: "",
      nameOfTab: "",
      openEdit: false,
      openDelete: false,
      value: 0, // tabs
      inputFields: [{ type: "", details: "" }], // contact input fields,
      otherContact_inputFields: [{ site: "", link: "" }] // other_contact input fields
    };
  }

  addField = tabName => {
    var values = [];
    if (tabName === "contacts") {
      values = [...this.state.inputFields];
      values.push({ type: "", details: "" });

      this.setState({
        inputFields: values
      });
    } else {
      values = [...this.state.otherContact_inputFields];
      values.push({ site: "", link: "" });

      this.setState({
        otherContact_inputFields: values
      });
    }
  };

  removeField = (index, tabName) => {
    var values = [];
    if (tabName === "contacts") {
      values = [...this.state.inputFields];
      values.splice(index, 1);
      this.setState({
        inputFields: values
      });
    } else {
      values = [...this.state.otherContact_inputFields];
      values.splice(index, 1);
      this.setState({
        otherContact_inputFields: values
      });
    }
  };

  handleInputChange = (index, event, tabName) => {
    var values = [];
    if (tabName === "contacts") {
      values = [...this.state.inputFields];
      if (event.target.name === "type") {
        values[index].type = event.target.value;
      } else {
        values[index].details = event.target.value;
      }

      this.setState({
        inputFields: values
      });
    } else {
      values = [...this.state.otherContact_inputFields];
      if (event.target.name === "site") {
        values[index].site = event.target.value;
      } else {
        values[index].link = event.target.value;
      }

      this.setState({
        otherContact_inputFields: values
      });
    }
  };

  openUpdate = (data, tabName) => {
    if (tabName === "contacts") {
      this.setState({
        openEdit: true,
        nameOfTab: tabName
      });
      this.getData(data, tabName);
    } else {
      this.setState({
        openEdit: true,
        nameOfTab: tabName
      });
      this.getData(data, tabName);
    }
  };

  closeUpdate = () => {
    this.setState({
      openEdit: false
    });
  };

  getData = (data, tabName) => {
    if (tabName === "contacts") {
      this.setState({
        contactId: data.id,
        contactType: data.contact_type,
        contactDetails: data.contact_details
      });
    } else {
      this.setState({
        otherId: data.id,
        site: data.site,
        link: data.link
      });
    }
  };

  changeTab = (e, val) => {
    this.setState({
      value: val
    });
  };

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  handleUpdate = () => {
    this.setState(prevState => ({
      success_register: !prevState.success_register
    }));
  };

  handleAdd = tabName => {
    if (tabName === "contacts") {
      this.state.inputFields.forEach(each => {
        if ((each["type"] && each["details"]).length !== 0) {
          addContact(each["type"], each["details"], this.state.profileId) // endpoint for adding 'contact'
            .then(res => {
              if (res !== {}) {
                this.setState(
                  {
                    success_register: true,
                    severity_type: "success",
                    message: "Contact(s) added successfully!",
                    inputFields: []
                  },
                  () => {
                    setTimeout(() => {
                      window.location.reload(true);
                    }, 1500);
                  }
                );
              } else {
                this.setState({
                  success_register: true,
                  severity_type: "error",
                  message: "Error adding new contact"
                });
              }
            })
            .catch(err => {
              this.setState({
                success_register: true,
                severity_type: "error",
                message: "Error adding new contact"
              });
            });
        } else {
          this.setState({
            success_register: true,
            severity_type: "warning",
            message: "Please complete the form!"
          });
        }
      });
    } else {
      this.state.otherContact_inputFields.forEach(each => {
        if ((each["site"] && each["link"]).length !== 0) {
          addOtherContact(each["site"], each["link"], this.state.profileId) // endpoint for adding 'other_contact'
            .then(res => {
              if (res !== {}) {
                this.setState(
                  {
                    success_register: true,
                    severity_type: "success",
                    message: "Contact(s) added successfully!",
                    otherContact_inputFields: []
                  },
                  () => {
                    setTimeout(() => {
                      window.location.reload(true);
                    }, 1500);
                  }
                );
              } else {
                this.setState({
                  success_register: true,
                  severity_type: "error",
                  message: "Error adding new contact"
                });
              }
            })
            .catch(err => {
              this.setState({
                success_register: true,
                severity_type: "error",
                message: "Error adding new contact"
              });
            });
        } else {
          this.setState({
            success_register: true,
            severity_type: "warning",
            message: "Please complete the form!"
          });
        }
      });
    }
  };

  updateData = (id, model) => {
    if (model === "contacts") {
      if ((this.state.contactType && this.state.contactDetails).length !== 0) {
        updateContact(
          id,
          this.state.contactType,
          this.state.contactDetails,
          this.state.profileId
        )
          .then(res => {
            if (res !== {}) {
              setTimeout(() => {
                window.location.reload(true);
              }, 1500);
              this.setState({
                success_register: true,
                severity_type: "success",
                message: "Contact updated successfully!",
                contactType: "",
                contactDetails: ""
              });
            } else {
              this.setState({
                success_register: true,
                severity_type: "error",
                message: "Error updating contact"
              });
            }
          })
          .catch(err => {
            this.setState({
              success_register: true,
              severity_type: "error",
              message: "Error updating contact"
            });
          });
      } else {
        this.setState({
          success_register: true,
          severity_type: "warning",
          message: "Please complete the form!"
        });
      }
    } else {
      if ((this.state.site && this.state.link).length !== 0) {
        updateOtherContact(
          id,
          this.state.site,
          this.state.link,
          this.state.profileId
        )
          .then(res => {
            if (res !== {}) {
              setTimeout(() => {
                window.location.reload(true);
              }, 1500);
              this.setState({
                success_register: true,
                severity_type: "success",
                message: "Contact updated successfully!",
                contactType: "",
                contactDetails: ""
              });
            } else {
              this.setState({
                success_register: true,
                severity_type: "error",
                message: "Error updating contact"
              });
            }
          })
          .catch(err => {
            this.setState({
              success_register: true,
              severity_type: "error",
              message: "Error updating contact"
            });
          });
      } else {
        this.setState({
          success_register: true,
          severity_type: "warning",
          message: "Please complete the form!"
        });
      }
    }
  };

  openDeleteDialog = (data, model) => {
    this.setState({
      openDelete: true
    });
    this.getData(data, model);
  };

  closeDelete = () => {
    this.setState({
      openDelete: false
    });
  };

  handleDelete = () => {
    if (this.state.contactId.length !== 0) {
      removeContact(this.state.contactId)
        .then(window.location.reload(true))
        .catch(error => console.log(error));
    } else {
      removeOtherContact(this.state.otherId)
        .then(window.location.reload(true))
        .catch(error => console.log(error));
    }
  };

  render() {
    const {
      classes,
      open,
      handleClose,
      update,
      contacts,
      other_contacts,
      profile
    } = this.props;
    this.state.profileId = profile;

    return (
      <>
        <Dialog
          fullWidth={true}
          fullScreen={window.innerWidth < 790 ? true : false}
          maxWidth="md"
          open={open}
        >
          <React.Fragment>
            <DialogTitle className={classes.dialogTitle}>
              {update ? "Edit Contact(s)" : "Add New Contact(s)"}
              <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <AppBar position="sticky" color="inherit">
                <Tabs
                  centered
                  value={this.state.value}
                  onChange={this.changeTab}
                >
                  <Tab label={<b>Contact Info</b>} />
                  <Tab label={<b>Social Media</b>} />
                </Tabs>
              </AppBar>
              <TabPanel index={0} value={this.state.value}>
                {/* ----- Contacts Info Tab ----- */}
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justify="center"
                >
                  {this.state.openEdit &&
                  this.state.nameOfTab === "contacts" ? (
                    //  edit contact info
                    <React.Fragment>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          select
                          variant="filled"
                          fullWidth
                          label="Contacts"
                          value={this.state.contactType}
                          onChange={e =>
                            this.handleChange("contactType", e.target.value)
                          }
                        >
                          <MenuItem value="">
                            <em>----</em>
                          </MenuItem>
                          {contact_menu.map((data, idx) => (
                            <MenuItem key={idx} value={data.type}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          label="Information"
                          value={this.state.contactDetails}
                          onChange={e =>
                            this.handleChange("contactDetails", e.target.value)
                          }
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={3}
                        style={{
                          justifyContent: "space-around"
                        }}
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={this.closeUpdate}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() =>
                            this.updateData(this.state.contactId, "contacts")
                          }
                        >
                          Save
                        </Button>
                      </Grid>
                    </React.Fragment>
                  ) : (
                    // view contact info
                    <React.Fragment>
                      {contacts.map((data, idx) => (
                        <React.Fragment key={idx}>
                          <Grid item xs={12} sm={2}>
                            <Typography>{data.contact_type}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={7}>
                            <Typography>{data.contact_details}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <IconButton
                              color="primary"
                              onClick={() => this.openUpdate(data, "contacts")}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() =>
                                this.openDeleteDialog(data, "contacts")
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  )}
                  {/* adding/removing input fields */}
                  {this.state.inputFields.map((inputField, index) => (
                    <React.Fragment key={`${inputField}~${index}`}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          select
                          variant="outlined"
                          fullWidth
                          label="Select Contact Menu"
                          id="type"
                          name="type"
                          value={inputField.type}
                          onChange={event =>
                            this.handleInputChange(index, event, "contacts")
                          }
                          required
                        >
                          <MenuItem value="">
                            <em>----</em>
                          </MenuItem>
                          {contact_menu.map((data, idx) => (
                            <MenuItem key={idx} value={data.type}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          label="Details"
                          id="details"
                          name="details"
                          value={inputField.details}
                          onChange={event =>
                            this.handleInputChange(index, event, "contacts")
                          }
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => this.removeField(index, "contacts")}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </React.Fragment>
                  ))}
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() => this.addField("contacts")}
                    >
                      Add
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() => this.handleAdd("contacts")}
                      disabled={this.state.inputFields === [] ? true : false}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>
              {/* ----- Social Media / Other Contacts Tab ----- */}
              <TabPanel index={1} value={this.state.value}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justify="center"
                >
                  {this.state.openEdit &&
                  this.state.nameOfTab === "other_contacts" ? (
                    // edit other contact's info
                    <React.Fragment>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          select
                          variant="filled"
                          fullWidth
                          label="Select Social Media"
                          value={this.state.site}
                          onChange={e =>
                            this.handleChange("site", e.target.value)
                          }
                        >
                          <MenuItem value="">
                            <em>----</em>
                          </MenuItem>
                          {other_cont_menu.map((data, idx) => (
                            <MenuItem key={idx} value={data.type}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          label="Link"
                          value={this.state.link}
                          onChange={e =>
                            this.handleChange("link", e.target.value)
                          }
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={this.closeUpdate}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() =>
                            this.updateData(
                              this.state.otherId,
                              "other_contacts"
                            )
                          }
                        >
                          Save
                        </Button>
                      </Grid>
                    </React.Fragment>
                  ) : (
                    // view other contact's info
                    <React.Fragment>
                      {other_contacts.map((data, idx) => (
                        <React.Fragment key={idx}>
                          <Grid item xs={12} sm={2}>
                            {data.site === "fb" ? (
                              <FacebookIcon fontSize="large" />
                            ) : data.site === "ig" ? (
                              <InstagramIcon fontSize="large" />
                            ) : data.site === "git" ? (
                              <GitHubIcon fontSize="large" />
                            ) : data.site === "yt" ? (
                              <YouTubeIcon fontSize="large" />
                            ) : data.site === "tw" ? (
                              <TwitterIcon fontSize="large" />
                            ) : data.site === "bit" ? (
                              <CodeIcon fontSize="large" />
                            ) : data.site === "li" ? (
                              <LinkedInIcon fontSize="large" />
                            ) : (
                              <LinkIcon fontSize="large" />
                            )}
                          </Grid>
                          <Grid key={idx} item xs={12} sm={7}>
                            <Typography color="primary">{data.link}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <IconButton
                              color="primary"
                              onClick={() =>
                                this.openUpdate(data, "other_contacts")
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() =>
                                this.openDeleteDialog(data, "other_contacts")
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  )}
                  {/* adding/removing input fields */}
                  {this.state.otherContact_inputFields.map(
                    (inputField, index) => (
                      <React.Fragment key={`${inputField}~${index}`}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            select
                            variant="outlined"
                            fullWidth
                            label="Select Contact Menu"
                            id="site"
                            name="site"
                            value={inputField.site}
                            onChange={event =>
                              this.handleInputChange(
                                index,
                                event,
                                "other_contacts"
                              )
                            }
                            required
                          >
                            <MenuItem value="">
                              <em>----</em>
                            </MenuItem>
                            {other_cont_menu.map((data, idx) => (
                              <MenuItem key={idx} value={data.type}>
                                {data.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            label="Details"
                            id="link"
                            name="link"
                            value={inputField.link}
                            onChange={event =>
                              this.handleInputChange(
                                index,
                                event,
                                "other_contacts"
                              )
                            }
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                              this.removeField(index, "other_contacts")
                            }
                          >
                            Remove
                          </Button>
                        </Grid>
                      </React.Fragment>
                    )
                  )}
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() => this.addField("other_contacts")}
                    >
                      Add
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() => this.handleAdd("other_contacts")}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>
            </DialogContent>
            <DialogActions></DialogActions>
          </React.Fragment>
        </Dialog>
        <SnackBar
          open={this.state.success_register}
          handleClose={this.handleUpdate}
          severity_type={this.state.severity_type}
          message={this.state.message}
        />
        <DeleteDialog
          confirmDelete={this.state.openDelete}
          closeDialog={this.closeDelete}
          title={
            this.state.contactDetails.length !== ""
              ? this.state.contactDetails
              : this.state.link
          }
          handleDelete={this.handleDelete}
        />
      </>
    );
  }
}

export default withStyles(uiStyles)(EditContact);
