import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadImageCloudinary = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUDNAME
    }/image/upload`,
    formData
  );
  return { url: data.secure_url };
};
