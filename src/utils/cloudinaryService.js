export const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary configuration missing");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    // Optional: Request a square thumbnail transformation on upload 
    // But since we are cropping square client-side, we might just rely on that.
    // However, for optimization, we can tell Cloudinary to limit size.
    // formData.append("eager", "w_400,h_400,c_fill,g_face,q_auto:good"); 

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Image upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Return the HTTPS URL
};
