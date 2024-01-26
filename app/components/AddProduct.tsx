"use client";
import "../styles/addProduct.css";
import {
  Field, Form, Formik
} from "formik";
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";
import GroupCheckbox from "@/app/components/GroupCheckbox";
import SelectImage from "@/app/components/SelectImage";
import {useState} from "react";
import {useAppDispatch} from "@/app/store/hooks";
import {descriptionCheck, loginCheck} from "@/app/script";
import {addProduct} from "@/app/store/product/productSlice";
import {AppDispatch} from "@/app/store";

type Gallery = {
  size: number | undefined;
  image: Blob | undefined;
  name: string;
  type: string;
}[];

export interface FormValues {
  name: string;
  price: string;
  sale: string;
  description: string;
  size: string[];
  color: string[];
  mainImage: string;
  gallery: Gallery;
  token: string|null;
  category: string;
}

interface FormErrors {
  [key: string]: string;
}

type AddProductProps = {
  category: string;
}

const AddProduct = ({category}: AddProductProps) => {
  const dispatch = useAppDispatch();

  const [mainImage, setMainImage] = useState("");
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [selectImage, setSelectImage] = useState<Gallery>([]);

  const initialValues: FormValues = {
    name: "",
    price: "",
    sale: "",
    description: "",
    size: size,
    color: color,
    mainImage: "",
    gallery: selectImage,
    token: localStorage.getItem("token"),
    category: category,
  };

  const deleteImage = (name: string) => {
    setSelectImage(selectImage.filter(image => {
      return image.name !== name;
    }));
  };

  return <Formik
    initialValues={initialValues}
    validate={async (values: FormValues) => {
      const errors: FormErrors = {};
      if (!loginCheck(values.name)) {
        errors.name = "incorrect name";
      }
      if (!descriptionCheck(values.description)) {
        errors.description = "incorrect description";
      }
      if (!Number(values.price!) || !values.price) {
        errors.price = "incorrect price";
      }
      if (!Number(values.sale!)) {
        errors.sale = "incorrect sale";
      }
      if (!color.length) {
        errors.color = "choose color";
      }
      if (!size.length) {
        errors.size = "choose size";
      }
      if (!mainImage) {
        errors.mainImage = "choose main image";
      }
      if (!selectImage.length) {
        errors.gallery = "choose image";
      }
      return errors;
    }}
    onSubmit={(values: FormValues) => {
      values.color = color;
      values.size = size;
      values.gallery = selectImage;
      values.mainImage = mainImage;
      dispatch<AppDispatch>(addProduct(values));
    }}>
    {({errors, touched}) => {
      return (
        <Form className="add_product">
          <div>
            <Field
              component={TextInput}
              name="name"
              placeholder="Название"
              id="name_product"
              className="add_product_input"
              error={touched.name ? errors.name : undefined}
            />
            <Field
              component={TextInput}
              name="price"
              placeholder="Цена"
              id="price_product"
              className="add_product_input"
              error={touched.price ? errors.price : undefined}
            />
            <Field
              component={TextInput}
              name="sale"
              placeholder="Скидка"
              id="sale_product"
              className="add_product_input"
              error={touched.sale ? errors.sale : undefined}
            />
            <Field
              component={TextInput}
              name="description"
              placeholder="Описание"
              id="description_product"
              className="add_product_input"
              error={touched.description ? errors.description : undefined}
            />
            <Field
              component={SelectImage}
              name="gallery"
              buttonText="Добавить изображение"
              selectImage={selectImage}
              setSelectImage={setSelectImage}
              error={touched.gallery ? errors.gallery : undefined}
            />
          </div>
          <div className="add_product_section">
            <Field
              component={GroupCheckbox}
              name="color"
              list={["red", "black", "white", "brown"]}
              title="Цвет"
              setPoint={setColor}
              point={color}
              error={touched.color ? errors.color : undefined}
            />
            <Field
              component={GroupCheckbox}
              name="size"
              list={["XS", "X", "M", "L"]}
              title="Размер"
              point={size}
              setPoint={setSize}
              error={touched.size ? errors.size : undefined}
            />
            <div className="add_product_gallery">
              {selectImage.map((file, index) => {
                return file.image && <div key={file.name + index} className="image_data">
                  <img
                    src={file.image && URL.createObjectURL(file.image)}
                    alt={file.name}
                    className="add_product_image"/>
                  <div className="action_image">
                    <label htmlFor={file.name}>
                      <input
                        type="radio"
                        value={file.name}
                        name="main"
                        id={file.name}
                        onClick={() => setMainImage(file.name)}
                      />
                      Главная</label>
                    {errors.mainImage && <span className="error">{errors.mainImage}</span>}
                    <Button
                      onClick={() => deleteImage(file.name)}
                      className="button_gallery"
                      type="button"
                      text="Удалить"
                    />
                  </div>
                </div>
              })}
            </div>
          </div>
          <Button
            text="Добавить товар"
            className="button_white"
            type="submit"
          />
        </Form>
      );
    }}

  </Formik>
};

export default AddProduct;