import Category from "@/src/app/[locale]/categories/[category]/Category";
import {useTranslations} from "next-intl";

const CategoryPage = ({params}: { params: { category: string } }) => {
  const id = decodeURI(params.category);
  const data = useTranslations("Category");
  const global = useTranslations("Global");
  const dataCategory = {
    button: global("button"),
    notItems: data("notItems"),
    show: data("show"),
    from: data("from")
  }
  return <Category id={id} dataCategory={dataCategory}/>
};
export default CategoryPage;