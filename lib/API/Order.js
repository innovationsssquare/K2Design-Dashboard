import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";


export const Getallcategory = async () => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/Order/order/getall`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      return error.message;
    }
  };


  export const markOrderAsRead = async (orderId) => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/Order/order/mark-as-read/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      return error.message;
    }
  };
  

  export const markAllOrdersAsRead = async () => {
    const token = Cookies.get("token");
  
    try {
      let result = await fetch(`${BaseUrl}/Order/order/mark-all-as-read`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      return error.message;
    }
};