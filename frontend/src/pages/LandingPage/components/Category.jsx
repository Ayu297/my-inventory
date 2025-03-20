import React from "react";
import { faAdd, faAudioDescription, faBook, faBookJournalWhills, faBookSkull, faBox, faCartFlatbed, faDemocrat, faDollyBox, faFloppyDisk, faGamepad, faHeart, faLaptop, faMusic, faPaintBrush, faPersonBooth, faPhotoFilm, faRing, faShirt, faTemperature1, faVideo } from "@fortawesome/free-solid-svg-icons";
import CategoryTiles from "../../../shared/components/CategoryTiles";

export default function Category() {
  return (
    <div className="bg-gray-200 flex flex-col justify-center items-center pb-16 pt-3">
      <p className="text-3xl font-semibold py-10 tracking-wide text-gray-800 dark:text-white">Categories</p>
      <div className="grid grid-cols-4 grid-rows-4 gap-4 px-4">
        <CategoryTiles icon={faBook} text="Buku" onClick={() => {}}/>
        <CategoryTiles icon={faLaptop} text="Elektronik" onClick={() => {}}/>
        <CategoryTiles icon={faBookJournalWhills} text="Fashion" onClick={() => {}}/>
        <CategoryTiles icon={faBookJournalWhills} text="Others" onClick={() => {}}/>
      </div>
    </div>
  );
}
