"use client";
import React, { useEffect, useState } from "react";
import Branchcard from "./Branchcard";
import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Createbranch from "./Createbranch";
import { Tabs, Tab } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches,Setopenbranch } from "@/lib/ReduxSlice/BranchSlice";

const Branchlist = () => {
  const [selected, setSelected] = React.useState("Branches");
  const [selectedtab, setSelectedtab] = React.useState("Branch Details");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const branches = useSelector((state) => state.branches.branches);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.branches.status);
  const filterQuery = useSelector((state) => state.branches.filterQuery);
  const [filteredBranches, setFilteredBranches] = useState(branches);
  const openbranch = useSelector(
    (state) => state.branches.openbranch
  );

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);


 

  useEffect(() => {
    setFilteredBranches(
      branches?.filter((branch) =>
        typeof branch.branchName === "string" &&
        branch.branchName.toLowerCase().includes(filterQuery.toLowerCase())
      )
    );
  }, [branches, filterQuery]);

  const setopenmodel = () => {
    dispatch(Setopenbranch(!openbranch)); 
  };




  if(filteredBranches === undefined) {
   return <div className="w-full  h-[60vh] flex justify-center items-center p-3 rounded-md">
      <p>Error while fetching branch details</p>
    </div>
  }
console.log(filteredBranches)
  return (
    <>
      {status === "loading" ? (
        <p className="flex justify-start items-center flex-col gap-2 h-[40vh] w-full mt-24">
          <span className="loader2"></span>
        </p>
      ) : (
        <div className="w-full grid grid-cols-2 justify-center items-center place-content-center mx-auto gap-6">
          {status==="succeeded" && filteredBranches?.length === 0 && (
            <div className="w-full boxshadow h-40 flex justify-center items-center p-3 rounded-md">
              <p>No branches Found</p>
            </div>
          )}
          {filteredBranches?.map(
            (data, index) =>
              status === "succeeded" && <Branchcard data={data} key={index} />
          )}

          {/* {status === "succeeded" && (
            <Button
              onPress={setopenmodel}
              className="w-full  h-40 flex justify-center ring-2 ring-[#146eb4] bg-[#B9D6FF59]  items-center p-3 rounded-md"
            >
              <FaCirclePlus size={40} className="text-[#146eb4]" />
            </Button>
          )} */}
        </div>
      )}

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="4xl"
        isOpen={openbranch}
        onOpenChange={setopenmodel}
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
                Create New Branch
              </ModalHeader>
              <ModalBody>
                <Tabs
                  selectedKey={selectedtab}
                  onSelectionChange={setSelectedtab}
                  aria-label="Options"
                  color="primary"
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 ",
                    cursor: "w-full bg-[#205093]",
                    tab: "w-auto px-0 h-10",
                    tabContent:
                      "group-data-[selected=true]:text-[#205093] font-semibold",
                  }}
                >
                  <Tab
                    key="Branch Details"
                    title={
                      <div className="flex items-center space-x-2">
                        <span>Branch Details</span>
                      </div>
                    }
                  />
                </Tabs>
                <div className="w-full h-auto">
                  {selectedtab === "Branch Details" && <Createbranch  />}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center text-center">
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Branchlist;
