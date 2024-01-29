'use client'
import "../styles/card.css";
import {useEffect, useState} from "react";
import Link from "next/link";
import classNames from "classnames";
import {addLikeCookie, deleteLikeCookie} from "@/app/store/product/cookieSlice";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";

type CardProps = {
  category: string;
  id: number | null;

  image: string;
  title: string;
  price: number | null;
  classCard: string;
  classImage?: string;
  isLike?: boolean;

  sale: number | null;
};

const Card = ({image, title, price, classCard, classImage, isLike, id, category, sale}: CardProps) => {
  const dispatch = useAppDispatch();
  const likes = useAppSelector(state => state.cookie.likeItems);

  const [isFullLike, setIsFullLike] = useState(isLike);
  const [isClickLike, setIsClickLike] = useState(false);

  useEffect(() => {
    if (likes.length && likes[0].id) {
      likes.forEach(idCookie => {
        if (id === idCookie.id) {
          setIsClickLike(true);
        }
      });
    }
  }, []);

  return <div className={classCard}>
    <div className={`wrapper_image ${classImage}`}>
      {!isClickLike &&
        <img
          src={isClickLike || isFullLike ? "/Like_full_fill.svg" : "/Like_white.svg"}
          alt="like"
          className="item_like"
          onMouseOver={() => setIsFullLike(true)}
          onMouseOut={() => setIsFullLike(false)}
          onClick={() => {
            dispatch(addLikeCookie(JSON.stringify({id: id})));
            setIsClickLike(true);
          }}
        />}
      {isClickLike && <img
        alt="full_like"
        src="/Like_full_fill.svg"
        onClick={() => {
          dispatch(deleteLikeCookie(JSON.stringify({id: id})));
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
    {sale && <span className="price_sale">{price ? Math.round(price * (100 - sale) / 100) : 0} руб</span>}
    <span className={classNames({"item_price": !sale, "old_price": sale})}>{price} руб.</span>
  </div>
};
export default Card;