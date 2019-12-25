import React, { Component } from "react";
import { tiles } from "../data/tiles.js";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import "../index.scss";

class HomePage extends Component {
  render() {
    return (
      <div className="row topspacing container">
        <div className="col-md-12">
          {tiles.map(tile => (
            <div className="float-left tiles">{tile.tileName}</div>
          ))}
        </div>
        <div className="svgIconWrap">
          <Fab
            color="primary"
            aria-label="Add"
            href="/register"
            className="registerPatient"
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

export default HomePage;
