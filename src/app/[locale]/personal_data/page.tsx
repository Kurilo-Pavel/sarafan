import PersonalData from "@/src/app/[locale]/personal_data/PersonalData";
import {useTranslations} from "next-intl";

const PersonalDataPage = () => {
  const translate = useTranslations("PersonalData");
  const data = {
    pathInform: translate("pathInform"),
    pathOrders: translate('pathOrders'),
    title: translate("title")
  };
  return <PersonalData data={data}/>
};
export default PersonalDataPage;