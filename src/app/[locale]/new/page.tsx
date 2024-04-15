import New from "@/src/app/[locale]/new/New";
import {useTranslations} from "next-intl";

const NewPage = () => {
  const translate = useTranslations("New");
  const global = useTranslations("Global");
  const category = useTranslations("Category");
  const data = {
    path: translate("path"),
    title: translate("title"),
    button: global("button"),
    show: category("show"),
    from: category("from")
  };
  return <New data={data}/>
};
export default NewPage;