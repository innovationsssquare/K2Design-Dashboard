import { BaseUrl } from "./Baseurl";

export const Superadminlogin = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/SuperAdmin/login/SuperAdmin`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const Adminlogin = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/admin/login/Admin`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const Createadmin = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/admin/create/Admin`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};
export const Getadminbybranch = async (branchid) => {
  try {
    let result = await fetch(`${BaseUrl}/admin/get/admin/${branchid}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};
