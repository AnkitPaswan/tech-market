const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE PRODUCT
// verifyTokenAndAdmin
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
    // res.status(201).json({ message: 'product created', product: savedProduct });
  } catch (err) {
    res.status(500).json(err);
  }
});

//  UPDATE PRODUCT
// verifyTokenAndAdmin
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // --------------------------------------------------------------------------------------------------------------------

//DELETE PRODUCT

// verifyTokenAndAdmin
router.delete("/:id" , async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// // -----------------------------------------------------------------------------------------------------------

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // --------------------------------------------------------------------------------------------------------

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(2);
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// search query for products

router.get("/search", async (req, res) => {
    const { q } = req.query;
    // console.log(q);
    try {
      if (!q.length === 0)
        return res.status(400).json({ message: "No query found" });
      const regex = new RegExp(q, "i");
      const results = await Product.find({ $or: [{ title: regex }] });
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json(err);
    }
  });

  // --------------------------------------------------------------------------

//GET TOTAL PRODUCTS STATS

router.get("/stats", async (req, res) => {
    try {
      const data = await Product.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
