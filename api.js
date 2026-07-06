// ==============================
// Hotel Booking API
// js/api.js
// ==============================

// Base API URL
const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

/**
 * Fetch all hotels
 */
async function getHotels() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Unable to fetch hotels.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return [];
  }
}

/**
 * Fetch single hotel by ID
 */
async function getHotelById(id) {
  try {
    const response = await fetch(API_URL + id + "/");

    if (!response.ok) {
      throw new Error("Hotel not found.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
}

/**
 * Search hotels by name
 */
async function searchHotels(keyword) {
  const hotels = await getHotels();

  return hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(keyword.toLowerCase()),
  );
}

/**
 * Get Featured Hotels
 * (First 6 hotels)
 */
async function getFeaturedHotels() {
  const hotels = await getHotels();

  return hotels.slice(0, 6);
}

/**
 * Format Price
 */
function formatPrice(price) {
  return Number(price).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

/**
 * Default Hotel Image
 */
function getImage(hotel) {
  if (hotel.image) return hotel.image;

  if (hotel.image_url) return hotel.image_url;

  if (hotel.photo) return hotel.photo;

  return "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";
}

/**
 * Create Rating Stars
 */
function getStars(rating) {
  rating = Math.round(rating || 4);

  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += `<i class="bi bi-star-fill text-warning"></i>`;
    } else {
      stars += `<i class="bi bi-star text-warning"></i>`;
    }
  }

  return stars;
}
