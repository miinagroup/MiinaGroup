import axios from "axios";

export const uploadImagesApiRequest = async (images, quoteId) => {
  const formData = new FormData();
  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  const { data } = await axios.post("/api/quotes/upload?quoteId=" + quoteId, formData);
  console.log(formData);
  return data;
};

export const uploadImagesCloudinaryApiRequest = (images, quoteId, index) => {
    const imagesArray = Array.isArray(images) ? images : Array.from(images);

    const url = "https://api.cloudinary.com/v1_1/dxvwresim/image/upload";
    const uploadPromises = imagesArray.map((image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "clientQuoteImage");
        
        return fetch(url, {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            return axios.post(`/api/quotes/upload?cloudinary=true&quoteId=${quoteId}`, data);
        });
    });

    return Promise.all(uploadPromises)
        .then((results) => {
            console.log('All images have been successfully uploaded', results);
            return { message: 'All images have been successfully uploaded.' };
        })
        .catch((error) => {
            console.error('An error occurred:', error);
            throw error; 
        });
}





/* export const uploadImagesCloudinaryApiRequest = (images, quoteId) => {
    const url = "https://api.cloudinary.com/v1_1/dxvwresim/image/upload";
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        let file = images[i];
        formData.append("file", file);
        formData.append("upload_preset", "clientQuoteImage");
        fetch(url, {
            method: "POST",
            body: formData,
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            axios.post("/api/quotes/upload?cloudinary=true&quoteId=" + quoteId, data);
            console.log(data);

        })
    }
} */

/* export const uploadImagesCloudinaryApiRequest = (images) => {
    const url = "https://api.cloudinary.com/v1_1/dxvwresim/image/upload";
    const promises = [];
  
    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append("file", images[i]);
      formData.append("upload_preset", "clientQuoteImage");
      
      promises.push(
        fetch(url, {
          method: "POST",
          body: formData,
        })
        .then(response => response.json())
        .then(data => data.secure_url)
      );
    }
  
    return Promise.all(promises);
  };
   */

  

export const uploadPdfApiRequest = async (pdfs, productId) => {
    const formData = new FormData();
    Array.from(pdfs).forEach((pdf) => {
      formData.append("pdfs", pdf);
    });
    const { data } = await axios.post("/api/products/admin/uploadpdf?productId=" + productId, formData);
    return data;
  };
  
  export const uploadPdfCloudinaryApiRequest = (pdfs,productId) => {
      const url = "https://api.cloudinary.com/v1_1/dxvwresim/image/upload";
      const formData = new FormData();
      for (let i = 0; i < pdfs.length; i++) {
          let file = pdfs[i];
          formData.append("file", file);
          formData.append("upload_preset", "CTLpdf");
          fetch(url, {
              method: "POST",
              body: formData,
          })
          .then(response => {
              return response.json();
          })
          .then(data => {
              axios.post("/api/products/admin/uploadpdf?cloudinary=true&productId=" + productId, data);
          })
      }
  }

  export function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }
  