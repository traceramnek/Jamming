import React from 'react';
import './TrackList.scss';
import Track from '../Track/Track';

class TrackList extends React.Component {
  
    render() {
        return (
            <div style={{marginTop: 40}} className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track track={track} key={track.id} 
                        isRemoval={this.props.isRemoval}
                        onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove} />
                    })
                }
            </div>
        );
    }
}

export default TrackList;