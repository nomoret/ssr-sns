import React, { useState, useCallback } from "react";
import { NextPage } from "next";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

interface Result {
  word: string;
  per: number;
}

interface Props {}

const Classfication: NextPage<Props> = () => {
  const [value, setValue] = useState("");
  const [rankCount, setRankCount] = useState(10);
  const [resultList, setResultList] = useState<Result[]>([]);

  const optionList = Array(10)
    .fill(0, 0, 10)
    .map((v, i) => i + 1);

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

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) => {
      setRankCount(e.target.value as number);
    },
    [rankCount]
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
        </form>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <h3>Result</h3>
        </div>
        {resultList &&
          resultList.map(({ word, per }, i) => (
            <div key={i}>{`${word} - ${per} %`}</div>
          ))}
      </div>
    </Container>
  );
};

export default Classfication;
