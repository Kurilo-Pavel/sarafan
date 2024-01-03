"use client";
import "../styles/like.css";
import Path from "../components/Path";
import Card from "../components/Card";
import {useEffect, useState} from "react";
import {userCookie} from "@/app/script";
import {useAppDispatch} from "@/app/store/hooks";
import {getItem} from "@/app/store/product/productSlice";

type Item = {
  category: string;
  id: number;
  main_img: string;
  name: string;
  price: number;
  sale: number;
  sizes: string[];
  views: number;
}

const Like = () => {
  const dispatch = useAppDispatch();
  const [cookieItems, setCookieItems] = useState<Item[]>([])
  let items: Item[] = [];
  let marker = true;

  useEffect(() => {
    const idItems: string[] = userCookie("likeItems=");
    if (marker) {
      idItems.map(item => {
        if (item) {
          dispatch(getItem(item)).then((data: { payload: any }) => {
            items = [...items, data.payload];
            setCookieItems(items);
          });
        }
      });
      marker = false;
    }
  }, [dispatch])

  return <div className="page">
    <Path page="Избранное"/>
    <h2 className="page_title">Избранное</h2>
    <div className="like_page">
      {cookieItems.length > 0 && cookieItems.map((card, index) => {
        return <Card
          key={index}
          image={card.main_img ? card.main_img : ""}
          isLike={true}
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
