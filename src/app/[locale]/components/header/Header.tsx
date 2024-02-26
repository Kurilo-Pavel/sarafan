'use client'
import "../../styles/header.css";
import Logo from "../Logo";
import Search from "../Search";
import List from "../List";
import {Link} from "@/src/navigation";
import {Menu, DataIcons} from "@/src/app/[locale]/data";
import {jwtDecode} from "jwt-decode";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";
import {setCart} from "@/src/app/[locale]/store/component/componentSlice";
import {getLikeCookie, getOrderCookie, getUserSales, getUserTotal} from "@/src/app/[locale]/store/product/cookieSlice";
import {setUserData, User} from "@/src/app/[locale]/store/user/userSlice";
import {useLocale} from "next-intl";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const orders = useAppSelector(state => state.cookie.orderItems);
  const locale = useLocale();
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
        list={Menu()}
        classNameBlock="menu_block"
        classNameLi="main_section"
        classNameSection="header_menu"
      />
      <Logo/>
      <div className="header_dataUser">
        <div className="hidden"><Search/></div>
        <Link
          href={"/like" as "/"}
          locale={locale}
          onClick={() => dispatch(setSection({title: "", path: ""}))}
        >
          <img className="elem_hov" src="/Like.svg" alt="Page" title={DataIcons().like}/>
        </Link>
        <span
          onClick={() => myCart()}
          className="user_cart"
        >
        <img className="elem_hov" src="/Cart.svg" alt="Cart" title={DataIcons().cart}/>
          {orders && orders[0]?.id && <span className="count_items">{countOrders}</span>}
      </span>
        {!token &&
          <Link
            href={"/log" as "/"}
            locale={locale}
          >
            <img
              className="elem_hov"
              src="/User.svg"
              alt="Login"
              title={DataIcons().login}
            />
          </Link>
        }
        {token &&
          <Link
            href={"/personal_data" as "/"}
            locale={locale}
          >
            <img
              className="elem_hov account_img"
              src="/account.svg"
              alt="Account"
              title={DataIcons().personalData}
            />
          </Link>
        }
      </div>
    </div>
    <div className="visible"><Search/></div>
  </div>
};
export default Header;