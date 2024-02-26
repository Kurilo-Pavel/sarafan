"use client";

import "../styles/clothes.css";
import Path from "@/src/app/[locale]/components/Path";
import Button from "@/src/app/[locale]/components/Button";
import ContentProducts from "@/src/app/[locale]/components/ContentProducts";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import {useEffect} from "react";
import {getSaleItems} from "@/src/app/[locale]/store/product/productSlice";
import {useLocale} from "next-intl";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";

type SaleProps = {
  data: {
    title: string;
    button: string;
  }
}
const Sale = ({data}: SaleProps) => {
  const dispatch = useAppDispatch();
  const saleProducts = useAppSelector(state => state.product.products);
  const locale = useLocale();

  useEffect(() => {
    dispatch(getSaleItems({page: 1, locale: locale}));
    dispatch(setSection({title: "", path: ""}))
  }, [dispatch,locale]);

  return <div className="page">
    <Path page="SALE"/>
    <h2 className="page_title">{data.title}</h2>
    <div className="product_gallery">
      <ContentProducts products={saleProducts}/>
    </div>
    <div className="product_button">
      <Button
        text={data.button}
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