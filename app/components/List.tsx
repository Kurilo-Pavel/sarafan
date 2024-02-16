"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/app/store/hooks";
import {setHelp} from "@/app/store/component/componentSlice";
import {Fragment, useState} from "react";
import classNames from "classnames";

type ListProps = {
  list: { title: string, path?: string, value?: string }[];
  classNameLi?: string;
  classNameSection?: string;
  title?: string;
  classNameTitle?: string;
  classNameBlock:string;
  footer?: boolean;
}

const List = ({list, classNameSection, classNameLi, title, classNameTitle, footer,classNameBlock}: ListProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isClose, setIsClose] = useState(!footer);

  const handleClick = () => {
    setIsClose(!isClose);
  };

  const closeMenu = (event, path) => {
    router.push(path);
    if (event.target.className === "main_section") {
      const btn = document.getElementById("burger") as HTMLInputElement;
      btn.checked = false;
      const menu = document.querySelector(".header_menu");
      menu.className = "header_menu close_burger";
    }
  }

  return <div className={classNameBlock}>
    {title && <span className={classNameTitle} onClick={handleClick}>
      {title}
      {footer && <Fragment>
        {!isClose && <img src="/openArrow.svg" className="footer_arrow" alt="close"/>}
        {isClose && <img src="/Arrow.svg" className="footer_arrow" alt="open"/>}
      </Fragment>}
    </span>}
    <div className={classNames(classNameSection, {"open_menu": !isClose && footer, "close_menu": isClose && footer})}>
      {list.map(span => {
        return <label
          key={span.title}
          className={classNameLi}
          onClick={span.value ? () => dispatch(setHelp(span.value)) : (e) => closeMenu(e, span.path)}
        >
          {span.title}
        </label>
      })}
    </div>
  </div>
};

export default List;