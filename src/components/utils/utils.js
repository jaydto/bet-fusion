import Notify from "./Notify";
import { setLocalStorage } from "./local-storage";

const message = {
  status: 401,
  message: "This Promotion is for new Users",
  token: "",
};

export const checkIfUser = (user, navigate) => {
  if (user) {
    Notify(message);
  } else {
    navigate("/auth/signup");
  }
};

export const setUtmSouceCampaignOnPromotions = (event) => {
  setLocalStorage("utm_source", event);
};
