import "@/app/styles/myOrders.css";
import {useState} from "react";
import {deleteCookie, userCookie} from "@/app/script";
import Button from "@/app/components/Button";

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

  const [orders, setOrders] = useState<Orders>(userCookie("paidOrder="));

  const removeOrder = (item: Order) => {
    setOrders(deleteCookie(JSON.stringify(item), "paidOrder="));
  };

  return <div className="user_order">
    {orders.map((order, index: number) =>
      <div className="order" key={index}>
        <div className="order_block">
          <span className="order_title">Номер заказа</span>
          <span>{order.id}</span>
        </div>
        <div className="order_block">
          <span>Дата заказа</span>
          <span>{order.date} ({order.time})</span>
        </div>
        <div className="order_items">
          {order.orders.map((item, index) =>
            <div key={index} className="order_item">
              <img src={item.main_img} className="order_image" alt="clothes"/>
              <div className="item_data">
                <span className="order_title">{item.name}</span>
                <div className="item_param">
                  <span>Цвет:</span>
                  <span>{item.color}</span>
                </div>
                <div className="item_param">
                  <span>Размер:</span>
                  <span>{item.size}</span>
                </div>
                <div className="item_param">
                  <span>Количество:</span>
                  <span>{item.count}</span>
                </div>
                <div className="item_param">
                  <span>Цена:</span>
                  {item.price && <span>{item.price * (item.sale ? item.sale / 100 : 1)} руб.</span>}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="order_block">
          <div className="order_cost">
            <span>Стоимость заказа:</span>
            <span>{order.cost} руб.</span>
          </div>
          <div className="delete_order">
            <img
              src="/trash.svg"
              alt="delete"
              className="delete_icon"
            />
            <Button
              text="Удалить"
              className="delete_button"
              type="button"
              onClick={() => removeOrder(order)}
            />
          </div>
        </div>
        <span className="order_status">Оплачено</span>
      </div>
    )}

  </div>
};
export default MyOrders;