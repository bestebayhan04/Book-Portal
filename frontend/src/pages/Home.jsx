import React,{useEffect} from "react";
import Slider from "../components/Slider";

import "../comp_css/Slider.css"
import Atta from "../picture/Atta_and_dals.avif";
import Beauty from "../picture/Beauty_and_personal_care.avif";
import Cleaning from "../picture/Cleaning_essentials.avif";
import Home_essentials from "../picture/Home_essentials.avif";
import kids_fashion from "../picture/kids_fashion.avif";
import Kitchen_must_haves from "../picture/Kitchen_must_haves.avif";
import Laptops_and_Tablets from "../picture/Laptops_and_Tablets.avif";
import men_fashion from "../picture/men_fashion.avif";
import Oil_and_ghee from "../picture/Oil_and_ghee.avif";
import Smart_Televisions from "../picture/Smart_Televisions.avif";


const Home = () => {
  const veritycard = [
    Atta,
    Beauty,
    Cleaning,
    Home_essentials,
    kids_fashion,
    Kitchen_must_haves,
    Laptops_and_Tablets,
    men_fashion,
    Oil_and_ghee,
    Smart_Televisions,
  ];
  /*const slideImages = [
    "https://res.cloudinary.com/beddo-com/image/upload/q_60/v1648661550/mainland-indirimli-alisveris-nasil%20yapiliyor/discount1_qaspqb.jpg?im=Resize=(1680,320)",
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/e7e7edb5-1cc6-4ef4-910f-d4a540cc07cc.__CR0,0,1464,600_PT0_SX1464_V1___.jpg?im=Resize=(1680,320)",
  ];*/

  const styleFixedImg = {
    width: "100%",
    height: "25vh",
    marginTop: "10px",
    marginBottom: "10px",
  };
  useEffect(() => {
    document.title = 'Ecommerse | Home Page';
    return () => { 
      document.title = 'Ecommerse App';
    };
  }, []); 

  return (
    <>

      <div className="ImageFixed">
        <img
            style={styleFixedImg}
            src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/e7e7edb5-1cc6-4ef4-910f-d4a540cc07cc.__CR0,0,1464,600_PT0_SX1464_V1___.jpg?im=Resize=(680,420)"
            alt="Image"
        />

        <img
          style={styleFixedImg}
          src="https://aws-obg-image-lb-4.tcl.com/content/dam/brandsite/region/in/blog/pc/detail/blog-april/best-fully-automatic-washing-machines/pc.jpg?im=Resize=(1240,150)"
          alt="Image"
        />
      </div>


    </>
  );
};

export default Home;
