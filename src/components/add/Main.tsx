
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import File from "./File";
import TextArea from "./TextArea";
import Input from "./Input";
import Select from "./Select";
import { BsPlus, BsTrash } from "react-icons/bs";
import axios from "axios";

export default function Main() {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const [values, setValues] = useState({
    name: "",
    gender: "",
    category: "",
    brand: "",
    price: 0,
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    colors: "",
    gender: "",
    category: "",
    brand: "",
    description: "",
    details: "",
    images: "",
    price: "",
    sizes: "",
  });

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const [images, setImages] = useState<any>([]);
  const [details, setDetails] = useState<any[]>([]);
  const [detailsInput, setDetailsInput] = useState("");

  const Submit = async () => {
    if (
      !selectedColors.length ||
      !selectedSizes.length ||
      !images.length ||
      !values.brand ||
      !values.category ||
      !values.description ||
      !values.gender ||
      !values.name ||
      !values.price
    ) {
      setErrors({
        ...errors,
        name: values.name ? "" : "Please input the product name",
        brand: values.brand ? "" : "Please input the products brand",
        category: values.category ? "" : "Please input the products category",
        gender: values.gender ? "" : "Please input gender",
        description: values.description
          ? ""
          : "Please input products description",
        price: values.price ? "" : "Please input products price",
        colors: selectedColors.length ? "" : "Please select a color",
        sizes: selectedSizes.length ? "" : "Please select a size",
        details: details.length ? "" : "Please input product details",
        images: images.length ? "" : "Please select an image",
      });
      return;
    }
    const colorsData = selectedColors.join(",");
    const sizesData = selectedSizes.join(",");
    const detailsData = details.join(",");

    const headers = {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN1YiI6MSwiZW1haWwiOiJhaGFta2luZ3NsZXkyMDIwQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MTMzNjIxOTksImV4cCI6MTcxMzM3Mjk5OX0.t3omyYgZZ8v39NnMFyPoJ9NWj_STcbgkLR7UNZw0RIA`,
    };

    const formData = {
      name: values.name,
      price: values.price,
      categoryId: values.category,
      discount: 0,
      description: values.description,
      productImg: images,
      color: colorsData,
      size: sizesData,
    };
    const formdata = new FormData();

    formdata.append("name", values.name);
    formdata.append("price", values.price.toString());
    formdata.append("categoryId", values.category);
    formdata.append("details", detailsData);
    formdata.append("description", values.description);
    formdata.append("productImg", images);
    formdata.append("discount", "0");
    formdata.append("color", colorsData);
    formdata.append("size", sizesData);


    const response = await axios.post(
      "https://last-avenue-api.onrender.com/api/v1/products",
      {
        formdata,
      },
      { headers }
    );

    const responses = await axios.post(
      "https://last-avenue-api.onrender.com/api/v1/products",
      {
        formData,
      },
      { headers }
    );

    console.log(response, responses);
  };

  const addDetails = (e: any) => {
    e.preventDefault();
    if (detailsInput) {
      setDetails([...details, detailsInput]);
      setDetailsInput("");
      setErrors({ ...errors, details: "" });
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div className="p-5 grid min-h-screen grid-cols-1 lg:grid-cols-2 gap-20">
      <div className="">
        <Input
          handleChange={handleChange}
          name="name"
          error={errors.name}
          label="Product name"
        />
        <div className="mt-5">
          <Select
            handleChange={handleChange}
            name="category"
            options={["", "Dresses", "Bags"]}
            error={errors.category}
            label="Category"
          />
        </div>
        <div className="grid mt-5 grid-cols-[1.25fr_1fr] gap-3">
          <Select
            handleChange={handleChange}
            name="brand"
            options={["", "Nike", "Gucci"]}
            error={errors.brand}
            label="Brand"
          />
          <Select
            handleChange={handleChange}
            name="gender"
            options={["", "Male", "Female"]}
            error={errors.gender}
            label="Gender"
          />
        </div>
        <div className="mt-5">
          <div className="flex gap-2 items-center">
            <p className="title">Add Color</p>
            <div className="flex items-center justify-center gap-4 flex-1">
              {["red", "blue", "orange", "amber"].map((data, key) => (
                <div
                key={key}
                  className=""
                  onClick={() => {
                    setErrors({ ...errors, colors: "" });
                    const isPresent = selectedColors.some((el) => el === data);
                    if (isPresent) {
                      setSelectedColors(
                        selectedColors.filter((el) => el !== data)
                      );
                      return;
                    }
                    setSelectedColors([...selectedColors, data]);
                  }}
                >
                  <div
                    className="h-7 w-7 cursor-pointer duration-300 p-[2px] active:scale-90 rounded-full"
                    style={{ background: `${data}` }}
                  >
                    <div
                      className="h-full w-full rounded-full duration-300 border-4 border-white"
                      style={{
                        background: `${
                          selectedColors.includes(data) ? `${data}` : "white"
                        }`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full active:scale-90 text-base cursor-pointer duration-300 hover:text-green-500 hover:border-green-500 border-2 center">
                <BsPlus className="text-xl duration-300 active:scale-90" />
              </div>
              <div className="h-8 w-8 active:scale-90 rounded-full duration-300 hover:text-red-500 hover:border-red-500 text-base cursor-pointer border-2 center">
                <BsTrash className="" />
              </div>
            </div>
          </div>
          {errors.colors && <p className="error">{errors.colors}</p>}
        </div>
        <div className="mt-5">
          <div className="flex gap-2 items-center">
            <p className="title">Add Size</p>
            <div className="flex items-center justify-center gap-4 flex-1">
              {["xs", "sm", "md", "lg", "xl"].map((data, key) => (
                <div
                key={key}
                  className=""
                  onClick={() => {
                    setErrors({ ...errors, sizes: "" });
                    const isPresent = selectedSizes.some((el) => el === data);
                    if (isPresent) {
                      setSelectedSizes(
                        selectedSizes.filter((el) => el !== data)
                      );
                      return;
                    }
                    setSelectedSizes([...selectedSizes, data]);
                  }}
                >
                  <div
                    className={`h-8 w-12 center uppercase duration-300  active:scale-90 font-semibold cursor-pointer border-2 ${
                      selectedSizes.includes(data)
                        ? "border-black font-bold"
                        : "border-gray-300"
                    }`}
                  >
                    <p>{data}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full active:scale-90 text-base cursor-pointer duration-300 hover:text-green-500 hover:border-green-500 border-2 center">
                <BsPlus className="text-xl duration-300 active:scale-90" />
              </div>
              <div className="h-8 w-8 active:scale-90 rounded-full duration-300 hover:text-red-500 hover:border-red-500 text-base cursor-pointer border-2 center">
                <BsTrash className="" />
              </div>
            </div>
          </div>
          {errors.sizes && <p className="error">{errors.sizes}</p>}
        </div>
        <div className="mt-5">
          <TextArea
            handleChange={handleChange}
            name="description"
            label="Product Description"
            error={errors.description}
            height="200px"
          />
        </div>
      </div>

      <div className="">
        <div className="">
          <div className="">
            <p className="title">Price</p>
            <div className="flex gap-2 items-center">
              <p className="title">USD</p>
              <div className="w-full mt-2 rounded-md overflow-hidden h-12 border-2">
                <input
                  type="text"
                  onChange={handleChange}
                  name="price"
                  className="h-full w-full bg-transparent px-3 outline-none"
                />
              </div>
            </div>
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
        </div>
        <div className="mt-5">
          <div className="grid h-40 gap-5 grid-cols-2">
            <File
              images={images}
              errors={errors}
              setErrors={setErrors}
              setImages={setImages}
            />
            <File
              images={images}
              errors={errors}
              setErrors={setErrors}
              setImages={setImages}
            />
          </div>
          <div className="grid mt-5 h-40 gap-5 grid-cols-2">
            <File
              images={images}
              errors={errors}
              setErrors={setErrors}
              setImages={setImages}
            />
            <div className="h-full flex gap-2 flex-col ">
              <div className="flex-1 ">
                <File
                  images={images}
                  errors={errors}
                  setErrors={setErrors}
                  setImages={setImages}
                />
              </div>
              <div className="flex-1">
                <File
                  images={images}
                  errors={errors}
                  setErrors={setErrors}
                  setImages={setImages}
                />
              </div>
            </div>
          </div>
          {errors.images && <p className="error">{errors.images}</p>}
        </div>

        <div className="mt-10">
          <p className="title">Product Details</p>
          <div className="w-full mt-2 rounded-md overflow-hidden h-12 border-2">
            <form onSubmit={addDetails} className="h-full w-full">
              <input
                type="text"
                onChange={(e: any) => {
                  setDetailsInput(e.target.value);
                }}
                name="details"
                value={detailsInput}
                className="h-full w-full bg-transparent px-3 outline-none"
              />
            </form>
          </div>
          {details.length > 0 && (
            <div className="p-3 mt-10 flex gap-3 flex-wrap max-h-[150px] overflow-y-auto border-2">
              {details?.map((data, key) => (
                <p className="bg-black text-white font-semibold flex gap-2 rounded-md shadow-md p-3">
                  <span>{data}</span>
                  <FaTimes
                    className="cursor-pointer"
                    onClick={() => {
                      const filtered = details?.filter(
                        (_, index) => key !== index
                      );
                      setDetails(filtered);
                    }}
                  />
                </p>
              ))}
            </div>
          )}
          {errors.details && <p className="error">{errors.details}</p>}
        </div>

        <div className="pl-20 mt-10 grid grid-cols-2 gap-5">
          <div
            onClick={Submit}
            className="bg-black border-2 border-black cursor-pointer duration-300 active:scale-90 rounded-md shadow-md center text-white font-semibold px-5 py-6"
          >
            <p>Add Product</p>
          </div>
          <div className="bg-white border-2 border-black cursor-pointer duration-300 active:scale-90 rounded-md shadow-md center text-black font-semibold px-5 py-6">
            <p>Schedule</p>
          </div>
        </div>
      </div>
    </div>
  );
}
