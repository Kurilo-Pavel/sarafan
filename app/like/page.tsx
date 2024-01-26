"use client";
import "../styles/like.css";
import Path from "../components/Path";
import Card from "../components/Card";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {getItem} from "@/app/store/product/productSlice";
import {AppDispatch} from "@/app/store";

type Item = {
  category: string;
  id: number | null;
  main_img: string;
  name: string;
  price: number;
  sale: number;
  sizes: string[];
  views: number;
  colors: string[];
}

const Like = () => {
  const dispatch = useAppDispatch();
  const likes = useAppSelector(state => state.cookie.likeItems);
  const [cookieItems, setCookieItems] = useState<Item[]>([])
  let items: Item[] = [];

  useEffect(() => {
    if (likes.length && likes[0].id) {
      likes.forEach(async item => {
        const data = await dispatch(getItem(item.id)) as { payload: { product: Item } };
        items = [...items, data.payload.product];
        setCookieItems(items);
      });
    }
  }, [dispatch, likes]);

  return <div className="page">
    <Path page="Избранное"/>
    <h2 className="page_title">Избранное</h2>
    <div className="like_page">
      {cookieItems.length > 0 && cookieItems.map((card, index) => {
        return <Card
          key={index}
          image={card.main_img}
          price={card.price}
          id={card.id}
          title={card.name}
          category={card.category}
          sale={card.sale}
          classImage="small_img"
          classCard="collection_item"
        />
      })}
    </div>
  </div>
};
export default Like;
