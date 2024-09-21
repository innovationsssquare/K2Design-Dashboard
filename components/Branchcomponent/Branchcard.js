"use client";
import { Button, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { Trash2,UserRoundPlus } from "lucide-react";
import Updatebranch from "./Updatebranch";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { Building } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Addadmin from "./Addadmin";
import { useSelector, useDispatch } from "react-redux";
import {Setopenadmin,fetchAdmins} from "@/lib/ReduxSlice/Adminslice";
import {setSelectedBranch} from "@/lib/ReduxSlice/BranchSlice"
import {Getadminbybranch} from "@/lib/API/Auth"

const Branchcard = ({ data }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Branchid, Setbranchid] = useState();
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [branchDetails, setBranchDetails] = useState(null);
  const [openmodel,Setopenmodal]=useState(false)
  const openadmin = useSelector(
    (state) => state.admins.openadmin
  );
  const admins =useSelector((state)=>state.admins.admins)

  const setopenmodeladmin = (data) => {
    dispatch(Setopenadmin(!openadmin)); 
    dispatch(setSelectedBranch(data._id))
  };

  useEffect(() => {
    dispatch(fetchAdmins(data._id));
  }, []);

  const handleopen = (id) => {
    onOpenChange();
    Setbranchid(id);
  };

console.log(admins)
  return (
    <>
      <div className="w-full boxshadow h-40 flex justify-between items-center p-3 rounded-md">
        <div className="h-full justify-between items-start flex flex-col">
          <div className="flex justify-start gap-2 items-start">
            <Building size={40} className="text-[#146eb4]" />
            <div className="flex flex-col justify-start items-start ">
              <p className="font-bold text-lg capitalize">{data.branchName}</p>
              <p className="flex items-center justify-start gap-2 text-xs text-gray-500">
                <FaLocationDot />
                {data.location}
              </p>
            </div>
          </div>
          {loadingDetails ? (
            <div className="flex justify-start items-center w-full gap-4 ">
              <Skeleton className="h-4 w-16 rounded-sm"></Skeleton>
            </div>
          ) : (
            <div className="flex justify-start items-center w-full gap-4 ">
              <div className="bg-[#E8EAF1] flex items-center gap-2 justify-center p-1 rounded-md">
                <p className="flex items-center text-xs font-semibold gap-2">
                  <IoPeople className="text-[#146eb4]" />
                  {branchDetails?.admins}&nbsp;Admins
                </p>
              </div>
              <div>
              <Button
              onPress={()=>setopenmodeladmin(data)}
              size="sm"
              className="text-white  h-6   bg-[#146eb4] text-sm rounded-md font-bold "
            >
             <UserRoundPlus size={15}/>
            </Button>
              </div>
            </div>
          )}

        </div>
        <div className="h-full justify-between items-start flex flex-col">
          <div className="flex justify-start items-center ">
            <p className="flex items-center text-xs font-semibold gap-2 text-[#205093]">
              <FaPhoneAlt />
              +91-{data?.contactNumber}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onPress={() => handleopen(data._id)}
              className="bg-white ring-1 h-8 ring-[#146eb4] text-[#146eb4] text-sm font-bold rounded-sm"
            >
              Edit Details
            </Button>

            <Dialog>
              <DialogTrigger>
                <div
                  // onPress={() => handleopen(data._id)}
                  className="bg-transparent text-red-500   h-8  text-sm font-bold rounded-sm"
                >
                  <Trash2 />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your Branch account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="text-white  h-8  bg-red-500 text-sm font-bold rounded-sm"
                      variant="secondary"
                    >
                     Delete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                <Updatebranch id={Branchid} />
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="opaque"
        size="4xl"
        isOpen={openadmin}
        onOpenChange={setopenmodeladmin}
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
               Add Admin
              </ModalHeader>
              <ModalBody>
                <Addadmin id={Branchid} />
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center"></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      
    </>
  );
};

export default Branchcard;
