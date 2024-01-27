"use client";

import "../../styles/footer.css";
import {Delivery, Company, Media, ReturnAndExchange} from "@/app/data";
import Help from "../Help";
import List from "../List";
import Logo from "../Logo";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {setDelivery, setExchange, setPayment} from "@/app/store/component/componentSlice";
import {useEffect} from "react";

const Footer = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.component.cart);
  const delivery = useAppSelector(state => state.component.delivery);
  const exchange = useAppSelector(state => state.component.exchange);
  const payment = useAppSelector(state => state.component.payment);

  useEffect(() => {
    if (cart || delivery || exchange || payment) {
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
    }
  }, [cart, delivery, exchange, payment]);

  return <div className="footer">
    <div className="footer_contain">
      <Logo/>
      <div className="footer_column">
        <span className="footer_listName">Помощь</span>
        <span className="footer_list" onClick={() => dispatch(setPayment(!payment))}>Оплата</span>
        <span className="footer_list" onClick={() => dispatch(setDelivery(!delivery))}>Доставка</span>
        <span className="footer_list" onClick={() => dispatch(setExchange(!exchange))}>Возврат и обмен</span>
      </div>
      <List
        list={Company}
        classNameLi="footer_list"
        title="Компания"
        classNameUl="footer_column"
        classNameTitle="footer_listName"
      />
      <List
        list={Media}
        classNameLi="footer_list"
        title="Следите за нами"
        classNameUl="footer_column"
        classNameTitle="footer_listName"
      />
    </div>
    <p className="footer_text">Все права защищены.Пользовательское соглашение.Политика конфиденциальности
      © 2022 sarafancollection.ru</p>
    {delivery && <Help data={Delivery} cart={false}/>}
    {exchange && <Help data={ReturnAndExchange} cart={false}/>}
    {cart && <Help cart={true}/>}
  </div>
};
export default Footer;