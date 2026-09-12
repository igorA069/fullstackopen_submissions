const { v1: uuid } = require("uuid");

const { GraphQLError } = require("graphql/error");

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
        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }
        newBook.author = newAuthor;
      } else {
        existingAuthor.bookCount += 1;
        try {
          await existingAuthor.save();
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }
        newBook.author = existingAuthor;
      }
      try {
        await newBook.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      return newBook;
    },

    editAuthor: async (root, args) => {
      const authorToUpdate = await Author.findOne({ name: args.name });
      if (!authorToUpdate) {
        return null;
      }
      authorToUpdate.born = args.setBornTo;
      try {
        await authorToUpdate.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      return authorToUpdate;
    },
  },
};

module.exports = resolvers;
