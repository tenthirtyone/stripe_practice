class Stripe {
  constructor(config) {
    this.config = { ...Stripe.DEFAULTS, ...config };
    this.stripe = require("stripe")(this.config.stripeKey);
  }
  async createCustomer(email) {
    return await this.stripe.customers.create({ email });
  }
  async createCard(card) {
    return await this.stripe.paymentMethods.create({
      type: "card",
      card,
    });
  }
  async createPaymentIntent({ amount, currency = "usd" }) {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }
  async cancelPaymentIntent({ paymentIntentId }) {
    return await this.stripe.paymentIntents.cancel(paymentIntentId);
  }
  async confirmPaymentIntent({ paymentId, cardId }) {
    return await this.stripe.paymentIntents.confirm(paymentId, {
      payment_method: cardId,
    });
  }

  static get DEFAULTS() {
    return {
      stripeKey:
        process.env.STRIPE_KEY ||
        "pk_test_51JtKTAGjL7KHwdsg4g6qQ4YIGdDFHDaL0JDtqrxioM1t5ToU2AjusMVFWIHp3w7BX5QxEPkkHRZ14BZrXvlVa6E600NStRye6M",
    };
  }
}

module.exports = Stripe;
