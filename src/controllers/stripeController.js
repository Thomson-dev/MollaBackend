import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(
  "sk_test_51JR35pDcBGT3lmREYubBkcv5llG86I1J5CF7vUVY1I0IC4FpvJZRbZfnXHLSk86evgWFSxRfTEnYCW8YY6OoPbQz00RUvGrS68"
);

export const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
