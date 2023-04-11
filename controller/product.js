const Product = require("../model/Product");
const path = require("path");
const fs = require("fs");

const fetchProduct = async (req, res, next) => {
  let products = await Product.find();
  res.send({ data: products });
};

const storeProduct = async (req, res, next) => {
  try {
    let imageNames = [];
    let images = await req.files.images;
    let arrayImage = Array.isArray(images) ? images : [images];
    arrayImage.forEach((img) => {
      let file_name =
        // Date.now() +
        // "-" +
        // Math.round(Math.random() * 1e9) +
        img.name;

      img.mv(path.join(__dirname, "../", "uploads/") + file_name);
      imageNames.push(file_name);
    });

    let product = await Product.create({
      ...req.body,
      images: imageNames,
      created_by: req.user._id,
    });
    res.send(product);
  } catch (err) {
    next(err);
  }
};
const updateProduct = async (req, res, next) => {
  let imageDatas = await req.files.images;
  let images = [];

  let product_data = await Product.findById(req.params.id);
  let old_images = product_data.images;

  console.log(old_images);
  let sent_old_images = req.body.images;
  console.log("sent", sent_old_images);

  old_images.forEach((img) => {
    if (sent_old_images?.includes(img)) {
      images.push(img);
      console.log(images);
    } else {
   
      fs.unlinkSync(path.resolve("uploads", img));

    }
  });
  try {
    let arrayImage = Array.isArray(imageDatas) ? imageDatas : [imageDatas];
    arrayImage?.forEach((img) => {
      let file_name =
        // Date.now() +
        // "-" +
        // Math.round(Math.random() * 1e9) +
        img.name;

      img.mv(path.join(__dirname, "../", "uploads/") + file_name);
      images.push(file_name);
    });
    /* check if the porudct belongs to the same seller  */
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images },
      {
        runValidators: true,
        new: true,
      }
    );
    res.send(product);
  } catch (err) {
    next(err);
  }
};

const removeProduct = async (req, res, next) => {

  let product = await Product.findById(req.params.id)

  if(product){

      product.images.forEach(img =>{
          fs.unlinkSync(path.resolve("uploads",img))
      })
      await Product.findByIdAndDelete(req.params.id)
      return res.status(204).end()
  }

  res.status(404).send("Resource not found")
  
}

module.exports = {
  fetchProduct,
  storeProduct,
  updateProduct,
  removeProduct
};
