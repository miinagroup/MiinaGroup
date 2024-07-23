import CreateUniformComponent from "./components/CreateUniformComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const createUniformApiRequest = async (formInputs) => {
    const { data } = await axios.post(`/api/uniforms/admin`, { ...formInputs });
    return data;
};

const uploadImagesApiRequest = async (images, uniformId) => {
    const formData = new FormData();
    Array.from(images).forEach((image) => {
        formData.append("images", image);
    });
    const { data } = await axios.post("/api/uniforms/admin/uploadimg?uniformId=" + uniformId, formData);
    return data;
};

const uploadImagesCloudinaryApiRequest = (images, uniformId) => {
    const url = "https://api.cloudinary.com/v1_1/dxvwresim/image/upload";
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        let file = images[i];
        formData.append("file", file);
        formData.append("upload_preset", "CTLimage");
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                axios.post("/api/uniforms/admin/uploadimg?cloudinary=true&uniformId=" + uniformId, data);
            })
    }
}

const uploadPdfApiRequest = async (pdfs, uniformId) => {
    const formData = new FormData();
    Array.from(pdfs).forEach((pdf) => {
        formData.append("pdfs", pdf);
    });
    const { data } = await axios.post("/api/uniforms/admin/uploadpdf?uniformId=" + uniformId, formData);
    return data;
};

const uploadPdfCloudinaryApiRequest = (pdfs, uniformId) => {
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
                axios.post("/api/uniforms/admin/uploadpdf?cloudinary=true&uniformId=" + uniformId, data);
            })
    }
}


const AdminCreateUniform = () => {
    return <CreateUniformComponent
        createUniformApiRequest={createUniformApiRequest}
        uploadImagesApiRequest={uploadImagesApiRequest}
        uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
        uploadPdfApiRequest={uploadPdfApiRequest}
        uploadPdfCloudinaryApiRequest={uploadPdfCloudinaryApiRequest}
    />
};

export default AdminCreateUniform;