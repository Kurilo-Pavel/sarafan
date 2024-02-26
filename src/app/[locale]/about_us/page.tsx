import AboutUs from "@/src/app/[locale]/about_us/AboutUs";
import {useTranslations} from "next-intl";

const AboutUsPage = () => {
  const translation = useTranslations("AboutUs");
  const data = {
    title:translation("title"),
    description:translation("description")
  };
  return <AboutUs data ={data}/>
};
export default AboutUsPage;