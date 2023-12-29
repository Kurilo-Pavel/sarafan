import "../styles/miniCollection.css";
import Card from "./Card";

type MiniCollectionProps = {
  items: {
    id: number;
    main_img: string;
    name: string;
    price: number;
    isLike: boolean;
    category: string;
    sale:number|null;
  }[];
  classImage: string;
  classCard: string;
}
const MiniCollection = ({items, classImage, classCard}: MiniCollectionProps) => {
  return <div className="collection_containSecond">
    {items.map((item, index) => <Card
      key={index}
      image={item.main_img}
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