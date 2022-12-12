import dotenv from 'dotenv'
dotenv.config()
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    secure:true
})
const getAssetInfo = async (publicId:string) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};


const uploadImage = async (imagePath:string,folder:string) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder:folder
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      // console.log(result);
      return result
    } catch (error) {
      console.error(error);
    }
};
const createImageTag = (publicId:string, ...colors:any) => {

    // Set the effect color and background color
    const [effectColor, backgroundColor] = colors;

    // Create an image tag with transformations applied to the src URL
    let imageTag = cloudinary.image(publicId, {
      transformation: [
        { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
        { radius: 'max' },
        { effect: 'outline:10', color: effectColor },
        { background: backgroundColor },
      ],
    });

    return imageTag;
};

export {
    uploadImage,
    getAssetInfo,
    createImageTag
}