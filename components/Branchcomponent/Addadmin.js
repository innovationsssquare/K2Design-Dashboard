"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Createadmin } from "@/lib/API/Auth";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches } from "@/lib/ReduxSlice/BranchSlice";
import { fetchAdmins } from "@/lib/ReduxSlice/Adminslice";
import {Setopenadmin} from "@/lib/ReduxSlice/Adminslice";
import { Input } from "../ui/input";



const Addadmin = () => {
  const branches = useSelector((state) => state.branches.branches);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const selectedBranchId = useSelector((state) => state.branches.selectedBranchId); 
  const openadmin = useSelector(
    (state) => state.admins.openadmin
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    branch: selectedBranchId,
  });

  const setopenmodeladmin = () => {
    dispatch(Setopenadmin(!openadmin)); 
  };


  // useEffect(() => {
  //   dispatch(fetchBranches());
  // }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const validate = () => {
    if (!formData.name) return "Name is required";
    if (!formData.email) return "Email is required";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      return "Invalid email address";
    if (!formData.branch) return "Branch is required";
    if (!formData.number) {
      return "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.number)) {
      return "Phone Number must be 10 digits";
    }
    if (!formData.password) return "Password is required";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }
    setLoading(true);

    const response = await Createadmin(formData);
    console.log(response.status)
    if (response.status) {
      // dispatch(fetchAdmins(selectedBranchId));
      setopenmodeladmin()
      setLoading(false);
    } else {
      toast.error("Failed to create Admin");
      setLoading(false);
    }
  };

  return (
    <>
    <form className="flex flex-col justify-center items-center gap-4">
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Admin Details</p>
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          variant="bordered"
          radius="sm"
          className="w-full rounded-md h-12"
          size="lg"
          placeholder="Full Name"
        />
       
        <Input
          type="tel"
          maxLength={10}
          max={10}
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          variant="bordered"
          radius="sm"
          className="w-full rounded-md h-12"
          size="lg"
          placeholder="Phone Number"
        />
      </div>
      <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-start ">
      <Input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          variant="bordered"
          radius="sm"
          className="w-full rounded-md h-12"
          size="lg"
          placeholder="Email"
        />
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          variant="bordered"
          radius="sm"
          className="w-full rounded-md h-12"
          size="lg"
          placeholder="Password"
        />
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          variant="bordered"
          radius="sm"
          className="w-full rounded-md h-12"
          size="lg"
          placeholder="Confirm Password"
        />
      </div>
      <div className="flex justify-center items-center w-full">
        <Button
          onPress={handleSubmit}
          className="bg-[#146eb4] text-white rounded-md w-60 uppercase font-semibold"
        >
         { loading?<span className="loader"></span>:"Create"}
        </Button>
      </div>
    </form>

    <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "white",
            color: "#000",
          },

          // Default options for specific types
          success: {
            className: "ring-1 ring-red-400 bg-[#fde7e9] ",
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
            style: {
              background: "#e8f8e9",
              color: "#000",
              border: "1px solid green",
            },
          },
          error: {
            className: "ring-1 ring-red-400 bg-[#fde7e9]",
            duration: 3000,
            style: {
              background: "#fde7e9",
              color: "#000",
              border: "1px solid red",
            },
          },
        }}
      />
    </>
  );
};

export default Addadmin;
