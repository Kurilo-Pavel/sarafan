"use client";

import "../../styles/mainSlider.css";
import Button from "../Button";

type SlideProps = {
  className: string;
}

const Slide1 = ({className}:SlideProps) => {
  return <div className={`wrapper_slider ${className}`}>
    <img src="png/Rectangle_33.png" className="background" alt="Main"/>
    <div className="section_contain locate_right">
      <span className="contain_text">Весна - лето 2022</span>
      <span className="contain_title">WITH LOVE, TO YOU</span>
      <Button className="section_button" text="Перейти в каталог" type="button"/>
    </div>
  </div>
};

const Slide2 = ({className}:SlideProps) => {
  return <div className={`wrapper_slider ${className}`}>
    <img src="png/photo_3.jpg" className="background" alt="Main"/>
    <div className="section_contain locate_left">
      <span className="contain_text">Весна - лето 2022</span>
      <span className="contain_title">WITH LOVE, TO YOU</span>
      <Button className="section_button" text="Перейти в каталог" type="button"/>
    </div>
  </div>
};

const Slide3 = ({className}:SlideProps) => {
  return <div className={`wrapper_slider ${className}`}>
    <img src="png/photo.jpg" className="background" alt="Main"/>
    <div className="section_contain locate_right">
      <span className="contain_text">Весна - лето 2022</span>
      <span className="contain_title">WITH LOVE, TO YOU</span>
      <Button className="section_button" text="Перейти в каталог" type="button"/>
    </div>
  </div>
};

const Slide4 = ({className}:SlideProps) => {
  return <div className={`wrapper_slider ${className}`}>
    <img src="png/photo_6.jpg" className="background" alt="Main"/>
    <div className="section_contain locate_left">
      <span className="contain_text">Весна - лето 2022</span>
      <span className="contain_title">WITH LOVE, TO YOU</span>
      <Button className="section_button" text="Перейти в каталог" type="button"/>
    </div>
  </div>
};
export {Slide1, Slide2, Slide3, Slide4};