import "../styles/contentProducts.css";
import Card from "./Card";
import {useId} from "react";

type ContentProductsProps = {
  products: {
    category: string;
    id: number | null;
    name: string;
    price: number | null;
    sale: number | null;
    main_img: string | undefined;
  }[];
}

const ContentProducts = ({products}: ContentProductsProps) => {
  const id = useId();
  return <div key={id}>
    {products.map((prod: {
        category: string, id: number | null, name: string, price: number | null, sale: number | null,
        main_img: string | undefined,
      }, index: number) =>
        (index / 2 === 1 || index / 7 === 1)
          ? <Card
            key={prod.id}
            id={prod.id}
            image={prod.main_img ? prod.main_img : ""}
            category={prod.category}
            title={prod.name}
            price={prod.price}
            classCard="big_card"
            isLike={false}
            sale={prod.sale}
          /> : <Card
            key={prod.id}
            id={prod.id}
            image={prod.main_img ? prod.main_img : ""}
            category={prod.category}
            title={prod.name}
            price={prod.price}
            classCard="small_card"
            classImage="medium_img"
            isLike={false}
            sale={prod.sale}
          />
    )}
  </div>
};
export default ContentProducts;