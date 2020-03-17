import React from 'react';
import './App.scss';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {trackExists} from '../../utils/JamUtils';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { name: 'Remember The Urge', artist: 'the GazettE', album: 'TOXIC', id: 1 },
        { name: 'Haunt', artist: 'BANKS', album: 'The Altar', id: 2 },
        { name: 'Lloraras', artist: 'Oscar D\'Leon', album: 'Traicionera (Baile Total)', id: 3 }
      ],
      playlistName: 'Worldly Sounds',
      playlistTracks: [
        { name: 'The Pledge', artist: 'Dir En Grey', album: 'MARROW OF A BONE', id: 4 },
        { name: 'Chapter Four', artist: 'Avenged Sevenfold', album: 'Waking The Fallen', id: 5 },
        { name: 'Biru', artist: 'Knuckle Bones', album: 'C\'est La Vie', id: 6 }
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    if (!(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))) {
      let updatedTracks = this.state.playlistTracks;
      updatedTracks.push(track);
      this.setState({
        playlistTracks : updatedTracks
      });
    } 
  }

  removeTrack(track) {
    let index = this.state.playlistTracks.findIndex(savedTrack => savedTrack.id === track.id);
    if (index != -1) {
      let updatedTracks = this.state.playlistTracks;
      updatedTracks.splice(index, 1);
      this.setState({
        playlistTracks : updatedTracks
      });
    } 
  }

  updatePlaylistName(name) {
    this.setState( {
      playlistName: name
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <div className="overlay">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults}
                onAdd={this.addTrack}
                />
              <Playlist playlistName={this.state.playlistName} 
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}  />
            </div>
          </div>
        </div>

      </div>
    );
  }


}

export default App;
