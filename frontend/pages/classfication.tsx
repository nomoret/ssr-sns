import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NextPage, NextPageContext } from "next";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import useBlockIfNotLogin from "../lib/useBlockIfNotLogin";
import useBlockIfNotLoginClient from "../lib/useBlockIfNotLoginClient";
import { RootState } from "../reducers";
import { AnalysisState, CLASSIFICATION_REQUEST } from "../reducers/analysis";
import { CircularProgress } from "@material-ui/core";

interface Props {}

const defaultOptionList = Array(10)
  .fill(0, 0, 10)
  .map((v, i) => i + 1);

const Classfication: NextPage<Props> = () => {
  useBlockIfNotLoginClient();

  const [value, setValue] = useState("");
  const [rankCount, setRankCount] = useState(10);
  const [optionList] = useState(defaultOptionList);

  const { classifyResult, isClassfying, isClassfied } = useSelector<
    RootState,
    AnalysisState
  >(state => state.analysis);

  const dispatch = useDispatch();

  const handleOnSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch({
        type: CLASSIFICATION_REQUEST,
        data: {
          sentence: value,
          k: rankCount
        }
      });

      setValue("");
    },
    [value, rankCount]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) => {
      setRankCount(e.target.value as number);
    },
    []
  );

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" gutterBottom>
        Classfication
      </Typography>
      <div>
        <form onSubmit={handleOnSubmit}>
          <TextField
            placeholder="input sentence"
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Predict
          </Button>
          {isClassfying && (
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
        </form>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <h3>Result</h3>
        </div>
        {isClassfied &&
          classifyResult &&
          classifyResult.result?.map((v, i) => (
            <div key={i}>{`${v[0]} - ${v[1]} %`}</div>
          ))}
      </div>
    </Container>
  );
};

Classfication.getInitialProps = async (ctx: NextPageContext) => {
  // useBlockIfNotLogin(ctx);
};

export default Classfication;
