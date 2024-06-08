const Invoice = require("../models/invoiceModel");
const User = require("../models/userModel");
const generateId = require("generate-unique-id");

const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

exports.getAllInvoices = catchAsync(async (req, res, next) => {
  const { invoices } = await req.user.populate("invoices");

  res.status(200).json({
    status: "success",
    results: invoices.length,
    data: {
      invoices,
    },
  });
});

exports.getInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findOne({ invoiceId: req.params.id });

  if (!invoice) {
    return next(new AppError("No invoice found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      invoice,
    },
  });
});

exports.createInvoice = catchAsync(async (req, res, next) => {
  // Net 7 days -> 7
  const paymentTerms = req.body.paymentTerms.split(" ").at(1);

  const invoiceTemplate = {
    invoiceId: generateId({
      length: 6,
      useLetters: true,
    }).toUpperCase(),
    paymentDue: req.body.paymentDue,
    description: req.body.description,
    paymentTerms,
    status: req.body.status,
    clientName: req.body.clientName,
    clientEmail: req.body.clientEmail,
    senderAddress: req.body.senderAddress,
    clientAddress: req.body.clientAddress,
    items: req.body.items,
    total: req.body.total,
  };

  const newInvoice = await Invoice.create({ ...invoiceTemplate });

  req.user.invoices.push(newInvoice._id);

  await req.user.save();

  res.status(201).json({
    status: "success",
    data: {
      invoice: newInvoice,
    },
  });
});

exports.updateInvoice = catchAsync(async (req, res, next) => {
  const { id: invoiceId } = req.params;

  const paymentTerms = req.body.paymentTerms.split(" ").at(1);

  const invoiceTemplate = {
    paymentDue: req.body.paymentDue,
    description: req.body.description,
    paymentTerms,
    clientName: req.body.clientName,
    clientEmail: req.body.clientEmail,
    senderAddress: req.body.senderAddress,
    clientAddress: req.body.clientAddress,
    items: req.body.items,
    total: req.body.total,
  };

  // Filter out undefined properties
  const updatedFields = Object.fromEntries(
    Object.entries(invoiceTemplate).filter(([_, v]) => v != null)
  );

  const updatedInvoice = await Invoice.findOneAndUpdate(
    { invoiceId },
    updatedFields,
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      invoice: updatedInvoice,
    },
  });
});

exports.deleteInvoice = catchAsync(async (req, res, next) => {
  const user = req.user;
  const deletedInvoice = await Invoice.findOneAndDelete({
    invoiceId: req.params.id,
  });

  if (!deletedInvoice) {
    return next(new AppError("No invoice found with that ID", 404));
  }

  // Remove the invoice from the user's invoices array
  user.invoices = user.invoices.filter((invoice) => {
    invoice.invoiceId !== req.params.id;
  });

  // Save the user
  await user.save();

  res.status(204).json({
    status: "success",
  });
});

exports.updateInvoiceStatus = catchAsync(async (req, res, next) => {
  const updatedInvoice = await Invoice.findOneAndUpdate(
    { invoiceId: req.params.id },
    { status: "paid" },
    { new: true }
  );

  if (!updatedInvoice) {
    return next(new AppError("No invoice found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    invoice: updatedInvoice,
  });
});

exports.deleteAllInvoices = catchAsync(async (req, res, next) => {
  // Delete all invoices from the database
  await Invoice.deleteMany({ _id: { $in: req.user.invoices } });

  // Clear the invoices array
  req.user.invoices = [];
  await req.user.save();

  res.status(204).json({
    status: "success",
  });
});
