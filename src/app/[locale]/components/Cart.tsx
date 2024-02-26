"use client";
import "@/src/app/[locale]/styles/cart.css";
import Button from "@/src/app/[locale]/components/Button";
import {Fragment, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import classNames from "classnames";
import {changeOrderCookie, getOrderCookie} from "@/src/app/[locale]/store/product/cookieSlice";
import {Link, useRouter} from "@/src/navigation";
import {
  resetHelp,
} from "@/src/app/[locale]/store/component/componentSlice";
import {useLocale} from "next-intl";
import {DataCart} from "@/src/app/[locale]/data";

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

type CartProps = {
  setIsModal: (value: boolean) => void;
  setProduct: (value: string) => void;
}

const Cart = ({setIsModal, setProduct}: CartProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locale = useLocale();

  const orderItems = useAppSelector(state => state.cookie.orderItems);
  const userTotal = useAppSelector(state => state.cookie.userTotal);
  const userSales = useAppSelector(state => state.cookie.userSales);

  const [itemsCost, setItemsCost] = useState(0);

  useEffect(() => {
    dispatch(getOrderCookie());
  }, [dispatch]);

  useEffect(() => {
    if (userTotal !== null && userSales !== null) {
      setItemsCost(userTotal - userSales);
    }
  }, [userTotal]);

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
    <h1 className="help_title">{DataCart().title}</h1>
    {orderItems.length > 0 && <div className="items_field">
      {orderItems.map((item, index) => <div key={index} className="item_block">
        <div className="image_wrapper">
          <img
            src={item.main_img}
            alt={item.id ? item.id.toString() : "clothes"}
            className="item_image"
          />
        </div>
        <div className="item_data">
          <Link href={`/categories/${item.category}/${item.id}` as "/"} locale={locale}
                className="item_title">{item.name}</Link>
          <div className="price_block">
            {item.sale && <span
              className="price_sale">{Math.round((item.price ? item.price : 0) * (100 - item.sale) / 100)} {DataCart().cash}</span>}
            <span className={classNames({
              "item_price": !item.sale,
              "old_price": item.sale
            })}>{item.price} {DataCart().cash}</span>
          </div>
          <div className="param_block">
            <span>{DataCart().size}</span>
            <span className="selected_param selected_size">{item.size}</span>
          </div>
          <div className="param_block">
            <span>{DataCart().color}</span>
            <span className="selected_param selected_color">{item.color}</span>
          </div>
          <div className="param_block">
            <span>{DataCart().count}</span>
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
              text={DataCart().delete}
              className="delete_title"
              onClick={() => {
                deleteItem(JSON.stringify(item));
              }}/>
          </div>
        </div>
      </div>)}
    </div>}
    <p className="cost_items">
      {DataCart().cost} {orderItems[0] && <><span>{itemsCost}</span> {DataCart().cash}</>}
    </p>
    <Button
      text={DataCart().button}
      className="button_white"
      type="button"
      disabled={orderItems.length === 0}
      onClick={() => {
        dispatch(resetHelp({cart: false, delivery: false, payment: false, exchange: false}));
        router.replace("/myCart" as "/", {locale: locale});
      }}
    />
  </Fragment>
};
export default Cart;