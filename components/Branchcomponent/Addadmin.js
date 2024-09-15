"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
// import { Createadminapi } from "@/lib/API/Admin";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches } from "@/lib/ReduxSlice/BranchSlice";
// import { fetchAdmins } from "@/lib/AdminSlice";
import {Setopenadmin} from "@/lib/ReduxSlice/BranchSlice";



const Addadmin = () => {
  const branches = useSelector((state) => state.branches.branches);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const selectedBranchId = useSelector((state) => state.branches.selectedBranchId); 
  const openadmin = useSelector(
    (state) => state.branches.openadmin
  );
  const [formData, setFormData] = useState({
    name: "",
    Email: "",
    Number: "",
    Password: "",
    branch: "",
    permission: ["Notifications"]
  });

  const setopenmodeladmin = () => {
    dispatch(Setopenadmin(!openadmin)); 
  };

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (key, selectedKeys) => {
    const selectedArray = Array.from(selectedKeys);
    if (key === "branch") {
      const selectedBranch = branches?.find(branch => branch._id === selectedArray[0]);
      setFormData({ ...formData, branch: selectedBranch._id });
    } else if (key === "permission") {
      setFormData({ ...formData, permission: selectedArray });
    }
  };

  const validate = () => {
    if (!formData.name) return "Name is required";
    if (!formData.Email) return "Email is required";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.Email))
      return "Invalid email address";
    if (!formData.branch) return "Branch is required";
    if (!formData.Number) {
      return "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.Number)) {
      return "Phone Number must be 10 digits";
    }
    if (!formData.Password) return "Password is required";
    if (formData.Password !== formData.confirmPassword)
      return "Passwords do not match";
    if (formData.permission.length === 0)
      return "At least one permission is required";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }
    setLoading(true);

    const result = await Createadminapi(formData);
    console.log(result)
    if (result.status) {
      dispatch(fetchAdmins(selectedBranchId));
      setopenmodeladmin()
      setLoading(false);
    } else {
      toast.error(result.message ||"Failed to create Admin");
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
          className="w-full rounded-none"
          size="lg"
          placeholder="Full Name"
        />
       
        <Input
          type="tel"
          maxLength={10}
          max={10}
          name="Number"
          value={formData.Number}
          onChange={handleInputChange}
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Phone Number"
        />
      </div>
      <div className="w-full grid lg:grid-cols-1 grid-cols-1 gap-4 place-content-center justify-between items-start ">
      <Input
          type="text"
          name="Email"
          value={formData.Email}
          onChange={handleInputChange}
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Email"
        />
      </div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 place-content-center justify-between items-start ">
        <Input
          type="password"
          name="Password"
          value={formData.Password}
          onChange={handleInputChange}
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
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
          className="w-full rounded-none"
          size="lg"
          placeholder="Confirm Password"
        />
      </div>
      <div className="flex justify-center items-center w-full">
        <Button
          onPress={handleSubmit}
          className="buttongradient text-white rounded-md w-60 uppercase font-semibold"
        >
         { loading?<span className="loader2"></span>:"Create"}
        </Button>
      </div>
    </form>

  
    </>
  );
};

export default Addadmin;
