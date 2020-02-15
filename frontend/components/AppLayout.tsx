import React from "react";
import Link from "next/link";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px"
        }}
      >
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/classfication">
          <a>Classfication</a>
        </Link>
        <Link href="/word2vec">
          <a>Word2Vec</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default AppLayout;
