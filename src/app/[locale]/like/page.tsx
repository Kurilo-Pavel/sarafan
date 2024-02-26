import Like from "@/src/app/[locale]/like/Like";
import {useTranslations} from "next-intl";

const LikePage = ()=>{
  const translate = useTranslations("Like");
  const title = translate("title");
  return <Like title={title}/>
};
export default LikePage