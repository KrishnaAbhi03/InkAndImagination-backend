const axios = require('axios');
const Artwork = require('../models/Artwork');

const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external';

// Function to get Shiprocket authentication token
const getShiprocketToken = async () => {
  try {
    const response = await axios.post(`${SHIPROCKET_API_URL}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    });
    return response.data.token;
  } catch (error) {
    console.error('Error getting Shiprocket token:', error);
    throw new Error('Could not authenticate with Shiprocket');
  }
};

// Function to create a shipment in Shiprocket
const createShipment = async (order) => {
  try {
    const token = await getShiprocketToken();

    // Fetch all artwork details in a single query
    const artworkIds = order.items.map((item) => item.artworkId);
    const artworks = await Artwork.find({ _id: { $in: artworkIds } });
    const artworkMap = new Map(artworks.map((art) => [art._id.toString(), art]));

    // Dynamically calculate weight and dimensions
    let totalWeight = 0;
    let maxLength = 0;
    let maxBreadth = 0;
    let totalHeight = 0;

    for (const item of order.items) {
      const artwork = artworkMap.get(item.artworkId.toString());
      if (artwork) {
        totalWeight += (artwork.weight || 0) * item.quantity;
        maxLength = Math.max(maxLength, artwork.dimensions.length || 0);
        maxBreadth = Math.max(maxBreadth, artwork.dimensions.breadth || 0);
        totalHeight += (artwork.dimensions.height || 0) * item.quantity;
      }
    }

    // Parse customer name
    const nameParts = order.customerName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName;

    const shipmentData = {
      order_id: order._id.toString(),
      order_date: order.createdAt.toISOString().slice(0, 10),
      pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
      billing_customer_name: firstName,
      billing_last_name: lastName,
      billing_address: order.address.street,
      billing_city: order.address.city,
      billing_pincode: order.address.zipCode,
      billing_state: order.address.state,
      billing_country: order.address.country,
      billing_email: order.customerEmail,
      billing_phone: order.phone,
      shipping_is_billing: true,
      order_items: order.items.map((item) => ({
        name: item.title,
        sku: item.artworkId.toString(),
        units: item.quantity,
        selling_price: item.price,
        hsn: '', // Add HSN code if available
      })),
      payment_method: 'Prepaid',
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: order.totalAmount,
      length: maxLength,
      breadth: maxBreadth,
      height: totalHeight,
      weight: totalWeight / 1000, // Convert grams to kg
    };

    const response = await axios.post(`${SHIPROCKET_API_URL}/orders/create/adhoc`, shipmentData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating Shiprocket shipment:', error.response ? error.response.data : error.message);
    throw new Error('Could not create shipment with Shiprocket');
  }
};

module.exports = {
  createShipment,
};
