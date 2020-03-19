import React from 'react';
import './Playlist.scss';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.trackCount = this.trackCount.bind(this);
    }

    trackCount() {
        if(this.props.playlistTracks.length === 1) {
            return <span className="track-count">{this.props.playlistTracks.length} Track</span>;
        } else {
            return <span className="track-count">{this.props.playlistTracks.length} Tracks</span>
        }
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input placeholder="New Playlist..." value={this.props.playlistName}
                    onChange={this.handleNameChange} />
                {this.trackCount()}

                <TrackList tracks={this.props.playlistTracks}
                    isRemoval={true}
                    onRemove={this.props.onRemove} />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlist;