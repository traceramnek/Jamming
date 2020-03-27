import React from 'react';
import './App.scss';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../utils/Spotify'
import Footer from '../Footer/Footer';
import logo from '../../assets/img/KwanSH_Logo_White.png'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Slide } from '@material-ui/core';

const portfolioLink = 'https://traceramnek.github.io/';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
      userPlaylists: [],
      open: false,
      severity: 'success',
      message: '',
      autoHideDuration: 5000
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.getUserPlaylists = this.getUserPlaylists.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    // get token on load from user
    Spotify.getAccessToken();
    this.getUserPlaylists();
  }



  addTrack(track) {
    if (!(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))) {
      let updatedTracks = this.state.playlistTracks;
      updatedTracks.push(track);
      this.setState({
        playlistTracks: updatedTracks
      });
    } else {
      this.setState({
        open: true,
        message: 'Looks like that song is already in your playlist.',
        severity: 'warning',
        autoHideDuration: 5000
      });
    }
  }

  removeTrack(track) {
    let index = this.state.playlistTracks.findIndex(savedTrack => savedTrack.id === track.id);
    if (index !== -1) {
      let updatedTracks = this.state.playlistTracks;
      updatedTracks.splice(index, 1);
      this.setState({
        playlistTracks: updatedTracks
      });
    }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  getUserPlaylists() {
    Spotify.getUserPlaylists().then((response) => {
      this.setState({
        userPlaylists: response
      });
      console.log(this.state.userPlaylists);
    });
  }

  savePlaylist() {
    if (this.state.playlistName === '') { // if name is blank
      this.setState({
        open: true,
        message: 'Your playlist needs an awesome name before adding it!',
        severity: 'warning',
        autoHideDuration: 5000
      });
      return;
    } 

    let index = this.state.userPlaylists.findIndex(playlist => playlist.name === this.state.playlistName);
    if (index !== -1) { // if playlist with that name exists
      this.setState({
        open: true,
        message: 'Oops! You already have a playlist with that name.',
        severity: 'warning',
        autoHideDuration: 5000
      });
    } else { // add the playlist if it doesn't exist
      let trackURIs = this.state.playlistTracks.map(track => track.uri);
      if (trackURIs.length > 0) {
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
        this.setState({
          playlistName: '',
          playlistTracks: [],
          open: true,
          severity: 'success',
          message: 'Playlist successfully added to your Spotify! Go Jam to it!',
          autoHideDuration: 5000
        });
        this.getUserPlaylists();
      } else {
        this.setState({
          open: true,
          severity: 'warning',
          message: 'Can\'t add a playlsit with no songs!',
          autoHideDuration: 5000
        });
      }

    }
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchRes => {
      this.setState({
        searchResults: searchRes,
        searchTerm: searchTerm
      })
    });

  }

  handleSnackbarClose() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div>
        <div>
          <Slide direction="down" in={this.state.open} mountOnEnter unmountOnExit>
            <div>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.state.open}
                autoHideDuration={this.state.autoHideDuration}
                onClose={this.handleSnackbarClose}>
                <Alert onClose={this.handleSnackbarClose}
                  severity={this.state.severity}>
                  {this.state.message}
                </Alert>
              </Snackbar>
            </div>
          </Slide>
        </div>
        <a href={portfolioLink} target="_blank" title="Kwan's Portfolio"
          rel="noopener noreferrer">
          <img className="nav-logo" src={logo} alt="Kwan Holloway Logo" />
        </a>

        <div className="App">
          <div className="overlay">
            <h1 className="jammify-header">Jammify!</h1>
            <h6 className="summary">Search Songs, Create Playlists, and add them to your Spotify!</h6>
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults searchTerm={this.state.searchTerm} searchResults={this.state.searchResults}
                onAdd={this.addTrack}
              />
              <Playlist playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }


}

export default App;
