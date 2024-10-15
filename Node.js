const express = require('express');
const app = express();
const stripe = require('stripe')('your-secret-key-here');

app.use(express.static('.'));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    const { paymentMethodId, amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'bdt',
            payment_method: paymentMethodId,
            confirmation_method: 'manual',
            confirm: true,
        });

        res.send({ success: true });
    } catch (error) {
        res.send({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
