"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deals_services_1 = require("../services/deals.services");
const router = (0, express_1.Router)();
router.get("/commissions/rep/:rep", (req, res) => {
    try {
        const rep = req.params.rep;
        const month = req.query.month;
        if (!rep) {
            res.status(400).send("Send deal rep");
            return;
        }
        const queries = {
            rep: rep,
        };
        if (month)
            queries["deal_date"] = String(month);
        const deals = (0, deals_services_1.getByQueries)(queries);
        let commissionMonth = 0;
        deals.forEach((x) => {
            commissionMonth += parseFloat(x.commission);
        });
        const response = {
            totalMonth: commissionMonth.toFixed(2),
            results: deals,
        };
        res.status(200).send(response);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});
exports.default = router;
