import React, { Component } from "react";
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

class BookList extends Component {
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return (<div>Loading books...</div>);
    } else {
      return data.books.map(b => {
        return (<li>{b.name}</li>)
      });
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
