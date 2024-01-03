"use client";

import "../../../styles/item.css";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {getItem} from "@/app/store/product/productSlice";
import Path from "../../../components/Path";
import Button from "@/app/components/Button";
import Select from "@/app/components/Select";
import classNames from "classnames";
import {setDelivery, setExchange} from "@/app/store/component/componentSlice";
import {addCookie} from "@/app/script";

type ItemProps = {
  params: { item: string };
}

const Item = ({params}: ItemProps) => {
  const dispatch = useAppDispatch();
  const id = decodeURI(params.item);
  const item = useAppSelector((state => state.product.item));
  const [mainImage, setMainImage] = useState<string|undefined>("");
  const [itemColor, setItemColor] = useState<string|undefined>("");
  const [itemSize, setItemSize] = useState<string|undefined>("");
  const [descriptionItem, setDescriptionItem] = useState<boolean | string>("");
  const [consistItem, setConsistItem] = useState<boolean | string>("");

  useEffect(() => {
      dispatch(getItem(id));
  }, []);

  useEffect(() => {
    console.log(item)
    if (item.colors) {
      setItemColor(item.colors[0]);
    }
    if(item.main_img) {
      setMainImage(item.main_img);
    }

    if (item.size) {
      setItemSize(item.size[0]);
    }
  }, [item]);

  return <div className="page">
    <Path page={item.category + " / " + item.name}/>
    <div className="item_section">
      <div className="item_collection">
        <img src={mainImage} alt="image" className="sub_image"/>
        {item.sub_img && item.sub_img.split(",").map((image:string, index:number) => {
          return image !== mainImage ?
            <img key={index} src={image} alt="image" className="sub_image" onClick={() => setMainImage(image)}/>
            : null
        })}
      </div>
      <div className="main_item">
        <img src={mainImage} alt="main" className="main_image"/>
      </div>
      <div className="data_item">
        <div className="title">
          <h1 className="title_item">{item.name}</h1>
          <span className="item_code">{item.id}</span>
        </div>
        <div className="item_price">
          <span className="item_coins">{item.price}</span>
          <span className="item_coins">руб.</span>
        </div>
        <p className="item_description">{item.description}</p>
        <div className="item_color">
          <p className="color_name">Цвет:<span className="item_getColor">{itemColor}</span></p>
          <div className="section_colors">
            {item.colors && item.colors.map((color:string, index:number) =>
              <span key={index} className="color" style={{"background": `${color}`}}
                    onClick={() => setItemColor(color)}/>
            )}
          </div>
        </div>
        {item.size && <Select
          arrayValue={item.size.map((size:string) => {
            return {name: size, value: size};
          })}
          className="item_selection"
          setSort={setItemSize}
          disabledValue="Выберите размер"
        />}
        <p className="table_size">Таблица размеров</p>
        <Button
          text="Добавить в корзину"
          className="contact_feedback_button"
          type="button"
          onClick={() => addCookie(item.id, "myOrder=")}
        />
        <span className="item_delivery" onClick={() => dispatch(setDelivery)}>Доставка</span>
        <span className="item_delivery" onClick={() => dispatch(setExchange)}>Возврат, обмен</span>
        <div className="item_details">
          <div className="item_field">
            <h3>Описание товара</h3>
            <span
              className={classNames({"plus": !descriptionItem}, {"minus": descriptionItem})}
              onClick={() => setDescriptionItem(!descriptionItem)}
            />
          </div>
          <p
            className={classNames(
              {"description": descriptionItem === ""},
              {"close_description": !descriptionItem},
              {"open_description": descriptionItem})}
          >
            Разнообразный и богатый опыт рамки и место обучения кадров способствует подготовки и реализации форм
            развития. Разнообразный и богатый опыт рамки и место обучения кадров способствует подготовки и реализации
            форм развития.
          </p>
        </div>
        <div className="item_details">
          <div className="item_field">
            <h3>Состав и уход</h3>
            <span
              className={classNames({"plus": !consistItem}, {"minus": consistItem})}
              onClick={() => setConsistItem(!consistItem)}
            />
          </div>
          <p
            className={classNames(
              {"description": consistItem === ""},
              {"close_description": !consistItem},
              {"open_description": consistItem})}
          >
            Разнообразный и богатый опыт рамки и место обучения кадров способствует подготовки и реализации форм
            развития. Разнообразный и богатый опыт рамки и место обучения кадров способствует подготовки и реализации
            форм развития.
          </p>
        </div>
      </div>
    </div>
  </div>
};

export default Item;