import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const CreateSubcategoryapi = async (data) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/Subcategory/create/subcategory`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        token: token,
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const GetallSubcategory = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/Subcategory/get/subcategories`, {
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



export const Getsinglecategorybyid = async (id) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/Subcategory/get/subcategory/${id}`, {
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

export const Upadtecategoryapi = async (data, id) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/Subcategory/update/subcategory/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        token: token,
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const Removecategoryapi = async (id) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/Subcategory/delete/subcategory/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        token: token,
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const Uploaddocsubcategoryapi = async (formData, id) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(
      `${BaseUrl}/Subcategory/upload/Subcategory-image/${id}`,
      {
        method: "PATCH",
        body: formData,
        headers: {
          token: token,
        },
      }
    );
    result = await result.json();
    return result;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
