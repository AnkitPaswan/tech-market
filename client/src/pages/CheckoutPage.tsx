import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../context/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const { state } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createCheckoutSession = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products: state.items.map(item => ({
            id: item.product._id,
            title: item.product.title,
            desc: item.product.desc,
            img: item.product.img,
            price: item.product.price,
            quantity: item.quantity,
          })) }),
        });
        const data = await response.json();
        const stripe = await stripePromise;
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({
            sessionId: data.id,
          });
          if (error) {
            console.error("Stripe redirect error:", error);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error creating checkout session:", error);
        setLoading(false);
      }
    };

    if (state.items.length === 0) {
      window.location.href = "/";
    } else {
      createCheckoutSession();
    }
    
  }, [state.items]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <p className="text-lg font-semibold">Redirecting to checkout...</p>
      ) : (
        <p className="text-lg font-semibold">Preparing your checkout...</p>
      )}
    </div>
  );
};

export default CheckoutPage;
