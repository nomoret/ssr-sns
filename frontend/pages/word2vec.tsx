import React, { useState, useCallback } from "react";
import { NextPage } from "next";

interface Query {
  text: string;
  pos: string;
  positive: boolean;
}

const dummyQuery = [
  {
    text: "korea",
    pos: "noun",
    positive: true
  },
  {
    text: "seoul",
    pos: "noun",
    positive: false
  },
  {
    text: "tokyo",
    pos: "noun",
    positive: true
  }
];

const dummyResult = "japan/noun";

interface Props {}

const Word2Vec: NextPage<Props> = () => {
  const [value, setValue] = useState("");
  const [queries, setQueries] = useState<Query[]>([]);
  const [result, setResult] = useState("");

  const handleOnSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("final input : ", value);
      setValue("");

      setQueries(dummyQuery);
      setResult(dummyResult);
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
      <h1>Word2Vec</h1>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="korea-seoul+tokyo"
            onChange={handleOnChange}
            value={value}
            required
          />
          <input type="submit" />
        </form>
      </div>
      <div>
        <div>
          <h3>Query</h3>
          <div>
            {queries.map(({ text, pos, positive }, index) => {
              return (
                <span key={index}>{`${
                  positive ? "+" : "-"
                }${text}/${pos}`}</span>
              );
            })}
          </div>
        </div>
        <div>
          <h3>Result</h3>
          <div>{result}</div>
        </div>
      </div>
    </div>
  );
};

export default Word2Vec;
