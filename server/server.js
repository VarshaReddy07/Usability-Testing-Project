const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const paypal = require("paypal-rest-sdk");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const orders = []; // In-memory storage for orders

// Use a counter to generate unique order IDs
let orderIdCounter = 1;

// Set up PayPal SDK with your credentials
paypal.configure({
  mode: "sandbox", // Change to "live" for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/pay", async (req, res) => {
  const createPaymentJson = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/orders", // Replace with your success URL
      cancel_url: "http://localhost:3000/cart", // Replace with your cancel URL
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Your Product Name",
              sku: "001",
              price: req.body.amount,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: req.body.amount,
        },
        description: "Description of your product",
      },
    ],
  };

  paypal.payment.create(createPaymentJson, function (error, payment) {
    if (error) {
      console.error("Error creating PayPal payment:", error);
      return res.json({
        success: false,
        error: "Payment creation failed. Please try again.",
      });
    } else {
      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      ).href;

      res.json({ success: true, approvalUrl });
    }
  });
});

// Endpoint to retrieve orders
app.get("/orders", (req, res) => {
  res.json({ orders });
});

// Endpoint to delete an order
app.delete("/orders/:orderId", (req, res) => {
  const orderId = req.params.orderId;

  // Find and remove the order with the given ID
  const index = orders.findIndex((order) => order.id == orderId);
  if (index !== -1) {
    orders.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, error: "Order not found" });
  }
});

// Endpoint to store order details
app.post("/storeOrder", (req, res) => {
  const order = {
    id: orderIdCounter++, // Generate a unique order ID
    amount: req.body.amount,
    date: req.body.date,
    // Add any other necessary details
  };

  // Store order details
  orders.push(order);

  res.json({ success: true, orderId: order.id });
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
