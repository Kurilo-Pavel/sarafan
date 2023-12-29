"use client";
import "../styles/contacts.css";
import {
  Field, Form, Formik
} from "formik";
import Path from "../components/Path";
import Button from "../components/Button";
import {descriptionCheck, loginCheck, phoneCheck} from "../script";
import TextInput from "../components/TextInput";

interface FormValues {
  login: string;
  phone: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

const Contacts = () => {

  const initialValues: FormValues = {
    login: "",
    phone: "",
    description: "",
  };

  return <div className="page">
    <Path page="Контакты"/>
    <div className="contact_content">
      <Formik
        initialValues={initialValues}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (!loginCheck(values.login)) {
            errors.login = "incorrect login";
          }
          if (!phoneCheck(values.phone)) {
            errors.phone = "incorrect phone";
          }
          if (!descriptionCheck(values.description)) {
            errors.description = "incorrect description";
          }
          return errors;
        }}
        onSubmit={(values: FormValues) => {
          console.log(values);
        }}>
        {({errors, touched}) => {
          return (
            <Form>
              <h2> Связаться с нами</h2>
              <div className="contact_chapter">
                <span className="chapter_title">Телефон</span>
                <p className="chapter_contain">8 977 409‑41‑99 </p>
              </div>
              <div className="contact_chapter">
                <span className="chapter_title">E-mail</span>
                <p className="chapter_contain">online_store@gmail.com</p>
              </div>
              <div className="contact_chapter">
                <span className="chapter_title">Адрес шоурума</span>
                <p className="chapter_contain">Москва, ул. Новый Арбат 36/3, ТЦ «Сфера», 1 этаж</p>
                <p className="chapter_contain">Часы работы Пн-Вс 12:00 – 21:00</p>
              </div>
              <div className="contact_feedback">
                <div className="contact_inf">
                <p className="idea">Если у вас есть идеи, пожелания, замечания — пишите!</p>
                <p className="idea">И мы сделаем все, чтобы стать лучше.</p>
                </div>
                  <Field
                  name="login"
                  component={TextInput}
                  placeholder="Имя *"
                  id="login"
                  className="contact_input"
                  error={touched.login ? errors.login : undefined}
                />
                <Field
                  name="phone"
                  component={TextInput}
                  placeholder="Телефон *"
                  id="phone"
                  className="contact_input"
                  error={touched.phone ? errors.phone : undefined}
                />
                <Field
                  name="description"
                  component={TextInput}
                  placeholder="Опишите суть вашего обращения *"
                  id="description"
                  className="contact_input"
                  error={touched.description ? errors.description : undefined}
                />
                <p className="feedback_information"> * Поля, обязательные для заполнения</p>
              </div>
              <p className="contact_rules">Нажимая на кнопку «Отправить», я соглашаюсь с политикой конфиденциальности и
                обработки персональных данных</p>
              <Button type="submit" text="Отправить" className="contact_feedback_button"/>
            </Form>
          );
        }}
      </Formik>
      <img src="png/map.png" alt="Map" className="contact_map"/>
    </div>
  </div>
};
export default Contacts;