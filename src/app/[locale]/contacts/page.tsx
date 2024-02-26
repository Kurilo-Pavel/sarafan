import Contacts from "@/src/app/[locale]/contacts/Contacts";
import {useTranslations} from "next-intl";

const ContactsPage = () => {
  const translate = useTranslations("Contacts");
  const errors = useTranslations("Errors");
  const input = useTranslations("Input");
  const data = {
    title: translate("title"),
    errorFirstName: errors("firstName"),
    errorPhone: errors("phone"),
    errorDescription: errors("description"),
    contactTitle: translate("contactTitle"),
    phoneNumber: translate("phoneNumber"),
    email: input("email"),
    addressTitle: translate("addressTitle"),
    address: translate("address"),
    timeWork: translate("timeWork"),
    ideaInform1: translate("ideaInform1"),
    ideaInform2: translate("ideaInform2"),
    firstName: input("firstName"),
    phone: input("phone"),
    description: input("description"),
    inform: translate("inform"),
    rule: translate("rule"),
    button: translate("button"),
    map: translate("map"),
  };
  return <Contacts data={data}/>
};
export default ContactsPage;