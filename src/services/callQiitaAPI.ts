const baseURL = "https://qiita.com/";
const baseApiUrl = "https://qiita.com/api/";

export type Article = {
  uid: string;
  title: string;
  titleUrl: string;
  tags: string[];
  userId: string;
  userName: string;
  userUrl: string;
  likesCount: number;
  stocksCount: number;
  commentsCount: number;
  createdAt: string;
};

type QiitaAPIResponse = {
  id: string;
  title: string;
  url: string;
  tags: {
    id: string;
    name: string;
  }[];
  user: {
    id: string;
    name: string;
  };
  likes_count: number;
  stocks_count: number;
  comments_count: number;
  created_at: string;
};

type getArticlesProps = {
  page?: number;
  perPage?: number;
  title?: string;
  body?: string;
  userName?: string;
  tagNames?: string;
  minStocksCount?: number;
  minCreatedAt?: string;
};

export async function getArticles(props: getArticlesProps): Promise<Article[]> {
  const {
    page = 1,
    perPage = 100,
    title,
    body,
    userName,
    tagNames,
    minStocksCount,
    minCreatedAt,
  } = props;
  const tagNamesWithoutWhiteSpace = tagNames?.replace(/\s+/g, "");
  const Url = buildUrl(
    page,
    perPage,
    title,
    body,
    tagNamesWithoutWhiteSpace,
    userName,
    minStocksCount,
    minCreatedAt
  );

  try {
    const res = await fetch(Url, {
      method: "GET",
    });

    const data = await res.json();
    console.log(data);
    const articles: Article[] = data.map((item: QiitaAPIResponse) => {
      return {
        uid: item.id,
        title: item.title,
        titleUrl: item.url,
        tags: item.tags.map((tag) => {
          return tag.name;
        }),
        userId: item.user.id,
        userName: item.user.name,
        userUrl: `${baseURL}${item.user.id}`,
        likesCount: item.likes_count,
        stocksCount: item.stocks_count,
        commentsCount: item.comments_count,
        createdAt: item.created_at,
      };
    });
    return articles;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function buildUrl(
  page: number,
  perPage: number,
  title?: string,
  body?: string,
  tagNamesWithoutWhiteSpace?: string,
  userName?: string,
  minStocksCount?: number,
  minCreatedAt?: string
): string {
  let Url = `${baseApiUrl}v2/items?page=${page}&per_page=${perPage}`;
  let query = "";
  if (title) {
    query += (query && "+") + `title:${title}`;
  }
  if (body) {
    query += (query && "+") + `body:${body}`;
  }
  if (tagNamesWithoutWhiteSpace) {
    query += (query && "+") + `tag:${tagNamesWithoutWhiteSpace}`;
  }
  if (userName) {
    query += (query && "+") + `user:${userName}`;
  }
  if (minStocksCount) {
    query += (query && "+") + `stocks:>=${minStocksCount}`;
  }
  if (minCreatedAt) {
    query += (query && "+") + `created:>=${minCreatedAt}`;
  }

  Url += query && `&query=${query}`;

  return Url;
}
