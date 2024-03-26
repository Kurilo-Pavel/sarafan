"use client";

import "../styles/help.css";
import {Fragment, useState} from "react";
import {useAppDispatch} from "@/src/app/[locale]/store/hooks";
import {resetHelp} from "@/src/app/[locale]/store/component/componentSlice";
import Cart from "@/src/app/[locale]/components/Cart";
import Modal from "@/src/app/[locale]/components/Modal";
import {deleteOrderCookie} from "@/src/app/[locale]/store/product/cookieSlice";
import {DataHelpMessage} from "@/src/app/[locale]/data";

type HelpClientProps = {
  cart: boolean;
  data?: { title: string, content: { title: string, text: string }[] };
};

const HelpClient = ({data, cart, }: HelpClientProps) => {
  const dispatch = useAppDispatch();

  const [isModal, setIsModal] = useState(false);
  const [product, setProduct] = useState<string>("");

  const titleModal = DataHelpMessage().title;

  const close = () => {
    const wrapper = document.querySelector(".sub_wrapper");
    const modal = document.querySelector(".modal_help");
    wrapper?.animate([{
      opacity: 1
    }, {
      opacity: 0
    }], {
      duration: 300,
      fill: "both",
    });

    modal?.animate([{
      transform: "translateX(0)"
    }, {
      transform: "translateX(100%)"
    }], {
      duration: 300,
      fill: "both",
    });
    if (modal) {
      Promise.all(
        modal.getAnimations({subtree: true}).map((animation) => animation.finished),
      ).then(() => {
        dispatch(resetHelp({cart: false, delivery: false, payment: false, exchange: false}));
      });
    }
  };

  const handleClick = () => {
    dispatch(deleteOrderCookie(product));
    setIsModal(false);
  };

  return <div className="wrapper_help">
    <div className="sub_wrapper" onClick={() => close()}/>
    <div className="modal_help">
      <div className="close" onClick={() => close()}>
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
        {cart && <Cart setIsModal={setIsModal} setProduct={setProduct}/>}
      </div>
    </div>
    {isModal && <Modal
      title={titleModal}
      isInform={false}
      setIsModal={setIsModal}
      successHandle={handleClick}
    />}
  </div>
};
export default HelpClient;