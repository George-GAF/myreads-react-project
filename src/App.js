import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SearchPage from "./SearchPage";
import "./App.css";
import BookList from "./BookList";
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

  handleClick = (book) => async (e) => {
    let newShelf = e.target.value;
    const books = this.state.books;
    books.forEach((bo) => {
      if (bo.id === book.id) {
        bo.shelf = newShelf;
      }
    });
    this.setState({ books });
    await BooksAPI.update(book, newShelf);
  };

  backButton = async () => {
    this.setState({ showSearchPage: false });

    await this.componentDidMount();
  };
  oldList = [];
  addBook = () => {
    this.setState({ showSearchPage: true });
    this.oldList = this.state.books;
    //console.log(this.oldList);
  };

  render() {
    const books = this.state.books;
    return (
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route
              path="/search"
              element={
                <SearchPage
                  backButton={this.backButton}
                  searchBooks={this.searchBooks}
                  books={books}
                  shelfs={this.shelfs}
                  handleClick={this.handleClick}
                />
              }
            />

            <Route
              exact
              path="/"
              element={
                <BookList
                  shelfs={this.shelfs}
                  books={books}
                  handleClick={this.handleClick}
                  addBook={this.addBook}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
