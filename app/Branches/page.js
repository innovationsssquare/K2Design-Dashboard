"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import Branchlist from "@/components/Branchcomponent/Branchlist";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Createbranch from "@/components/Branchcomponent/Createbranch";

import { useDispatch,useSelector } from "react-redux";
import { setFilterQuery as setBranchFilterQuery } from "../../lib/ReduxSlice/BranchSlice";
import { Setopenbranch ,Setopenadmin} from "../../lib/ReduxSlice/BranchSlice";

const Branches = () => {
  const [selected, setSelected] = React.useState("Branches");
  const [selectedtab, setSelectedtab] = React.useState("Branch Details");
  const [selectedtab2, setSelectedtab2] = React.useState("Personal Details");
  const dispatch = useDispatch();
  const openbranch = useSelector(
    (state) => state.branches.openbranch
  );
  const openadmin = useSelector(
    (state) => state.branches.openadmin
  );


  const handleSearchChange = (event) => {
    const query = event.target.value;
    if (selected === "Branches") {
      dispatch(setBranchFilterQuery(query));
    } else if (selected === "Admins") {
      dispatch(setAdminFilterQuery(query));
    }
  };


  const setopenmodel = () => {
    dispatch(Setopenbranch(!openbranch)); 
  };

  const setopenmodeladmin = () => {
    dispatch(Setopenadmin(!openadmin)); 
  };

  return (
    <>
      <section className="flex justify-center items-center w-full h-auto flex-col mx-auto p-4">
        <div className="w-full px-4 text-start">
          <p className="text-lg font-semibold">Manage Branch</p>
        </div>
        <div className="w-full flex justify-between items-center px-4 mt-4">
          <div>
            <Tabs
              selectedKey={selected}
              onSelectionChange={setSelected}
              aria-label="Options"
              color="primary"
              variant="underlined"
              classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0 ",
                cursor: "w-full bg-[#146eb4]",
                tab: "w-auto px-0 h-10",
                tabContent:
                  "group-data-[selected=true]:text-[#146eb4] font-semibold",
              }}
            >
              <Tab
                key="Branches"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Branches</span>
                  </div>
                }
              />
            </Tabs>
          </div>
          <div className="flex gap-3 justify-end items-end">
            <Input
              classNames={{
                base: "w-full sm:max-w-[70%]",
                inputWrapper: "border-1",
              }}
              placeholder="Search by name..."
              size="sm"
              startContent={""}
              variant="bordered"
              // onClear={() => setFilterValue("")}
              onChange={handleSearchChange}
            />
            <div className="flex gap-3">
           <Button
                onPress={setopenmodel}
                className="bg-[#146eb4] text-background"
                endContent={<FaPlus />}
                size="sm"
              ></Button>
              
            </div>
          </div>
        </div>
        <Divider />
        <div className="w-full flex flex-col gap-4 justify-start items-start  mx-auto  h-auto mt-4 rounded-sm">
          {selected === "Branches" && <Branchlist />}
        </div>
      </section>

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

export default Branches;
