import "../styles/collection.css";
import Card from "./Card";
import {useState} from "react";

type CollectionProps = {
  title: string;
  slider: boolean;
  items: {
    id: number | null;
    main_img: string | undefined;
    category: string;
    name: string;
    price: number | null;
    sale: number | null;
  }[];
  classCard: string;
  classImage: string;
}
let count = 0;

const Collection = ({title, slider, items, classImage, classCard}: CollectionProps) => {
  const [rightArrow, setRightArrow] = useState(true);
  const [leftArrow, setLeftArrow] = useState(false);

  const slideLeft = (element: any) => {
    const card = document.querySelector(".collection_item");
    const widthCard = card?.getBoundingClientRect().width;
    const block = element.target.parentElement.nextElementSibling.children[0];

    widthCard ? block.animate([{
      transform: `translateX(${widthCard * -count}px)`,
    }, {
      transform: `translateX(${widthCard * -(count - 1)}px)`,
    }], {
      duration: 2000,
      fill: "both"
    }) : null;
    count -= 1;
    if (widthCard) {
      const currentCards = Math.round(block.parentElement.getBoundingClientRect().width / widthCard);
      const card = Math.round(block.getBoundingClientRect().width / widthCard)
      checkArrow(card,currentCards);
    }
  };

  const slideRight = (element: any) => {
    const card = document.querySelector(".collection_item")
    const widthCard = card?.getBoundingClientRect().width;
    const block = element.target.parentElement.nextElementSibling.children[0];

    widthCard ? block.animate([{
      transform: `translateX(-${widthCard * count}px)`,
    }, {
      transform: `translateX(-${widthCard * (count + 1)}px)`,
    }], {
      duration: 2000,
      fill: "both"
    }) : null;
    count += 1;
    if (widthCard) {
      const currentCards = Math.round(block.parentElement.getBoundingClientRect().width / widthCard);
      const card = Math.round(block.getBoundingClientRect().width / widthCard)
      checkArrow(card,currentCards);
    }
  };

  const checkArrow = (cards: number, currentCards) => {
    if (count <= 0) {
      setLeftArrow(false);
    } else {
      setLeftArrow(true);
    }
    if (count >= cards - currentCards) {
      setRightArrow(false);
    } else {
      setRightArrow(true);
    }
  };

  return <div className="collection_new">
    <h4 className="collection_title">{title}</h4>
    {slider && <div className="slider_arrows">
      {leftArrow && <span className="arrow left_arrow" onClick={(event) => slideLeft(event)}>{"<"}</span>}
      {rightArrow && <span className="arrow right_arrow" onClick={(event) => slideRight(event)}>{">"}</span>}
    </div>}
    <div className="wrapper_collection">
      <div className="collection_containFirst">
        {(items[0] && items[0].id) && items.map((item, index) => <Card
            key={index}
            image={item.main_img ? item.main_img : ""}
            category={item.category}
            title={item.name}
            price={item.price}
            classCard={classCard}
            classImage={classImage}
            id={item.id}
            isLike={false}
            sale={item.sale}
          />
        )}
      </div>
    </div>
  </div>
};
export default Collection;