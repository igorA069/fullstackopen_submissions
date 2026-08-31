export const requestAllUsers = async () => {
  const response = await fetch("api/users");
  if (!response.ok) {
    throw new Error("Unable to fetch the registered users");
  }
  return await response.json();
};
