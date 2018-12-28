import React, { Component } from 'react';
import BookCover from './BookWrapper';
import * as BooksAPI from '../BooksAPI';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyReading: undefined,
      wantToRead: undefined,
      Read: undefined
    };
  }
  updateBooks = async () => {
    const allBooks = await BooksAPI.getAll();
    console.log(allBooks);
    const currentlyReading = [];
    const Read = [];
    const wantToRead = [];
    allBooks.map(book => {
      if (book.shelf === 'currentlyReading') {
        currentlyReading.push(book);
      } else if (book.shelf === 'wantToRead') {
        wantToRead.push(book);
      } else if (book.shelf === 'read') {
        Read.push(book);
      }
    });
    this.setState({ currentlyReading, wantToRead, Read });
  };

  componentWillMount() {
    this.updateBooks();
  }

  statusChange = async (Book, Shelf) => {
    await BooksAPI.update(Book, Shelf);
    this.updateBooks();
  };

  render() {
    const { currentlyReading, wantToRead, Read } = this.state;
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
                      <BookCover Book={Book} statusChange={this.statusChange} />
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
                      <BookCover Book={Book} statusChange={this.statusChange} />
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
                      <BookCover Book={Book} statusChange={this.statusChange} />
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
