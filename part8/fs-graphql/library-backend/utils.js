const isExistingAuthor = (authorName, existingAuthors) => {
  const existingAuthorNames = existingAuthors.map((author) => author.name);
  return existingAuthorNames.some(
    (existingAuthorName) =>
      existingAuthorName.toLowerCase() === authorName.toLowerCase(),
  );
};

module.exports = { isExistingAuthor };
