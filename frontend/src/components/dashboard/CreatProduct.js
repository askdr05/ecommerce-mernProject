import React, { useEffect, useState } from 'react'
import "./_CreatProduct.scss"
import { useDispatch, useSelector } from 'react-redux';
import { ClearError, productStateReset } from '../../redux/slices/products/ProductSlice';
import { createProduct } from '../../redux/slices/products/productApi';
import { useNavigate } from 'react-router-dom';
import { MdSpellcheck,MdCurrencyRupee,MdDescription,MdAccountTree,MdStorage } from "react-icons/md"
const CreatProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const alert = useAlert();
  
    const { loading, error, success } = useSelector((state) => state.product);
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
  
    const categories = [
      "Laptop",
      "Footwear",
      "Bottom",
      "Tops",
      "Attire",
      "Camera",
      "SmartPhones",
    ];
  
    useEffect(() => {
      if (error) {
        alert(error);
        dispatch(ClearError ());
      }
  
      if (success) {
        alert("Product Created Successfully");
        navigate("/admin/dashboard");
        dispatch(productStateReset());
      }
    }, [dispatch, error, navigate, success]);
  
    const createProductSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("Stock", Stock);
  
      images.forEach((image) => {
        myForm.append("images", image);
      });
      dispatch(createProduct(myForm));
    };
  
    const createProductImagesChange = (e) => {
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
      <>
        {/* <MetaData title="Create Product" /> */}
        <div className="dashboard">
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <h1>Create Product</h1>
  
              <div>
                <MdSpellcheck size={22} />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MdCurrencyRupee size={22} />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
  
              <div>
                <MdDescription size={22} />
  
                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>
  
              <div>
                <MdAccountTree size={22} />
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
  
              <div>
                <MdStorage size={22} />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
  
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>
  
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
  
              <button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </>
  )
}

export default CreatProduct
