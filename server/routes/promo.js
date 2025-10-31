// promoRoutes.js
const express = require("express");
const promoRouter = express.Router();

// Dummy promo data — you can later move this to MongoDB if needed
const promoCodes = {
  SAVE10: { type: "percent", value: 10 },
  FLAT100: { type: "flat", value: 100 },
};

// POST /promo/validate
promoRouter.post("/", async (req, res) => {
  try {
    const { code, amount } = req.body;
    console.log("Incoming Promo Validation:", { code, amount });

    if (!code || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "Code or amount missing" });
    }

    const promo = promoCodes[code.toUpperCase()];
    console.log("Matched Promo:", promo);
    if (!promo) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid promo code" });
    }

    let discount = 0;
    if (promo.type === "percent") {
      discount = (amount * promo.value) / 100;
    } else if (promo.type === "flat") {
      discount = promo.value;
    }

    const newAmount = amount - discount;
    res.json({
      success: true,
      code: code.toUpperCase(),
      discount,
      newAmount,
      message: `Promo applied successfully!`,
    });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = promoRouter;
