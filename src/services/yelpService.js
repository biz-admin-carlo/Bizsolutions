// src/services/yelpService.js

const API_KEY = 'pdHWvLb13V6ePwANpAoN4Tgwpn3OM0t4i8IT9Iz6hqtptyoCOcjUfnjs_1OhhoCxxaUROFXVHBrZkbOjdWtT9KyKoshBujNf4Xv7eP36DcjYYdIq0lckjeLD6PKbZXYx';

const fetchBusinesses = async (latitude, longitude, category) => {
  const url = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=${category}&radius=8046&sort_by=distance&limit=20`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from Yelp:', error);
    throw error;
  }
};

export { fetchBusinesses };