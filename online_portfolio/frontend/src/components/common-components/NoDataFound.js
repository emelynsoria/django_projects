import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import image from "../../assets/no-data-found2.png";
import { img, imgSize } from "./include/css";
import clsx from "clsx";

const uiStyles = theme => ({
  img,
  imgSize
});

class NoDataFound extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <center>
          <img
            src={image}
            className={clsx(classes.img, classes.imgSize)}
            alt="no data found"
          />
        </center>
      </React.Fragment>
    );
  }
}

export default withStyles(uiStyles)(NoDataFound);
