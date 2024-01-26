"use client";
import "@/app/styles/personalData.css";
import PersonalMenu from "../components/PersonalMenu";
import Path from "@/app/components/Path";
import MyOrders from "@/app/components/MyOrders";
import {useAppSelector} from "@/app/store/hooks";
import UserData from "@/app/components/UserData";

const PersonalData = () => {

  const userInform = useAppSelector(state => state.component.userInform);

  return <div className="page">
    <Path page={userInform ? "Личный кабинет / Основная информация" : "Личный кабинет / Мои заказы"}/>
    <section className="personalData">
      <h1 className="personalData_title">Личный кабинет</h1>
      <div className="personalData_contain">
        {userInform ? <UserData/> : <MyOrders/>}
        <PersonalMenu/>
      </div>
    </section>
  </div>
};

export default PersonalData;