"use client";
import "../styles/myCart.css";
import {
  Field, Form, Formik
} from "formik";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {useEffect, useState} from "react";
import InputRadio from "@/app/components/InputRadio";
import {chooseDelivery, choosePayment} from "@/app/data";
import Email from "@/app/components/Email";
import {addCookie, emailCheck, loginCheck, userCookie} from "@/app/script";
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";
import {setModal, setModalOption, setModalSuccess, setModalTitle} from "@/app/store/component/componentSlice";
import {removeMyOrders} from "@/app/store/product/cookieSlice";
import {useRouter} from "next/navigation";

interface FormValues {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  email: string;
  delivery: string;
  payment: string;
}

interface FormErrors {
  [key: string]: string;
}

const MyCart = () => {
  let router = useRouter();
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    delivery: "",
    payment: ""
  }

  const [itemsCost, setItemsCost] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [payment, setPayment] = useState("");

  const userTotal = useAppSelector(state => state.cookie.userTotal);
  const userSales = useAppSelector(state => state.cookie.userSales);
  const modalSuccess = useAppSelector(state => state.component.modalSuccess);

  useEffect(() => {
    if (modalSuccess !== "" && modalSuccess === "removeOrder") {
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
      dispatch(setModalSuccess(""));
    }
  }, [modalSuccess]);

  useEffect(() => {
    if (userTotal !== null && userSales !== null) {
      setItemsCost(userTotal - userSales + delivery);
    }
  }, [userTotal, delivery]);

  return <div className="page">
    <div className="section_path">
      <p className="path">Главная / Корзина / Оформление заказа</p>
    </div>

    <section className="checkout">
      <h1 className="checkout_title">Оформление заказа</h1>
      <div className="checkout_order">
        <Formik
          initialValues={initialValues}
          validate={async (values: FormValues) => {
            const errors: FormErrors = {};
            if (!loginCheck(values.lastName)) {
              errors.lastName = "Некорректно указана фамилия";
            }
            if (!loginCheck(values.firstName)) {
              errors.firstName = "Некорректно указано имя";
            }
            if (!loginCheck(values.middleName)) {
              errors.middleName = "Некорректно указано отчество";
            }
            if (!values.phone) {
              errors.phone = "Укажите номер телефона";
            }
            if (!emailCheck(values.email)) {
              errors.email = "Некорректно указан Email";
            }
            if (!values.payment) {
              errors.payment = "Выбирите способ оплаты";
            } else {
              setPayment(values.payment);
            }
            if (!values.delivery) {
              errors.delivery = "Выбирите способ доставки";
            } else {
              setDelivery(Number(values.delivery));
            }
            return errors;
          }}
          onSubmit={(values: FormValues) => {
            dispatch(setModal({isOpen: true, type: ""}));
            dispatch(setModalTitle(`Вы уверены что хотите ${payment === "cash" ? "оформить" : "оплатить"} заказ на сумму ${itemsCost} руб.`));
            dispatch(setModalOption("removeOrder"));
          }}>
          {({errors, touched}) => {
            return (
              <Form className="checkout_information">
                <Field
                  component={InputRadio}
                  name="delivery"
                  data={chooseDelivery}
                  title="Способ доставки"
                  error={touched.delivery ? errors.delivery : undefined}
                />
                <Field
                  component={InputRadio}
                  name="payment"
                  data={choosePayment}
                  title="Способ оплаты"
                  error={touched.payment ? errors.payment : undefined}
                />
                <div className="checkout_data">
                  <h3 className="data_title">Контактные данные</h3>
                  <Field
                    name="lastName"
                    component={TextInput}
                    placeholder="Фамилия *"
                    id="lastName"
                    error={touched.lastName ? errors.lastName : undefined}
                    className="log_input"
                  />
                  <Field
                    name="firstName"
                    component={TextInput}
                    placeholder="Имя *"
                    id="firstName"
                    error={touched.firstName ? errors.firstName : undefined}
                    className="log_input"
                  />
                  <Field
                    name="middleName"
                    component={TextInput}
                    placeholder="Отчество *"
                    id="middleName"
                    error={touched.middleName ? errors.middleName : undefined}
                    className="log_input"
                  />
                  <Field
                    name="phone"
                    component={TextInput}
                    className="log_input"
                    placeholder="Телефон *"
                    id="phone"
                    error={touched.phone ? errors.phone : undefined}
                  />
                  <Field
                    name="email"
                    component={Email}
                    placeholder="E-mail *"
                    className="log_input"
                    error={touched.email ? errors.email : undefined}
                  />
                  <p className="data_information">* Поля, обязательные для заполнения</p>
                </div>
                <Button
                  text={payment === "cash" ? "Оформить" : "Оплатить"}
                  className="contact_feedback_button"
                  type="submit"
                />
                <p className="order_rules">
                  Нажимая на кнопку «{payment === "cash" ? "оформить" : "оплатить"}», я принимаю условия публичной
                  оферты и политики конфиденциальности
                </p>
              </Form>)
          }}
        </Formik>
        <div className="checkout_cost">
          <div className="cost_information">
            <span className="cost_text">Общая стоимость</span>
            <span className="cost_value">{userTotal} руб.</span>
          </div>
          <div className="cost_information">
            <span className="cost_text">Размер скидки</span>
            <span className="cost_value">{userSales} руб.</span>
          </div>
          <div className="cost_information">
            <span className="cost_text">Доставка</span>
            <span className="cost_value">{delivery} руб.</span>
          </div>
          <div className="cost_information">
            <span className="cost_text">Промокод</span>
            <span className="cost_value">0 руб.</span>
          </div>
          <hr className="line"/>
          <div className="cost_information cost_bold">
            <span className="cost_text">Итого</span>
            <span className="cost_value">{itemsCost} руб.</span>
          </div>
          <hr className="line"/>
          <span className="cost_information">Есть промокод?</span>
          <div className="cost_information">
            <TextInput placeholder="Введите промокод" id="code" className="log_input"/>
            <button className="button_white">Применить</button>
          </div>
        </div>
      </div>
    </section>
  </div>
};
export default MyCart;