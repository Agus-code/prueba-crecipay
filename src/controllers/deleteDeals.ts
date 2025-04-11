import { Router } from "express";
import { deleteDeals } from "../services/deals.services";

const router = Router();

router.delete("/deals", (_req, res) => {
  try {
    deleteDeals();
    res.status(200).send("Removed deals");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
