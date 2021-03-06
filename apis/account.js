import { defaultInstance } from "./index";

const getByUserId = () => {
    return defaultInstance.get("/account")
}

const update = (money,id) => {
    return defaultInstance.put("/account/" + id, {
        money
    })
}

export const accountApi = {
    update,
    getByUserId
};
  