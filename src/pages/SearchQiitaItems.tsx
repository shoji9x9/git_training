import { Box, Grid, Link } from "@mui/material";
import { TextField } from "../components/01_atoms/TextField";
import { useState } from "react";
import { getArticles } from "../services/callQiitaAPI";
import { ContainedButton } from "../components/01_atoms/ContainedButton";
import { NumberField } from "../components/01_atoms/NumberField";
import { DateField } from "../components/01_atoms/DateField";
import { OutlinedButton } from "../components/01_atoms/OutlinedButton";
import { Column, Table } from "../components/02_molecules/Table";
import { ValueType } from "../utils/sortUtils";
import { formatDateTime } from "../utils/formatUtils";
import { Tag } from "../components/01_atoms/Tag";

type SearchResult = {
  uid: string;
  title: React.ReactNode;
  tags?: React.ReactNode[];
  user: React.ReactNode;
  likesCount: number;
  stocksCount: number;
  commentsCount: number;
  createdAt: string;
};

export function SearchQiitaItems(): JSX.Element {
  // 検索条件
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userName, setUserName] = useState("");
  const [tagNames, setTagNames] = useState("");
  const [minStocksCount, setMinStocksCount] = useState(0);
  const [minCreatedAt, setMinCreatedAt] = useState("");

  // 検索結果
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState<Set<ValueType>>(new Set());

  // 一定の横幅以上の場合に...省略表示するスタイルを定義
  const ellipsisStyle = {
    maxWidth: 300,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const columns: Column[] = [
    { id: "uid", hidden: true },
    { id: "title", label: "タイトル", sx: ellipsisStyle },
    { id: "tags", label: "タグ", padding: "none" },
    { id: "user", label: "ユーザー" },
    { id: "likesCount", label: "いいね数", align: "right" },
    { id: "stocksCount", label: "ストック数", align: "right" },
    { id: "commentsCount", label: "コメント数", align: "right" },
    { id: "createdAt", label: "投稿日時", align: "right" },
  ];

  // 検索処理
  const refreshResults = async () => {
    const articles = await getArticles({
      title,
      body,
      userName,
      tagNames,
      minStocksCount,
      minCreatedAt,
    });
    const _results = articles.map((article) => ({
      uid: article.uid,
      title: <Link href={article.titleUrl}>{article.title}</Link>,
      tags: article.tags.map((tag) => (
        <Tag key={`${article.uid}-${tag}`}>{tag}</Tag>
      )),
      user: (
        <Link href={article.userUrl}>{`${article.userId} ${
          article.userName && "(" + article.userName + ")"
        }`}</Link>
      ),
      likesCount: article.likesCount,
      stocksCount: article.stocksCount,
      commentsCount: article.commentsCount,
      createdAt: formatDateTime(new Date(article.createdAt)),
    }));
    setResults(_results);
  };

  // リセット処理
  const resetSearchConditions = () => {
    setTitle("");
    setBody("");
    setUserName("");
    setTagNames("");
    setMinStocksCount(0);
    setMinCreatedAt("");
    refreshResults();
  };

  return (
    <>
      {/* 検索条件 */}
      <Grid container margin={2} spacing={2} sx={{ width: "auto" }}>
        {/* テキストフィールド群 */}
        <Grid container spacing={2} item xs={10}>
          <Grid item xs={4}>
            <TextField
              label="タイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="本文"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="ユーザー"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="タグ"
              value={tagNames}
              onChange={(e) => setTagNames(e.target.value)}
              placeholder="タグ1, タグ2, タグ3"
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <NumberField
              label="最低ストック数"
              value={minStocksCount}
              onChange={(e) => setMinStocksCount(Number(e.target.value))}
            ></NumberField>
          </Grid>
          <Grid item xs={4}>
            <DateField
              label="投稿日"
              value={minCreatedAt}
              onChange={(e) => setMinCreatedAt(e.target.value)}
              helperText="この日付よりも新しい投稿を検索します"
            ></DateField>
          </Grid>
        </Grid>
        {/* ボタン群 */}
        <Grid
          container
          spacing={2}
          item
          xs={2}
          sx={{
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          <Grid item>
            <ContainedButton onClick={() => refreshResults()}>
              {"検索"}
            </ContainedButton>
          </Grid>
          <Grid item>
            <OutlinedButton onClick={() => resetSearchConditions()}>
              {"リセット"}
            </OutlinedButton>
          </Grid>
        </Grid>
      </Grid>
      {/* 検索結果 */}
      <Box margin={2}>
        <Table
          tableTitle="記事一覧"
          rows={results}
          columns={columns}
          selected={selected}
          setSelected={setSelected}
        />
      </Box>
    </>
  );
}
