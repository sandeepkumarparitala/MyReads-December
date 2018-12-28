import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResult: null
    };
  }
  searchQuery = async e => {
    const query = e.target.value;
    const queryResult = await BooksAPI.search(query);
    this.setState({ queryResult });
    console.log(queryResult);
  };
  render() {
    const { queryResult: result } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.searchQuery(e)}
            />
            {/* {?} */}
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}

export default Search;