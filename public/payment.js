document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    const airline = urlParams.get('airline');
    const departure = urlParams.get('departure');
    const arrival = urlParams.get('arrival');
    const duration = urlParams.get('duration');
    const stops = urlParams.get('stops');
    const price = urlParams.get('price');
    const passengerName = urlParams.get('passengerName');
    const passengerEmail = urlParams.get('passengerEmail');

    document.getElementById('airline').textContent = airline;
    document.getElementById('departure').textContent = departure;
    document.getElementById('arrival').textContent = arrival;
    document.getElementById('duration').textContent = duration;
    document.getElementById('stops').textContent = stops;
    document.getElementById('price').textContent = price;
    document.getElementById('passenger-name').textContent = passengerName;
    document.getElementById('passenger-email').textContent = passengerEmail;
});

document.getElementById('payment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    // Handle the payment logic here
    alert('Payment confirmed!');
});
