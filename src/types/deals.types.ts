export type Status = "completed" | "cancelled" | "in process";

export interface IDeals {
  deal_id: string;
  rep: string;
  car_model: string;
  deal_amount: string;
  deal_date: string;
  status: Status;
}

export type DealCommission = IDeals & { commission: string };

export type DealKeys = keyof DealCommission