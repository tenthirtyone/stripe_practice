require("dotenv").config("../.env");
const expect = require("expect");
const Stripe = require("../lib/stripe");

describe("Stripe", () => {
  let stripe;
  const testEmail = "test@email.com";
  const testCard = {
    number: "4242424242424242",
    exp_month: 11,
    exp_year: 2022,
    cvc: "314",
  };

  beforeEach(() => {
    stripe = new Stripe();
  });
  it("exists", () => {
    expect(typeof stripe).toBe("object");
  });

  describe("Customer", () => {
    it("creates a customer", async () => {
      const customer = await stripe.createCustomer(testEmail);

      expect(customer.email).toBe(testEmail);
    });
  });
  describe("Card", () => {
    it("creates a card", async () => {
      const card = await stripe.createCard(testCard);
      console.log(card);
    });
  });
  describe("Payment Intent", () => {
    it("creates a payment intent", async () => {
      const paymentIntent = await stripe.createPaymentIntent({ amount: 1000 });
      await stripe.cancelPaymentIntent({ paymentIntentId: paymentIntent.id });
    });
    it("confirm a payment intent", async () => {
      const paymentIntent = await stripe.createPaymentIntent({ amount: 1000 });
      const card = await stripe.createCard(testCard);

      const confirmation = await stripe.confirmPaymentIntent({
        paymentId: paymentIntent.id,
        cardId: card.id,
      });

      console.log(confirmation);
    }).timeout(5000);
  });
});
