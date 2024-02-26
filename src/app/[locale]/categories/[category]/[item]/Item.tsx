"use client";

import "@/src/app/[locale]/styles/item.css";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import {getItem} from "@/src/app/[locale]/store/product/productSlice";
import Path from "@/src/app/[locale]/components/Path";
import Button from "@/src/app/[locale]/components/Button";
import Select from "@/src/app/[locale]/components/Select";
import classNames from "classnames";
import {setHelp, setSection} from "@/src/app/[locale]/store/component/componentSlice";
import {addOrderCookie} from "@/src/app/[locale]/store/product/cookieSlice";
import Modal from "@/src/app/[locale]/components/Modal";
import {useLocale} from "next-intl";

type ItemProps = {
  params: { item: string };
  dataItem:{
    color: string;
    selectSize: string;
    table: string;
    button: string;
    description: string;
    descriptionItem: string;
    care: string;
    descriptionCare: string;
    errorColor: string;
    errorSize: string;
    delivery: string;
    exchange: string;
    cash: string;
  }
};

const Item = ({params,dataItem}: ItemProps) => {
  const dispatch = useAppDispatch();
  const id = Number(decodeURI(params.item));
  const item = useAppSelector((state => state.product.product));
  const locale = useLocale();

  const [isModal, setIsModal] = useState(false);
  const [title, setTitle] = useState("");
  const [mainImage, setMainImage] = useState<string | undefined>("");
  const [itemColor, setItemColor] = useState<string>("");
  const [itemSize, setItemSize] = useState<string>("");
  const [descriptionItem, setDescriptionItem] = useState<boolean | string>("");
  const [consistItem, setConsistItem] = useState<boolean | string>("");

  useEffect(() => {
    dispatch(getItem({id, locale}));
  }, [id,dispatch]);

  useEffect(() => {
    if (item.main_img) {
      dispatch(setSection({title: item.category, path: `categories/${item.category}`}));
      setMainImage(item.main_img);
    }
  }, [dispatch, item]);

  return <div className="page">
    <Path page={item.name}/>
    <div className="item_section">
      <div className="item_collection">
        <img src={mainImage} alt="image" className="sub_image"/>
        {item.sub_img && item.sub_img.split(",").map((image: string, index: number) => {
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
          <span className="item_coins">{dataItem.cash}</span>
        </div>
        <p className="item_description">{item.description}</p>
        <div className="item_color">
          <p className="color_name">{dataItem.color}:<span className="item_getColor">{itemColor}</span></p>
          <div className="section_colors">
            {item.colors && item.colors.map((color: string, index: number) =>
              <span key={index} className={classNames("color", {"chooseColor": itemColor === color})}
                    style={{"background": `${color}`}}
                    onClick={() => setItemColor(color)}/>
            )}
          </div>
        </div>
        {item.sizes && <Select
          arrayValue={item.sizes.map((size: string) => {
            return {name: size, value: size};
          })}
          className="item_selection"
          setSort={setItemSize}
          disabledValue={dataItem.selectSize}
        />}

        <p className="table_size">{dataItem.table}</p>
        <Button
          text={dataItem.button}
          className="contact_feedback_button"
          type="button"
          onClick={() => {
            if (!itemColor) {
              setIsModal(true);
              setTitle(dataItem.errorColor);
            } else if (!itemSize) {
              setIsModal(true);
              setTitle(dataItem.errorSize);
            } else {
              dispatch(addOrderCookie(JSON.stringify({
                id: item.id,
                color: itemColor,
                size: itemSize,
                main_img: item.main_img,
                name: item.name,
                price: item.price,
                category: item.category,
                sale: item.sale,
                count: 1,
              })));
            }
          }}
        />
        <span
          className="item_delivery"
          onClick={() => dispatch(setHelp("delivery"))}
        >{dataItem.delivery}</span>
        <span
          className="item_delivery"
          onClick={() => dispatch(setHelp("exchange"))}
        >{dataItem.exchange}</span>
        <div className="item_details">
          <div className="item_field">
            <h3>{dataItem.description}</h3>
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
            {dataItem.descriptionItem}
          </p>
        </div>
        <div className="item_details">
          <div className="item_field">
            <h3>{dataItem.care}</h3>
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
            {dataItem.descriptionCare}
          </p>
        </div>
      </div>
    </div>
    {isModal && <Modal title={title} isInform={true} setIsModal={setIsModal}/>}
  </div>
};

export default Item;