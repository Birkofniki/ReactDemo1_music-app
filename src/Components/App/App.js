import React from 'react';
import './App.css';
import Playlist from "../Playlist/Playlist";
import searchBar from ".//searchBar/searchBar";
import searchResults from ".//searchResults/searchResults";
import Sportify from "../util/Sportify";

//End of all our components, each component works on a specific task as named

//Below, I create a class App that extends the React.Component

class App extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
       SearchResults:[],
       playlistName: "New playlist",
       playlistTracks: []
    };
//Below, we do the binding of all variables. These are variables related to our music app
    this.search= this.search.bind(this);
    this.addTrack= this.addTrack.bind(this);
    this.removeTrack= this.removeTrack.bind(this);
    this.updatePlaylistName= this.updatePlaylistName.bind(this);
    this.savePlaylistName= this.savePlaylistName.bind(this);
    this.removeTrackSearch= this.removeTrackSearch.bind(this);
    this.doThese= this.doThese.bind(this);

  }
//Below, i'm creating definations for all the methods we've added above in the binding stage

  search(term){
    Sportify.search(term).then(searchResults => {
      this.setState({searchResults:searchResults});
    })

  }
  //end of defining the 1st variable/function on the list; the "search function"

  addTrack(track){
    let tracks= this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});

  }
   //end of defining the 2nd function on the list; the "addTrack function"

   removeTrack(track){
    let tracks= this.state.playlistTracks;
    

   }


}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


export default App;
