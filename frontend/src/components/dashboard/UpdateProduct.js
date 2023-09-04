import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails, updateProduct } from '../../redux/slices/products/productApi';
import { clearproductDetailsErrors } from '../../redux/slices/products/productDetailsSlice';
import { ClearError, productStateReset } from '../../redux/slices/products/ProductSlice';
import { MdSpellcheck,MdCurrencyRupee,MdDescription,MdAccountTree,MdStorage } from "react-icons/md"
const UpdateProduct = () => {
    const dispatch = useDispatch();
    const {id:productId} = useParams()
    const navigate  = useNavigate()
    // const alert = useAlert();
  
    const { error, product } = useSelector((state) => state.productDetails);
  
    const {
      loading,
      error: updateError,
      success,
    } = useSelector((state) => state.product);
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
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
      if (product && product._id !== productId) {
        dispatch(getProductDetails(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.Stock);
        setOldImages(product.images);
      }
      if (error) {
        alert(error);
        dispatch(clearproductDetailsErrors());
      }
  
      if (updateError) {
        alert(updateError);
        dispatch(ClearError());
      }
  
      if (success) {
        alert("Product Updated Successfully");
        navigate("/admin/products");
        dispatch(productStateReset());
      }
    }, [
      dispatch,
      alert,
      error,
      navigate,
      success,
      productId,
      product,
      updateError,
    ]);
  
    const updateProductSubmitHandler = (e) => {
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
      dispatch(updateProduct({productId, myForm}));
    };
  
    const updateProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
  
      setImages([]);
      setImagesPreview([]);
      setOldImages([]);
  
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
          {/* <SideBar /> */}
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
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
                  value={price}
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
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
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
                  value={Stock}
                />
              </div>
  
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProductImagesChange}
                  multiple
                />
              </div>
  
              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt="Old Product Preview" />
                  ))}
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

export default UpdateProduct
