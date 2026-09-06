const dotenv = require("dotenv");

const connectToDb = require("./db");
const startServer = require("./server");

dotenv.config();

const BACKEND_PORT = process.env.BACKEND_PORT || 4000;

// TODO: use different connect strings for different configurations (dev, test, prod):
const MONGODB_CONNECT_STRING = process.env.MONGODB_DEV_CONNECT_STRING;

const main = async () => {
  await connectToDb(MONGODB_CONNECT_STRING);
  startServer(BACKEND_PORT);
};

main();
