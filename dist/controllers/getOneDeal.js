"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deals_services_1 = require("../services/deals.services");
const router = (0, express_1.Router)();
router.get("/commissions/deal/:id", (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Send deal id");
            return;
        }
        const deal = (0, deals_services_1.getByID)(id);
        if (!deal) {
            res.status(200).send("Deal ID does not exist");
            return;
        }
        res.status(200).send(deal);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});
exports.default = router;
