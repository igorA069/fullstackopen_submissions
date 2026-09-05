import { useState } from "react";
import { useMutation } from "@apollo/client/react";

import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBookMutation] = useMutation(ADD_BOOK, {
    refetchQueries: [ALL_BOOKS, ALL_AUTHORS],
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBookMutation({
      variables: { title, author, published: parseInt(published), genres },
      onCompleted: () => {
        setTitle("");
        setPublished("");
        setAuthor("");
        setGenres([]);
        setGenre("");
      },
    });
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form
        id="genre-form"
        onSubmit={(e) => {
          e.preventDefault();
          addGenre();
        }}
      ></form>
      <form id="book-form" onSubmit={submit}>
        <div>
          <label>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            published
            <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </label>
        </div>
        <label>
          <div>
            <input
              form="genre-form"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <button form="genre-form" type="submit">
              add genre
            </button>
          </div>
          <div>genres: {genres.join(" ")}</div>
        </label>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
