"use client";

import "../../styles/mainSlider.css";
import Button from "../Button";
import {DataSlides} from "@/src/app/[locale]/data";

type SlideProps = {
  className: string;
}

const Slide1 = ({className}: SlideProps) => {
  return <div
    className={`wrapper_slider slide1 ${className}`}
  >
    <div className="section_contain locate_right">
      <span className="contain_text">{DataSlides().inform}</span>
      <span className="contain_title">{DataSlides().title}</span>
      <Button className="section_button" text={DataSlides().button} type="button"/>
    </div>
  </div>
};

const Slide2 = ({className}: SlideProps) => {
  return <div
    className={`wrapper_slider slide2 ${className}`}
  >
    <div className="section_contain locate_left">
      <span className="contain_text">{DataSlides().inform}</span>
      <span className="contain_title">{DataSlides().title}</span>
      <Button className="section_button" text={DataSlides().button} type="button"/>
    </div>
  </div>
};

const Slide3 = ({className}: SlideProps) => {
  return <div
    className={`wrapper_slider slide3 ${className}`}
  >
    <div className="section_contain locate_right">
      <span className="contain_text">{DataSlides().inform}</span>
      <span className="contain_title">{DataSlides().title}</span>
      <Button className="section_button" text={DataSlides().button} type="button"/>
    </div>
  </div>
};

const Slide4 = ({className}: SlideProps) => {
  return <div
    className={`wrapper_slider slide4 ${className}`}
  >
    <div className="section_contain locate_left">
      <span className="contain_text">{DataSlides().inform}</span>
      <span className="contain_title">{DataSlides().title}</span>
      <Button className="section_button" text={DataSlides().button} type="button"/>
    </div>
  </div>
};
export {Slide1, Slide2, Slide3, Slide4};