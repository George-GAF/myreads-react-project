import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books: [], showSearchPage: false };
  }

  shelfs = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Read" },
    { key: "allBooks", name: "All Books" },
  ];

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }

  searchBooks = async (e) => {
    let bookName = e.target.value.toLowerCase();
    if (bookName.length > 0) {
      const result = await BooksAPI.search(bookName);
      if (result.error) {
        this.setState({ books: [] });
      } else {
        result.forEach((b) => {
          this.oldList.forEach((ob) => {
            if (b.id === ob.id) {
              b.shelf = ob.shelf;
            }
          });
        });
        this.setState({ books: result });
      }
    } else {
      this.setState({ books: [] });
    }
  };

  handleClick = (book) => (e) => {
    let newShelf = e.target.value;
    if (newShelf !== "none") {
      const books = this.state.books;
      books.forEach((bo) => {
        if (bo.id === book.id) {
          bo.shelf = newShelf;
        }
      });
      this.setState({ books });
      BooksAPI.update(book, newShelf);
    }
  };

  backButton = async () => {
    this.setState({ showSearchPage: false });

    await this.componentDidMount();
  };
  oldList = [];
  addBook = () => {
    this.setState({ showSearchPage: true });
    this.oldList = this.state.books;
    console.log(this.oldList);
  };

  render() {
    const books = this.state.books;
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
                <button className="close-search" onClick={this.backButton}>
                  Close
                </button>
              </Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={this.searchBooks}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {books.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    shelfs={this.shelfs}
                    click={this.handleClick(book)}
                  />
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.shelfs.map((shelf) => (
                  <div key={shelf.name} className="bookshelf">
                    <h2 className="bookshelf-title">{shelf.name}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {books
                          .filter(
                            (book) =>
                              book.shelf === shelf.key ||
                              shelf.key ===
                                this.shelfs[this.shelfs.length - 1].key
                          )
                          .map((book) => (
                            <Book
                              key={book.title}
                              book={book}
                              shelfs={this.shelfs}
                              click={this.handleClick(book)}
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
                <button onClick={this.addBook}>Add a book</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
