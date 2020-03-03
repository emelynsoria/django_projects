import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import EditPost from "./EditPost";
import DeleteDialog from "../common-components/DeleteDialog";
import { hdate } from "../common-components/include/exports";
import { removeBlog } from "../common-components/include/requests";

const uiStyles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  list: {
    "@media screen and (max-width: 320px)": {
      marginRight: "30px"
    }
  }
});

class Drafts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_id: "",
      title: "",
      content: "",
      date_posted: "",
      blog_photo: "",
      openEdit: false,
      openDelete: false
    };
  }

  viewDetails = data => {
    this.setState({
      blog_id: data.id,
      title: data.title,
      content: data.content,
      date_posted: hdate.relativeTime(data.date_posted),
      blog_photo: data.blog_photo
    });
  };

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  openEditDialog = data => {
    this.setState({
      openEdit: true
    });
    this.props.onClose();
    this.viewDetails(data);
  };

  closeEdit = () => {
    this.setState({
      openEdit: false
    });
  };

  openDeleteDialog = data => {
    this.setState(
      {
        openDelete: true
      },
      () => {
        this.viewDetails(data);
      }
    );
  };

  closeDelete = () => {
    this.setState({
      openDelete: false
    });
  };

  handleDelete = () => {
    removeBlog(this.state.blog_id)
      .then(() => {
        this.setState({
          openDelete: false
        });
        setTimeout(() => {
          this.props.fetchUserDrafts();
        }, 1000);
      })
      .catch(error => {
        console.log(error);
        window.location.reload(true);
      });
  };

  render() {
    const { classes, open, onClose, drafts, items } = this.props;

    return (
      <React.Fragment>
        <Dialog
          fullWidth
          maxWidth="md"
          fullScreen={window.innerWidth < 760 ? true : false}
          open={open}
          onClose={onClose}
        >
          <React.Fragment>
            {console.log("drafttttttt", drafts)}
            {console.log(items)}
            <DialogTitle className={classes.dialogTitle}>
              Drafts ({items})
              <IconButton className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                spacing={2}
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12} sm={12}>
                  <List dense className={classes.root}>
                    {drafts.map((value, idx) => (
                      <React.Fragment key={idx}>
                        <ListItem button style={{ backgroundColor: "#ebeff0" }}>
                          <ListItemText
                            className={classes.list}
                            primary={
                              <b>
                                {value.title.length !== 0
                                  ? value.title
                                  : "(No Title)"}
                              </b>
                            }
                            secondary={
                              <React.Fragment>
                                {hdate.relativeTime(value.date_posted)}&emsp;
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  {value.content.slice(0, 50)}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={() => this.openEditDialog(value)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              onClick={() => this.openDeleteDialog(value)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                    <center>
                      <Typography
                        variant="subtitle2"
                        style={{ marginTop: "8px" }}
                      >
                        End of results
                      </Typography>
                    </center>
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions></DialogActions>
          </React.Fragment>
        </Dialog>
        <EditPost
          is_draft={true}
          open={this.state.openEdit}
          onClose={this.closeEdit}
          blog_id={this.state.blog_id}
        />
        <DeleteDialog
          confirmDelete={this.state.openDelete}
          closeDialog={this.closeDelete}
          title={this.state.title}
          handleDelete={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(uiStyles)(Drafts);
