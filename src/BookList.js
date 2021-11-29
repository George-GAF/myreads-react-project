import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import "./App.css";
class BookList extends React.Component {
  render() {
    const shelfs = this.props.shelfs;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map((shelf) => (
              <div key={shelf.name} className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.props.books
                      .filter((book) => book.shelf === shelf.key)
                      .map((book) => (
                        <Book
                          key={book.title}
                          book={book}
                          shelfs={shelfs}
                          click={this.props.handleClick(book)}
                        />
                      ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button onClick={this.props.addBook}>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BookList;
