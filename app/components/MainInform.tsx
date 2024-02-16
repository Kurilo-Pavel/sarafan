import "../styles/mainInform.css";

const MainInform = () => {
  return <div className="section_information">
    <div className="information">
      <h2 className="information_name">Вдохновленные весной</h2>
      <img src="png/image_1.png" alt="" className="information_img img_hidden"/>
      <p className="information_collection">Разнообразный и богатый опыт рамки и место обучения кадров способствует
        подготовки
        и реализации форм развития. С другой стороны реализация намеченных плановых
        <span className="information_brand">О бренде</span>
      </p>
    </div>
    <div className="information_imgField imgField_hidden">
      <img src="png/image_1.png" alt="" className="information_img" />
      <img src="png/Rectangle_4.png" alt="" className="information_img"/>
    </div>
  </div>
};
export default MainInform;