import React, { Component } from 'react';
import BookCover from './BookWrapper';

class Landing extends Component {
  componentDidMount() {
    this.props.updateBooks();
  }
  render() {
    const {
      currentlyReading,
      wantToRead,
      Read,
      statusChange,
      booksOnShelfs
    } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading &&
                    currentlyReading.map(Book => (
                      <BookCover
                        key={`Book-${Book.id}`}
                        Book={Book}
                        statusChange={statusChange}
                        booksOnShelfs={booksOnShelfs}
                      />
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want To Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead &&
                    wantToRead.map(Book => (
                      <BookCover
                        key={`Book-${Book.id}`}
                        Book={Book}
                        statusChange={statusChange}
                        booksOnShelfs={booksOnShelfs}
                      />
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {Read &&
                    Read.map(Book => (
                      <BookCover
                        key={`Book-${Book.id}`}
                        Book={Book}
                        statusChange={statusChange}
                        booksOnShelfs={booksOnShelfs}
                      />
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
