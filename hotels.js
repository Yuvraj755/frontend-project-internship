// =====================================
// js/hotels.js
// =====================================

const hotelContainer = document.getElementById("hotelContainer");
const searchInput = document.getElementById("searchHotel");
const sortSelect = document.getElementById("sortPrice");

let hotels = [];
let filteredHotels = [];

// ----------------------------
// Load Hotels
// ----------------------------
document.addEventListener("DOMContentLoaded", async () => {
  showLoader();

  hotels = await getHotels();

  filteredHotels = [...hotels];

  displayHotels(filteredHotels);
});

// ----------------------------
// Loader
// ----------------------------
function showLoader() {
  hotelContainer.innerHTML = `

        <div class="col-12 text-center">

            <div class="loader"></div>

        </div>

    `;
}

// ----------------------------
// Display Hotels
// ----------------------------
function displayHotels(data) {
  hotelContainer.innerHTML = "";

  if (data.length === 0) {
    hotelContainer.innerHTML = `

            <div class="col-12">

                <div class="alert alert-warning text-center">

                    No Hotels Found.

                </div>

            </div>

        `;

    return;
  }

  data.forEach((hotel) => {
    hotelContainer.innerHTML += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="hotel-card">

                <img src="${getImage(hotel)}"
                    alt="${hotel.name}">

                <div class="hotel-content">

                    <div class="rating">

                        ${getStars(hotel.rating)}

                    </div>

                    <h4>${hotel.name}</h4>

                    <p>

                        <i class="bi bi-geo-alt-fill text-danger"></i>

                        ${hotel.location || "Unknown Location"}

                    </p>

                    <p>

                        ${
                          hotel.description
                            ? hotel.description.substring(0, 100) + "..."
                            : "Luxury hotel with modern amenities."
                        }

                    </p>

                    <h5 class="hotel-price">

                        ${formatPrice(hotel.price || 3000)}

                    </h5>

                    <div class="d-flex justify-content-between mt-3">

                        <a href="hotel-details.html?id=${hotel.id}"
                           class="btn btn-primary">

                            View Details

                        </a>

                        <button
                            class="btn btn-outline-danger"
                            onclick="addWishlist(${hotel.id})">

                            <i class="bi bi-heart"></i>

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;
  });
}

// ----------------------------
// Search
// ----------------------------
searchInput.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();

  filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(keyword),
  );

  displayHotels(filteredHotels);
});

// ----------------------------
// Sort
// ----------------------------
sortSelect.addEventListener("change", function () {
  if (this.value === "low") {
    filteredHotels.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (this.value === "high") {
    filteredHotels.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else {
    filteredHotels = [...hotels];
  }

  displayHotels(filteredHotels);
});

// ----------------------------
// Wishlist
// ----------------------------
function addWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!wishlist.includes(id)) {
    wishlist.push(id);

    localStorage.setItem(
      "wishlist",

      JSON.stringify(wishlist),
    );

    alert("Hotel added to Wishlist ❤️");
  } else {
    alert("Already Added!");
  }
}
