const mongoose = require("mongoose");

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const jwt = require("jsonwebtoken");

const typeDefs = require("./schema");

const User = require("./models/user");

const resolvers = require("./resolvers");

const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer")) {
        return { currentUser: null };
      }
      const accessToken = jwt.verify(
        authHeader.substring("Bearer ".length),
        process.env.JWT_SECRET,
      );
      const currentUser = await User.findById(accessToken.sub);
      return { currentUser };
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

module.exports = startServer;
