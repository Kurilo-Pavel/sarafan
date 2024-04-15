import Card from "./Card";
import {Fragment, useId} from "react";

type ContentProductsProps = {
  products: {
    category: string;
    id: number | null;
    name: string;
    price: number | null;
    sale: number;
    main_img: string | undefined;
  }[];
}

const ContentProducts = ({products}: ContentProductsProps) => {
  const id = useId();
  return <Fragment key={id}>
    {products.map((prod: {
        category: string, id: number | null, name: string, price: number | null, sale: number,
        main_img: string | undefined,
      }) =>
        <Card
            key={prod.id}
            id={prod.id}
            image={prod.main_img ? prod.main_img : ""}
            category={prod.category}
            title={prod.name}
            price={prod.price}
            classCard="card"
            isLike={false}
            sale={prod.sale}
          />
    )}
  </Fragment>
};
export default ContentProducts;