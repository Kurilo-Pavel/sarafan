"use client";
import "@/app/styles/cart.css";
import Button from "@/app/components/Button";
import {Fragment, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import classNames from "classnames";
import {changeOrderCookie, deleteOrderCookie, getOrderCookie} from "@/app/store/product/cookieSlice";
import Link from "next/link";
import {
  resetHelp,
} from "@/app/store/component/componentSlice";
import {useRouter} from "next/navigation";
import Modal from "@/app/components/Modal";

type Item = {
  id: number | null;
  category: string;
  main_img: string;
  name: string;
  price: number | null;
  sale: number | null;
  size: string;
  color: string;
  count: number;
};

let marker = true;

const Cart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const orderItems = useAppSelector(state => state.cookie.orderItems);
  const userTotal = useAppSelector(state => state.cookie.userTotal);
  const userSales = useAppSelector(state => state.cookie.userSales);

  const [isModal, setIsModal] = useState(false);
  const [cookieItems, setCookieItems] = useState<Item[]>([]);
  const [itemsCost, setItemsCost] = useState(0);
  const [product, setProduct] = useState<string>("");

  let items: Item[] = [];

  useEffect(() => {
    dispatch(getOrderCookie({orderItems: []}));
  }, [dispatch]);

  useEffect(() => {
    if (orderItems.length && orderItems[0].id) {
      orderItems.forEach(item => {
        items = [...items, item];
        setCookieItems(items);
      });
      marker = false;

    }
  }, [dispatch, orderItems]);

  useEffect(() => {
    if (userTotal !== null && userSales !== null) {
      setItemsCost(userTotal - userSales);
    }
  }, [userTotal]);


  const handleClick = () => {
    dispatch(deleteOrderCookie(product));
    setCookieItems(cookieItems.filter(value => JSON.stringify(value) !== product));
    marker = true;
  };

  const plusCount = (data: Item) => {
    orderItems.forEach(item => {
      if (JSON.stringify(item) === JSON.stringify(data)) {
        dispatch(changeOrderCookie({item: JSON.stringify(data), param: JSON.stringify({count: data.count + 1})}));
      }
    });
  };

  const minusCount = (data: Item) => {
    if (data.count > 1) {
      orderItems.forEach(item => {
        if (JSON.stringify(item) === JSON.stringify(data)) {
          dispatch(changeOrderCookie({item: JSON.stringify(data), param: JSON.stringify({count: data.count - 1})}));
        }
      });
    }
  };

  const deleteItem = (item: string) => {
    setIsModal(true);
    setProduct(item);
  };

  return <Fragment>
    <h1 className="help_title">Моя корзина</h1>
    <div className="items_field">
      {cookieItems[0] && cookieItems.map((item, index) => <div key={index} className="item_block">
        <div className="image_wrapper">
          <img
            src={item.main_img}
            alt={item.id ? item.id.toString() : "clothes"}
            className="item_image"
          />
        </div>
        <div className="item_data">
          <Link href={`/categories/${item.category}/${item.id}`} className="item_title">{item.name}</Link>
          <div className="price_block">
            {item.sale && <span
              className="price_sale">{Math.round((item.price ? item.price : 0) * (100 - item.sale) / 100)} руб</span>}
            <span className={classNames({"item_price": !item.sale, "old_price": item.sale})}>{item.price} руб.</span>
          </div>
          <div className="param_block">
            <span>Размер</span>
            <span className="selected_param selected_size">{item.size}</span>
          </div>
          <div className="param_block">
            <span>Цвет</span>
            <span className="selected_param selected_color">{item.color}</span>
          </div>
          <div className="param_block">
            <span>Количество</span>
            <div className="item_counter">
              <span className="count_button" onClick={() => minusCount(item)}>-</span>
              <span className="count">{item.count}</span>
              <span className="count_button" onClick={() => plusCount(item)}>+</span>
            </div>
          </div>
          <div className="delete_block">
            <img
              src="/trash.svg"
              alt="delete"
              className="delete_icon"
            />
            <Button
              type="button"
              text="Удалить"
              className="delete_title"
              onClick={() => {
                deleteItem(JSON.stringify(item));
              }}/>
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
        dispatch(resetHelp());
        router.push("/myCart");
      }}
    />
    {isModal && <Modal
      title={"Удалить товар из корзины"}
      isInform={false}
      setIsModal={setIsModal}
      successHandle={handleClick}
    />}
  </Fragment>
};
export default Cart;