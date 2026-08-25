const moduleExports = {}

moduleExports.PORT = 3003
const NODE_ENV = process.env.NODE_ENV
moduleExports.MONGODB_CONNECT_STRING = NODE_ENV === 'test' ? process.env.MONGODB_TEST_CONNECT_STRING : process.env.MONGODB_CONNECT_STRING
moduleExports.MIN_RAW_PASSWORD_LENGTH = 3
moduleExports.MIN_USERNAME_LENGTH = 3
moduleExports.AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET

module.exports = moduleExports