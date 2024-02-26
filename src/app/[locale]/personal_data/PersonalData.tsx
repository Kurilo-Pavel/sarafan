"use client";
import "@/src/app/[locale]/styles/personalData.css";
import PersonalMenu from "@/src/app/[locale]/components/PersonalMenu";
import Path from "@/src/app/[locale]/components/Path";
import MyOrders from "@/src/app/[locale]/components/MyOrders";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import UserData from "@/src/app/[locale]/components/UserData";
import Modal from "@/src/app/[locale]/components/Modal";
import {resetMessage} from "@/src/app/[locale]/store/user/userSlice";
import {useEffect, useState} from "react";
import {setSection} from "@/src/app/[locale]/store/component/componentSlice";

type PersonalDataProps = {
  data: {
    pathInform: string;
    pathOrders: string;
    title: string;
  }
}

const PersonalData = ({data}: PersonalDataProps) => {
  const dispatch = useAppDispatch();
  const userInform = useAppSelector(state => state.component.userInform);
  const message = useAppSelector(state => state.user.message);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    dispatch(setSection({title: "", path: ""}));
    if (message) {
      setIsModal(true);
    }
  }, [message]);

  return <div className="page">
    <Path page={userInform ? data.pathInform : data.pathOrders}/>
    <section className="personalData">
      <h1 className="personalData_title">{data.title}</h1>
      <div className="personalData_contain">
        {userInform ? <UserData/> : <MyOrders/>}
        <PersonalMenu/>
      </div>
    </section>
    {isModal &&
      <Modal title={message} isInform={true} setIsModal={setIsModal} cancelHandle={() => dispatch(resetMessage())}/>}
  </div>
};

export default PersonalData;