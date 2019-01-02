import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
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
    const booksOnShelfs = await BooksAPI.getAll();
    const currentlyReading = [];
    const Read = [];
    const wantToRead = [];
    booksOnShelfs.forEach(book => {
      if (book.shelf === 'currentlyReading') {
        currentlyReading.push(book);
      } else if (book.shelf === 'wantToRead') {
        wantToRead.push(book);
      } else if (book.shelf === 'read') {
        Read.push(book);
      }
    });
    this.setState({ currentlyReading, Read, wantToRead, booksOnShelfs });
  };
  render() {
    const { currentlyReading, wantToRead, Read, booksOnShelfs } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={({ history }) => (
              <Search
                statusChange={(book, shelf) => {
                  this.statusChange(book, shelf);
                  history.push('/');
                }}
                booksOnShelfs={booksOnShelfs}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
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
      </div>
    );
  }
}

export default BooksApp;
