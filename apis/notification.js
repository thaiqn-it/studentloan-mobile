import { defaultInstance } from "./index";

const getAllByUserId = () => {
    return defaultInstance.get("/notification")
}

export const notificationApi = {
    getAllByUserId
};
  