import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

const createProduct = async (req, res) => {
  try {
    let { name, description, category, subCategory, price, sizes, bestSeller } =
      req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const imagesData = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imageUrl = await Promise.all(
      imagesData.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });

        // Return both secure_url and public_id
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
    );

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product Exists" });
    }

    const productData = new Product({
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      sizes: JSON.parse(sizes),
      images: imageUrl, // Now contains both url and public_id
      date: Date.now(),
      bestSeller: bestSeller === "true",
    });

    await productData.save();

    res.status(200).json({ message: "Product Created!!", product: productData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const showAllProduct = async (req, res) => {
  try {
    const productData = await Product.find();
    res.status(200).json({ product: productData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const renderUpdatePage = async (req, res) => {
  try {
    let { id } = req.params;
    const productData = await Product.findById(id);
    res
      .status(200)
      .json({ message: "Product Found", productData: productData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const updateProduct = async (req, res) => {
  let { id } = req.params;
  let oddProduct = await Product.findById(id);
  let { name, description, price, category, subCategory, sizes, bestSeller } =
    req.body;
  let isImage = req.files.image1 && req.files.image1[0];
  let newImageData = [];
  if (isImage) {
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const imagesData = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    newImageData = await Promise.all(
      imagesData.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
    );
  } else {
    newImageData = oddProduct.images;
  }

  const newProduct = {
    name,
    description,
    price,
    category,
    subCategory,
    sizes: JSON.parse(sizes),
    bestSeller: bestSeller === "true" ? true : false,
    images: newImageData,
  };

  const updatedData = await Product.findByIdAndUpdate(id, newProduct, {
    runValidators: true,
    new: true,
  });
  console.log(updatedData);
  res.status(200).json({ message: "product updated", data: updatedData });
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productData = await Product.findById(id);
    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }
    for (let image of productData.images) {
      if (image.public_id) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product Deleted!!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};


const singleProduct = async (req, res) => {
  try {
    let { id } = req.params;
    const productData = await Product.findById(id);
    res.status(200).json({ data: productData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export default {
  createProduct,
  showAllProduct,
  updateProduct,
  deleteProduct,
  renderUpdatePage,
  singleProduct,
};
