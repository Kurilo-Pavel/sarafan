import Category from "@/src/app/[locale]/categories/[category]/Category";
import {useTranslations} from "next-intl";

const CategoryPage = ({params}: { params: { category: string } }) => {
  const id = decodeURI(params.category);
  const data = useTranslations("Category");
  const global = useTranslations("Global");
  console.log(params)
  const dataCategory = {
    sort: data("sort"),
    filter: data("filter"),
    button: global("button")
  }
  return <Category id={id} dataCategory={dataCategory}/>
};
export default CategoryPage;