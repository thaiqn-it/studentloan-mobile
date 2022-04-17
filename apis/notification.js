import { defaultInstance } from "./index";

const getAllByUserId = () => {
    return defaultInstance.get("/notification")
}

const updateById = (id, data) => {
    return defaultInstance.put("/notification/" + id, data)
}

export const notificationApi = {
    getAllByUserId,
    updateById
};
  