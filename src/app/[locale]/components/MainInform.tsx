import "../styles/mainInform.css";
import {DataMainInform} from "@/src/app/[locale]/data";

const MainInform = () => {
  return <div className="section_information">
    <div className="information">
      <h2 className="information_name">{DataMainInform().title}</h2>
      <img src="/png/image_1.png" alt="" className="information_img img_hidden"/>
      <p className="information_collection">
        {DataMainInform().description}
        <span className="information_brand">{DataMainInform().about}</span>
      </p>
    </div>
    <div className="information_imgField imgField_hidden">
      <img src="/png/image_1.png" alt="" className="information_img"/>
      <img src="/png/Rectangle_4.png" alt="" className="information_img"/>
    </div>
  </div>
};
export default MainInform;