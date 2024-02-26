import Shops from "@/src/app/[locale]/shops/Shops";
import {useTranslations} from "next-intl";

const ShopsPage = ()=>{
  const translate = useTranslations("Shops");
  const data = {
    path: translate("path")
  };
  return <Shops data={data}/>
};
export default ShopsPage;