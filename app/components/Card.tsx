'use client'
import "../styles/card.css";
import {useEffect, useState} from "react";
import Link from "next/link";
import classNames from "classnames";
import {userCookie, addCookie, deleteCookie} from "@/app/script";

type CardProps = {
  id: number;
  image: string;
  title: string;
  price: number;
  classCard: string;
  classImage: string;
  isLike: boolean;
  category: string;
  sale: number | null;
};

const Card = ({image, title, price, classCard, classImage, isLike, id, category, sale}: CardProps) => {
  const [isFullLike, setIsFullLike] = useState(false);
  const [isClickLike, setIsClickLike] = useState(false);

  useEffect(() => {
    const idCookie: string[] = userCookie("likeItems=")
    idCookie.forEach(idCookie => {
      if (id == idCookie) {
        setIsClickLike(true);
      }
    })
  }, [])


  return <div className={classCard}>
    <div className={`wrapper_image ${classImage}`}>
      {!isClickLike && <img
        src={isClickLike || isFullLike ? "/Like_full_fill.svg" : "/Like_white.svg"}
        alt="like"
        className="item_like"
        onMouseOver={() => setIsFullLike(true)}
        onMouseOut={() => setIsFullLike(false)}
        onClick={() => {
          addCookie(id,"likeItems=");
          setIsClickLike(true);
        }}
      />}
      {isClickLike && <img
        alt="full_like"
        src="/Like_full_fill.svg"
        onClick={() => {
          deleteCookie(id,"likeItems=");
          setIsClickLike(false);
        }}
        className="item_like"/>
      }
      {sale && <div className="sale_block">
        <span className="text_sale">Sale</span>
        <span className="percent_sale">-{sale}%</span>
      </div>}
      <img src={image} alt="image" className={`card_image`}/>
    </div>
    <Link
      className="item_text"
      href={`/categories/${category}/${id}`}
    >
      {title}
    </Link>
    {sale && <span className="price_sale">{Math.round(price * (100 - sale) / 100)} руб</span>}
    <span className={classNames({"item_price": !sale, "old_price": sale})}>{price} руб.</span>
  </div>
};
export default Card;