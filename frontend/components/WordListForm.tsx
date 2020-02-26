import { useState, useCallback } from "react";
import useInput from "../lib/useInput";
import { RootState } from "../reducers";
import { UserState } from "../reducers/user";
import { AnalysisState, WORD_RELATION_REQUEST } from "../reducers/analysis";
import { useDispatch } from "react-redux";
import Chip from "@material-ui/core/Chip";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5)
      }
    }
  })
);

const defaultWords = [
  { id: 0, text: "사과" },
  { id: 1, text: "바나나" },
  { id: 2, text: "오렌지" },
  { id: 3, text: "키위" },
  { id: 4, text: "스파이더맨" },
  { id: 5, text: "아이언맨" },
  { id: 6, text: "헐크" },
  { id: 7, text: "타노스" },
  { id: 8, text: "캡틴아메리카" },
  { id: 9, text: "어벤져스" },
  { id: 10, text: "한글" },
  { id: 11, text: "한컴" },
  { id: 12, text: "한쇼" },
  { id: 13, text: "한셀" },
  { id: 14, text: "워드" },
  { id: 15, text: "파워포인트" },
  { id: 16, text: "엑셀" },
  { id: 17, text: "김대중" },
  { id: 18, text: "노태우" },
  { id: 19, text: "노무현" },
  { id: 20, text: "이명박" }
];

interface Word {
  id: number;
  text: string;
}

const WordListForm = () => {
  const [lastId, setLastId] = useState(21);
  const wordInput = useInput("");
  const [wordList, setWordList] = useState<Array<Word>>(defaultWords);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newItem: Word = {
        id: lastId,
        text: wordInput.value
      };
      setLastId(lastId + 1);
      setWordList([newItem, ...wordList]);
      wordInput.clear();
    },
    [wordInput]
  );

  //   const deleteItem = useCallback((id: number) => {
  //     console.log("delete", id);

  //     const updateItemList = wordList.filter((v, i) => v.id != id);
  //     setWordList(updateItemList);
  //   }, []);
  const deleteItem = useCallback(
    (id: number) => {
      console.log("delete", id);

      const updateItemList = wordList.filter((v, i) => v.id != id);
      setWordList(updateItemList);
    },
    [wordList]
  );

  const handleAnalysis = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch({
        type: WORD_RELATION_REQUEST,
        data: wordList
      });
    },
    [wordList]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" {...wordInput.bind} />
        <input type="submit" value="추가" />
      </form>
      <button type="button" onClick={handleAnalysis}>
        분석
      </button>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {wordList.map((v, i) => (
          <WordItem key={i} {...v} onRemove={deleteItem} />
        ))}
      </div>
    </div>
  );
};

interface Props {
  id: number;
  text: string;
  onRemove: (id: number) => void;
}

const WordItem: React.FC<Props> = ({ id, text, onRemove }) => {
  return (
    <Chip
      label={text}
      onDelete={e => {
        onRemove(id);
      }}
      color="default"
      variant="outlined"
      style={{ marginLeft: "5px" }}
    />
  );
};

export default WordListForm;
