document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Australian Robusta", img: "1.jpg", price: 30000 },
      { id: 2, name: "Australian Arabica", img: "2.jpg", price: 40000 },
      { id: 3, name: "Americano", img: "3.jpg", price: 90000 },
      { id: 4, name: "Aceh Robusta", img: "4.jpg", price: 70000 },
      { id: 5, name: "Arabian Robusta", img: "5.jpg", price: 30000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // check if any same product in cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // if there is nothing / cart empty
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // if product available, check if something different or same product in cart
        this.items = this.items.map((item) => {
          // if product different
          if (item.id !== newItem.id) {
            return item;
          } else {
            // if product available, plus quantity and subtotal
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      //  item that we want to remove
      const cartItem = this.items.find((item) => item.id === id);

      // if item more than 1
      if (cartItem.quantity > 1) {
        // show 1 by 1
        this.items = this.items.map((item) => {
          // if not product that we click
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // if 1 item left
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konvert to IDR (Rupiah)
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
