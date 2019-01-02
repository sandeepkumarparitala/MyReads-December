import React, { Component } from 'react';

class BookWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelf: 'none'
    };
  }
  componentDidMount() {
    const {
      Book: { id: bookId },
      booksOnShelfs
    } = this.props;
    booksOnShelfs.forEach(bookFromShelf => {
      const shelf = bookFromShelf.shelf;
      if (bookFromShelf.id === bookId) {
        this.setState({ shelf });
      }
    });
  }
  shelfChangeHandler(e) {
    const value = e.target.value;
    this.props.statusChange(this.props.Book, value);
    this.setState({ shelf: value });
  }
  render() {
    const { imageLinks = undefined, title, authors } = this.props.Book;
    const thumbnail = imageLinks ? imageLinks.thumbnail : null;
    const { shelf } = this.state;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${thumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <select onChange={e => this.shelfChangeHandler(e)} value={shelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          {authors &&
            authors.map(author => (
              <div key={`Book-${author}`} className="book-authors">
                {author}
              </div>
            ))}
        </div>
      </li>
    );
  }
}

export default BookWrapper;
