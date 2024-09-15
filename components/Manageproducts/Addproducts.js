import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // For input fields
import { Textarea } from "@/components/ui/textarea"; // For product description
import { Trash } from "lucide-react"; // Icon for delete action
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const Addproducts = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [variants, setVariants] = useState([
    { optionName: "", optionValue: "" },
  ]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // Fetch subcategories based on selected category
      const fetchSubcategories = async () => {
        const response = await fetch(
          `/api/subcategories?categoryId=${selectedCategory}`
        );
        const data = await response.json();
        setSubcategories(data.subcategories);
      };
      fetchSubcategories();
    }
  }, [selectedCategory]);

  // Handler to dynamically add variant options
  const handleAddVariant = () => {
    setVariants([...variants, { optionName: "", optionValue: "" }]);
  };

  // Handler to remove a variant
  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // Handler to update variant option details
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  return (
    <>
      <div>
        <Card x-chunk="dashboard-07-chunk-2">
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Category Field */}
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category" aria-label="Select category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategory Field */}
              <div className="grid gap-3">
                <Label htmlFor="subcategory">Subcategory (optional)</Label>
                <Select>
                  <SelectTrigger
                    id="subcategory"
                    aria-label="Select subcategory"
                  >
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full col-span-2">
                {/* Product Name */}
                <div className="grid gap-3">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input  id="productName" placeholder="Enter product name" />
                </div>

                {/* Price */}
                <div className="grid gap-3">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" placeholder="Enter price" />
                </div>

                {/* SKU */}
                <div className="grid gap-3">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Enter product SKU" />
                </div>
              </div>

              <div className="grid gap-3 sm:col-span-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  className="min-h-16"
                  id="description"
                  placeholder="Enter product description"
                />
              </div>

              <div className="grid gap-3 sm:col-span-2">
                <Label htmlFor="image">Upload Image</Label>
                <Input id="image" type="file" />
              </div>

              <div className="flex justify-start items-start w-full gap-4 col-span-3">
                <Button
                  className="bg-[#146eb4] w-60 rounded-md text-white"
                  onPress={onOpen}
                >
                  Add variants
                </Button>
              </div>

              <div className="flex justify-end items-center w-full gap-4 col-span-3">
                {/* <Button  className="text-[#146eb4] rounded-md ring-1 ring-[#146eb4]  bg-white">
                  Cancel
                </Button> */}
                <Button
                  className="bg-[#146eb4] w-60 rounded-md text-white"
                  // onPress={handleSubmit}
                >
                  {/* {loading ? (
                    <span className="loader"></span>
                  ) : isSelected ? (
                    "Add Subcategory"
                  ) : (
                    "Add Category"
                  )} */}
                  Add Products
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        isDismissable={false} isKeyboardDismissDisabled={true}
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
              <ModalHeader className="flex flex-col gap-1">
                Add varients
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-3 sm:col-span-2">
                  <Label>Variants (Optional)</Label>

                  {variants.map((variant, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Input
                        placeholder="Variant Name (e.g., Size, Color)"
                        value={variant.optionName}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "optionName",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Variant Value (e.g., M, Red)"
                        value={variant.optionValue}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "optionValue",
                            e.target.value
                          )
                        }
                      />
                      <Button
                        variant="ghost"
                        onClick={() => handleRemoveVariant(index)}
                        aria-label="Remove variant"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    className="bg-[#146eb4]  rounded-md text-white"
                    variant="solid"
                    size="sm"
                    onClick={handleAddVariant}
                  >
                    Add Variant
                  </Button>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  className="ring-[#146eb4] ring-1 bg-white  rounded-md text-[#146eb4]"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Addproducts;
