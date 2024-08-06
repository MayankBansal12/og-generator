const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: "dwuyp1nss",
    api_key: "313548839779458",
    api_secret: "_xbHEzLqKSgrZr9ofHEPRGzN2No",
})
const opts = {
    folder: "og",
    overwrite: true,
    invalidate: true,
    resource_type: "image"
}

const uploadImg = async (buffer) => {
    // convert buffer to base64 string
    const base64Image = buffer.toString('base64');

    // convert to data uri
    const dataURI = `data:image/jpeg;base64,${base64Image}`;

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(dataURI, opts, async (error, result) => {
            if (result && result.secure_url) {
                resolve(result.secure_url)
            } else {
                console.log('==upload-image-cloudinary==\n', error)

                // in case of any error, resolve with placeholder image
                resolve(
                    'https://images.vexels.com/media/users/3/76083/preview2/30c4d692bf87f9f1336a13d7b629da0a-vector-image-placeholder.jpg',
                )
            }
        })
    })
}

module.exports = uploadImg