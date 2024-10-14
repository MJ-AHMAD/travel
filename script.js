
// এয়ারলাইনের পূর্ণ নামের ম্যাপ
const airlineNames = {
'BG': 'Biman Bangladesh Airlines',
'SV': 'Saudi Arabian Airlines',
'EK': 'Emirates',
'QR': 'Qatar Airways',
'EY': 'Etihad Airways'
// অন্যান্য এয়ারলাইনের নাম এখানে যোগ করুন
};

// এয়ারপোর্টের নামের ডেটা
const airports = [
{ code: 'DAC', name: 'Hazrat Shahjalal International Airport' },
{ code: 'CGP', name: 'Shah Amanat International Airport' },
{ code: 'ZYL', name: 'Osmani International Airport' },
{ code: 'CXB', name: 'Cox\'s Bazar Airport' },
// অন্যান্য এয়ারপোর্টের নাম এখানে যোগ করুন
];

// এয়ারপোর্টের নাম অটো-কমপ্লিট ফাংশন
function autocomplete(inp, arr) {
let currentFocus;
inp.addEventListener("input", function(e) {
let a, b, i, val = this.value;
closeAllLists();
if (!val) { return false;}
currentFocus = -1;
a = document.createElement("DIV");
a.setAttribute("id", this.id + "autocomplete-list");
a.setAttribute("class", "autocomplete-items");
this.parentNode.appendChild(a);
for (i = 0; i < arr.length; i++) {
if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
b = document.createElement("DIV");
b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
b.innerHTML += arr[i].name.substr(val.length);
b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
b.addEventListener("click", function(e) {
inp.value = this.getElementsByTagName("input")[0].value;
closeAllLists();
});
a.appendChild(b);
}
}
});
inp.addEventListener("keydown", function(e) {
let x = document.getElementById(this.id + "autocomplete-list");
if (x) x = x.getElementsByTagName("div");
if (e.keyCode == 40) {
currentFocus++;
addActive(x);
} else if (e.keyCode == 38) {
currentFocus--;
addActive(x);
} else if (e.keyCode == 13) {
e.preventDefault();
if (currentFocus > -1) {
if (x) x[currentFocus].click();
}
}
});
function addActive(x) {
if (!x) return false;
removeActive(x);
if (currentFocus >= x.length) currentFocus = 0;
if (currentFocus < 0) currentFocus = (x.length - 1);
x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
for (let i = 0; i < x.length; i++) {
x[i].classList.remove("autocomplete-active");
}
}
function closeAllLists(elmnt) {
let x = document.getElementsByClassName("autocomplete-items");
for (let i = 0; i < x.length; i++) {
if (elmnt != x[i] && elmnt != inp) {
x[i].parentNode.removeChild(x[i]);
}
}
}
document.addEventListener("click", function (e) {
closeAllLists(e.target);
});
}

// From এবং To ফিল্ডের জন্য অটো-কমপ্লিট ফাংশন কল
autocomplete(document.getElementById("origin"), airports);
autocomplete(document.getElementById("depart"), airports);

// Return তারিখের ঘর প্রদর্শনের জন্য ফাংশন
function toggleReturnDate() {
const tripType = document.getElementById('trip-type').value;
const returnDateGroup = document.getElementById('return-date-group');
if (tripType === 'return') {
returnDateGroup.style.display = 'block';
} else {
returnDateGroup.style.display = 'none';
}
}

// Access Token জেনারেট করার জন্য নিচের কোডটি ব্যবহার করুন
fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
body: new URLSearchParams({
'grant_type': 'client_credentials',
'client_id': 'IAdRK7OA8APheG6fswXod39h9fiK52tz', // এখানে আপনার API Key বসান
'client_secret': 'JxrFEAiPI3KfkL4R' // এখানে আপনার API Secret বসান
})
})
.then(response => response.json())
.then(data => {
const accessToken = data.access_token;
// Access Token ব্যবহার করে API কল করুন
document.getElementById('flight-form').addEventListener('submit', function(event) {
event.preventDefault();
const origin = document.getElementById('origin').value;
const destination = document.getElementById('depart').value;
const departureDate = document.getElementById('departure-date').value;
const returnDate = document.getElementById('return-date').value;
const directFlights = document.getElementById('directFlights').checked ? 'true' : 'false';
const adults = document.getElementById('adults').value;
const children = document.getElementById('children').value;
const infants = document.getElementById('infants').value;
const cabin = document.getElementById('cabin').value;

let url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}&children=${children}&infants=${infants}&travelClass=${cabin}&nonStop=${directFlights}`;
if (returnDate) {
url += `&returnDate=${returnDate}`;
}

fetch(url, {
method: 'GET',
headers: {
'Authorization': `Bearer ${accessToken}`
}
})
.then(response => response.json())
.then(data => {
const resultsDiv = document.getElementById('results');
resultsDiv.innerHTML = ''; // পূর্বের ফলাফল মুছে ফেলুন

data.data.forEach(flight => {
const flightDiv = document.createElement('div');
flightDiv.classList.add('flight');

const airlineCode = flight.validatingAirlineCodes[0];
const airlineFullName = airlineNames[airlineCode] || 'Unknown Airline';
const priceUSD = flight.price.total;
const priceBDT = (priceUSD * 85).toFixed(2); // USD থেকে BDT রূপান্তর (প্রায় 85 BDT = 1 USD)
const departureTime = flight.itineraries[0].segments[0].departure.at;
const arrivalTime = flight.itineraries[0].segments[0].arrival.at;

flightDiv.innerHTML = `
<p><strong>Airline:</strong> ${airlineCode} (${airlineFullName})</p>
<p><strong>Price:</strong> BDT ${priceBDT}</p>
<p><strong>Departure Time:</strong> ${departureTime}</p>
<p><strong>Arrival Time:</strong> ${arrivalTime}</p>
<button onclick="alert('Booking functionality not implemented yet')">Book Now</button>
`;

resultsDiv.appendChild(flightDiv);
});
})
.catch(error => console.error('Error:', error));
});
})
.catch(error => console.error('Error:', error));
