const graphql = require('graphql');

const { GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// Dummy data
const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
  { name: 'Color Of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' }
];

const authors = [
  { name: 'Rakesh Sherwal', age: 27, id: '1' },
  { name: 'Naresh Sherwal', age: 24, id: '2' },
  { name: 'Pinki Simatwal', age: 32, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return authors.find(i => i.id === parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books.filter(i => i.authorId === parent.id);
      }
    }
  })
});

// client call this query like book(id: '12'){
// name
// genre
// }
//args means in query id is neccessary.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {

        // Code to get data from db/ other resources.
        return books.find(i => i.id === args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return authors.find(i => i.id === args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(){
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(){
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});