const express = require("express");
const cors = require("cors");
require("dotenv").config()
const puppeteer = require('puppeteer');
const uploadImg = require("./helper/upload-img");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }))

app.post('/generate-og-image', async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    console.log("imageurl: ", imageUrl)

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = `
        <html>
          <head>
            <style>
              body { width: 1200px; height: 630px; margin: 0; display: flex; align-items: center; justify-content: center; }
              .container { text-align: center; }
              .title { font-size: 48px; font-weight: bold; }
              .content { font-size: 24px; margin-top: 20px; }
              img { max-width: 100%; max-height: 100%; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="title">${title}</div>
              <div class="content">${content}</div>
              ${imageUrl ? `<img src="${imageUrl}" />` : ''}
            </div>
          </body>
        </html>
      `;

    await page.setContent(htmlContent);
    const imageBuffer = await page.screenshot({ type: 'png' });
    await browser.close();

    // convert buffer to base64 string
    const base64Image = imageBuffer.toString('base64');

    // convert to data uri
    const dataURI = `data:image/jpeg;base64,${base64Image}`;
    // const uploadedUrl = await uploadImg(dataURI)

    res.status(200).json({ message: "image generated!", url: dataURI })
  } catch (error) {
    console.error("error", error)
    res.status(400).json({ message: "error generating image!", url: "" })
  }
});

app.post("/upload-img", async (req, res) => {
  try {
    const { image } = req.body;

    const uploadedUrl = await uploadImg(image)
    res.status(200).json({ message: "image generated!", url: uploadedUrl })
  } catch (error) {
    console.error("error", error)
    res.status(400).json({ message: "error generating image!", url: "" })
  }
})

app.get("/", (req, res) => {
  res.send("running!")
})

app.listen(port, () => {
  console.log("Server running at port: ", port);
})