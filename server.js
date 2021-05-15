import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

const app = express();

const port = process.env.port || 8080;
const connection_url =
  "mongodb+srv://rushabh:rushabh123@cluster0.tyzfi.mongodb.net/ecomm?retryWrites=true&w=majority";

const productSchema = mongoose.Schema({
  userId: String,
  productId: Number,
  id: Number,
});

const orderScema = mongoose.Schema({
  orderId: Number,
  userId: Number,
  totalPrice: Number,
  address: {},
  payment: String,
  products: {},
});

const addressesSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  address1: String,
  address2: String,
  city: String,
  province: String,
  country: String,
  zip: String,
  phone: String,
  customer_id: String,
  default: Boolean,
});

const cartSchema = mongoose.Schema({
  userId: String,
  productId: Number,
  product: {},
});

const cartModel = mongoose.model("carts", cartSchema);
const addressModel = mongoose.model("addresses", addressesSchema);

app.use(express.json());
app.use(Cors());

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.get("/products", (req, res) => {
  mongoose.model("products", productSchema).find((err, data) => {
    res.status(201).send(data);
  });
});

app.get("/products/:id", (req, res) => {
  mongoose
    .model("products", productSchema)
    .findOne({ id: parseInt(req.params.id) }, (err, data) => {
      res.status(201).send(data);
    });
});

app.get("/cart/:userId", (req, res) => {
  mongoose
    .model("cart", productSchema)
    .find({ userId: req.params.userId }, (err, data) => {
      res.status(201).send(data);
    });
});

app.get("/addresses/:customerId", (req, res) => {
  addressModel.find({ customer_id: req.params.customerId }, (err, data) => {
    res.status(201).send(data);
  });
});

app.get("/orders/:userId", (req, res) => {
  mongoose
    .model("orders", orderScema)
    .find({ userId: req.params.userId }, (err, data) => {
      res.status(201).send(data);
    });
});

app.post("/orders", (req, res) => {
  mongoose.model("orders", orderScema).create(req.body, (err, data) => {
    res.status(201).send(data);
  });
});

app.delete("/addresses/:customerId", (req, res) => {
  addressModel.deleteMany({ _id: req.params.customerId }, (err, data) => {
    res.status(201).send(data);
  });
});

app.post("/addresses", (req, res) => {
  addressModel.create(req.body, (err, data) => {
    res.status(201).send(data);
  });
});

app.delete("/cart/:userId", (req, res) => {
  mongoose
    .model("cart", productSchema)
    .deleteMany({ userId: req.params.userId }, (err, data) => {
      res.status(201).send(data);
    });
});

app.post("/cart", (req, res) => {
  cartModel.create(req.body, (err, data) => {
    res.status(201).send(data);
  });
});

app.listen(port, () => console.log(`Listening on localhost ${port}`));
