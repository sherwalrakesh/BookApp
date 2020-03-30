const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

const Book = mongoose.model('Book', bookSchema);
console.log('rakesh', Book);

module.exports = Book;
