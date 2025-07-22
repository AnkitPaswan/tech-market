const dotenv = require('dotenv')
dotenv.config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post('/', async (req, res) => {

    const { products } = req.body;
    // console.log(products);

    const lineItems = products.map((product) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: product.title,
                description: product.desc,
                images: [product.img],
                metadata: {
                    id: product.id,
                }
            },
            unit_amount: Math.round(product.price * 100),
            // unit_amount: product.price * 100,
        },
        quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({

        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'inr',
                    },
                    display_name: 'Free shipping',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 5,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 7,
                        },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 1500,
                        currency: 'inr',
                    },
                    display_name: 'Next day air',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 1,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 1,
                        },
                    },
                },
            },
        ],

        phone_number_collection: {
            enabled: true,
        },
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: 'payment',
        shipping_address_collection: { allowed_countries: ["IN"] },
        success_url: "https://tech-market-0cds.onrender.com/successpage",
        cancel_url: "https://tech-market-0cds.onrender.com/cancelpage",

    });
    res.json({ id: session.id })
});

//// users details
router.get("/user-details", async (req, res) => {
    // res.send("hello world");
  
    try {
      const customerId = req.params.customerId;
      const customer = await stripe.customers.retrieve(customerId);
      res.json(customer);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
    // console.log(customerId);
  });

module.exports = router;