import User from "../models/user.model.js";

const addToCart = async (req, res) => {
  try {
    let { itemId, size } = req.body;
    let { userId } = req;
    let userData = await User.findById(userId);
    let cartData = userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product Not Found" });
  }
};

const updateQuantity = async (req, res) => {
  try {
    let { id, size, quantity } = req.params;
    let { userId } = req;
    let userData = await User.findById(userId);
    let cartData = userData.cartData;
    cartData[id][size] = quantity;
    let cart = await User.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Cart Updated", cart });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product Not Found" });
  }
};

const getCartCount = async (req, res) => {
  try {
    let { userId } = req;
    let userData = await User.findById(userId);
    let cartData = userData.cartData;
    let total = 0;
    for (let items in cartData) {
      let sizeData = cartData[items];
      for (let size in sizeData) {
        total = total + Number(sizeData[size]);
      }
    }
    res.status(200).json({ total });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product Not Found" });
  }
};

const getUserCart = async (req, res) => {
  try {
    let { userId } = req;
    let userData = await User.findById(userId);
    let cartData = userData.cartData;
    res.status(200).json({ cart: cartData });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "User must login in" });
  }
};

const removeCart = async (req, res) => {
  try {
    const { userId } = req;
    const { id, size } = req.params;

    const userData = await User.findById(userId);
    const cartData = userData.cartData;

    if (cartData[id] && cartData[id][size]) {
      delete cartData[id][size];

      if (Object.keys(cartData[id]).length === 0) {
        delete cartData[id];
      }
      await User.findByIdAndUpdate(
        userId,
        { cartData },
        { new: true, runValidators: true }
      );

      res.status(200).json({ message: "Cart item deleted" });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to delete item" });
  }
};

export default {
  addToCart,
  updateQuantity,
  getUserCart,
  removeCart,
  getCartCount,
};
