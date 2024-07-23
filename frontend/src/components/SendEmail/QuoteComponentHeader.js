import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./Quotes.css";

const QuoteComponentHeader = (userInfo) => {
  const [formData, setFormData] = useState({
    from: "",
    productName: "",
    description: "",
    image: null,
  });

  // console.log("userInfouserInfo",userInfo);


  const [isSending, setIsSending] = useState(false);
  const [dots, setDots] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { from, productName, description, image } = formData;

  useEffect(() => {
    let interval = null;

    if (isSending) {
      interval = setInterval(() => {
        setDots((dots) => {
          if (dots.length === 6) {
            return "";
          }
          return dots + ".";
        });
      }, 500);
    } else {
      clearInterval(interval);
      setDots("");
    }

    return () => clearInterval(interval);
  }, [isSending]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // image & drag box
  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    // Check if file object is defined
    if (file) {
      setFormData({ ...formData, image: file });
  
      // Display image if uploaded file is an image
      if (file.type && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imgPreview = document.getElementById("img-preview");
          if (imgPreview) {
            imgPreview.src = reader.result;
          }
        };
      }
    }
  };
  

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    setFormData({ ...formData, image: file });

    // Display image if dropped file is an image
    if (file.type && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imgPreview = document.getElementById("img-preview");
        if (imgPreview) {
          imgPreview.src = reader.result;
        }
      };
    } 
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  // image & drag box END


  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formDataToSend = new FormData();
    formDataToSend.append(
      "from",
      `${userInfo.userInfo.name} <${userInfo.userInfo.email}>`
    );
    formDataToSend.append("productName", productName);
    formDataToSend.append("description", description);
    formDataToSend.append("image", image);
    try {
      setIsSending(true);
      const res = await axios.post("/api/sendemail/quoteproduct", formDataToSend, config);
      console.log(res.data);
      setIsSending(false);
      setFormData({
        from: "",
        productName: "",
        description: "",
        image: null,
      });
      setPreview(null);
      setSuccessMessage("Email sent successfully");
    } catch (err) {
      console.error(err);
    }
  };



  // console.log("formDataformDataformDataformData", formData);



  return (
    <>
      <div className="container p-2 pt-0">
{/*         <h3 className="text-center">Looking for something else?</h3>
        <h3 className="text-center">
          We will find it for you!
        </h3> */}
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* TODO: have user's name here as from */}
          <div className="form-group" style={{ display: "none" }}>
            <input
              className="form-control"
              type="text"
              name="from"
              required
              placeholder="{from}"
              value="From"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control mb-3"
              type="text"
              name="productName"
              required
              placeholder="Product Name:"
              value={productName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control mb-3"
              name="description"
              required
              placeholder="Description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <div
              className="file-input-container"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              required
            >
              <div className="dropzone" onClick={handleClick}>
                {formData.image &&
                formData.image.type &&
                formData.image.type.startsWith("image/") ? (
                  <img
                    id="img-preview"
                    src=""
                    alt="Preview"
                    className="img-thumbnail"
                  />
                ) : formData.image ? (
                  formData.image.name
                ) : (
                  <>
                    <p id="file-name" className="fw-bold">Please Upload Image or PDF</p>
                    <p>Drag and drop your image here, or click to select image</p>
                  </>
                )}
                
{/*                 (
                  <>
                    <p id="file-name">No file chosen</p>
                  </>
                )}
                {formData.image && formData.image ? (
                  ""
                ) : (
                  <p>Drag and drop your file here, or click to select file</p>
                )} */}

                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <button
              className="btn btn-block btn-success mt-3"
              disabled={isSending}
            >
              {isSending ? `Sending${dots}` : "Send Message"}
            </button>
          </div>
        </form>
        {successMessage && (
          <div className="alert alert-success p-1 mt-3 mb-0" role="alert">
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default QuoteComponentHeader;
