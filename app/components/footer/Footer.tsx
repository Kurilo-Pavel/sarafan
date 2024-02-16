"use client";

import "../../styles/footer.css";
import Help from "@/app/components/Help";
import {Delivery, DataHelp, Company, Media, ReturnAndExchange} from "@/app/data";
import List from "../List";
import Logo from "../Logo";
import {useAppSelector} from "@/app/store/hooks";
import {useEffect} from "react";

const Footer = () => {
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
      <List
        list={DataHelp}
        title="Помощь"
        classNameLi="footer_list"
        classNameBlock="footer_block"
        classNameSection="footer_section footer_column_mob"
        classNameTitle="footer_listName footer_listName_mob"
        footer={true}
      />
      <List
        list={Company}
        title="Компания"
        classNameLi="footer_list"
        classNameBlock="footer_block"
        classNameSection="footer_section footer_column_mob"
        classNameTitle="footer_listName footer_listName_mob"
        footer={true}
      />
      <List
        list={Media}
        classNameLi="footer_list"
        title="Следите за нами"
        classNameBlock="footer_block"
        classNameSection="footer_section messengers_mobile"
        classNameTitle="footer_listName title_mobile"
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