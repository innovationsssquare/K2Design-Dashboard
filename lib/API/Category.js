import { BaseUrl } from "./Baseurl";
import Cookies from "js-cookie";

export const Createcategoryapi = async (data) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/category/create/category`, {
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

export const Getallcategory = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/category/get/categories`, {
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

export const Getallcategorybyslug = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/category/get/allcategorybyslug`, {
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
    let result = await fetch(`${BaseUrl}/category/get/category/${id}`, {
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
    let result = await fetch(`${BaseUrl}/category/update/category/${id}`, {
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
    let result = await fetch(`${BaseUrl}/category/delete/category/${id}`, {
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

export const Uploaddocapi = async (formData, id) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(
      `${BaseUrl}/category//upload/category-image/${id}`,
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
