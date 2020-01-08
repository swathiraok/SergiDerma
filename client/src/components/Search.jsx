import React, { Component } from "react";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      results: []
    };
  }
  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        }
      }
    );
  };
  render() {
    return (
        <div className="topspacing container">
        <form>
          <input
            className="form-control searchInput"
            placeholder="Search"
            ref={input => (this.search = input)}
            onChange={this.handleInputChange}
          />
        </form>
      </div>
    );
  }
}

export default Search;
