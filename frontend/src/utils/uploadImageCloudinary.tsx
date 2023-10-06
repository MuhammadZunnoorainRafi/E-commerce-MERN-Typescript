import axios from 'axios';

export const uploadImageCloudinary = async (file: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'sernEcommerce');
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/dk5gpbckp/image/upload`,
    formData
  );
  return { url: data.secure_url };
};
