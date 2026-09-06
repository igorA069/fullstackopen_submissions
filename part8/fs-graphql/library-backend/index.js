const dotenv = require("dotenv");

const startServer = require("./server");

dotenv.config();

const PORT = process.env.PORT || 4000;

startServer(PORT);
