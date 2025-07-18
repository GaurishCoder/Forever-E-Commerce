import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";
import razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const currency = "inr";
const deliveryCharges = 10;

// payment gateway initailization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstances = new razorpay({
  key_id: process.env.RAZORPAY_SECRET_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Paying with COD
const placeOrder = async (req, res) => {
  try {
    let { userId } = req;
    let { items, amount, address } = req.body;
    let orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    let order = new Order(orderData);
    await order.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Paying with Stripe
const placeOrderStripe = async (req, res) => {
  try {
    let { userId } = req;
    let { items, amount, address } = req.body;
    const { origin } = req.headers;

    let orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    let order = new Order(orderData);
    await order.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // assuming item.price is in INR, Stripe expects paise
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100, // assuming item.price is in INR, Stripe expects paise
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Stripe
const verifyStripe = async (req, res) => {
  try {
    let { userId } = req;
    let { orderId, success } = req.body;
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true ,  message:"Payment Successful"});
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false , message:"Payment Failed"});
    }
  } catch (error) { 
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Paying with Razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    let { userId } = req;
    let { items, amount, address } = req.body;

    let orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    let order = new Order(orderData);
    await order.save();

    const options = {
      amount:amount*100,
      currency:currency.toUpperCase(),
      receipt:order._id.toString()
    }

    await razorpayInstances.orders.create(options,(error,order)=>{
      if(error){
        console.log(error);
        return res.json({success:false, message:error})
      }
      res.json({success:true,order})
    })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async(req, res) => {
  try {
     let { userId } = req;
    let { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstances.orders.fetch(razorpay_order_id);
    console.log(orderInfo);
    if(orderInfo.status === "paid"){
      await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true});
      await User.findByIdAndUpdate(userId,{cartData:{}});
      res.json({success:true , message:"Payment Successful"});
    }else{
      res.json({success:false , message:"Payment Failed"});
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orderData = await Order.find();
    res.status(200).json({ order: orderData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Order not found" });
  }
};

// User Order Place from Frontend
const userOrders = async (req, res) => {
  try {
    let { userId } = req;
    let userOrder = await Order.find({ userId: userId });
    let orderData = userOrder;
    res.json({ order: orderData });
  } catch (error) {
    console.log(error);
    res.json({ message: "Order not found" });
  }
};

// Update Order Status
const updateStatus = async (req, res) => {
  try {
    let { status, orderId } = req.body;
    const orderData = await Order.findById(orderId);
    orderData.status = status;
    await Order.findByIdAndUpdate(
      orderId,
      { status },
      { runValidators: true, new: true }
    );
    res.status(200).json({ message: "Status Updated!!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Order not found" });
  }
};

export default {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
};
