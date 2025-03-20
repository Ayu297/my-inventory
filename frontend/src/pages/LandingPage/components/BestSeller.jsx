import React from "react";
import CardPictureTile from "../../../shared/components/CardPictureTile";

export default function BestSeller() {
  return (
    <div className="bg-gray-200 flex flex-col justify-center items-center pt-3">
      <p className="text-3xl font-semibold py-10 tracking-wide text-gray-800 dark:text-white">Best Seller</p>
      
      <div className="grid grid-cols-4 grid-rows-1 gap-4 px-40">
        <CardPictureTile
          image={"https://i0.wp.com/dimensipers.com/wp-content/uploads/2022/05/laut-bercerita-1.jpg?resize=1200%2C675&ssl=1"}
          imageOnClick=""
          name="Laut Bercerita"
          category="Buku"
          categoryOnClick=""
        />
        <CardPictureTile
          image={"https://down-id.img.susercontent.com/file/id-11134207-7rasj-m2qabqkbgq845d"}
          imageOnClick=""
          name="Smartphone X"
          category="Elektronik"
          categoryOnClick=""
        />
        <CardPictureTile
          image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF3LnY3lDwmBGwtdiSGpiBl2p_FnZHUriddQ&s"}
          imageOnClick=""
          name="Bumi Manusia"
          category="Buku"
          categoryOnClick=""
        />
        <CardPictureTile
          image={"https://5.imimg.com/data5/SELLER/Default/2020/11/OR/OZ/CV/25035125/hp-zbook-15-g7-mobile-workstation-laptop.jpg"}
          imageOnClick=""
          name="Laptop Z"
          category="Elektronik"
        />
      </div>
    </div>
  );
}
