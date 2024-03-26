"use client";
import "../styles/categories.css";
import {
  Field, Form, Formik
} from "formik";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getCategory, deleteCategory, addCategory, getCategories} from "../store/product/productSlice";
import {Fragment, useEffect, useState} from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import {categoryCheck} from "@/src/app/[locale]/script.mjs";
import {Link} from "@/src/navigation";
import Modal from "@/src/app/[locale]/components/Modal";
import {useLocale} from "next-intl";

interface FormValues {
  category: string;
}

interface FormErrors {
  [key: string]: string;
}

const Categories = () => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const listItem = useAppSelector((state => state.product.categories));

  const [category, setCategory] = useState("");
  const [admin, setAdmin] = useState<string | null>("");
  const [isModal, setIsModal] = useState(false);

  const initialValues: FormValues = {
    category: "",
  };

  useEffect(() => {
    setAdmin(localStorage.getItem("admin"));
    dispatch(getCategories(locale));
  }, [dispatch]);

  const removeCategory = (category: string) => {
    setIsModal(true);
    setCategory(category);
  };

  return <div className="subsection">
    <div>
      <div className="subsection_categories">
        <div className="column_category">
          {listItem.map((item: { category_id: string, name_category: string }, index: number) => {
            if (index % 2 === 0) {
              return <div className="category" key={index}>
                <Link
                  href={`/categories/${item.category_id}` as "/"}
                  locale={locale}
                  className="category_link">
                  {item.name_category}
                </Link>
                {admin && <div className="delete_category">
                  <img
                    src="/trash.svg"
                    alt="delete"
                    className="delete_icon_category"
                  />
                  <Button
                    text="Удалить"
                    className="delete_button_category"
                    type="button"
                    onClick={() => removeCategory(item.name_category)}
                  />
                </div>}
              </div>
            }
            return null;
          })}
        </div>
        <div className="column_category">
          {listItem.map((item: { category_id: string, name_category: string }, index: number) => {
            if (index % 2 !== 0) {
              return <div className="category" key={index}>
                <Link
                  href={`/categories/${item.category_id}` as "/"}
                  locale={locale}
                  className="category_link"
                >
                  {item.name_category}
                </Link>
                {admin &&
                  <div className="delete_category">
                    <img
                      src="/trash.svg"
                      alt="delete"
                      className="delete_icon_category"
                    />
                    <Button
                      text="Удалить"
                      className="delete_button_category"
                      type="button"
                      onClick={() => removeCategory(item.name_category)}
                    />
                  </div>
                }
              </div>
            }
            return null;
          })}
        </div>
      </div>
      {admin && <Fragment>
        <Formik
          initialValues={initialValues}
          validate={async (values: FormValues) => {
            const errors: FormErrors = {};
            if (!categoryCheck(values.category)) {
              errors.category = "incorrect categories";
            }
            return errors;
          }}
          onSubmit={(values: FormValues) => {
            dispatch(addCategory(values.category));
          }}>
          {({errors, touched}) => {
            return (
              <Form className="add_category">
                <Field
                  name="category"
                  component={TextInput}
                  placeholder="Название"
                  id="category"
                  className="contact_input"
                  error={touched.category ? errors.category : undefined}
                />
                <Button
                  type="submit"
                  text="Добавить"
                  className="contact_feedback_button"
                />
              </Form>
            );
          }}
        </Formik>
      </Fragment>}
    </div>
    <img src="/png/IMG_4871.png" alt="" className="img_categories"/>
    {isModal && <Modal
      title={`Вы согласны удалить "${category}"`}
      isInform={false}
      setIsModal={setIsModal}
      successHandle={() => dispatch(deleteCategory(category))}
    />}
  </div>
};

export default Categories;