import Item from "@/src/app/[locale]/categories/[category]/[item]/Item";
import {useTranslations} from "next-intl";

type ItemProps = {
  params: { item: string };
};

const ItemPage = ({params}: ItemProps) => {
  const data = useTranslations("DataItemPage");
  const errors = useTranslations("Errors");
  const myCart = useTranslations("MyCart");
  const global = useTranslations("Global");
  const exchange = useTranslations("DataReturnAndExchange");

  const dataItem = {
    selectSize: data("selectSize"),
    table: data("table"),
    button: data("button"),
    description: data("description"),
    descriptionItem: data("descriptionItem"),
    care: data("care"),
    descriptionCare: data("descriptionCare"),
    errorColor: errors("color"),
    errorSize: errors("size"),
    delivery: myCart("delivery"),
    exchange: exchange("title"),
    color: global("color"),
    cash: global("cash")
  };
  return <Item params={params} dataItem={dataItem}/>
};
export default ItemPage;