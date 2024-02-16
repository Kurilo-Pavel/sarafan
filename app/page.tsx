"use client";
import "./styles/mainPage.css";
import Collection from "./components/Collection";
import MainInform from "./components/MainInform";
import MiniCollection from "./components/MiniCollection";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {useEffect, useState} from "react";
import {getItems} from "@/app/store/product/productSlice";
import {Slide1, Slide2, Slide3, Slide4} from "./components/mainSlider/Slides";
import classNames from "classnames";

let count = 0;

const MainPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.product.products)

  useEffect(() => {
    dispatch(getItems(1));
  }, [dispatch]);

  const slides = [
    {
      style: "",
      component: function () {
        return <Slide1 className={this.style}/>;
      }
    },
    {
      style: "",
      component: function () {
        return <Slide2 className={this.style}/>;
      }
    },
    {
      style: "",
      component: function () {
        return <Slide3 className={this.style}/>;
      }
    },
    {
      style: "",
      component: function () {
        return <Slide4 className={this.style}/>;
      }
    },
  ];
  const [visibleSlide, setVisibleSlide] = useState(<Slide1 className=""/>);
  const [hiddenSlide, setHiddenSlide] = useState(<Slide1 className=""/>);

  const moveLeft = () => {
    slides[count].style = "moveMainLeft";
    setVisibleSlide(slides[count].component());
    if (count >= slides.length - 1) {
      count = 0;
    } else {
      count = ++count;
    }
    slides[count].style = "moveSubLeft";
    setHiddenSlide(slides[count].component());
  };

  const moveRight = () => {
    slides[count].style = "moveMainRight";
    setVisibleSlide(slides[count].component());
    if (count <= 0) {
      count = slides.length - 1;
    } else {
      count = --count;
    }
    slides[count].style = "moveSubRight";
    setHiddenSlide(slides[count].component());
  };

  const showSlide = (num: number) => {
    slides[count].style = "hideBlock";
    setHiddenSlide(slides[count].component());
    slides[num].style = "showBlock";
    setVisibleSlide(slides[num].component());
    count = num;
  };

  return <>
    <section className="main_page">
      <div className="main_wrapper">
        {visibleSlide}
        {hiddenSlide}
      </div>
      <div className="section_arrows">
        <span className="arrow" onClick={moveRight}>{"<"}</span>
        <span className="arrow" onClick={moveLeft}>{">"}</span>
      </div>
      <div className="main_slider">
        <span className={classNames("slider_circle", {"choose_circle": count === 0})} onClick={() => showSlide(0)}/>
        <span className={classNames("slider_circle", {"choose_circle": count === 1})} onClick={() => showSlide(1)}/>
        <span className={classNames("slider_circle", {"choose_circle": count === 2})} onClick={() => showSlide(2)}/>
        <span className={classNames("slider_circle", {"choose_circle": count === 3})} onClick={() => showSlide(3)}/>
      </div>
    </section>
    <section className="collection">
      {items.length > 0 && <Collection
        title={"Новая коллекция"}
        slider={false}
        classCard="collection_item"
        classImage="small_img"
        items={[items[2], items[3], items[4], items[5]]}
      />}
      {items.length > 0 && <MiniCollection
        items={[items[0], items[1]]}
        classImage="card_main_page"
        classCard="collection_item"
      />}
      <MainInform/>
      {items[0] && <Collection
        title={"Успей купить"}
        slider={true}
        classCard="collection_item"
        classImage="small_img"
        items={[items[6], items[7], items[8], items[9], items[10], items[11]]}
      />}
    </section>
  </>
};
export default MainPage;