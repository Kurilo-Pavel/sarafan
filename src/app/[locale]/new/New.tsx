"use client";

import "../styles/clothes.css";
import Path from "@/src/app/[locale]/components/Path";
import Button from "@/src/app/[locale]/components/Button";
import ContentProducts from "@/src/app/[locale]/components/ContentProducts";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import {useEffect} from "react";
import {getNewItems} from "@/src/app/[locale]/store/product/productSlice";
import {useLocale} from "next-intl";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";

type NewItemsProps = {
  data: {
    path: string;
    title: string;
    button: string;
  }
};

const NewItems = ({data}: NewItemsProps) => {
  const dispatch = useAppDispatch();
  const newProducts = useAppSelector(state => state.product.products);
  const locale = useLocale();

  useEffect(() => {
    dispatch(getNewItems({page: 1, locale: locale}));
    dispatch(setSection({title: "", path: ""}))
  }, [dispatch,locale]);

  return <div className="page">
    <Path page={data.path}/>
    <h2 className="page_title">{data.title}</h2>
    <div className="product_gallery">
      {newProducts.length > 0 && <ContentProducts products={newProducts}/>}
    </div>
    <div className="product_button">
      <Button
        text={data.button}
        className="button_gallery"
        type="button"
        onClick={() => {
          console.log(newProducts);
        }}
      />
    </div>
  </div>
};

export default NewItems;