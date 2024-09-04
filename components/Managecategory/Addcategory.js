import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Modal,
  ModalContent,
  Button,
} from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Calculator, Calendar, Smile } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, 
} from "@/components/ui/command";
import {Createcategoryapi,Uploaddocapi} from "../../lib/API/Category"
import {CreateSubcategoryapi,Uploaddocsubcategoryapi} from "../../lib/API/Subcategory"

const Addcategory = () => {
  const [isSelected, setIsSelected] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleInputClick = () => {
    setIsModalOpen(true); 
  };

  return (
    <>
      <div>
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>
              {isSelected ? "Add Subategory" : "Add Category"}
            </CardTitle>
            <CardDescription>
              Create categories to organize your products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">
                  {isSelected ? "Subategory Name" : "Category Name"}
                </Label>
                <Input id="name" type="text" className="w-full" />
              </div>
              {isSelected && (
                <div className="grid gap-3">
                  <Label htmlFor="selectcategory">Select Category</Label>
                  <Input
                    ref={inputRef}
                    onClick={handleInputClick}
                    id="selectcategory"
                    type="text"
                    className="w-full"
                  />
                </div>
              )}
              {!isSelected && (
                <div className="grid gap-3">
                  <Label htmlFor="picture">Category image</Label>
                  <Input id="picture" type="file" />
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" className="min-h-20" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                  Add as Subcategory
                </Checkbox>
              </div>
              <div className="flex justify-end items-center w-full gap-4 ">
                <Button className="text-[#146eb4] rounded-md ring-1 ring-[#146eb4]  bg-white">
                  Cancel
                </Button>
                <Button className="bg-[#146eb4] rounded-md text-white">
                  {isSelected ? "Add Subategory" : "Add Category"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        backdrop="opaque"
        isOpen={isModalOpen}
        size="lg"
        onOpenChange={setIsModalOpen}
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
              <Command className="rounded-none border shadow-md w-full">
                <CommandInput placeholder="Search Category..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Category">
                    <CommandItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Paper Printing</span>
                    </CommandItem>
                    <CommandItem>
                      <Smile className="mr-2 h-4 w-4" />
                      <span>Media Printing</span>
                    </CommandItem>
                    <CommandItem>
                      <Calculator className="mr-2 h-4 w-4" />
                      <span>Vinyl Letters</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Addcategory;
