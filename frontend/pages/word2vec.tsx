import React, { useState, useCallback } from "react";
import { NextPage } from "next";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" gutterBottom>
        Word2Vec
      </Typography>
      <div>
        <form onSubmit={handleOnSubmit}>
          <TextField
            placeholder="korea-seoul+tokyo"
            onChange={handleOnChange}
            value={value}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Predict
          </Button>
        </form>
      </div>
      <Paper variant="outlined">
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Query
          </Typography>
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
          <Typography variant="h4" component="h1" gutterBottom>
            Result
          </Typography>
          <div>{result}</div>
        </div>
      </Paper>
    </Container>
  );
};

export default Word2Vec;
