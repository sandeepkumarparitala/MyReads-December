import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import BookCover from '../Bookshelf/BookWrapper';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelfvalue: 'none',
      queryResult: false
    };
  }
  statusChange = async (Book, Shelf) => {
    await BooksAPI.update(Book, Shelf);
  };

  searchQuery = async e => {
    const query = e.target.value;
    if (!query.trim()) {
      this.setState({ queryResult: false });
      return;
    }
    const queryResult = await BooksAPI.search(query);
    if (!queryResult.error) {
      this.setState({ queryResult });
      return;
    }
    this.setState({ queryResult: 0 });
  };
  render() {
    const { queryResult: result } = this.state;
    const { booksOnShelfs } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.searchQuery(e)}
            />
            {result ? (
              <div className="search-books-results">
                <ol className="books-grid">
                  {result.map(Book => (
                    <BookCover
                      key={`Book-${Book.id}`}
                      Book={Book}
                      statusChange={this.statusChange}
                      booksOnShelfs={booksOnShelfs}
                    />
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
