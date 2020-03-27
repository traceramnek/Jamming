import React from 'react';
import './SearchResults.scss';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.showSearchTerm = this.showSearchTerm.bind(this);
    }

    showSearchTerm() {
        if(this.props.searchTerm === '' ) {
            return this.props.searchTerm;
        } else {
            return ` for ${this.props.searchTerm}`;
        }
    }

    render() {
        return (
            <div className="SearchResults">
                <h2 className="results">Results</h2>
                <TrackList  tracks={this.props.searchResults} 
                isRemoval={false} 
                onAdd={this.props.onAdd} />
            </div>
        )
    }
}

export default SearchResults;