// コンポーネントの話
type GeneralData = Record<string | number, string | number>;
type DataInComponent = GeneralData & { id: number };
function setDataInComponent(data: DataInComponent) {
  console.log(data);
}

// ページの話
type DataInPage = DataInComponent & {
  name: string;
};
const dataInPage: DataInPage = {
  id: 1,
  name: "name",
};
setDataInComponent(dataInPage);
