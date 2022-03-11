import { defaultInstance } from "./index";

const topup = (money) => {
    return defaultInstance.post("/paypal/top-up", {
        money
    });
}

export const paypalApi = {
    topup,
};
  