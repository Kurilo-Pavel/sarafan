"use client";

import "../styles/clothes.css";
import Path from "@/app/components/Path";
import Button from "@/app/components/Button";
import ContentProducts from "@/app/components/ContentProducts";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {useEffect} from "react";
import {getNewItems} from "@/app/store/product/productSlice";

const NewItems = () => {
  const dispatch = useAppDispatch();
  const newProducts = useAppSelector(state => state.product.products);

  useEffect(() => {
    dispatch(getNewItems(1));
  }, []);

  return <div className="page">
    <Path/>
    <h2 className="page_title">Последние поступления</h2>
    <div className="product_gallery">
      <ContentProducts products={newProducts}/>
    </div>
    <div className="product_button">
      <Button
        text="Показать еще"
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