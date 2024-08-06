<h1 align="center">OG Generator- Generate og image for your post</h1>
<br />

An OG image (Open Graph image) is a specific type of image used in social media sharing. When you share a link to a webpage on platforms like Facebook, LinkedIn, or Twitter, the OG image is the image that appears in the preview of the link. This image is defined using Open Graph meta tags in the HTML of the webpage.

With OG Generator, you can generate a basic og image for your post.

## Features

- **Free OG Generate**: Input your title and content for the post, along with an image (optional) to generate a free and basic og for the post

- **Uploaded Url**: Used cloudinary APIs to store the generated image. The image can be easily viewed or downloaded once generated.
  
- **Saved in Local Storage**: The generated image is available inside the local storage to persist data.


## Getting Started

1. Set up the client and server as described in the Installation section.
2. Provide title, content, image (optional) and click generate
3. You can view the generated OG image, download and view the image

## Installation

These are the steps to set up the project locally:

### Client (Frontend)

1. Clone the repository: `git clone [repository URL]`
2. Install dependencies: `npm i`
3. Start the client: `npm run start` (port 3000)

Example `.env` file:
```
REACT_APP_BACKEND=__local_backend_url__
```

### Server (Backend)

1. Navigate to the server directory: `cd backend`.
2. Install dependencies: `npm i`
3. Start the server: `npm run start` (port 5000)

Example `.env` file:
```
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_SECRET=your_cloudinary_secret
CLOUDINARY_API=your_cloudinary_api
```

## Tech Stack

- **Frontend**: React.js
- **Backend**: Using Express.js and Node.js
- Cloudinary to store the generated image

## Demo

- You can visit the site [here](https://og-generator-alpha.vercel.app)
- Screenshots for the site are available below: 

![home](https://res.cloudinary.com/dwuyp1nss/image/upload/v1722970974/og/home_yb6dsw.jpg)
![home2](https://res.cloudinary.com/dwuyp1nss/image/upload/v1722970974/og/home2_jgik7r.jpg)
![generated](https://res.cloudinary.com/dwuyp1nss/image/upload/v1722970983/og/generated_p97hm2.jpg)
![example og image](https://res.cloudinary.com/dwuyp1nss/image/upload/v1722966983/og/asngrmc2zyodqpjln9w9.png)


## Contact

If you have any questions or need support, feel free to contact at mayankbansal125@gmail.com

