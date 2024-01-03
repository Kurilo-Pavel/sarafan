"use client";
import "@/app/styles/cart.css";
import Button from "@/app/components/Button";
import {Fragment, useEffect, useState} from "react";
import {deleteCookie, userCookie} from "@/app/script";
import {getItem} from "@/app/store/product/productSlice";
import {useAppDispatch} from "@/app/store/hooks";
import classNames from "classnames";
import Select from "@/app/components/Select";

type Item = {
  category: string;
  id: number;
  main_img: string;
  name: string;
  price: number;
  sale: number;
  sizes: string[];
  views: number;
  colors: string[];
};

const Cart = () => {
  const dispatch = useAppDispatch();

  const [cookieItems, setCookieItems] = useState<Item[]>([])
  const [itemColor, setItemColor] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [itemsCost, setItemsCost] = useState(0);

  let items = [];
  let marker = true;
  useEffect(() => {
    const idItems: string[] = userCookie("myOrder=");
    if (marker) {
      // idItems.map(item => {
      //   if (item) {
      //     dispatch(getItem(item)).then((data: { payload }) => {
      //       items = [...items, data.payload];
      //       setCookieItems(items);
      //     });
      //   }
      // });
      // dispatch(getMyOrders(idItems))
      marker = false;
    }
  }, []);

  useEffect(() => {
    const cost = cookieItems.map(item => item.price * (100 - item.sale) / 100);
    if (cost.length > 0)
      setItemsCost(cost.reduce((prev, next) => prev + next));
  }, [cookieItems]);

  return <Fragment>
    <h1 className="help_title" >Моя корзина</h1>
    <div className="items_field">
      {cookieItems[0] && cookieItems.map((item, index) => <div key={index} className="item_block">
        <div className="image_wrapper">
          <img
            src={item.main_img}
            alt={item.id.toString()}
            className="item_image"
          />
        </div>
        <div className="item_data">
          <h4 className="item_title">{item.name}</h4>
          <div className="price_block">
            {item.sale && <span className="price_sale">{Math.round(item.price * (100 - item.sale) / 100)} руб</span>}
            <span className={classNames({"item_price": !item.sale, "old_price": item.sale})}>{item.price} руб.</span>
          </div>
          <div className="param_block">
            <span>Размер</span>
            {item.sizes && <Select
              arrayValue={item.sizes.map(size => {
                return {name: size, value: size};
              })}
              className="item_selection"
              setSort={setItemSize}
              disabledValue="Выберите размер"
            />}
          </div>
          <div className="param_block">
            <span>Количество</span>

          </div>
          <div className="param_block">
            <span>Цвет</span>
            <div className="section_colors">
              {item.colors && item.colors.map((color, index) =>
                <span key={index} className="color" style={{"background": `${color}`}}
                      onClick={() => setItemColor(color)}/>
              )}
            </div>
          </div>
          <div className="delete_block">
            <img
              src="/trash.svg"
              alt="delete"
              className="delete_icon"
            />
            <span
              className="delete_title"
              onClick={() => {
                deleteCookie(item.id,"myOrder=")
                setCookieItems(cookieItems.filter(value => value.id !== item.id));
              }}>Удалить</span>
          </div>
        </div>
      </div>)}
    </div>
    <p className="cost_items">
      Стоимость товара(-ов): {cookieItems[0] && <><span>{itemsCost}</span> руб.</>}
    </p>
    <Button
      text="Перейти к оформлению"
      className="button_white"
      type="button"
      disabled={cookieItems.length === 0}
      onClick={() => {
      }}
    />
  </Fragment>
};
export default Cart;