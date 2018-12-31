import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Search from './Search';
import Landing from './Bookshelf';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyReading: undefined,
      wantToRead: undefined,
      Read: undefined,
      booksOnShelfs: undefined
    };
  }
  componentDidMount() {
    this.updateBooks();
  }

  statusChange = async (Book, Shelf) => {
    await BooksAPI.update(Book, Shelf);
    this.updateBooks();
  };

  updateBooks = async () => {
    const allBooks = await BooksAPI.getAll();
    const currentlyReading = [];
    const Read = [];
    const wantToRead = [];
    const booksOnShelfs = [];
    allBooks.forEach(book => {
      const currentBookDetails = { id: book.id, shelf: book.shelf };
      booksOnShelfs.push(currentBookDetails);
      if (book.shelf === 'currentlyReading') {
        currentlyReading.push(book);
      } else if (book.shelf === 'wantToRead') {
        wantToRead.push(book);
      } else if (book.shelf === 'read') {
        Read.push(book);
      }
    });
    this.setState({ currentlyReading, wantToRead, Read, booksOnShelfs });
  };
  render() {
    const { currentlyReading, wantToRead, Read, booksOnShelfs } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            component={() => (
              <Search
                statusChange={this.statusChange}
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                Read={Read}
                booksOnShelfs={booksOnShelfs}
              />
            )}
          />
          <Route
            exact
            path="/"
            component={() => (
              <Landing
                statusChange={this.statusChange}
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                Read={Read}
                updateBooks={this.updateBooks}
                booksOnShelfs={booksOnShelfs}
              />
            )}
          />
        </Switch>
        <div>
          <Link to="/search" className="open-search SearchButton" />
        </div>
      </div>
    );
  }
}

export default BooksApp;
