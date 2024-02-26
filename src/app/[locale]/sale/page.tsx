import Sale from "@/src/app/[locale]/sale/Sale";
import {useTranslations} from "next-intl";

const SalePage = () => {
  const translate = useTranslations("Sale");
  const global = useTranslations("Global");
  const data = {
    title: translate("title"),
    button: global("button")
  }
  return <Sale data={data}/>
};
export default SalePage;