'use client'

import "../../styles/header.css";
import Logo from "../Logo";
import Search from "../Search";
import List from "../List";
import Link from "next/link";
import {Menu} from "../../data";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import {setSection} from "@/app/store/component/componentSlice";
import {setCart} from "@/app/store/component/componentSlice";
import {getLikeCookie, getOrderCookie, getUserSales, getUserTotal} from "@/app/store/product/cookieSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.user);
  const orders = useAppSelector(state => state.cookie.orderItems);

  const [token, setToken] = useState<string | null>("");
  const [countOrders, setCountOrders] = useState(0);

  useEffect(() => {
    if (orders && orders[0]?.id) {
      setCountOrders(orders.length);
      dispatch(getUserTotal(orders));
      dispatch(getUserSales(orders));
    }
  }, [orders,dispatch]);

  useEffect(() => {
    if (user.token) {
      setToken(user.token);
      localStorage.setItem("token", user.token);
    }else{
      setToken("");
    }
  }, [user]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    dispatch(getLikeCookie({likeItems:null}));
    dispatch(getOrderCookie({orderItems:[]}));
  }, [dispatch]);

  const myCart = () => {
    dispatch(setCart());
  };

  return <div className="header">
    <List
      list={Menu}
      classNameLi="main_section"
      classNameUl="header_menu"
      myPage={true}
    />
    <Logo/>
    <div className="header_dataUser">
      <Search/>
      <Link
        href="/like"
        onClick={() => dispatch(setSection({title: "", path: ""}))}
      >
        <img className="elem_hov" src="/Like.svg" alt="Page" title="Избранное"/>
      </Link>
      <span
        onClick={() => myCart()}
        className="user_cart"
      >
        <img className="elem_hov" src="/Cart.svg" alt="Cart" title="Моя Корзина"/>
        {orders && orders[0]?.id && <span className="count_items">{countOrders}</span>}
      </span>
      {!token && <Link href="/log"><img className="elem_hov" src="/User.svg" alt="Login"/></Link>}
      {token &&
        <Link href="/personal_data"><img className="elem_hov account_img" src="/account.svg" alt="Account" title="Личный кабинет"/></Link>}
    </div>
  </div>
};
export default Header;