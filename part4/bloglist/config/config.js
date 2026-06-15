const PORT = 3003

const NODE_ENV = process.env.NODE_ENV

const MONGODB_CONNECT_STRING = NODE_ENV === 'test' ? process.env.MONGODB_TEST_CONNECT_STRING : process.env.MONGODB_CONNECT_STRING

module.exports = { PORT, MONGODB_CONNECT_STRING }