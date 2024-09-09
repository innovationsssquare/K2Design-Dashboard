'use client'
import { Button, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Updatebranch from "./Updatebranch";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Getbranchdetailsbyid } from "@/lib/API/Branch";
import toast, { Toaster } from "react-hot-toast";


const Branchcard = ({data}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
const [Branchid,Setbranchid]=useState()
const [loadingDetails, setLoadingDetails] = useState(false);
const [branchDetails, setBranchDetails] = useState(null);


useEffect(() => {
  const fetchDetails = async () => {
    if (data?._id) {
      setLoadingDetails(true);
      try {
        const result = await Getbranchdetailsbyid(data._id);
        if (result.status) {
          setBranchDetails(result.data);
          setLoadingDetails(false);

        } else {
          toast.error(result.message || "Failed to fetch branch details");
          setLoadingDetails(false);

        }
      } catch (error) {
        toast.error("An error occurred while fetching branch details");
        setLoadingDetails(false);
      } finally {
        setLoadingDetails(false);
      }
    }
  };

  fetchDetails();
}, [data._id]);





  const handleopen=(id)=>{
    onOpenChange()
    Setbranchid(id)
  }




  return (
    <>
    <div className="w-full boxshadow h-40 flex justify-between items-center p-3 rounded-md">
      <div className="h-full justify-between items-start flex flex-col">
        <div className="flex justify-start gap-2 items-start">
          <Building/>
          <div className="flex flex-col justify-start items-start ">
            <p className="font-bold text-lg capitalize">{data.Branchname}</p>
            <p className="flex items-center justify-start gap-2 text-xs text-gray-500"><FaLocationDot/>{data.Address}</p>
          </div>
        </div>
{loadingDetails?
        <div className="flex justify-start items-center w-full gap-4 ">
          <Skeleton className="h-4 w-16 rounded-sm"></Skeleton>
          <Skeleton className="h-4 w-16 rounded-sm"></Skeleton>
        </div>:
        <div className="flex justify-start items-center w-full gap-4 ">
          <div className="bg-[#E8EAF1] flex items-center gap-2 justify-center p-1 rounded-md">
            <p className="flex items-center text-xs font-semibold gap-2"><IoPeople/>{branchDetails?.admins}&nbsp;Admins</p>
          </div>
          <div className="bg-[#E8EAF1] flex items-center gap-2 justify-center p-1 rounded-md">
            <p className="flex items-center text-xs font-semibold gap-2"><FaBed/>{branchDetails?.user}&nbsp;Tenants</p>
          </div>
        </div>
        
        }
      </div>
      <div className="h-full justify-between items-start flex flex-col">
        <div className="flex justify-start items-center ">
          <p  className="flex items-center text-xs font-semibold gap-2 text-[#205093]"><FaPhoneAlt/>+91-{data.Number}</p>
        </div>
        <div>
          <Button onPress={()=>handleopen(data._id)} className="bg-white ring-1 h-8 ring-[#025EFF] text-[#025EFF] text-sm font-bold rounded-sm">Edit Details</Button>
        </div>
      </div>
    </div>

    <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center">
                Edit Branch Details 
              </ModalHeader>
              <ModalBody>
               <Updatebranch id={Branchid}/>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


      {/* <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
          style: {
            background: "linear-gradient(90deg, #222C68 0%, #1D5B9E 100%)",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      /> */}

    </>
  );
};

export default Branchcard;
