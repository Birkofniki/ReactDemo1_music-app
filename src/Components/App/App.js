import React from 'react';
import './App.css';
import Playlist from "../Playlist/Playlist";
import searchBar from ".//searchBar/searchBar";
import searchResults from ".//searchResults/searchResults";
import Spotify from "../util/Spotify";

//End of all our components, each component works on a specific task as named

//Below, I create a class App that extends the React.Component

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [],
      playlistName: "New playlist",
      playlistTracks: []
    };
    //Below, we do the binding of all variables. These are variables related to our music app
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylistName = this.savePlaylistName.bind(this);
    this.doThese = this.doThese.bind(this);

  }
  //Below, i'm creating definations for all the methods we've added above in the binding stage

  search(term) {
    Sportify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    })

  }
  //end of defining the 1st variable/function on the list; the "search function"

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });

  }
  //end of defining the 2nd function on the list; the "addTrack function"

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let trackSearch = this.state.searchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    trackSearch.unshift(track);
    this.setState({ playlistTracks: tracks });

  }
  //end of defining the 3rd function on the list; the "removeTrack function"
  removeTrackSearch(track) {
    let tracks = this.state.searchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ searchResults: tracks });
  }
  //end of defining the 4th function on the list; the "removeTrackSearch function"

  doThese() {
    this.addTrack(track);
    this.removeTrackSearch(track); // This can add and also remove tracks    

  }
  //end of defining the 7th function on the list; the "doThese function", started with it coz it uses the (track) parameter.

  updatePlaylistName(name) {
    this.setState({ updatePlaylistName: name });
  }
  //end of defining the 6th function on the list; the "updatePlaylistName function",it uses the (name) parameter.

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        updatePlaylistName: "New Playlist",
        playlisttracks: []
      });
    });

  }

}

//End of 'class App extends React.Component'



function App() {
  return (
    <div>
      <h1> <a href='http://localhost: 3000'> Musicophile</a> </h1>

      <div className='App'>
        <searchBar onSearch={this.search} />
        <div className='App-playlist'>
          <searchResults searchResults={this.state.searchResults} onAdd={this.doThese} />
          <Playlist playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist}/>

        </div>

      </div> {/*end of the App component*/}
    </div>
    
  );
}


export default App;
