const moduleExports = {}

moduleExports.PORT = 3003
const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'test') {
  moduleExports.MONGODB_CONNECT_STRING = process.env.MONGODB_TEST_CONNECT_STRING
} else if (NODE_ENV === 'prod') {
  moduleExports.MONGODB_CONNECT_STRING = process.env.MONGODB_PROD_CONNECT_STRING
} else {
  moduleExports.MONGODB_CONNECT_STRING = process.env.MONGODB_DEV_CONNECT_STRING
}
moduleExports.MIN_RAW_PASSWORD_LENGTH = 3
moduleExports.MIN_USERNAME_LENGTH = 3
moduleExports.AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET

module.exports = moduleExports