import Shops from "@/src/app/[locale]/shops/Shops";
import {useTranslations} from "next-intl";

const ShopsPage = ()=>{
  const shops = useTranslations("Shops");
  const address = useTranslations("Contacts");
  const data = {
    path: shops("path"),
    address: address("address")
  };
  return <Shops data={data}/>
};
export default ShopsPage;