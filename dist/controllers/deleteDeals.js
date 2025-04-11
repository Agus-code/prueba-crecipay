"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deals_services_1 = require("../services/deals.services");
const router = (0, express_1.Router)();
router.delete("/deals", (_req, res) => {
    try {
        (0, deals_services_1.deleteDeals)();
        res.status(200).send("Removed deals");
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
exports.default = router;
