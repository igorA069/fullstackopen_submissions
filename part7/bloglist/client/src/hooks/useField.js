import { useState } from "react";

export const useField = (label) => {
  const [value, setValue] = useState("");

  const onChange = (event) => setValue(event.target.value);

  const reset = () => setValue("");

  return { value, label, onChange, reset };
};
