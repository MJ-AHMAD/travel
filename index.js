// প্রয়োজনীয় প্যাকেজ ইম্পোর্ট
const Amadeus = require('amadeus');
require('dotenv').config();

// Amadeus API কনফিগারেশন
const amadeus = new Amadeus({
clientId: process.env.AMADEUS_API_KEY,
clientSecret: process.env.AMADEUS_API_SECRET
});

// API কলের আগে লগিং
console.log('Making API call to Amadeus');

amadeus.referenceData.urls.checkinLinks.get({
airlineCode: 'BA'
}).then(response => {
// API কল সফল হলে লগিং
console.log('API call successful:', response.data);
}).catch(error => {
// API কল ব্যর্থ হলে লগিং
console.error('API call failed:', error);
});

// ফাংশনের শুরুতে এবং শেষে লগিং
function fetchData() {
console.log('fetchData function started');
// API কল বা অন্য কোনো লজিক
console.log('fetchData function ended');
}

// fetchData ফাংশন কল
fetchData();