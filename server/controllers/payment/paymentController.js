const razorpay = require('../../config/payment');

const createPaymentLink = async (req, res) => {
  try {
    const { amount=100, name, email } = req.body;
    console.log("Amount : name : email : " + amount + " " + name + " " + email);
    const paymentLink = await razorpay.paymentLink.create({
      amount: amount * 100, 
      currency: 'INR',
      description: 'Motren Fund Donation',
      customer: {
        name,
        email,
      },
      notify: {
        sms: false,
        email: true,
      },
      reminder_enable: true,
    });

    res.status(200).json(paymentLink); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create payment link' });
  }
};

// 2. Check Payment Status
const checkPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await razorpay.paymentLink.fetch(id);
    const paid = result.status === 'paid';
    res.status(200).json({ paid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch status' });
  }
};

module.exports = { createPaymentLink, checkPaymentStatus };
