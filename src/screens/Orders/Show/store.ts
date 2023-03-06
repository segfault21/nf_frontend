import { makeAutoObservable } from "mobx";
import client from "~/api/gql";
import { SingleOrder } from "~/screens/Orders/Show/types";
import { ORDER_QUERY } from "./queries";

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string | null = null;
  loading = false
  initialized = false

  constructor() {
    makeAutoObservable(this);
  }

  setOrder(order: SingleOrder) {
    this.order = order
  }

  async loadOrder() {
    this.loading = true

    const order = (await client.query(ORDER_QUERY, { number: this.id })
        .toPromise()).data.order;

    this.setOrder(order);

    this.loading = false
  }

  initialize(id: string) {
    if (this.initialized) return;
    this.initialized = true;
    this.id = id;
    this.loadOrder();
  }
}