import React, { useEffect, useState, useCallback } from "react";
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
interface InputHandler {
  value: string;
  bind: {
    value: string;
    onChange: (e: InputChangeEvent) => void;
  };
  clear: () => void;
}

const useInput = (initialValue: string, option?: {}): InputHandler => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e: InputChangeEvent) => {
    setValue(e.target.value);
  }, []);

  const clear = useCallback(() => {
    setValue("");
  }, []);

  return { value, clear, bind: { value, onChange } };
};

export default useInput;
