import "../styles/miniCollection.css";
import Card from "./Card";
import {useTranslations} from "next-intl";

type MiniCollectionProps = {
  items: {
    id: number | null;
    main_img: string | undefined;
    name: string;
    price: number | null;
    isLike: boolean;
    category: string;
    sale: number | null;
  }[];
  classImage: string;
  classCard: string;
}
const MiniCollection = ({items, classImage, classCard}: MiniCollectionProps) => {
  const title = useTranslations("MiniCollection");
  return <div>
    <h4 className="collection_title miniCollection_title">{title("title")}</h4>
    <div className="collection_containSecond">
      {items.map((item, index) => <Card
        key={index}
        image={item.main_img ? item.main_img : ""}
        title={item.name}
        category={item.category}
        price={item.price}
        id={item.id}
        classImage={classImage}
        classCard={classCard}
        isLike={item.isLike}
        sale={item.sale}
      />)}
    </div>
  </div>
};
export default MiniCollection;