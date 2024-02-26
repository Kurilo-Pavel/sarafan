"use client";
import "../styles/myCart.css";
import {
  Field, Form, Formik
} from "formik";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import {useEffect, useState} from "react";
import InputRadio from "@/src/app/[locale]/components/InputRadio";
import {ChooseDelivery, ChoosePayment} from "@/src/app/[locale]/data";
import Email from "@/src/app/[locale]/components/Email";
import {addCookie, emailCheck, loginCheck, userCookie} from "@/src/app/[locale]/script.mjs";
import TextInput from "@/src/app/[locale]/components/TextInput";
import Button from "@/src/app/[locale]/components/Button";
import {removeMyOrders} from "@/src/app/[locale]/store/product/cookieSlice";
import {useRouter} from "next/navigation";
import Modal from "@/src/app/[locale]/components/Modal";
import Path from "@/src/app/[locale]/components/Path"
import {DataMyCart} from "@/src/app/[locale]/data";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";

type DataProps = {
  myCart: {
    titleProp: string;
    modalTitleProp: string;
    checkoutProp: string;
    payProp: string;
    orderProp: string;
    deliveryTypeProp: string;
    paymentTypeProp: string;
    contactsProp: string;
    symbolProp: string;
    informProp: string;
    totalCostProp: string;
    saleProp: string;
    deliveryProp: string;
    promotionalProp: string;
    enterCodeProp: string;
    totalProp: string;
    qPromotionalProp: string;
    applyProp: string;
    cashProp: string;
    lastNameProp: string;
    firstNameProp: string;
    phoneProp: string;
    emailProp: string;
    errorLastName: string;
    errorFirstName: string;
    errorPhone: string;
    errorEmail: string;
    errorPayment: string;
    errorDelivery: string;
  }
};

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  delivery: string;
  payment: string;
}

interface FormErrors {
  [key: string]: string;
}

const MyCart = ({myCart}: DataProps) => {
  let router = useRouter();
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    delivery: "",
    payment: ""
  }

  const [itemsCost, setItemsCost] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [payment, setPayment] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [title, setTitle] = useState("");
  const [userTotal, setUserTotal] = useState<number | null>(0);
  const [userSales, setUserSales] = useState<number | null>(0);

  const total = useAppSelector(state => state.cookie.userTotal);
  const sales = useAppSelector(state => state.cookie.userSales);

  useEffect(() => {
    setUserTotal(total);
    setUserSales(sales);
    dispatch(setSection({title: "", path: ""}));
  }, [total, sales]);

  const handleClick = () => {
    dispatch(removeMyOrders());
    const paidOrder = {
      id: (Math.random() * 10).toString(),
      orders: userCookie("myOrder="),
      cost: itemsCost,
      date: (new Date()).toLocaleDateString(),
      time: (new Date()).toLocaleTimeString(),
    }
    addCookie(JSON.stringify(paidOrder), "paidOrder=");
    document.cookie = "myOrder=[];path=/";
    router.push("/");
  };

  useEffect(() => {
    if (userTotal && userSales) {
      setItemsCost(userTotal - userSales + delivery);
    }
  }, [userTotal, userSales, delivery]);

  return <div className="page">
    <div className="section_path">
      <Path page={myCart.titleProp}/>
    </div>

    <section className="checkout">
      <h1 className="checkout_title">{myCart.titleProp}</h1>
      <div className="checkout_order">
        <Formik
          initialValues={initialValues}
          validate={async (values: FormValues) => {
            const errors: FormErrors = {};
            if (!loginCheck(values.lastName)) {
              errors.lastName = myCart.errorLastName;
            }
            if (!loginCheck(values.firstName)) {
              errors.firstName = myCart.errorFirstName;
            }
            if (!values.phone) {
              errors.phone = myCart.errorPhone;
            }
            if (!emailCheck(values.email)) {
              errors.email = myCart.errorEmail;
            }
            if (!values.payment) {
              errors.payment = myCart.errorPayment;
            } else {
              setPayment(values.payment);
            }
            if (!values.delivery) {
              errors.delivery = myCart.errorDelivery;
            } else {
              setDelivery(Number(values.delivery));
            }
            return errors;
          }}
          onSubmit={(values: FormValues) => {
            console.log(values);
            setIsModal(true);
            setTitle(`${myCart.modalTitleProp} ${payment === "cash" ? myCart.checkoutProp : myCart.payProp} ${myCart.orderProp} ${itemsCost} ${myCart.cashProp}`);
          }}>
          {({errors, touched}) => {
            return (
              <Form className="checkout_information">
                <Field
                  component={InputRadio}
                  name="delivery"
                  data={ChooseDelivery()}
                  title={myCart.deliveryTypeProp}
                  error={touched.delivery ? errors.delivery : undefined}
                />
                <Field
                  component={InputRadio}
                  name="payment"
                  data={ChoosePayment()}
                  title={myCart.paymentTypeProp}
                  error={touched.payment ? errors.payment : undefined}
                />
                <div className="checkout_data">
                  <h3 className="data_title">{myCart.contactsProp}</h3>
                  <Field
                    name="lastName"
                    component={TextInput}
                    placeholder={myCart.lastNameProp + myCart.symbolProp}
                    id="lastName"
                    error={touched.lastName ? errors.lastName : undefined}
                    className="log_input"
                  />
                  <Field
                    name="firstName"
                    component={TextInput}
                    placeholder={myCart.firstNameProp + myCart.symbolProp}
                    id="firstName"
                    error={touched.firstName ? errors.firstName : undefined}
                    className="log_input"
                  />
                  <Field
                    name="phone"
                    component={TextInput}
                    className="log_input"
                    placeholder={myCart.phoneProp + myCart.symbolProp}
                    id="phone"
                    error={touched.phone ? errors.phone : undefined}
                  />
                  <Field
                    name="email"
                    component={Email}
                    placeholder={myCart.emailProp + myCart.symbolProp}
                    className="log_input"
                    error={touched.email ? errors.email : undefined}
                  />
                  <p className="data_information">{myCart.symbolProp + myCart.informProp}</p>
                </div>
                <Button
                  text={payment === "cash" ? myCart.checkoutProp : myCart.payProp}
                  className="contact_feedback_button"
                  type="submit"
                />
                <p className="order_rules">
                  {/*Нажимая на кнопку «{payment === "cash" ? myCart.checkoutProp : myCart.payProp}», я принимаю условия*/}
                  {/*публичной*/}
                  {/*оферты и политики конфиденциальности*/}
                  {DataMyCart(payment).rule}
                </p>
              </Form>)
          }}
        </Formik>
        <div className="checkout_cost">
          <div className="cost_information">
            <span className="cost_text">{myCart.totalCostProp}</span>
            <span className="cost_value">{userTotal} {myCart.cashProp}</span>
          </div>
          <div className="cost_information">
            <span className="cost_text">{myCart.saleProp}</span>
            <span className="cost_value">{userSales} {myCart.cashProp}</span>
          </div>
          <div className="cost_information">
            <span className="cost_text">{myCart.deliveryProp}</span>
            <span className="cost_value">{delivery} {myCart.cashProp}</span>
          </div>
          <div className="cost_information">
            <span className="cost_text">{myCart.promotionalProp}</span>
            <span className="cost_value">0 {myCart.cashProp}</span>
          </div>
          <hr className="line"/>
          <div className="cost_information cost_bold">
            <span className="cost_text">{myCart.totalProp}</span>
            <span className="cost_value">{itemsCost} {myCart.cashProp}</span>
          </div>
          <hr className="line"/>
          <span className="cost_information">{myCart.qPromotionalProp}</span>
          <div className="cost_information">
            <TextInput placeholder={myCart.enterCodeProp} id="code" className="log_input"/>
            <button className="button_white">{myCart.applyProp}</button>
          </div>
        </div>
      </div>
    </section>
    {isModal && <Modal
      title={title}
      isInform={false}
      setIsModal={setIsModal}
      successHandle={() => handleClick()}
    />}
  </div>
};
export default MyCart;