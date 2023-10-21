async function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    console.log(file)
    console.log("Function Running")
    if (!file) {
      alert('Please select an image.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'htrle3st');
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dmhqtmk5s/image/upload?api_key=267788825558747&signature=h1b3vO0rmVayUZfcIwzDOk4h3Xk', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data.secure_url);
  
        // Send the image URL to the backend for storage
        saveImageUrlToBackend(data.secure_url);
      } else {
        console.error('Error uploading image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  
  function saveImageUrlToBackend(imageUrl) {
    // Send the image URL to your backend using an HTTP request
    // For simplicity, let's assume you're using fetch to send a POST request to your backend
    fetch('http://your-backend-api.com/saveImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageUrl })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Image URL saved to backend:', data);
    })
    .catch(error => {
      console.error('Error saving image URL to backend:', error);
    });
  }
  