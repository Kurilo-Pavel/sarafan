"use client";
import "../styles/aboutUs.css";
import Path from "../components/Path";
import {useAppDispatch} from "@/src/app/[locale]/store/hooks";
import {useEffect} from "react";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";

type AboutUsProps = {
  data: {
    [key:string]:string;
  }
}

const AboutUs = ({data}: AboutUsProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSection({title: "", path: ""}));
  }, [dispatch]);

  return <div className="page">
    <Path page={data.title}/>
    <h2 className="page_title">{data.title}</h2>
    <div className="aboutUs_content">
      <p className="aboutUs_text">{data.description}</p>
      <img src="/png/about_us 3.png" alt="" className="aboutUs_img aboutUs_img_main"/>
      <img src="/png/about_us 4.png" alt="" className="aboutUs_img aboutUs_img_sub"/>
    </div>
  </div>
};
export default AboutUs;