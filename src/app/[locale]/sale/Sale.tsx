"use client";

import "../styles/clothes.css";
import Path from "@/src/app/[locale]/components/Path";
import Button from "@/src/app/[locale]/components/Button";
import ContentProducts from "@/src/app/[locale]/components/ContentProducts";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import {useEffect, useState} from "react";
import {getProducts, getSaleItems} from "@/src/app/[locale]/store/product/productSlice";
import {useLocale} from "next-intl";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";
import PikingItems from "@/src/app/[locale]/components/PikingItems";
import {RootState} from "@/src/app/[locale]/store";

type SaleProps = {
  data: {
    title: string;
    button: string;
    show: string;
    from: string;
  }
}
const Sale = ({data}: SaleProps) => {
  const dispatch = useAppDispatch();
  const locale = useLocale();

  const [page, setPage] = useState(1);
  const [typeSort, setTypeSort] = useState("all");

  const products = useAppSelector(state => state.product.products);
  const numberItems = useAppSelector((state: RootState) => state.product.numberItems);

  useEffect(() => {
    setPage(1);
    dispatch(getSaleItems({page: 1, locale: locale, typeSort: typeSort}));
  }, [typeSort]);

  useEffect(() => {
    dispatch(setSection({title: "", path: ""}))
  }, [dispatch, locale]);

  return <div className="page">
    <Path page="SALE"/>
    <div className="product_header">
      <h2 className="page_title">{data.title}</h2>
      <PikingItems setTypeSort={setTypeSort}/>
    </div>
    <div className="product_gallery">
      <ContentProducts products={products}/>
    </div>
    <div className="product_button">
      {products.length < numberItems && <Button
        text={data.button}
        className="button_gallery"
        type="button"
        onClick={() => {
          setPage((prev) => ++prev);
          dispatch(getSaleItems({page: page + 1, locale: locale, typeSort: typeSort}));
        }}
      />}
      {!!numberItems &&
        <h4 className="number_items">{data.show} {products.length} {data.from} {numberItems}</h4>
      }
    </div>
  </div>
};

export default Sale;