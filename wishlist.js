// ======================================
// js/wishlist.js
// ======================================

const wishlistContainer = document.getElementById("wishlistContainer");

// Load Wishlist
document.addEventListener("DOMContentLoaded", loadWishlist);

// ------------------------------
// Load Wishlist
// ------------------------------
async function loadWishlist() {
  wishlistContainer.innerHTML = `
        <div class="col-12 text-center">
            <div class="loader"></div>
        </div>
    `;

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    <h4>Your wishlist is empty ❤️</h4>
                    <a href="hotels.html" class="btn btn-primary mt-3">
                        Browse Hotels
                    </a>
                </div>
            </div>
        `;
    return;
  }

  try {
    const hotels = await getHotels();

    const savedHotels = hotels.filter((hotel) => wishlist.includes(hotel.id));

    displayWishlist(savedHotels);
  } catch (error) {
    console.error(error);

    wishlistContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger text-center">
                    Unable to load wishlist.
                </div>
            </div>
        `;
  }
}

// ------------------------------
// Display Wishlist
// ------------------------------
function displayWishlist(hotels) {
  wishlistContainer.innerHTML = "";

  if (hotels.length === 0) {
    wishlistContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    No saved hotels found.
                </div>
            </div>
        `;
    return;
  }

  hotels.forEach((hotel) => {
    wishlistContainer.innerHTML += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="hotel-card">

                <img
                    src="${getImage(hotel)}"
                    alt="${hotel.name}"
                    class="img-fluid">

                <div class="hotel-content">

                    <div class="rating">

                        ${getStars(hotel.rating)}

                    </div>

                    <h4>${hotel.name}</h4>

                    <p>
                        <i class="bi bi-geo-alt-fill text-danger"></i>
                        ${hotel.location || "Unknown Location"}
                    </p>

                    <h5 class="hotel-price">
                        ${formatPrice(hotel.price || 3000)}
                    </h5>

                    <div class="d-flex justify-content-between mt-3">

                        <a
                            href="hotel-details.html?id=${hotel.id}"
                            class="btn btn-primary">

                            View Details

                        </a>

                        <button
                            class="btn btn-danger"
                            onclick="removeWishlist(${hotel.id})">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;
  });
}

// ------------------------------
// Remove Hotel
// ------------------------------
function removeWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  wishlist = wishlist.filter((item) => item !== id);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  loadWishlist();
}
