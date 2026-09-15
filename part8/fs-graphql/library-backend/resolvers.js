const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

const { GraphQLError } = require("graphql/error");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const {
  isExistingAuthor,
  getAuthorBookCount,
  getAuthorByName,
} = require("./utils");

const resolvers = {
  Author: {
    bookCount: (root) => 0, // TODO: implement
  },

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

    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError(
          "authentication is required to execute this action",
          {
            extensions: { code: "UNAUTHORIZED" },
          },
        );
      }
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

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError(
          "authentication is required to execute this action",
          {
            extensions: { code: "UNAUTHORIZED" },
          },
        );
      }
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

    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      try {
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
    },

    login: async (root, args) => {
      const existingUser = await User.findOne({ username: args.username });
      if (!existingUser || args.password != "secret") {
        throw new GraphQLError("Invalid username or password", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const token = jwt.sign(
        { username: args.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h", subject: existingUser.id },
      );
      return { value: token };
    },

    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== "test") {
        throw new GraphQLError("_resetDatabase only to be used in testing");
      } else {
        await Author.deleteMany({});
        await Book.deleteMany({});
        await User.deleteMany({});
      }
    },
  },
};

module.exports = resolvers;
