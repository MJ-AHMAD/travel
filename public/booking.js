document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    const airline = urlParams.get('airline');
    const departure = urlParams.get('departure');
    const arrival = urlParams.get('arrival');
    const duration = urlParams.get('duration');
    const stops = urlParams.get('stops');
    const price = urlParams.get('price');

    document.getElementById('airline').value = airline;
    document.getElementById('departure').value = departure;
    document.getElementById('arrival').value = arrival;
    document.getElementById('duration').value = duration;
    document.getElementById('stops').value = stops;
    document.getElementById('price').value = price;
});

document.getElementById('booking-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const airline = document.getElementById('airline').value;
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const duration = document.getElementById('duration').value;
    const stops = document.getElementById('stops').value;
    const price = document.getElementById('price').value;
    const passengerName = document.getElementById('passenger-name').value;
    const passengerEmail = document.getElementById('passenger-email').value;

    window.location.href = `payment.html?airline=${encodeURIComponent(airline)}&departure=${encodeURIComponent(departure)}&arrival=${encodeURIComponent(arrival)}&duration=${encodeURIComponent(duration)}&stops=${encodeURIComponent(stops)}&price=${encodeURIComponent(price)}&passengerName=${encodeURIComponent(passengerName)}&passengerEmail=${encodeURIComponent(passengerEmail)}`;
});
