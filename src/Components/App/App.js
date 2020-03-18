import React from 'react';
import './App.scss';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../utils/Spotify'
import Footer from '../Footer/Footer';
import logo from '../../assets/img/KwanSH_Logo_White.png'

const portfolioLink = 'https://traceramnek.github.io/';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }

  addTrack(track) {
    if (!(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))) {
      let updatedTracks = this.state.playlistTracks;
      updatedTracks.push(track);
      this.setState({
        playlistTracks: updatedTracks
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

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });

  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchRes => {
      this.setState({
        searchResults: searchRes
      })
    });

  }

  render() {
    return (
      <div>
        <a href={portfolioLink} target="_blank" title="Kwan's Portfolio">
          <img className="nav-logo" src={logo} alt="Kwan Holloway Logo" />
        </a>

        <div className="App">
          <div className="overlay">
            <h1>Jammify!</h1>
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults}
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
