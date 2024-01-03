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

  </div>
};
export default ContentProducts;