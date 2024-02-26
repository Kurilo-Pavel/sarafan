import MyCart from "@/src/app/[locale]/myCart/MyCart";
import {useTranslations} from "next-intl";

const MyCartPage = () => {
  const myCart = useTranslations("MyCart");
  const errors = useTranslations("Errors");
  const input = useTranslations("Input");
  const global = useTranslations("Global");

  const data = {
    titleProp: myCart("title"),
    modalTitleProp: myCart("modalTitle"),
    checkoutProp: myCart("checkout"),
    payProp: myCart("pay"),
    orderProp: myCart("order"),
    deliveryTypeProp: myCart("deliveryType"),
    paymentTypeProp: myCart("paymentType"),
    contactsProp: myCart("contacts"),
    symbolProp: myCart("symbol"),
    informProp: myCart("inform"),
    totalCostProp: myCart("totalCost"),
    saleProp: myCart("sale"),
    deliveryProp: myCart("delivery"),
    promotionalProp: myCart("promotional"),
    enterCodeProp: myCart("enterCode"),
    totalProp: myCart("total"),
    qPromotionalProp: myCart("qPromotional"),
    applyProp: myCart("apply"),
    cashProp: global("cash"),
    lastNameProp: input("lastName"),
    firstNameProp: input("firstName"),
    phoneProp: input("phone"),
    emailProp: input("email"),
    errorLastName: errors("lastName"),
    errorFirstName: errors("firstName"),
    errorPhone: errors("phone"),
    errorEmail: errors("email"),
    errorPayment: errors("payment"),
    errorDelivery: errors("delivery")
  };

  return <MyCart myCart={data}/>;
};
export default MyCartPage;