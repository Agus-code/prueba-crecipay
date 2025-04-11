"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = __importDefault(require("csv-parse"));
const deals_services_1 = require("../services/deals.services");
const router = (0, express_1.Router)();
router.post("/deals", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files || !req.files.deals) {
            res.status(400).send("Send cvs file");
            return;
        }
        const files = Array.isArray(req.files.deals)
            ? req.files.deals
            : [req.files.deals];
        const deals = files[0];
        if (deals.type !== "text/csv") {
            res.status(400).send("The file sended is not a cvs");
            return;
        }
        const content = fs_1.default.readFileSync(deals.path, "utf8");
        const dealsFormated = csv_parse_1.default.parse(content, {
            columns: true,
            skip_empty_lines: true,
        });
        const dealsArray = yield dealsFormated.toArray();
        const currentMonthYear = new Date();
        currentMonthYear.setDate(1);
        currentMonthYear.setHours(0, 0, 0, 0);
        const dealsToSave = dealsArray.map((deal) => {
            let commission = "0";
            if (deal.status === "completed") {
                let percentageCommission = 5;
                const dealAmount = parseFloat(deal.deal_amount);
                if (dealAmount > 20000)
                    percentageCommission += 1;
                const dealDate = new Date(deal.deal_date);
                if (dealDate < currentMonthYear) {
                    percentageCommission -= 0.5;
                }
                commission = ((percentageCommission * dealAmount) / 100).toFixed(2);
            }
            return Object.assign(Object.assign({}, deal), { commission });
        });
        (0, deals_services_1.uploadDeals)(dealsToSave);
        res.status(200).send("Deals uploaded");
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}));
exports.default = router;
