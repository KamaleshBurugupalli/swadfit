/**
 * Payment Service (Isolated module for Razorpay integration)
 */

class PaymentService {
  async createPaymentOrder({ amount, currency = 'INR', receipt }) {
    // Isolated interface: Can easily swap with Razorpay SDK instance `razorpay.orders.create(...)`
    const transactionId = 'PAY_MOCK_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    return {
      success: true,
      transactionId,
      amount,
      currency,
      receipt,
      gateway: 'Razorpay (Test Mode)',
      status: 'Created'
    };
  }

  async verifyPayment({ transactionId, razorpayPaymentId, razorpaySignature }) {
    // Signature verification logic stub for production
    return {
      verified: true,
      transactionId: transactionId || razorpayPaymentId || 'PAY_MOCK_SUCCESS',
      status: 'Paid',
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new PaymentService();
