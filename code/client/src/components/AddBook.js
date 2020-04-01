import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }
  submitForm = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }
  onChangeName = e => {
    this.setState({ name: e.target.value })

  }
  onChangeGenre = e => {
    this.setState({ genre: e.target.value })

  }
  onSelectAuthor = e => {
    this.setState({ authorId: e.target.value })
  }
  displayAuthors() {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (<option disabled>Loading Authors...</option>)
    } else {
      return data.authors.map(a => (
        <option key={a.id} value={a.id}>{a.name}</option>
      ));
    }
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={this.onChangeName} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={this.onChangeGenre} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={this.onSelectAuthor}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);