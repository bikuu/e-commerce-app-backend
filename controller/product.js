const Product = require("../model/Product");
const path = require("path");

const fetchProduct = async (req, res, next) => {
  let products = await Product.find();
  res.send({ data: products });
};

const storeProduct = async (req, res, next) => {
  try {
    let imageNames = [];
    let images = await req.files.images;
    let arrayImage = Array.isArray(images) ? images : [images];
    console.log(arrayImage);
    arrayImage.forEach((img) => {
      let file_name =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(img.name);

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
  try {
    /* check if the porudct belongs to the same seller  */
    let product = await Product.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.send(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchProduct,
  storeProduct,
  updateProduct,
};
