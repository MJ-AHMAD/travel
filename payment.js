const stripe = Stripe('your-publishable-key-here');
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        document.getElementById('payment-result').textContent = error.message;
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const priceBDT = urlParams.get('priceBDT');

        fetch('/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: priceBDT * 100 }), // Convert BDT to cents
        }).then(response => response.json()).then(data => {
            if (data.error) {
                document.getElementById('payment-result').textContent = data.error;
            } else {
                document.getElementById('payment-result').textContent = 'Payment successful!';
            }
        });
    }
});
