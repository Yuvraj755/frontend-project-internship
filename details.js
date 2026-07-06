// ======================================
// js/details.js
// ======================================

const hotelDetails = document.getElementById("hotelDetails");

// Get Hotel ID from URL
const params = new URLSearchParams(window.location.search);
const hotelId = params.get("id");

// Load Hotel Details
document.addEventListener("DOMContentLoaded", () => {
  if (!hotelId) {
    hotelDetails.innerHTML = `
            <div class="alert alert-danger text-center">
                Invalid Hotel ID.
            </div>
        `;
    return;
  }

  loadHotel();
});

// -----------------------------
// Fetch Hotel
// -----------------------------
async function loadHotel() {
  hotelDetails.innerHTML = `
        <div class="text-center">
            <div class="loader"></div>
        </div>
    `;

  const hotel = await getHotelById(hotelId);

  if (!hotel) {
    hotelDetails.innerHTML = `
            <div class="alert alert-danger text-center">
                Hotel not found.
            </div>
        `;
    return;
  }

  displayHotel(hotel);
}

// -----------------------------
// Display Hotel
// -----------------------------
function displayHotel(hotel) {
  hotelDetails.innerHTML = `

    <div class="row">

        <div class="col-lg-6 mb-4">

            <img
                src="${getImage(hotel)}"
                class="details-image img-fluid"
                alt="${hotel.name}">

        </div>

        <div class="col-lg-6">

            <div class="rating mb-3">

                ${getStars(hotel.rating)}

            </div>

            <h2 class="fw-bold">

                ${hotel.name}

            </h2>

            <p class="text-muted">

                <i class="bi bi-geo-alt-fill text-danger"></i>

                ${hotel.location || "Unknown Location"}

            </p>

            <h3 class="hotel-price">

                ${formatPrice(hotel.price || 3000)}

            </h3>

            <hr>

            <h5>Description</h5>

            <p>

                ${
                  hotel.description ||
                  "Enjoy a luxurious stay with modern rooms, delicious food, free Wi-Fi, swimming pool, gym and excellent hospitality."
                }

            </p>

            <h5 class="mt-4">

                Amenities

            </h5>

            <div class="mb-4">

                <span class="amenity">Free WiFi</span>

                <span class="amenity">Parking</span>

                <span class="amenity">Swimming Pool</span>

                <span class="amenity">Restaurant</span>

                <span class="amenity">Room Service</span>

                <span class="amenity">Air Conditioning</span>

            </div>

            <div class="d-flex gap-3">

                <button
                    class="btn btn-danger"
                    onclick="addWishlist(${hotel.id})">

                    <i class="bi bi-heart-fill"></i>

                    Wishlist

                </button>

                <button
                    class="btn btn-success">

                    <i class="bi bi-calendar-check"></i>

                    Book Now

                </button>

            </div>

        </div>

    </div>

    `;
}

// -----------------------------
// Wishlist
// -----------------------------
function addWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!wishlist.includes(id)) {
    wishlist.push(id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert("Hotel added to Wishlist ❤️");
  } else {
    alert("Hotel already exists in Wishlist.");
  }
}
