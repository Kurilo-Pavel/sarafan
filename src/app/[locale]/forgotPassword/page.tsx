import ForgotPassword from "@/src/app/[locale]/forgotPassword/ForgotPassword";
import {useTranslations} from "next-intl";

const ForgotPasswordPage = () => {
  const translate = useTranslations("ForgotPassword");
  const input = useTranslations("Input");
  const errors = useTranslations("Errors");
  const data = {
    errorEmail: errors("email"),
    title: translate("title"),
    inform: translate("inform"),
    email: input("email"),
    button: translate("button")
  };
  return <ForgotPassword data={data}/>
};
export default ForgotPasswordPage;