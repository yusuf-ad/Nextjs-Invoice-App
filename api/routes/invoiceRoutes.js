const express = require("express");

const invoiceController = require("../controllers/invoiceController");
const authController = require("../controllers/authController");

const router = express.Router();

// router.use(authController.protect);

router
  .route("/")
  .get(invoiceController.getAllInvoices)
  .post(invoiceController.createInvoice)
  .delete(invoiceController.deleteAllInvoices);

router
  .route("/:id")
  .get(invoiceController.getInvoice)
  .put(invoiceController.updateInvoice)
  .delete(invoiceController.deleteInvoice)
  .patch(invoiceController.updateInvoiceStatus);

module.exports = router;
