"use client";
import "../styles/personalMenu.css";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {setUserInform} from "@/app/store/component/componentSlice";
import {useRouter} from "next/navigation";
import classNames from "classnames";
import {resetUser} from "@/app/store/user/userSlice";

const PersonalMenu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userInform = useAppSelector(state => state.component.userInform);
  const exit = () => {
    dispatch(resetUser());
    localStorage.setItem("token", "");
    localStorage.setItem("admin", "");
    router.push("/");
  };

  return <div className="personal_option">
    <p
      className={classNames("option", {"option_active": userInform})}
      onClick={() => dispatch(setUserInform(true))}
    >
      Основная информация
    </p>
    <span
      className={classNames("option", {"option_active": !userInform})}
      onClick={() => dispatch(setUserInform(false))}
    >
      Мои заказы
    </span>
    <span className="option" onClick={exit}>Выход</span>
  </div>
};
export default PersonalMenu;