import "@/src/app/[locale]/styles/myOrders.css";
import {useState} from "react";
import {deleteCookie, userCookie} from "@/src/app/[locale]/script.mjs";
import Button from "@/src/app/[locale]/components/Button";
import {useTranslations} from "next-intl";

type Order = {
  orders: {
    id: number | null;
    category: string;
    main_img: string;
    name: string;
    price: number | null;
    sale: number | null;
    size: string;
    color: string;
    count: number;
  }[];
  id: string;
  date: string;
  time: string;
  cost: number;
}
type Orders = Order[];

const MyOrders = () => {
  const translate = useTranslations("MyOrders");
  const globalTr = useTranslations("Global");
  const [orders, setOrders] = useState<Orders>(userCookie("paidOrder="));

  const removeOrder = (item: Order) => {
    setOrders(deleteCookie(JSON.stringify(item), "paidOrder="));
  };

  return <div className="user_order">
    {orders.map((order, index: number) =>
      <div className="order" key={index}>
        <div className="order_block">
          <span className="order_title">{translate("order")}</span>
          <span>{order.id}</span>
        </div>
        <div className="order_block">
          <span>{translate("dateOrder")}</span>
          <span>{order.date} ({order.time})</span>
        </div>
        <div className="order_items">
          {order.orders.map((item, index) =>
            <div key={index} className="order_item">
              <img src={item.main_img} className="order_image" alt="clothes"/>
              <div className="item_data">
                <span className="order_title">{item.name}</span>
                <div className="item_param">
                  <span>{globalTr("color")}:</span>
                  <span>{item.color}</span>
                </div>
                <div className="item_param">
                  <span>c:</span>
                  <span>{item.size}</span>
                </div>
                <div className="item_param">
                  <span>{globalTr("count")}:</span>
                  <span>{item.count}</span>
                </div>
                <div className="item_param">
                  <span>{globalTr("price")}:</span>
                  {item.price && <span>{item.price * (item.sale ? item.sale / 100 : 1)} {globalTr("cash")}</span>}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="order_block">
          <div className="order_cost">
            <span>{translate("costOrder")}:</span>
            <span>{order.cost} {globalTr("cash")}</span>
          </div>
          <div className="delete_order">
            <img
              src="/trash.svg"
              alt={globalTr("delete")}
              className="delete_icon"
            />
            <Button
              text={globalTr("delete")}
              className="delete_button"
              type="button"
              onClick={() => removeOrder(order)}
            />
          </div>
        </div>
        <span className="order_status">{translate("paid")}</span>
      </div>
    )}

  </div>
};
export default MyOrders;