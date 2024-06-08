const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const authController = require("../controllers/authController");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage: multerStorage, fileFilter });
const uploadSingleImage = upload.single("photo");

router.post("/", authController.protect, (req, res) => {
  // Get the directory of the images
  const imageDirectory = path.join(__dirname, "../../client/public/uploads");

  // Read the directory
  fs.readdir(imageDirectory, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // Filter the files that start with `img-userId` and delete them
    files.forEach((file) => {
      if (file.startsWith(`img-${req.user._id}`)) {
        fs.unlink(path.join(imageDirectory, file), (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    });
  });

  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    const fileName = `img-${req.user._id}-${Date.now()}.jpeg`;
    const resizedImagePath = path.join(
      __dirname,
      "../../client/public/uploads/",
      fileName
    );

    // Use sharp to resize the image and save it to disk
    sharp(req.file.buffer)
      .resize(1024, 1024)
      .toFormat("jpeg")
      .jpeg({ quality: 70 })
      .toFile(resizedImagePath, (err, info) => {
        if (err) {
          console.error(
            "Error occurred while resizing or converting the image: ",
            err
          );
          return res.status(500).send({ message: "Failed to resize image" });
        }

        // Check if the output file is created and is in JPEG format
        if (info.format !== "jpeg") {
          console.error("Failed to convert image to JPEG");
          return res
            .status(500)
            .send({ message: "Failed to convert image to JPEG" });
        }

        res.status(200).send({
          message: "Image uploaded and resized successfully",
          image: `/${fileName}`,
        });
      });
  });
});

module.exports = router;
