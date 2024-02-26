import New from "@/src/app/[locale]/new/New";
import {useTranslations} from "next-intl";

const NewPage = () => {
  const translate = useTranslations("New");
  const global = useTranslations("Global");
  const data = {
    path: translate("path"),
    title: translate("title"),
    button: global("button")
  };
  return <New data={data}/>
};
export default NewPage;