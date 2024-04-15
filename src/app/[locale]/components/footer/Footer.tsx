"use client";

import "../../styles/footer.css";
import Help from "@/src/app/[locale]/components/HelpClient";
import {DataHelp, Company, Media} from "@/src/app/[locale]/data";
import List from "../List";
import Logo from "../Logo";
import {useAppSelector} from "@/src/app/[locale]/store/hooks";
import {useEffect} from "react";

type FooterProps = {
  dataDelivery: { title: string, content: { title: string, text: string }[] },
  dataReturnAndExchange: { title: string, content: { title: string, text: string }[] },
  dataPayment: { title: string, content: { title: string, text: string }[] },
  dataRule: string
};

const Footer = ({dataDelivery, dataReturnAndExchange, dataPayment, dataRule}: FooterProps) => {
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
        list={DataHelp().list}
        title={DataHelp().title}
        classNameLi="footer_list"
        classNameBlock="footer_block"
        classNameSection="footer_section footer_column_mob"
        classNameTitle="footer_listName footer_listName_mob"
        footer={true}
      />
      <List
        list={Company().list}
        title={Company().title}
        classNameLi="footer_list"
        classNameBlock="footer_block"
        classNameSection="footer_section footer_column_mob"
        classNameTitle="footer_listName footer_listName_mob"
        footer={true}
      />
      <List
        list={Media().list}
        classNameLi="footer_list"
        title={Media().title}
        classNameBlock="footer_block"
        classNameSection="footer_section messengers_mobile"
        classNameTitle="footer_listName title_mobile"
      />
    </div>
    <p className="footer_text">{dataRule}
      © 2022 sarafancollection.ru</p>
    {delivery && <Help data={dataDelivery} cart={false}/>}
    {exchange && <Help data={dataReturnAndExchange} cart={false}/>}
    {payment && <Help data={dataPayment} cart={false}/>}
    {cart && <Help cart={true}/>}
  </div>
};
export default Footer;