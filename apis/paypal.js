import { defaultInstance } from "./index";

const topup = (money) => {
    return defaultInstance.post("/paypal/top-up", {
        money
    });
}

const transfer = (email,money,accountId) => {
    return defaultInstance.post("/paypal/transfer", {
        email,
        money,
        accountId
    });
}

export const paypalApi = {
    topup,
    transfer
};
  