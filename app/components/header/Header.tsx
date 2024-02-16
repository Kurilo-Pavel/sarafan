'use client'
import "../../styles/header.css";
import Logo from "../Logo";
import Search from "../Search";
import List from "../List";
import Link from "next/link";
import {Menu} from "../../data";
import {jwtDecode} from "jwt-decode";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {Fragment, useEffect, useState} from "react";
import {setSection} from "@/app/store/component/componentSlice";
import {setCart} from "@/app/store/component/componentSlice";
import {getLikeCookie, getOrderCookie, getUserSales, getUserTotal} from "@/app/store/product/cookieSlice";
import {setUserData, User} from "@/app/store/user/userSlice";
import {input} from "zod";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const orders = useAppSelector(state => state.cookie.orderItems);

  const [token, setToken] = useState<string | null>(null);
  const [countOrders, setCountOrders] = useState(0);


  useEffect(() => {
    setToken(localStorage.getItem("token"));
    dispatch(getLikeCookie());
    dispatch(getOrderCookie());
  }, [dispatch]);

  useEffect(() => {
    if (orders && orders[0]?.id) {
      setCountOrders(orders.length);
      dispatch(getUserTotal(orders));
      dispatch(getUserSales(orders));
    }
  }, [orders, dispatch]);

  useEffect(() => {
    if (user.token) {
      setToken(user.token);
      typeof window !== "undefined" ? localStorage.setItem("token", user.token) : null;
    }
    if (!user.token && !localStorage.getItem("token")) {
      setToken(null);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      const userData = jwtDecode(token) as User;
      userData.token = token;
      dispatch(setUserData(userData));
    }
  }, [token]);


  const myCart = () => {
    dispatch(setCart(true));
  };

  return <div className="header_wrapper">
    <div className="header">
      <input type="checkbox" id="burger"/>
      <label htmlFor="burger" className="burger">
        <span className="menu_burger"/>
      </label>
      <List
        list={Menu}
        classNameBlock="menu_block"
        classNameLi="main_section"
        classNameSection="header_menu"
      />
      <Logo/>
      <div className="header_dataUser">
        <div className="hidden"><Search/></div>
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
          <Link href="/personal_data"><img className="elem_hov account_img" src="/account.svg" alt="Account"
                                           title="Личный кабинет"/></Link>}
      </div>
    </div>
    <div className="visible"><Search/></div>
  </div>
};
export default Header;