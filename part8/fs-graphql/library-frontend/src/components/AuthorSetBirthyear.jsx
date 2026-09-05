import { useState } from "react";

import { useMutation } from "@apollo/client/react";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

export const AuthorSetBirthyear = ({ authors }) => {
  const [authorName, setAuthorName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [editAuthorMutation] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ALL_AUTHORS],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    editAuthorMutation({
      variables: { name: authorName, setBornTo: parseInt(birthYear) },
    });
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            name
            <select
              value={authorName}
              onChange={(e) => {
                setAuthorName(e.target.value);
                const defaultBirthYear = authors.find(
                  (author) => author.name === e.target.value,
                )?.born;
                if (defaultBirthYear) {
                  setBirthYear(defaultBirthYear);
                } else {
                  setBirthYear("");
                }
              }}
              required
            >
              <option value="" key="default">
                please select
              </option>
              {authors.map((author) => (
                <option value={author.name} key={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              required
            ></input>
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};
