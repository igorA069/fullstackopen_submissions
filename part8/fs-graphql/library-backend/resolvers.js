const { v1: uuid } = require("uuid");
const Author = require("./models/author");
const Book = require("./models/book");

const {
  isExistingAuthor,
  getAuthorBookCount,
  getAuthorByName,
} = require("./utils");

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments({}),

    authorCount: async () => await Author.countDocuments({}),

    allBooks: async (root, args) => {
      const searchCriteria = {};
      if (args.author) {
        // todo
      }
      if (args.genre) {
        searchCriteria.genres = args.genre;
      }
      const books = await Book.find(searchCriteria).populate("author");
      return books;
    },

    allAuthors: async () => await Author.find({}),
  },

  Mutation: {
    addBook: async (root, args) => {
      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
      });

      // Add author if it does not exist yet:
      const existingAuthor = await Author.findOne({ name: args.author });
      if (!existingAuthor) {
        const newAuthor = new Author({
          name: args.author,
          bookCount: 1,
        });
        await newAuthor.save();
        newBook.author = newAuthor;
      } else {
        existingAuthor.bookCount += 1;
        await existingAuthor.save();
        newBook.author = existingAuthor;
      }
      await newBook.save();
      return newBook;
    },

    editAuthor: async (root, args) => {
      const authorToUpdate = await Author.findOne({ name: args.name });
      if (!authorToUpdate) {
        return null;
      }
      authorToUpdate.born = args.setBornTo;
      await authorToUpdate.save();
      return authorToUpdate;
    },
  },
};

module.exports = resolvers;
