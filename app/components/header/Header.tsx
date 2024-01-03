'use client'

import "../../styles/header.css";
import Logo from "../Logo";
import Search from "../Search";
import List from "../List";
import Link from "next/link";
import {Menu} from "../../data";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import {setSection} from "@/app/store/product/productSlice";
import {setCart} from "@/app/store/component/componentSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.login.user);
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    if (user.token) {
      setToken(user.token);
      localStorage.setItem("token", user.token);
    }
  }, [user]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

const myCart = () => {
  dispatch(setCart);
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
        onClick={()=>dispatch(setSection({title:"",path:""}))}
      >
        <img className="elem_hov" src="/Like.svg" alt="Page"/>
      </Link>
      <span
        onClick={()=>myCart()}
      >
        <img className="elem_hov" src="/Cart.svg" alt="Cart"/>
      </span>
      {!token && <Link href="/log"><img className="elem_hov" src="/User.svg" alt="Login"/></Link>}
      {token && <Link href="/personal_data"><img className="elem_hov account_img" src="/account.svg" alt="Account"/></Link>}
    </div>
  </div>
};
export default Header;