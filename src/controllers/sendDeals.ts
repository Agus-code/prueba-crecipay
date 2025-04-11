import { Router } from "express";
import fs from "fs";

import cvsParse from "csv-parse";
import { DealCommission, IDeals } from "../types/deals.types";
import { uploadDeals } from "../services/deals.services";

const router = Router();

router.post("/deals", async (req, res) => {
  try {
    if (!req.files || !req.files.deals) {
      res.status(400).send("Send cvs file");
      return;
    }

    const files = Array.isArray(req.files.deals)
      ? req.files.deals
      : [req.files.deals];

    const deals = files[0] as any;

    if (deals.type !== "text/csv") {
      res.status(400).send("The file sended is not a cvs");
      return;
    }

    const content = fs.readFileSync(deals.path, "utf8");

    const dealsFormated = cvsParse.parse(content, {
      columns: true,
      skip_empty_lines: true,
    });

    const dealsArray: IDeals[] = await dealsFormated.toArray();

    const currentMonthYear = new Date();
    currentMonthYear.setDate(1);
    currentMonthYear.setHours(0, 0, 0, 0);

    const dealsToSave: DealCommission[] = dealsArray.map((deal) => {
      let commission = "0";

      if (deal.status === "completed") {
        let percentageCommission = 5;
        const dealAmount = parseFloat(deal.deal_amount);

        if (dealAmount > 20000) percentageCommission += 1;

        const dealDate = new Date(deal.deal_date);

        if (dealDate < currentMonthYear) {
          percentageCommission -= 0.5;
        }

        commission = ((percentageCommission * dealAmount) / 100).toFixed(2);
      }

      return {
        ...deal,
        commission,
      };
    });

    uploadDeals(dealsToSave);

    res.status(200).send("Deals uploaded");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

export default router;
