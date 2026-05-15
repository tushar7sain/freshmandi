function scrollToContent() {
    document.getElementById("line").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {

    let cart = [];

    const cartIcon = document.querySelector(".icon-svg");
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector(".sidebar-close");
    const cartItems = document.querySelector(".cart-items");
    const cartCount = document.querySelector(".icon span");
    const cartTotal = document.querySelector(".cart-total");

    // open cart
    cartIcon.addEventListener("click", () => {
        sidebar.style.right = "0";
    });

    // close cart
    closeBtn.addEventListener("click", () => {
        sidebar.style.right = "-370px";
    });

    // add products
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {

        const plusBtn = card.querySelector(".plus_icon");

        plusBtn.addEventListener("click", () => {

            const name = card.querySelector("h4").innerText;

            const priceText = card.querySelector(".price").innerText;

            const price = parseInt(
                priceText.replace("₹", "").replace("/kg", "")
            );

            // check if already exists
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name,
                    price,
                    quantity: 1
                });
            }

            updateCart();
        });
    });

    // update cart
    function updateCart() {

        cartItems.innerHTML = "";

        let total = 0;
        let count = 0;

        cart.forEach((item, index) => {

            total += item.price * item.quantity;
            count += item.quantity;

            const itemDiv = document.createElement("div");

            itemDiv.classList.add("cart-item");

            itemDiv.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                </div>

                <div class="quantity-box">
                    <button class="minus-btn">−</button>
                    <span>${item.quantity}</span>
                    <button class="plus-btn">+</button>
                </div>
            `;

            // plus button
            itemDiv.querySelector(".plus-btn").addEventListener("click", () => {
                item.quantity++;
                updateCart();
            });

            // minus button
            itemDiv.querySelector(".minus-btn").addEventListener("click", () => {

                item.quantity--;

                if (item.quantity <= 0) {
                    cart.splice(index, 1);
                }

                updateCart();
            });

            cartItems.appendChild(itemDiv);
        });

        cartCount.innerText = count;
        cartTotal.innerText = `₹${total}`;
    }

});