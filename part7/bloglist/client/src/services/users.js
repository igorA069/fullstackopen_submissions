export const requestAllUsers = async () => {
  const response = await fetch("/api/users");
  if (!response.ok) {
    throw new Error("Unable to fetch the registered users");
  }
  return await response.json();
};

export const requestUserById = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error("Unable to fetch user by id");
  }
  return await response.json();
};
