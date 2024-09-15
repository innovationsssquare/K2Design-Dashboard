import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Upadtebranchapi,Getbranchbyid } from "../../lib/API/Branch";
import toast, { Toaster } from "react-hot-toast";
import { useSelector,useDispatch } from "react-redux";
import { createBranch,fetchBranches } from "@/lib/ReduxSlice/BranchSlice";

const Updatebranch = ({id}) => {
  const branches = useSelector((state) => state.branches.branches);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
  const [formData, setFormData] = useState({
    branchName: "",
    location: "",
    contactNumber: "",
    code: "",
  });


  useEffect(() => {
    const fetchBranchData = async () => {
        if (!isValidObjectId(id)) {
            toast.error("Invalid branch ID");
            setLoadingData(false);
            return;
          }

      setLoadingData(true);
      try {
        const result = await Getbranchbyid(id);
        if (result.status) {
          setFormData({
            branchName: result.data.branchName,
            location: result.data.location,
            contactNumber: result.data.contactNumber,
            code: result.data.code,
          });
        } else {
          toast.error(result.message || "Failed to fetch branch data");
        }
      } catch (error) {
        toast.error("An error occurred while fetching branch data");
      } finally {
        setLoadingData(false);
      }
    };

    if (id) {
      fetchBranchData();
    }
  }, [id]);

 

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


    const result = await Upadtebranchapi(formData,id);
    if (result.status) {
      toast.success("Branch Updated successfully");
      setTimeout(() => {
        
        dispatch(fetchBranches());
      }, 2000);
    setLoading(false)
    } else {

      toast.error(result.message.result || "Failed to create branch");
      setLoading(false)
    }
  };

  return (
    <>
   {loadingData ?<div className="w-full flex justify-center items-center h-72">
    <span className="loader2"></span>
   </div>: <div className="flex flex-col justify-center items-center gap-6">
      <div className="w-full text-start">
        <p className="text-lg font-semibold">Fill Branch Details</p>
      </div>
      <div
        className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 place-content-center justify-between items-start"
      
      >
        <Input
          type="text"
          name="branchName"
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
          name="location"
          variant="bordered"
          radius="sm"
          className="w-full rounded-none"
          size="lg"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="contactNumber"
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
      
      </div>
        <div className="flex justify-center items-center w-full">
        <Button onPress={handleSubmit} className="bg-[#146eb4] text-white rounded-md w-60 uppercase font-semibold">
        {loading ? <span className="loader"></span> : "Update Branch"}
        </Button>

        </div>
    </div>}


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


export default Updatebranch