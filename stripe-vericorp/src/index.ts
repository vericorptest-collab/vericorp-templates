import express from "express";
import Stripe from "stripe";
import { VeriCorp } from "vericorp";

const app = express();
app.use(express.json());

const vericorp = new VeriCorp({ apiKey: process.env.VERICORP_API_KEY! });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

app.post("/api/validate-and-create-customer", async (req, res) => {
  const { vat_number, email } = req.body;

  if (!vat_number || !email) {
    return res.status(400).json({ error: "vat_number and email are required" });
  }

  try {
    // Validate VAT with VeriCorp
    const validation = await vericorp.validate(vat_number);

    if (!validation.format_valid) {
      return res.status(400).json({ error: "Invalid VAT number format" });
    }

    // Look up company details
    const company = await vericorp.lookup(vat_number);

    // Create Stripe customer with company metadata
    const customer = await stripe.customers.create({
      email,
      name: company.name,
      metadata: {
        vat_number: company.tax_id,
        country: company.country,
        vat_valid: String(validation.vat_valid),
        company_name: company.name,
        data_source: company.source,
      },
      tax_exempt: validation.vat_valid ? "reverse" : "none",
      address: company.address
        ? {
            line1: company.address.street || "",
            city: company.address.city || "",
            postal_code: company.address.postal_code || "",
            country: company.address.country || "",
          }
        : undefined,
    });

    res.json({
      customer_id: customer.id,
      company: company.name,
      vat_valid: validation.vat_valid,
      tax_exempt: customer.tax_exempt,
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
