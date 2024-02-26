"use client";
import "@/src/app/[locale]/styles/clothes.css";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import {getCategory, getProducts, sortProduct} from "@/src/app/[locale]/store/product/productSlice";
import Path from "@/src/app/[locale]/components/Path";
import Select from "@/src/app/[locale]/components/Select";
import Button from "@/src/app/[locale]/components/Button";
import ContentProducts from "@/src/app/[locale]/components/ContentProducts";
import {useEffect, useState} from "react";
import AddProduct from "@/src/app/[locale]/components/AddProduct";
import {RootState} from "@/src/app/[locale]/store";
import {SelectData} from "@/src/app/[locale]/data";
import {useLocale} from "use-intl";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";

type ClothesProps = {
  id: string;
  dataCategory: {
    sort: string;
    filter: string;
    button: string;
  }
}

const Clothes = ({id, dataCategory}: ClothesProps) => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const [admin, setAdmin] = useState<string | null>("");

  const products = useAppSelector((state: RootState) => state.product.products);
  const category = useAppSelector((state: RootState) => state.product.category);

  useEffect(() => {
    dispatch(getCategory({id: id, locale: locale}));
    dispatch(getProducts({id: id, page: 1, locale: locale}));
    dispatch(setSection({title: "", path: ""}))
    setAdmin(localStorage.getItem("admin"));
  }, [dispatch]);


  return <div className="page">
    <Path page={category}/>
    <div className="product_header">
      <h2 className="page_title">{category}</h2>
      <div className="filter">
        <Select
          className="select" arrayValue={SelectData()}
          disabledValue={dataCategory.sort}
          setSort={(sort: string) => dispatch(sortProduct({category: id, type: sort, page: 1, locale: locale}))}
        />
        <Button text={dataCategory.filter} className="button_gallery" type="button"/>
      </div>
    </div>
    {admin && <AddProduct category={id}/>}
    <div className="product_gallery">
      {products.length > 0 && <ContentProducts products={products}/>}
    </div>
    <div className="product_button">
      <Button
        text={dataCategory.button}
        className="button_gallery"
        type="button"
        onClick={() => {
          console.log(products);
        }}
      />
    </div>
  </div>
};

export default Clothes;