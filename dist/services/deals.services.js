"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeals = exports.getByQueries = exports.getByID = exports.uploadDeals = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dbLocation = path_1.default.join(__dirname + "/../../db/deals.json");
const uploadDeals = (data) => {
    fs_1.default.writeFileSync(dbLocation, JSON.stringify(data, null, 2));
};
exports.uploadDeals = uploadDeals;
const getByID = (id) => {
    const deals = JSON.parse(fs_1.default.readFileSync(dbLocation, "utf8"));
    return deals.find((x) => x.deal_id === id);
};
exports.getByID = getByID;
const getByQueries = (queries) => {
    const deals = JSON.parse(fs_1.default.readFileSync(dbLocation, "utf8"));
    let dealsFilterd = [];
    dealsFilterd = deals.filter((x) => x.rep === queries.rep);
    if (queries.deal_date) {
        dealsFilterd = dealsFilterd.filter((x) => {
            const date = x.deal_date.split("-");
            date.pop();
            return date.join("-") === queries.deal_date;
        });
    }
    return dealsFilterd;
};
exports.getByQueries = getByQueries;
const deleteDeals = () => {
    fs_1.default.writeFileSync(dbLocation, JSON.stringify([]));
};
exports.deleteDeals = deleteDeals;
