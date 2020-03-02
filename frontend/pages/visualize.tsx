import React, { useState, useEffect } from "react";
import { NextPage } from "next";

import dynamic from "next/dynamic";
import WordListForm from "../components/WordListForm";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { AnalysisState } from "../reducers/analysis";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const DynamicComponentWithCustomLoading = dynamic(
  () => import("react-plotlyjs-ts"),
  { loading: () => <p>loading....</p>, ssr: false }
);

interface ChartData {
  x?: number[];
  y?: number[];
  mode?: string;
  type?: string;
  name?: string;
  text?: string[];
  marker?: {
    color?: string;
    size?: number;
  };
}

interface Props {}

const Dev: NextPage<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ChartData[]>([]);
  const handleClick = (evt: any) => alert("click");
  const handleHover = (evt: any) => alert("hover");

  const {
    wordRelationAnalysing,
    wordRelationAnalysed,
    relationResult
  } = useSelector<RootState, AnalysisState>(state => state.analysis);

  const UpdateData = [
    {
      ...relationResult,
      mode: "markers",
      type: "scatter",
      marker: {
        size: 12
      }
    }
  ];

  useEffect(() => {
    return () => {};
  }, []);

  const layout = {
    title: "Word Data Visualize"
  };

  console.log(UpdateData);

  return (
    <div>
      <Backdrop
        open={wordRelationAnalysing}
        style={{
          zIndex: 2
          // color: "red"
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {wordRelationAnalysed ? (
        <DynamicComponentWithCustomLoading
          data={UpdateData}
          layout={layout}
          onClick={handleClick}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Word Data Visualize Menual</h2>
          <span>1. input word</span>
          <span>2. click analysis button</span>
        </div>
      )}
      <WordListForm />
    </div>
  );
};

export default Dev;
