import express from "express";
import expressFormidable from "express-formidable";

import sendDeals from "./controllers/sendDeals";
import getOneDeal from "./controllers/getOneDeal";
import getDealsByRep from "./controllers/getDealsByRep";
import deleteDeals from "./controllers/deleteDeals";

const app = express();

app.use(expressFormidable());

app.get("/", (_req, res) => {
  res.send("Server runnning");
});

app.use(sendDeals);
app.use(getOneDeal);
app.use(getDealsByRep);
app.use(deleteDeals);

app.listen(5000, () => console.log("Server listening on port 5000"));
