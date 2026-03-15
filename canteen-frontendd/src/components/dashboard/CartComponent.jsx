const placeOrder = async () => {
  try {
    const response = await axios.post('/api/customer/orders', {
      items: cart.map(item => ({
        menu_item_id: item.id,
        price: item.price
      })),
      total: cartTotal
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    alert("Order placed successfully!");
  } catch (error) {
    console.error("Order failed:", error);
  }
};