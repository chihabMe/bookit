import baseCloudinary from "cloudinary";
const cloudinary = baseCloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const upload = cloudinary.uploader.upload;
export const upload_stream = cloudinary.uploader.upload_stream;

export const generateUploadUrl = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const fileDetails = {
    resource_type: "auto", // The type of resource being uploaded (e.g., 'image', 'video')
    folder: "menu", // The folder in your Cloudinary account to upload the file to
    // Additional file details (e.g., public_id, format, etc.) can be included here
  };

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      ...fileDetails,
    },
    process.env.CLOUDINARY_SECRET ?? ""
  );

  const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload?api_key=${process.env.CLOUDINARY_KEY}&timestamp=${timestamp}&signature=${signature}`;
  console.log(uploadUrl);

  return uploadUrl;
};
