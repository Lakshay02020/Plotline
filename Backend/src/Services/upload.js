const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dmhqtmk5s',
  api_key: '267788825558747',
  api_secret: 'h1b3vO0rmVayUZfcIwzDOk4h3Xk'
});

// Function to upload an image
async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    console.log('Image uploaded successfully:', result.url);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

// Example usage: upload an image
const imagePath = 'path_to_your_image.jpg'; // Replace with the actual path to your image file
uploadImage(imagePath);
