import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";

type Props = {
  images: any[];
  setImages: Dispatch<any>;
  errors: {
    name: string;
    colors: string;
    gender: string;
    category: string;
    brand: string;
    description: string;
    details: string;
    images: string;
    price: string;
    sizes: string;
  }
  setErrors: Dispatch<SetStateAction<{
    name: string;
    colors: string;
    gender: string;
    category: string;
    brand: string;
    description: string;
    details: string;
    images: string;
    price: string;
    sizes: string;
}>>
};

export default function File({ images, setImages, setErrors, errors }: Props) {
  const fileRef = useRef<any>();
  const [src, setSrc] = useState("");
  const [file, setFile] = useState<File>();
  const clickFileInput = () => {
    fileRef.current.click();
  };
  const addFile = (e: any) => {
    setFile(e.target.files[0]);
    setSrc(URL.createObjectURL(e.target.files[0]));
    setImages([...images, e.target.files[0]]);
    setErrors({...errors, images: ''})
  };

  const removeFile = () => {
    const newArray = images.filter((el) => el !== file);
    setImages(newArray);
    setFile(undefined);
    setSrc("");
  };

  return (
    <div className="h-full w-full border-2 border-gray-400 center relative overflow-hidden rounded-md">
      <div className="z-20 relative text-center">
        <p>Drag and drop or</p>
        <p className="text-blue-500 cursor-pointer" onClick={clickFileInput}>
          click to select
        </p>
      </div>
      <input type="file" onChange={addFile} ref={fileRef} className="hidden" />
     
      <div className="h-full w-full z-10 absolute top-0 left-0 bg-white"></div>
      {file && (
        <div className="h-full w-full z-20  absolute overflow-hidden top-0 left-0 bg-blue-500">
          <img src={src} alt="" className="h-full w-full object-cover"/>
          <div
            onClick={removeFile}
            className="h-10 w-10 border-2 border-black cursor-pointer duration-300 hover:scale-105 active:scale-100 z-30 center absolute bg-red-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          >
            <FaTimes className="text-base text-white"/>
          </div>
        </div>
      )}
    </div>
  );
}
