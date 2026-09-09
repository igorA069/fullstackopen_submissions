const isExistingAuthor = (authorName, existingAuthors) => {
  const existingAuthorNames = existingAuthors.map((author) => author.name);
  return existingAuthorNames.some(
    (existingAuthorName) =>
      existingAuthorName.toLowerCase() === authorName.toLowerCase(),
  );
};

const getAuthorBookCount = (books, authorName) =>
  books.filter((b) => b.author === authorName).length;

const getAuthorByName = (authors, authorName) =>
  authors.find((a) => a.name === authorName);

module.exports = { isExistingAuthor, getAuthorBookCount, getAuthorByName };
