import React from "react";

class Book extends React.Component {
  state = {
    value: this.props.book.shelf,
  };
  render() {
    const background =
      this.props.book.imageLinks === undefined
        ? undefined
        : this.props.book.imageLinks.smallThumbnail;

    return (
      <li key={this.props.book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${background})`,
              }}
            />
            <div className="book-shelf-changer">
              <select value={this.state.value} onChange={this.props.click}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="none">None</option>
                {this.props.shelfs
                  .filter(
                    (shelf) =>
                      shelf.key !==
                      this.props.shelfs[this.props.shelfs.length - 1].key
                  )
                  .map((shelf) => (
                    <option key={shelf.name} value={shelf.key}>
                      {shelf.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      </li>
    );
  }
}

export default Book;
