"use client";
import "@/app/styles/personalData.css";
import PersonalMenu from "../components/PersonalMenu";
import Path from "@/app/components/Path";
import MyOrders from "@/app/components/MyOrders";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import UserData from "@/app/components/UserData";
import Modal from "@/app/components/Modal";
import {resetMessage} from "@/app/store/user/userSlice";
import {useEffect, useState} from "react";

const PersonalData = () => {
  const dispatch = useAppDispatch();
  const userInform = useAppSelector(state => state.component.userInform);
  const message = useAppSelector(state => state.user.message);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (message) {
      setIsModal(true);
    }
  }, [message]);

  return <div className="page">
    <Path page={userInform ? "Личный кабинет / Основная информация" : "Личный кабинет / Мои заказы"}/>
    <section className="personalData">
      <h1 className="personalData_title">Личный кабинет</h1>
      <div className="personalData_contain">
        {userInform ? <UserData/> : <MyOrders/>}
        <PersonalMenu/>
      </div>
    </section>
    {isModal && <Modal title={message} isInform={true} setIsModal={setIsModal} cancelHandle={() => dispatch(resetMessage())}/>}
  </div>
};

export default PersonalData;