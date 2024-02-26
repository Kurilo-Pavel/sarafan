"use client"
import Path from "@/src/app/[locale]/components/Path";
import {useAppDispatch} from "@/src/app/[locale]/store/hooks";
import {useEffect} from "react";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";

type ShopsProps = {
  data: {
    path: string;
  }
}
const OurShops = ({data}: ShopsProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSection({title: "", path: ""}));
  }, [dispatch]);

  return <div className="page">
    <Path page={data.path}/>
  </div>
};

export default OurShops;