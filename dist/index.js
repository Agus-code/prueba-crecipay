"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_formidable_1 = __importDefault(require("express-formidable"));
const sendDeals_1 = __importDefault(require("./controllers/sendDeals"));
const getOneDeal_1 = __importDefault(require("./controllers/getOneDeal"));
const getDealsByRep_1 = __importDefault(require("./controllers/getDealsByRep"));
const deleteDeals_1 = __importDefault(require("./controllers/deleteDeals"));
const app = (0, express_1.default)();
app.use((0, express_formidable_1.default)());
app.get("/", (_req, res) => {
    res.send("Server runnning");
});
app.use(sendDeals_1.default);
app.use(getOneDeal_1.default);
app.use(getDealsByRep_1.default);
app.use(deleteDeals_1.default);
app.listen(5000, () => console.log("Server listening on port 5000"));
