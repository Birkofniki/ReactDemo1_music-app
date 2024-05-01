import React from "react";
import "./searchResults.css";
import TrackList from "../TrackList/TrackList";

class searchResults extends React.Component {
  render() {
    return (
      <div className="searchResults">
        <h2> Results </h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd}> </TrackList>
      </div>
    );
  }
}

export default searchResults;
//searchResults Component done