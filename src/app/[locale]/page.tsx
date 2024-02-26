import MainPage from "@/src/app/[locale]/MainPage";
import {useTranslations} from "next-intl";

const Page = () => {
  const t = useTranslations("MainPage");

  return <MainPage collection={t("nameCollection")} slider={t("nameSlider")}/>
};
export default Page;