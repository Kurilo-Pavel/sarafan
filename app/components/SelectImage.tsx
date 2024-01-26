"use client";
import "../styles/input.css";
import React, {useRef} from "react";
import Button from "@/app/components/Button";

type Image = {
  size: number | undefined;
  image: Blob | undefined;
  name: string;
  type: string;
}[]

type SelectImageProps = {
  error?: string;
  buttonText: string
  selectImage: Image;
  setSelectImage: (object: Image) => void;
}
const SelectImage = ({buttonText, setSelectImage, selectImage, error}: SelectImageProps) => {
  const imageRef = useRef<any>(null);

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target["files"]?.length && !selectImage.some(img => img.name === event?.target["files"]?.[0]["name"])) {
      const imageData = [...selectImage, {
        image: event.target["files"][0],
        size: event.target["files"][0]["size"],
        name: event.target["files"][0]["name"],
        type: event.target["files"][0]["type"],
      }];
      setSelectImage(imageData);
    }
  };

  const handleUpload = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return <div className="selectImage">
    <input
      type="file"
      accept=".jpg, .png"
      ref={imageRef}
      className="selectImage_input"
      onChange={event => handleSelectImage(event)}
      name="images"
    />
    <Button
      text={buttonText}
      className="button_white"
      type="button"
      onClick={handleUpload}
    />
    {error && <span className="error error_color">{error}</span>}
  </div>
};
export default SelectImage;