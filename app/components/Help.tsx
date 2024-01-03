"use client";

import "../styles/help.css";
import {Fragment} from "react";
import {useAppDispatch} from "@/app/store/hooks";
import {resetHelp} from "@/app/store/component/componentSlice";
import Cart from "@/app/components/Cart";

type HelpProps = {
  data?: { title: string, content: { title: string, text: string }[] };
  cart: boolean;
}

const Help = ({data, cart}: HelpProps) => {
  const dispatch = useAppDispatch();

  const close = (element:any) => {
    if (element.target.className === "sub_wrapper") {
      dispatch(resetHelp);
    }
  };

  return <div className="wrapper_help" onClick={() => close(event)}>
    <div className="sub_wrapper"/>
    <div className="modal_help" >
      <div className="close" onClick={() => dispatch(resetHelp())}>
        <span className="cross"/>
      </div>
      <div className="help">
        {!cart && <Fragment>
          <h1 className="help_title">{data?.title}</h1>
          {data?.content.map((inform, index) => <Fragment key={index}>
            <span className="help_section">{inform.title}</span>
            <p className="help_text">{inform.text}</p>
          </Fragment>)}
        </Fragment>}
        {cart && <Cart/>}
      </div>
    </div>
  </div>
};
export default Help;