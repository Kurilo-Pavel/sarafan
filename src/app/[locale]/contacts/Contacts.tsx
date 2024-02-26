"use client";
import "../styles/contacts.css";
import {
  Field, Form, Formik
} from "formik";
import Path from "../components/Path";
import Button from "../components/Button";
import {descriptionCheck, loginCheck, phoneCheck} from "@/src/app/[locale]/script.mjs";
import TextInput from "../components/TextInput";
import {useAppDispatch} from "@/src/app/[locale]/store/hooks";
import {useEffect} from "react";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";

type ContactsProps = {
  data: {
    title: string;
    errorFirstName: string;
    errorPhone: string;
    errorDescription: string;
    contactTitle: string;
    phoneNumber: string;
    email: string;
    addressTitle: string;
    address: string;
    timeWork: string;
    ideaInform1: string;
    ideaInform2: string;
    firstName: string;
    phone: string;
    description: string;
    inform: string;
    rule: string;
    button: string;
    map: string;
  }
}

interface FormValues {
  login: string;
  phone: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

const Contacts = ({data}: ContactsProps) => {

  const initialValues: FormValues = {
    login: "",
    phone: "",
    description: "",
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSection({title: "", path: ""}));
  }, [dispatch]);

  return <div className="page">
    <Path page={data.title}/>
    <div className="contact_content">
      <Formik
        initialValues={initialValues}
        validate={async (values: FormValues) => {
          const errors: FormErrors = {};
          if (!loginCheck(values.login)) {
            errors.login = data.errorFirstName;
          }
          if (!phoneCheck(values.phone)) {
            errors.phone = data.errorPhone;
          }
          if (!descriptionCheck(values.description)) {
            errors.description = data.errorDescription;
          }
          return errors;
        }}
        onSubmit={(values: FormValues) => {
          console.log(values);
        }}>
        {({errors, touched}) => {
          return (
            <Form>
              <h2>{data.contactTitle}</h2>
              <div className="contact_chapter">
                <span className="chapter_title">{data.phoneNumber}</span>
                <p className="chapter_contain">8 977 409‑41‑99 </p>
              </div>
              <div className="contact_chapter">
                <span className="chapter_title">{data.email}</span>
                <p className="chapter_contain">online_store@gmail.com</p>
              </div>
              <div className="contact_chapter">
                <span className="chapter_title">{data.addressTitle}</span>
                <p className="chapter_contain">{data.address}</p>
                <p className="chapter_contain">{data.timeWork}</p>
              </div>
              <div className="contact_feedback">
                <div className="contact_inf">
                  <p className="idea">{data.ideaInform1}</p>
                  <p className="idea">{data.ideaInform2}</p>
                </div>
                <Field
                  name="login"
                  component={TextInput}
                  placeholder={data.firstName + " *"}
                  id="login"
                  className="contact_input"
                  error={touched.login ? errors.login : undefined}
                />
                <Field
                  name="phone"
                  component={TextInput}
                  placeholder={data.phone + " *"}
                  id="phone"
                  className="contact_input"
                  error={touched.phone ? errors.phone : undefined}
                />
                <Field
                  name="description"
                  component={TextInput}
                  placeholder={data.description + " *"}
                  id="description"
                  className="contact_input"
                  error={touched.description ? errors.description : undefined}
                />
                <p className="feedback_information">{"* " + data.inform}  </p>
              </div>
              <p className="contact_rules">
                {data.rule}
              </p>
              <Button type="submit" text={data.button} className="contact_feedback_button"/>
            </Form>
          );
        }}
      </Formik>
      <img src="/png/map.png" alt={data.map} className="contact_map"/>
    </div>
  </div>
};
export default Contacts;