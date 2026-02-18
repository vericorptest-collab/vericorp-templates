import express from "express";
import { VeriCorp } from "vericorp";

const app = express();
app.use(express.json());

const client = new VeriCorp({ apiKey: process.env.VERICORP_API_KEY! });

app.get("/api/company/:taxId", async (req, res) => {
  try {
    const company = await client.lookup(req.params.taxId);
    res.json(company);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

app.get("/api/validate/:taxId", async (req, res) => {
  try {
    const result = await client.validate(req.params.taxId);
    res.json(result);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

app.post("/api/batch", async (req, res) => {
  try {
    const { tax_ids } = req.body;
    if (!Array.isArray(tax_ids)) {
      return res.status(400).json({ error: "tax_ids must be an array" });
    }
    const result = await client.batch(tax_ids);
    res.json(result);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
