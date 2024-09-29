import React, { useState, useEffect, useRef } from "react";
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
import { Trash, CircleX } from "lucide-react"; // Icon for delete action
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategories } from "@/lib/ReduxSlice/CategorySlice";
import { Createproductyapi } from "@/lib/API/Product";
import { ScrollArea } from "../ui/scroll-area";
import { Setopenproduct } from "@/lib/ReduxSlice/CategorySlice";
import toast, { Toaster } from "react-hot-toast";

const Addproducts = () => {
  const dispatch = useDispatch();
  const { category, status, openaproduct } = useSelector(
    (state) => state.category
  );
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setselectedSubcategory] = useState("");
  const [variants, setVariants] = useState([
    { variantName: "", variantValue: "" },
  ]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [Loading,Setloading]=useState(false)

  useEffect(() => {
    dispatch(fetchcategories());
  }, []);

  const openproducthandle = () => {
    dispatch(Setopenproduct(!openaproduct));
  };

  useEffect(() => {
    if (selectedCategory) {
      // Find the selected category object
      const selectedCat = category.find((cat) => cat._id === selectedCategory);
      // Set the filtered subcategories based on the selected category
      setFilteredSubcategories(selectedCat?.subcategories || []);
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategory, category]);

  // Handler to dynamically add variant options
  const handleAddVariant = () => {
    setVariants([...variants, { variantName: "", variantValue: "" }]);
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    Setloading(true)
    for (let i = 0; i < variants.length; i++) {
      if (!variants[i].variantName || !variants[i].variantValue) {
        toast.error(`Please fill in all variant details for variant ${i + 1}`);
        return; // Stop execution if validation fails
      }
    }

    // Create FormData to handle file uploads and other data
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("subcategoryId", selectedSubcategory);
    formData.append("price", price);
    formData.append("sku", sku);
    formData.append("description", description);

    // Append images to FormData
    selectedFiles.forEach((image) => formData.append("images", image));

    // Append variants as JSON string
    formData.append("variants", JSON.stringify(variants));

    try {
      // Send the form data to the API
      const response = await Createproductyapi(formData);
      if (response.status) {
        toast.success("Product added successfully!");
        Setloading(false)
        // Clear form fields after successful submission
        setProductName("");
        setPrice("");
        setSku("");
        setDescription("");
        setImages([]);
        setVariants([{ variantName: "", variantValue: "" }]);
        setSelectedCategory("");
        setTimeout(() => {
          dispatch(Setopenproduct(!openaproduct))
        }, 1000);
      } else {
        toast.error("Failed to add product.");
        Setloading(false)

      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred while adding the product.");
      Setloading(false)
    }
  };

  return (
    <>
      <ScrollArea>
        <Card x-chunk="dashboard-07-chunk-2">
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 w-full">
              {/* Category Field */}
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category" aria-label="Select category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {category.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategory Field */}
              <div className="grid gap-3">
                <Label htmlFor="subcategory">Subcategory (optional)</Label>
                <Select disabled={!selectedCategory} onValueChange={setselectedSubcategory}>
                  <SelectTrigger
                    id="subcategory"
                    aria-label="Select subcategory"
                  >
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredSubcategories.map((subcategory) => (
                      <SelectItem key={subcategory._id} value={subcategory._id}>
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
                  <Input
                    id="productName"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                {/* Price */}
                <div className="grid gap-3">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                {/* SKU */}
                <div className="grid gap-3">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    placeholder="Enter product SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:col-span-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  className="min-h-16"
                  id="description"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex flex-col justify-start items-start w-full gap-4 col-span-3">
                <Button
                  className="bg-[#146eb4] w-60 rounded-md text-white"
                  onPress={onOpen}
                >
                  Add variants
                </Button>
              </div>
                {variants.map((value,i)=>(
                  <p className="text-black grid grid-cols-3 col-span-3 ring-1 ring-gray-300 px-2 rounded-md p-1" key={i}>variants - {value.variantName}:{value.variantValue}</p>
                ))}
                 
              <div className="space-y-2 grid gap-3 col-span-3 w-full ">
                <Label htmlFor="images">Upload Images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <Button
                  type="button"
                  className="bg-[#146eb4] w-60 rounded-md text-white"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Files
                </Button>
              </div>

              {previews.length > 0 && (
                <div className="space-y-2 grid gap-3 grid-cols-6 col-span-3 w-full justify-items-center items-center">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <Button
                        isIconOnly
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0  text-red-500 bg-transparent rounded-full"
                      >
                        <CircleX />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end items-center w-full gap-4 col-span-3">
                <Button
                  onPress={openproducthandle}
                  className="text-[#146eb4] rounded-md ring-1 ring-[#146eb4]  bg-white"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#146eb4] w-60 rounded-md text-white"
                  onPress={handleSubmit}
                >
                  {Loading ? (
                    <span className="loader"></span>
                  ) : "Add Products"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollArea>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
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
                        value={variant.variantName}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "variantName",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Variant Value (e.g., M, Red)"
                        value={variant.variantValue}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "variantValue",
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

export default Addproducts;
