"use client";

import "../styles/clothes.css";
import Path from "@/app/components/Path";
import Button from "@/app/components/Button";
import ContentProducts from "@/app/components/ContentProducts";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {useEffect} from "react";
import {getSaleItems} from "@/app/store/product/productSlice";

const Sale = () => {
  const dispatch = useAppDispatch();
  const saleProducts = useAppSelector(state => state.product.products);

  useEffect(() => {
    dispatch(getSaleItems(1));
  }, []);

  return <div className="page">
    <Path/>
    <h2 className="page_title">Сезонные скидки</h2>
    <div className="product_gallery">
      <ContentProducts products={saleProducts}/>
    </div>
    <div className="product_button">
      <Button
        text="Показать еще"
        className="button_gallery"
        type="button"
        onClick={() => {
          console.log(saleProducts);
        }}
      />
    </div>
  </div>
};

export default Sale;