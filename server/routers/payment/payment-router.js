const express = require('express');
const router = express.Router();
const { createPaymentLink, checkPaymentStatus } = require('../../controllers/payment/paymentController');

router.post('/create', createPaymentLink); // POST /api/payments/create
router.get('/status/:id', checkPaymentStatus); // GET /api/payments/status/:id

module.exports = router;
