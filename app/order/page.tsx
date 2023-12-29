"use client";
import "../styles/order.css";

const  Order = () => {
  return <div className="page">
    <div className="section_path">
      <p className="path">Главная / Корзина / Оформление заказа</p>
    </div>

    <section className="checkout">
      <h1 className="checkout_title">Оформление заказа</h1>
      <div className="checkout_order">
        <div className="checkout_information">
          <div className="checkout_data">
            <h3 className="data_title">Способ доставки</h3>
            <div className="data_field">
              <label htmlFor="self-delivery" className="data_label">
                <input type="checkbox" id="self-delivery" className="data_checkbox"/>
                Самовывоз
              </label>
              <span className="data_cost">Бесплатно</span>
            </div>
            <div className="data_field">
              <label htmlFor="courier" className="data_label">
                <input type="checkbox" id="courier" className="data_checkbox"/>
                Доставка курьером
              </label>
              <span className="data_cost">от 300 руб.</span>
            </div>
            <div className="data_field">
              <label htmlFor="courier_sdek" className="data_label">
                <input type="checkbox" id="courier_sdek" className="data_checkbox"/>
                Доставка курьером СДЭК
              </label>
              <span className="data_cost">от 300 руб.</span>
            </div>
            <div className="data_field">
              <label htmlFor="self-delivery_sdek" className="data_label">
                <input type="checkbox" id="self-delivery_sdek" className="data_checkbox"/>
                Самовывоз СДЭК
              </label>
              <span className="data_cost">от 200 руб.</span>
            </div>
            <div className="data_field">
              <label htmlFor="post" className="data_label">
                <input type="checkbox" id="post" className="data_checkbox"/>
                Почта
              </label>
              <span className="data_cost">от 200 руб.</span>
            </div>
          </div>
          <div className="checkout_data">
            <h3 className="data_title">Способ оплаты</h3>
            <label htmlFor="card" className="data_label">
              <input type="checkbox" id="card" className="data_checkbox"/>
              Online оплата картой
            </label>
            <label htmlFor="cash" className="data_label">
              <input type="checkbox" id="cash" className="data_checkbox"/>
              Оплата наличными при получении
            </label>
          </div>
          <div className="checkout_data">
            <h3 className="data_title">Контактные данные</h3>
            <label>
              <input type="text" placeholder="Фамилия *" className="input"/>
            </label>
            <label>
              <input type="text" placeholder="Имя *" className="input"/>
            </label>
            <label>
              <input type="text" placeholder="Отчество *" className="input"/>
            </label>
            <label>
              <input type="tel" placeholder="Телефон *" className="input"/>
            </label>
            <label>
              <input type="email" placeholder="E-mail *" className="input"/>
            </label>
            <p className="data_information">* Поля, обязательные для заполнения</p>
          </div>
          <button className="button_black">Оплатить</button>
          <p className="order_rules">
            Нажимая на кнопку «оплатить», я принимаю условия публичной оферты и политики конфиденциальности
          </p>
        </div>
        <div className="checkout_cost">
          <div className="cost_information">
            <span className="cost_text">Общая стоимость</span>
            <span className="cost_value">14 498 руб.</span>
          </div>
          <div className="cost_information">
            <span className="cost_text">Размер скидки</span>
            <span className="cost_value">750 руб.</span>
          </div>
          <div className="cost_information">
            <span className="cost_text">Доставка</span>
            <span className="cost_value">0 руб.</span>
          </div>
          <div className="cost_information">
            <span className="cost_text">Промокод</span>
            <span className="cost_value">0 руб.</span>
          </div>
          <hr className="line"/>
          <div className="cost_information cost_bold">
            <span className="cost_text">Итого</span>
            <span className="cost_value">14 498 руб.</span>
          </div>
          <hr className="line"/>
          <span className="cost_information">Есть промокод?</span>
          <div className="cost_information">
            <label className="code_label">
              <input type="text" placeholder="Введите промокод" className="input"/>
            </label>
            <button className="button_white">Применить</button>
          </div>
        </div>
      </div>
    </section>
  </div>
};
export default Order;