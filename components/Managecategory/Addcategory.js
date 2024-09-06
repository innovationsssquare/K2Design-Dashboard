import React, { useEffect, useState } from "react";
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
import { Modal, ModalContent, Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Calculator, Calendar, Smile } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Createcategoryapi, Uploaddocapi } from "../../lib/API/Category";
import {
  CreateSubcategoryapi,
  Uploaddocsubcategoryapi,
} from "../../lib/API/Subcategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategories } from "../../lib/ReduxSlice/CategorySlice";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

const Addcategory = () => {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    catid: "",
    catname: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // For validation errors
  const Categories = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(fetchcategories());
  }, [isModalOpen]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validate = () => {
    if (!categoryName) return "Category Name is required";
    if (!description) return "description is required";
    if (!image) return "image is required";
    if (isSelected && !selectedCategory) return "Please select a category.";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

    const data = {
      name: categoryName,
      description: description,
    };

    const subdata = {
      name: categoryName,
      description: description,
      categoryId: selectedCategory.catid,
    };

    const formData = new FormData();
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      if (isSelected) {
        const response = await CreateSubcategoryapi(subdata);
        if (response.status) {
          await Uploaddocsubcategoryapi(formData, response.data._id);
        }
      } else {
        const response = await Createcategoryapi(data);
        if (response.status) {
          await Uploaddocapi(formData, response.data._id);
        }
      }
      setCategoryName("");
      setDescription("");
      setImage(null);
      setIsSelected(false);
      toast.success("Category  created successfully!");
    } catch (error) {
      toast.error("Error creating category ");
    } finally {
      setLoading(false);
    }
  };

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const handleCategorySelection = (cat) => {
    setSelectedCategory({ catid: cat._id, catname: cat.name });
    setIsModalOpen(false);
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
                <Input
                  id="name"
                  type="text"
                  className="w-full outline-none focus:outline-none"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              {isSelected && (
                <div className="grid gap-3">
                  <Label htmlFor="selectcategory">Select Category</Label>
                  <Input
                    ref={inputRef}
                    onClick={handleInputClick}
                    id="selectcategory"
                    value={selectedCategory.catname || ""}
                    type="text"
                    className="w-full outline-none"
                  />
                </div>
              )}
              {
                <div className="grid gap-3">
                  <Label htmlFor="picture">Category image</Label>
                  <Input
                    id="picture"
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
              }
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={isSelected ? "min-h-10" : "min-h-24"}
                />
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
                <Button
                  className="bg-[#146eb4] w-44 rounded-md text-white"
                  onPress={handleSubmit}
                >
                  {loading ? (
                    <span className="loader"></span>
                  ) : isSelected ? (
                    "Add Subcategory"
                  ) : (
                    "Add Category"
                  )}
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
                {Categories.map((cat, index) => (
                  <CommandList onClick={() => handleCategorySelection(cat)}>
                    <CommandGroup>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandItem key={index}>
                        <Image
                          src={cat.image}
                          width={10}
                          height={10}
                          alt="catimage"
                          className="mr-2 h-4 w-4"
                        />
                        <span>{cat.name}</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                ))}
              </Command>
            </>
          )}
        </ModalContent>
      </Modal>

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

export default Addcategory;
