import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";


export const Createproductyapi = async (formData) => {
    const token = Cookies.get("token");
    try {
      // Sending FormData; no need to set Content-Type header manually
      let result = await fetch(`${BaseUrl}/product/create/product`, {
        method: "POST",
        body: formData, // Pass the FormData object directly
        headers: {
          token: token, // Only set the token; FormData handles content-type
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };
  