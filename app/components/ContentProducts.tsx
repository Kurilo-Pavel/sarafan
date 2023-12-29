import "../styles/contentProducts.css";
import {Fragment} from "react";
import Card from "./Card";

type ContentProductsProps = {
  products: {
    category: string;
    code: string | null;
    color: string;
    date: string | null;
    id: number;
    name: string;
    price: number;
    sale: number | null;
    size: string | null;
    views: number | null;
    main_img: string;
    sub_img: [string];
  }[];
}
const ContentProducts = ({products}: ContentProductsProps) => {
  return <Fragment>
    {products.map((prod, index) => {
      if (index / 2 === 1 || index / 7 === 1) {
        return <Card
          key={prod.id}
          id={prod.id}
          image={prod.main_img ? prod.main_img : ""}
          category={prod.category}
          title={prod.name}
          price={prod.price}
          classCard="big_card"
          isLike={false}
          sale={prod.sale}
        />
      }
      return <Card
        key={prod.id}
        id={prod.id}
        image={prod.main_img ? prod.main_img: ""}
        category={prod.category}
        title={prod.name}
        price={prod.price}
        classCard="small_card"
        classImage="medium_img"
        isLike={false}
        sale={prod.sale}
      />
    })
    }
  </Fragment>
};
export default ContentProducts;