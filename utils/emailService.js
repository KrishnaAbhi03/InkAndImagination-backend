const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send order confirmation to customer
exports.sendOrderConfirmation = async (order) => {
  const transporter = createTransporter();
  
  const itemsList = order.items.map(item => 
    `<li>${item.title} - Quantity: ${item.quantity} - $${item.price}</li>`
  ).join('');
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: order.customerEmail,
    subject: 'Order Confirmation - InkAndImagination.com',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Thank You for Your Order!</h2>
        <p>Dear ${order.customerName},</p>
        <p>We have received your order and it is being processed. Here are the details:</p>
        
        <div style="background: #f9f7f4; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #8b7355;">Order Details</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> $${order.totalAmount}</p>
          
          <h4>Items:</h4>
          <ul>${itemsList}</ul>
          
          <h4>Shipping Address:</h4>
          <p>
            ${order.address.street}<br>
            ${order.address.city}, ${order.address.state} ${order.address.zipCode}<br>
            ${order.address.country}
          </p>
        </div>
        
        <p>We will send you another email once your order has been shipped.</p>
        <p>If you have any questions, please contact us at ${process.env.ADMIN_EMAIL}</p>
        
        <p style="margin-top: 30px;">Best regards,<br>Neil<br>InkAndImagination.com</p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

// Send order notification to admin
exports.sendAdminNotification = async (order) => {
  const transporter = createTransporter();
  
  const itemsList = order.items.map(item => 
    `<li>${item.title} - Quantity: ${item.quantity} - $${item.price}</li>`
  ).join('');
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Order Received - InkAndImagination.com',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">New Order Received!</h2>
        
        <div style="background: #f9f7f4; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #8b7355;">Order Details</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Customer:</strong> ${order.customerName}</p>
          <p><strong>Email:</strong> ${order.customerEmail}</p>
          <p><strong>Phone:</strong> ${order.phone}</p>
          <p><strong>Total Amount:</strong> $${order.totalAmount}</p>
          
          <h4>Items:</h4>
          <ul>${itemsList}</ul>
          
          <h4>Shipping Address:</h4>
          <p>
            ${order.address.street}<br>
            ${order.address.city}, ${order.address.state} ${order.address.zipCode}<br>
            ${order.address.country}
          </p>
          
          ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
        </div>
        
        <p>Please process this order as soon as possible.</p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

// Send contact form notification to admin
exports.sendContactNotification = async (contact) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Contact Message - InkAndImagination.com',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">New Contact Message</h2>
        
        <div style="background: #f9f7f4; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>From:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Date:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
          
          <h4>Message:</h4>
          <p style="white-space: pre-wrap;">${contact.message}</p>
        </div>
        
        <p>Please respond to this inquiry at your earliest convenience.</p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};
