import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

import clsx from "clsx";
import nodata from "../../assets/no_data.png";
import DeleteDialog from "./DeleteDialog";
import { titleCase, displayImage } from "./include/exports";
import { removeSkill, updateSkill } from "./include/requests";
import { wordBreak, img } from "./include/css";

const uiStyles = theme => ({
  body: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  wordBreak,
  img
});

class SkillDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      openAdd: false,
      openEdit: false,
      openDelete: false,
      skillId: "",
      skill: "",
      detail: "",
      photo: "",
      expanded: false
    };
  }

  updateSkills = data => {
    this.setState({
      openEdit: true
    });
    this.getData(data);
  };

  closeUpdate = () => {
    this.setState({
      openEdit: false
    });
  };

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  changePhoto = e => {
    const preview = document.getElementById("imageOutput");
    const file = document.querySelector("input[type=file]").files[0];
    displayImage(preview, file); // function to display image selected

    this.setState({
      photo: e.target.files[0]
    });
  };

  getData = data => {
    this.setState({
      skillId: data.id,
      skill: data.skill,
      detail: data.skill_details,
      photo: data.skill_photo
    });
  };

  openDeleteDialog = () => {
    this.setState({
      openDelete: true
    });
  };

  closeDelete = () => {
    this.setState({
      openDelete: false
    });
  };

  handleDelete = () => {
    removeSkill(this.state.skillId)
      .then(window.location.reload(true))
      .catch(error => console.log(error));
  };

  submitData = () => {
    var formData = new FormData();
    formData.append("skill", this.state.skill);
    formData.append("skill_details", this.state.detail);
    if (this.state.photo !== {}) {
      formData.append("skill_photo", this.state.photo);
    }
    formData.append("skill_photo", "");

    updateSkill(this.state.skillId, formData)
      .then(window.location.reload(true))
      .catch(err => console.log(err));
  };

  render() {
    const { classes, portfolio, data } = this.props;

    return (
      <React.Fragment>
        <ExpansionPanel
          className={classes.body}
          // expanded={this.state.expanded === "panel1"}
          onChange={
            // (this.handleExpansion("panel1"),
            () => this.getData(data)
          }
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={clsx(classes.heading, classes.wordBreak)}>
              {titleCase(data.skill)}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ alignItems: "center" }}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
            >
              {this.state.openEdit ? (
                <React.Fragment>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      fullWidth
                      label="Skill "
                      value={this.state.skill}
                      variant="outlined"
                      onChange={e => this.handleChange("skill", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <center>
                      <img
                        alt="skill photo"
                        className={classes.img}
                        id="imageOutput"
                        src={this.state.photo}
                      />
                    </center>
                    <input
                      type="file"
                      accept="image/*"
                      name="blog_photo"
                      // multiple
                      onChange={e => this.changePhoto(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      label="Details "
                      value={this.state.detail}
                      multiline
                      rowsMax={20}
                      onChange={e =>
                        this.handleChange("detail", e.target.value)
                      }
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {data.skill_details.length !== 0 &&
                  data.skill_photo !== null ? (
                    <React.Fragment>
                      <Grid item xs={12} sm={6}>
                        <center>
                          <img className={classes.img} src={data.skill_photo} />
                        </center>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption">
                          {data.skill_details}
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  ) : data.skill_details.length === 0 &&
                    data.skill_photo === null ? (
                    <Grid item xs={12} sm={12}>
                      <img className={classes.img} src={nodata} />
                    </Grid>
                  ) : data.skill_details.length === 0 ? (
                    <React.Fragment>
                      <Grid item xs={12} sm={12}>
                        <center>
                          <img className={classes.img} src={data.skill_photo} />
                        </center>
                      </Grid>
                    </React.Fragment>
                  ) : data.skill_photo === null ? (
                    <React.Fragment>
                      <Grid item xs={12} sm={12}>
                        <Typography variant="caption">
                          {data.skill_details}
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  ) : null}
                </React.Fragment>
              )}
            </Grid>
          </ExpansionPanelDetails>
          <Divider />
          {portfolio ? null : (
            <ExpansionPanelActions>
              {this.state.openEdit ? (
                <React.Fragment>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={this.closeUpdate}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={this.submitData}
                    disabled={!this.state.skill}
                  >
                    Save
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <IconButton
                    size="small"
                    color="secondary"
                    onClick={this.openDeleteDialog}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => this.updateSkills(data)}
                  >
                    <EditIcon />
                  </IconButton>
                </React.Fragment>
              )}
            </ExpansionPanelActions>
          )}
        </ExpansionPanel>
        <DeleteDialog
          confirmDelete={this.state.openDelete}
          closeDialog={this.closeDelete}
          title={this.state.skill}
          handleDelete={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(uiStyles)(SkillDetails);
