import { defaultInstance } from "./index";

const getByUserId = () => {
    return defaultInstance.get("/wallet")
}

const update = (money,id) => {
    return defaultInstance.put("/wallet/" + id, {
        money
    })
}

export const walletApi = {
    update,
    getByUserId
};
  