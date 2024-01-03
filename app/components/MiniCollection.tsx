import "../styles/miniCollection.css";
import Card from "./Card";

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
  return <div className="collection_containSecond">
    {items.map((item, index) => <Card
      key={index}
      image={item.main_img?item.main_img:""}
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
};
export default MiniCollection;