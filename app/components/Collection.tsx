import "../styles/collection.css";
import Card from "./Card";
import {useState} from "react";

type CollectionProps = {
  title: string;
  slider: boolean;
  items: {
    id: number;
    main_img: string;
    category: string;
    name: string;
    price: number;
    sale: number | null;
  }[];
  classCard: string;
  classImage: string;
}
let count = 0;

const Collection = ({title, slider, items, classImage, classCard}: CollectionProps) => {
  console.log(items)
  const [rightArrow, setRightArrow] = useState(true);
  const [leftArrow, setLeftArrow] = useState(false);

  const slideLeft = (element) => {
    const card = document.querySelector(".collection_item");
    const widthCard = card.getBoundingClientRect().width;
    const block = element.target.parentElement.nextElementSibling.children[0];

    block.animate([{
      transform: `translateX(${widthCard * -count}px)`,
    }, {
      transform: `translateX(${widthCard * -(count - 1)}px)`,
    }], {
      duration: 2000,
      fill: "both"
    });
    count -= 1;
    checkArrow(Math.round(block.getBoundingClientRect().width / widthCard));
  };

  const slideRight = (element) => {
    const card = document.querySelector(".collection_item")
    const widthCard = card.getBoundingClientRect().width;
    const block = element.target.parentElement.nextElementSibling.children[0];
    block.animate([{
      transform: `translateX(-${widthCard * count}px)`,
    }, {
      transform: `translateX(-${widthCard * (count + 1)}px)`,
    }], {
      duration: 2000,
      fill: "both"
    });
    count += 1;
    checkArrow(Math.round(block.getBoundingClientRect().width / widthCard));
  };

  const checkArrow = (cards) => {
    if (count <= 0) {
      setLeftArrow(false);
    } else {
      setLeftArrow(true);
    }
    if (count >= cards - 4) {
      setRightArrow(false);
    } else {
      setRightArrow(true);
    }
  };

  return <div className="collection_new">
    <h4 className="collection_title">{title}</h4>
    {slider && <div className="slider_arrows">
      {leftArrow && <span className="arrow left_arrow" onClick={() => slideLeft(event)}>{"<"}</span>}
      {rightArrow && <span className="arrow right_arrow" onClick={() => slideRight(event)}>{">"}</span>}
    </div>}
    <div className="wrapper_collection">
      <div className="collection_containFirst">
        {items.length && items.map((item, index) => <Card
            key={index}
            image={item.main_img}
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