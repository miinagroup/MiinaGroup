import AdminEditUniformComponent from "./components/AdminEditUniformComponent";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const fetchUniform = async (id) => {
    const { data } = await axios.get(`/api/uniforms/get-one/${id}`);
    return data;
}

const imageDeleteHandler = async (imagePath, uniformId) => {
    // 在productController的 adminDeleteProductImage 里面 已经decode了url，所以这里要encode
    let encoded = encodeURIComponent(imagePath);
    if (process.env.NODE_ENV === "development") {
        // TODO: change to !==  ===
        await axios.delete(`/api/uniforms/admin/image/${encoded}/${uniformId}`);
    } else {
        await axios.delete(
            `/api/uniforms/admin/image/${encoded}/${uniformId}?cloudinary=true`
        );
    }
};

const pdfDeleteHandler = async (pdfPath, uniformId) => {
    // 在productController的 adminDeleteProductImage 里面 已经decode了url，所以这里要encode
    let encoded = encodeURIComponent(pdfPath);
    if (process.env.NODE_ENV === "development") {
        // TODO: change to !==  ===
        await axios.delete(`/api/uniforms/admin/pdf/${encoded}/${uniformId}`);
    } else {
        await axios.delete(
            `/api/uniforms/admin/pdf/${encoded}/${uniformId}?cloudinary=true`
        );
    }
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

const updateUniformApiRequest = async (uniformId, formInputs) => {
    const { data } = await axios.put(`/api/uniforms/admin/updateUniform/${uniformId}`, {
        ...formInputs,
    });
    return data;
};

const AdminEditUniform = () => {
    return (
        <AdminEditUniformComponent
            fetchUniform={fetchUniform}
            imageDeleteHandler={imageDeleteHandler}
            pdfDeleteHandler={pdfDeleteHandler}
            uploadImagesApiRequest={uploadImagesApiRequest}
            uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
            uploadPdfApiRequest={uploadPdfApiRequest}
            uploadPdfCloudinaryApiRequest={uploadPdfCloudinaryApiRequest}
            updateUniformApiRequest={updateUniformApiRequest}
        />
    )
};

export default AdminEditUniform;