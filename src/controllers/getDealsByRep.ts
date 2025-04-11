import { Router } from "express";
import { getByID, getByQueries } from "../services/deals.services";
import { DealKeys } from "../types/deals.types";

const router = Router();

router.get("/commissions/rep/:rep", (req, res) => {
  try {
    const rep = req.params.rep;

    const month = req.query.month;

    if (!rep) {
      res.status(400).send("Send deal rep");
      return;
    }

    const queries: Partial<Record<DealKeys, string>> = {
      rep: rep,
    };

    if (month) queries["deal_date"] = String(month);

    const deals = getByQueries(queries);

    let commissionMonth = 0;
    deals.forEach((x) => {
      commissionMonth += parseFloat(x.commission);
    });

    const response = {
      totalMonth: commissionMonth.toFixed(2),
      results: deals,
    };

    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

export default router;
