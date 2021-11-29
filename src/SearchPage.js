import React from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import "./App.css";
class SearchPage extends React.Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={this.props.backButton}>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.props.searchBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <Book
                key={book.id}
                book={book}
                shelfs={this.props.shelfs}
                click={this.props.handleClick(book)}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
