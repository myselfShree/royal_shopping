import { v2 as cloudinary } from 'cloudinary'

// Support a single CLOUDINARY_URL env or individual parts
if (process.env.CLOUDINARY_URL) {
  // cloudinary will parse CLOUDINARY_URL; ensure secure is true
  cloudinary.config({ secure: true })
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
}

export default cloudinary
