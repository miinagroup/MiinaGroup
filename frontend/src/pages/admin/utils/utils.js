import axios from "axios";

export const uploadImagesCloudinaryApiRequest = async (images, productId) => {
    const storageZoneName = 'ctaus/image'; // Replace with your storage zone name
    const storageApiKey = '43646dd6-33b3-4d26-891c7d9ce239-5097-48e2'; // Replace with your storage API key
    for (let i = 0; i < images.length; i++) {
        const fileName = images[i].name;
        const file = images[i]
        const url = `https://ctladmin.b-cdn.net/image/${fileName}`

        // Construct the API endpoint
        const endpoint = `https://storage.bunnycdn.com/${storageZoneName}/${fileName}`;
        try {
            await axios.put(endpoint, file, {
                headers: {
                    'AccessKey': storageApiKey,
                    'Content-Type': file.type,
                },
            })
                .then(response => {
                    return response
                })
                .then(data => {
                    axios.post("/api/products/admin/upload?bunny=true&productId=" + productId, { url: url });
                })
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }
}

export const uploadImagesApiRequest = async (images, productId) => {
    const formData = new FormData();
    Array.from(images).forEach((image) => {
        formData.append("images", image);
    });
    const { data } = await axios.post("/api/products/admin/upload?productId=" + productId, formData);
    return data;
};

export const uploadPdfApiRequest = async (pdfs, productId) => {
    const formData = new FormData();
    Array.from(pdfs).forEach((pdf) => {
        formData.append("pdfs", pdf);
    });
    const { data } = await axios.post("/api/products/admin/uploadpdf?productId=" + productId, formData);
    return data;
};

export const uploadPdfCloudinaryApiRequest = async (pdfs, productId) => {
    const storageZoneName = 'ctaus/pdf'; // Replace with your storage zone name
    const storageApiKey = '43646dd6-33b3-4d26-891c7d9ce239-5097-48e2'; // Replace with your storage API key
    for (let i = 0; i < pdfs.length; i++) {
        const fileName = pdfs[i].name;
        const file = pdfs[i]
        const url = `https://ctladmin.b-cdn.net/pdf/${fileName}`

        // Construct the API endpoint
        const endpoint = `https://storage.bunnycdn.com/${storageZoneName}/${fileName}`;
        try {
            await axios.put(endpoint, file, {
                headers: {
                    'AccessKey': storageApiKey,
                    'Content-Type': file.type,
                },
            })
                .then(response => {
                    return response
                })
                .then(data => {
                    axios.post("/api/products/admin/uploadpdf?bunny=true&productId=" + productId, { url: url });
                })
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }
}
