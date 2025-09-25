export const uploadToCloudinary = async (
  file: File,
  isProfilePicture = false
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

  // Auto-detect image or video
  const resourceType = file.type.startsWith("video") ? "video" : "image";

  // Different transformations based on context
  // let transformations = "q_auto,f_auto"; // default auto quality
  // if (isProfilePicture && resourceType === "image") {
  //   transformations = "w_500,h_500,c_fill,q_auto,f_auto"; // square profile
  // } else if (!isProfilePicture && resourceType === "image") {
  //   transformations = "w_1600,h_600,c_fill,q_auto,f_auto"; // cover photo
  // } else if (resourceType === "video") {
  //   transformations = "q_auto,f_auto"; // Cloudinary optimizes video automatically
  // }

  // formData.append("transformation", transformations);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url; // final optimized URL
};
