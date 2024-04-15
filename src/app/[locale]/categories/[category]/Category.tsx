"use client";
import "@/src/app/[locale]/styles/clothes.css";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import {getCategory, getProducts, sortProduct} from "@/src/app/[locale]/store/product/productSlice";
import Path from "@/src/app/[locale]/components/Path";
import Button from "@/src/app/[locale]/components/Button";
import ContentProducts from "@/src/app/[locale]/components/ContentProducts";
import {useEffect, useState} from "react";
import AddProduct from "@/src/app/[locale]/components/AddProduct";
import {RootState} from "@/src/app/[locale]/store";
import {useLocale} from "use-intl";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";
import PikingItems from "@/src/app/[locale]/components/PikingItems";

type ClothesProps = {
  id: string;
  dataCategory: {
    button: string;
    notItems: string;
    show: string;
    from: string;
  }
}

const Clothes = ({id, dataCategory}: ClothesProps) => {
  const dispatch = useAppDispatch();
  const locale = useLocale();

  const [admin, setAdmin] = useState<string | null>("");
  const [page, setPage] = useState(1);
  const [typeSort, setTypeSort] = useState("all");

  const products = useAppSelector((state: RootState) => state.product.products);
  const category = useAppSelector((state: RootState) => state.product.category);
  const numberItems = useAppSelector((state: RootState) => state.product.numberItems);

  useEffect(() => {
    setPage(1);
    dispatch(getProducts({id: id, page: 1, locale: locale, typeSort: typeSort}));
  }, [typeSort]);

  useEffect(() => {
    dispatch(getCategory({id: id, locale: locale}));
    dispatch(setSection({title: "", path: ""}))
    setAdmin(localStorage.getItem("admin"));
  }, [dispatch]);

  return <div className="page">
    <Path page={category}/>
    <div className="product_header">
      <h2 className="page_title">{category}</h2>
      <PikingItems setTypeSort={setTypeSort}/>
    </div>
    {admin && <AddProduct category={id}/>}
    <div className="product_gallery">
      {products.length > 0 ? <ContentProducts products={products}/> :
        <h2 className="product_empty">{dataCategory.notItems}</h2>}
    </div>
    <div className="product_button">
      {products.length < numberItems && <Button
        text={dataCategory.button}
        className="button_gallery"
        type="button"
        onClick={() => {
          dispatch(getProducts({id: id, page: page+1, locale: locale, typeSort: typeSort}));
        }}
      />}
      {!!numberItems &&
        <h4 className="number_items">{dataCategory.show} {products.length} {dataCategory.from} {numberItems}</h4>
      }
    </div>
  </div>
};

export default Clothes;