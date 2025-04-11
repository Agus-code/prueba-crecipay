import { DealCommission, DealKeys } from "../types/deals.types";
import fs from "fs";
import path from "path";

const dbLocation = path.join(__dirname + "/../../db/deals.json");

export const uploadDeals = (data: DealCommission[]) => {
  fs.writeFileSync(dbLocation, JSON.stringify(data, null, 2));
};

export const getByID = (id: string) => {
  const deals: DealCommission[] = JSON.parse(
    fs.readFileSync(dbLocation, "utf8")
  );

  return deals.find((x) => x.deal_id === id);
};

export const getByQueries = (queries: Partial<Record<DealKeys, string>>) => {
  const deals: DealCommission[] = JSON.parse(
    fs.readFileSync(dbLocation, "utf8")
  );

  let dealsFilterd: DealCommission[] = [];

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

export const deleteDeals = () => {
  fs.writeFileSync(dbLocation, JSON.stringify([]));
};
