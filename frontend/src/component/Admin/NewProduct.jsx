import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./SideBar";
import MetaData from "../layout/MetaData";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { clearError, createProduct } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const categories = [
  "pants",
  "shoes",
  "laptop",
  "Shirt",
  "Phone",
  "Accessories",
  "Electronics",
  "Cosmatics",
];

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({
        type: NEW_PRODUCT_RESET,
      });
    }
  }, [error, success, alert, dispatch, navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    images.forEach((image) => {
      myForm.append("image", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <Fragment>
      <MetaData title={"Create Product"} />
      <div className="dashboard">
        <SideBar />

        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Product Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                type="text"
                cols={30}
                rows={1}
                placeholder="Product Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={createProductImageChange}
              />
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img src={image} key={index} alt="Avatar preview" />
              ))}
            </div>
            <Button
              disabled={loading ? true : false}
              type="submit"
              id="createProductBtn"
            >
              Crate Product
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
