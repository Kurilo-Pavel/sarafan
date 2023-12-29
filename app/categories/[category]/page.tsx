"use client";
import "../../styles/clothes.css";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getProducts, sortProduct} from "../../store/product/productSlice";
import Path from "../../components/Path";
import Select from "../../components/Select";
import Button from "../../components/Button";
import ContentProducts from "../../components/ContentProducts";
import {useEffect, useState} from "react";
import AddProduct from "@/app/components/AddProduct";

const Clothes = ({params}: { params: { category: string } }) => {
  // const user = useAppSelector(state => state.login.user);
  const [admin, setAdmin] = useState("");
  const products = useAppSelector((state => state.product.products));
  const dispatch = useAppDispatch();
  const path = decodeURI(params.category);

  useEffect(() => {
    dispatch(getProducts({path: path, page: 1}));
    setAdmin(localStorage.getItem("admin"));
    console.log(path)
  }, [])

  const selectData = [
    {value: "new", name: "Новинки"},
    {value: "increase", name: "По возрастанию цены"},
    {value: "decrease", name: "По убыванию цены"},
  ];

  return <div className="page">
    <Path page={path}/>
    <div className="product_header">
      <h2 className="page_title">{path}</h2>
      <div className="filter">
        <Select className="select" arrayValue={selectData}
                disabledValue={"Сортировка"}
                setSort={(sort: string) => dispatch(sortProduct({category: path, type: sort, page: 1}))}/>
        <Button text="Фильтр" className="button_gallery" type="button"/>
      </div>
    </div>
    {admin && <AddProduct category={path}/>}
    <div className="product_gallery">
      <ContentProducts products={products}/>
    </div>
    <div className="product_button">
      <Button
        text="Показать еще"
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