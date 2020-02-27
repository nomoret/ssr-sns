import React, { useState, useCallback, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import { SIMILIAR_WORDS_REQUEST } from "../reducers/analysis";
import { RootState } from "../reducers";
import { AnalysisState } from "../reducers/analysis";
import useBlockIfNotLoginClient from "../lib/useBlockIfNotLoginClient";
import useBlockIfNotLogin from "../lib/useBlockIfNotLogin";

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

interface Rank {
  text: string;
  score: number;
}

const optionList = Array(10)
  .fill(0, 0, 10)
  .map((v, i) => i + 1);

interface Props {}

const Word2Vec: NextPage<Props> = () => {
  const router = useBlockIfNotLoginClient();

  const [value, setValue] = useState("");
  const [rankCount, setRankCount] = useState(10);
  // const [queries, setQueries] = useState<Query[]>([]);
  // const [result, setResult] = useState<Rank[]>([]);

  const {
    similarResult,
    isSimilarWordFinding,
    isSimilarWordFinded
  } = useSelector<RootState, AnalysisState>(state => state.analysis);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("final input : ", value);

      dispatch({
        type: SIMILIAR_WORDS_REQUEST,
        data: {
          query: value,
          k: rankCount
        }
      });

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

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) => {
      setRankCount(e.target.value as number);
    },
    [rankCount]
  );

  return (
    <Container maxWidth="md">
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
          <InputLabel>rank count</InputLabel>
          <Select value={rankCount} onChange={handleSelectChange}>
            {optionList &&
              optionList.map(v => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
          </Select>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSimilarWordFinding}
            >
              Predict
            </Button>
            {isSimilarWordFinding && (
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  marginTop: -24
                }}
              >
                <CircularProgress size={48} />
              </div>
            )}
          </div>
        </form>
      </div>
      <Paper variant="outlined">
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Query
          </Typography>
          <div>
            {/* {queries.map(({ text, pos, positive }, index) => {
              return (
                <span key={index}>{`${
                  positive ? "+" : "-"
                }${text}/${pos}`}</span>
              );
            })} */}

            {isSimilarWordFinded &&
              similarResult &&
              similarResult.query?.map((v, i) => (
                <div key={i}>{`${v[0]}/${v[1]}`}</div>
              ))}
          </div>
        </div>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Result
          </Typography>
          {isSimilarWordFinded &&
            similarResult &&
            similarResult.result?.map((v, i) => (
              <div key={i}>{`${v[1]} - ${v[0]} %`}</div>
            ))}
        </div>
      </Paper>
    </Container>
  );
};

// Word2Vec.getInitialProps = (ctx: NextPageContext) => {
//   useBlockIfNotLogin(ctx);
// };

export default Word2Vec;
