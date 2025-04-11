import { Router } from "express";
import { getByID } from "../services/deals.services";

const router = Router();

router.get("/commissions/deal/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("Send deal id");
      return;
    }

    const deal = getByID(id);

    if (!deal) {
      res.status(200).send("Deal ID does not exist");
      return;
    }

    res.status(200).send(deal);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

export default router;
