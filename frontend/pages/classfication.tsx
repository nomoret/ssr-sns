import React, { useState, useCallback } from "react";
import { NextPage } from "next";

interface Result {
  word: string;
  per: number;
}
type ResultType = Result | null;

interface Props {}

const Classfication: NextPage<Props> = () => {
  const [value, setValue] = useState("");
  const [resultList, setResultList] = useState<Result[]>([]);

  const handleOnSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setResultList([{ word: value, per: 80 }]);
      setValue("");
    },
    [value]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [value]
  );

  return (
    <div>
      <h1>Classfication</h1>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="please input message"
            onChange={handleOnChange}
            value={value}
            required
          />
          <input type="submit" />
        </form>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <h3>Result</h3>
          <select>
            <option>10</option>
          </select>
        </div>
        {resultList &&
          resultList.map(({ word, per }, i) => (
            <div key={i}>{`${word} - ${per} %`}</div>
          ))}
      </div>
    </div>
  );
};

export default Classfication;
