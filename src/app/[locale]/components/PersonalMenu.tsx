"use client";
import "../styles/personalMenu.css";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import {setUserInform} from "@/src/app/[locale]/store/component/componentSlice";
import {useRouter} from "next/navigation";
import classNames from "classnames";
import {resetUser} from "@/src/app/[locale]/store/user/userSlice";
import {DataPersonalMenu} from "@/src/app/[locale]/data";

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
      {DataPersonalMenu().mainInform}
    </p>
    <span
      className={classNames("option", {"option_active": !userInform})}
      onClick={() => dispatch(setUserInform(false))}
    >
     {DataPersonalMenu().myOrders}
    </span>
    <span className="option" onClick={exit}>{DataPersonalMenu().exit}</span>
  </div>
};
export default PersonalMenu;