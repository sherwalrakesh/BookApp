import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }
  onClickBook = id => {
    this.setState({ selected: id });
  }
  displayBooks() {
    const data = this.props.data;
    if (data.loading) {
      return (<div>Loading books...</div>);
    } else {
      return data.books.map(b => (
        <li key={b.id} onClick={e => this.onClickBook(b.id)}>{b.name}</li>
      ));
    }
  }
  render() {
    return (
      <div id="main">
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        {
          this.state.selected &&
          <BookDetails bookId={this.state.selected} />
        }
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
