import React, { Component } from "react";
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends Component {
  displayBooks() {
    const data = this.props.data;
    if (data.loading) {
      return (<div>Loading books...</div>);
    } else {
      return data.books.map(b => (<li key={b.id}>{b.name}</li>));
    }
  }
  render() {
    return (
      <div id="main">
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
