const client_id = 'bqK2WFXiBzkXDGoB3nQsrYQsReZUhc51';
const client_secret = 'BMhUjAxVvoEX0CLT';

async function getAccessToken() {
    try {
        const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
        });
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function handleFormSubmission(event) {
    event.preventDefault();
    const tripType = document.getElementById('trip-type').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departureDate = document.getElementById('departure-date').value;
    const returnDate = document.getElementById('return-date').value;
    const travelClass = document.getElementById('travel-class').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;

    try {
        const accessToken = await getAccessToken();
        let url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${departureDate}&adults=${adults}&travelClass=${travelClass}`;
        if (tripType === 'return' && returnDate) {
            url += `&returnDate=${returnDate}`;
        }
        if (children > 0) {
            url += `&children=${children}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    data.data.forEach(offer => {
        const offerDiv = document.createElement('div');
        offerDiv.className = 'flight-offer';
        
        const validatingAirline = offer.validatingAirlineCodes.join(', ');
        const departureSegment = offer.itineraries[0].segments[0];
        const arrivalSegment = offer.itineraries[0].segments.slice(-1)[0];
        const duration = offer.itineraries[0].duration;
        const stops = offer.itineraries[0].segments.length - 1;
        const price = `<strong>${offer.price.total} ${offer.price.currency}</strong>`;
        
        offerDiv.innerHTML = `
            <div><strong>Airline:</strong> ${validatingAirline}</div>
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
                <div class="left">
                    <p>Departure: ${departureSegment.departure.iataCode} at ${departureSegment.departure.at}</p>
                    <p>Arrival: ${arrivalSegment.arrival.iataCode} at ${arrivalSegment.arrival.at}</p>
                </div>
                <div class="right">
                    <p>Duration: ${duration}</p>
                    <p>${stops} stop(s)</p>
                    <p>Price: ${price}</p>
                    <button type="button" onclick="openBookingPage('${validatingAirline}', '${departureSegment.departure.iataCode} at ${departureSegment.departure.at}', '${arrivalSegment.arrival.iataCode} at ${arrivalSegment.arrival.at}', '${duration}', '${stops}', '${offer.price.total} ${offer.price.currency}')">Select</button>
                </div>
            </div>
        `;
        resultsDiv.appendChild(offerDiv);
    });
}

function openBookingPage(airline, departure, arrival, duration, stops, price) {
    window.location.href = `booking.html?airline=${encodeURIComponent(airline)}&departure=${encodeURIComponent(departure)}&arrival=${encodeURIComponent(arrival)}&duration=${encodeURIComponent(duration)}&stops=${encodeURIComponent(stops)}&price=${encodeURIComponent(price)}`;
}

document.getElementById('flight-search-form').addEventListener('submit', handleFormSubmission);
