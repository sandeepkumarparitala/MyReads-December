import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import BookCover from '../Bookshelf/BookWrapper';

class Search extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      shelfvalue: 'none',
      queryResult: false
    };
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

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
    const { booksOnShelfs, statusChange } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              ref={this.inputRef}
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.searchQuery(e)}
            />
            {result && (
              <div className="search-books-results">
                <ol className="books-grid">
                  {result.map(Book => (
                    <BookCover
                      key={`Book-${Book.id}`}
                      Book={Book}
                      statusChange={(Book, shelf) => {
                        statusChange(Book, shelf);
                      }}
                      booksOnShelfs={booksOnShelfs}
                    />
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
