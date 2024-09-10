"use client"
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Createbranchapi } from "../../lib/API/Branch";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { createBranch, fetchBranches ,Setopenbranch} from "@/lib/ReduxSlice/BranchSlice";

const Createbranch = () => {
  const branches = useSelector((state) => state.branches.branches);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const openbranch = useSelector(
    (state) => state.branches.openbranch
  );

  const setopenmodel = () => {
    dispatch(Setopenbranch(!openbranch)); 
  };
  const [formData, setFormData] = useState({
    branchName: "",
    location: "",
    contactNumber: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    if (!formData.branchName) return "Branch Name is required";
    if (!formData.location) return "Address is required";
    if (!formData.contactNumber) {
      return "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      return "Phone Number must be 10 digits";
    }
    if (!formData.code) return "code is required";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    // try {
    //   await dispatch(createBranch(formData));
    //   toast.success("Branch created successfully");
    //   await dispatch(fetchBranches());
    // } catch (error) {
    //   toast.error(error.message);
    // }
    const result = await Createbranchapi(formData);
    if (result.status) {
      toast.success("Branch created successfully");
      dispatch(fetchBranches());
      setopenmodel()
      setLoading(false);
    } else {
      toast.error(result.message.result || "Failed to create branch");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="w-full text-start">
          <p className="text-lg font-semibold">Fill Branch Details</p>
        </div>
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start">
          <Input
            type="text"
            name="Branchname"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="Branch Name"
            value={formData.branchName}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="Address"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
          <Input
            type="tel"
            name="Number"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="Phone Number"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="code"
            variant="bordered"
            radius="sm"
            className="w-full rounded-none"
            size="lg"
            placeholder="code"
            value={formData.code}
            onChange={handleChange}
          />
          {/* <div className="w-full text-start flex justify-start items-center gap-2 py-2 lg:col-span-2">
          <p className="text-[#205093] text-sm font-bold underline cursor-pointer">
            +Upload Building Image
          </p>
          <span className="text-xs text-gray-400 no-underline">
            (PNG, JPG only)
          </span>
        </div> */}
        </div>
        <div className="flex justify-center items-center w-full">
          <Button
            onPress={handleSubmit}
            className="bg-[#146eb4] text-white rounded-md w-60 uppercase font-semibold"
          >
            {loading ? <span className="loader2"></span> : "Create Branch"}
          </Button>
        </div>
      </div>

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

export default Createbranch;
