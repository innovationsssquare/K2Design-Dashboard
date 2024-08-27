"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/LOGO.png";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import Cookies from "js-cookie";
import { Tabs, Tab } from "@nextui-org/react";
import { toast } from "sonner"


import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Checkbox,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import { setUser } from '../../lib/AuthSlice';
// import { useDispatch } from 'react-redux';
// import { fetchUserDetails } from "@/lib/AuthSlice";

const Loginpage = () => {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [superAdminEmail, setSuperAdminEmail] = useState("");
  const [superAdminPassword, setSuperAdminPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [selected, setSelected] = React.useState("Superadminlogin");
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userdata,Setuserdata]=useState()

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setSuperAdminEmail(rememberedEmail);
      setAdminEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);
  const properties = ["Property 1", "Property 2", "Property 3"]; // Example properties

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setIsDropdownOpen(false);
  };

  // const handleSubmit = async () => {
  //   const data = {
  //     Email: email,
  //     Password: password,
  //   };
  //   const result = await Superadminlogin(data);
  //   if (result.status) {
  //     console.log(result.token);
  //     Cookies.set("token", result.token, { expires: 7 });
  //     window.location.href = "/";
  //   } else {
  //     toast.error(result.message || "An error occurred");
  //   }
  // };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const validate = () => {
//     if (selected === "Superadminlogin") {
//       if (!superAdminEmail) {
//         return "Super Admin Email is required";
//       } else if (!validateEmail(superAdminEmail)) {
//         return "Invalid Super Admin email format";
//       }
//       if (!superAdminPassword) return "Super Admin Password is required";
//     } else {
//       if (!adminEmail) {
//         return "Admin Email is required";
//       } else if (!validateEmail(adminEmail)) {
//         return "Invalid Admin email format";
//       }
//       if (!adminPassword) return "Admin Password is required";
//     }
//     return null;
//   };

//   const handleSubmit = async () => {
//     const errors = validate();
//     if (errors) {
//       toast.error(errors);
//       return;
//     }

//     setLoading(true);

//     let data, result;

//     try {
//       if (selected === "Superadminlogin") {
//         data = {
//           Email: superAdminEmail,
//           Password: superAdminPassword,
//         };
//         result = await Superadminlogin(data);
//        if(result.data){
//         dispatch(setUser(result.data));
//         Setuserdata(result.data)
//       }
//       } else {
//         data = {
//           Email: adminEmail,
//           Password: adminPassword,
//         };
//         result = await Adminlogin(data);
//         if(result.data){
//           dispatch(setUser(result.data));
//           Setuserdata(result.data)
//         }
//       }

//       if (result.status) {
//         console.log(result.token);
//         Cookies.set("token", result.token);
//         if (rememberMe) {
//           localStorage.setItem("rememberedEmail", data.Email);
//         } else {
//           localStorage.removeItem("rememberedEmail");
//         }
//         router.push("/");
//       } else {
//         toast.error(result.message || "An error occurred during login");
//       }
//     } catch (error) {
//       toast.error("An error occurred during login");
//     } finally {
//       setLoading(false);
//     }
//   };


  return (
    <>
      <main className="h-screen w-full mx-auto bg-[#f7f7f7]   flex justify-center items-center flex-col">
        <div className="md:w-96 lg:w-96 w-11/12 h-auto rounded-lg overflow-hidden mx-auto boxshadow">
          <div className="flex  bg-[#1b181e] justify-center items-center   ">
            <Image alt="logo" src={Logo}  className="h-24 w-full object-contain" />
           
          </div>
          <div className="flex gap-3 justify-center bg-white items-center py-2  flex-col">
            <div className="flex justify-center items-center py-2">
              <h2 className="text-[#1b181e] font-semibold ">Login</h2>
            </div>
            <Tabs
              fullWidth
              classNames={{
                tabList:
                  "gap-6 w-11/12 mx-auto relative bg-transparent hidden rounded-md p-0 ",
                cursor: "w-full bg-transparent  ",
                tab: " px-2 h-10",
                tabContent: "group-data-[selected=true]:text-black text-black ",
              }}
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="Superadminlogin" title="Login" className="w-full">
                <div className="w-full flex justify-center items-center flex-col gap-3">
                  <div className="bg-gray-200 rounded-md w-11/12 mx-auto h-12 flex justify-start px-2 items-center gap-4">
                    <FaUser className="text-[#1b181e]" size={24} />
                    <input
                      className="outline-none bg-transparent text-[#1b181e] placeholder:text-[#1b181e] placeholder:text-sm placeholder:font-medium"
                      placeholder="Email"
                      value={superAdminEmail}
                      onChange={(e) => setSuperAdminEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bg-gray-200 rounded-md w-11/12 mx-auto h-12 flex justify-start px-2 items-center gap-4">
                    <IoMdLock className="text-[#1b181e]" size={24} />
                    <input
                      className="outline-none bg-transparent text-[#1b181e] placeholder:text-[#1b181e] placeholder:text-sm placeholder:font-medium w-full"
                      placeholder="Password"
                      type="password"
                      value={superAdminPassword}
                      onChange={(e) => setSuperAdminPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </Tab>
             
            </Tabs>

            <div className="flex py-2 px-4 justify-between w-full">
              <Checkbox
              color="default"
                classNames={{
                  label: "text-small text-[#1b181e] opacity-70",
                }}
                isSelected={rememberMe}
                onValueChange={setRememberMe}
              >
                Remember me
              </Checkbox>
              <Link
                color="primary"
                href="#"
                size="sm"
                className="text-[#1b181e] opacity-70"
              >
                Forgot password?
              </Link>
            </div>
            <div className="w-full flex justify-center items-center py-2">
              <Button
                // onPress={handleSubmit}
                className="bg-[#1b181e] w-11/12 text-white font-semibold rounded-md"
              >
                {/* {loading ? <span className="loader2"></span> : "Login"} */}
                login
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center fixed bottom-2">
          <p className="text-sm font-semibold text-white">Designed by AWT</p>
        </div>
      </main>
     
    </>
  );
};

export default Loginpage;

{
  /* <div
                onClick={toggleDropdown}
                className="bg-[#324970]  relative rounded-md w-11/12 mx-auto h-12 flex justify-start px-2 items-center gap-4"
              >
                <BiSolidBuildingHouse className="text-white" size={24} />
                <input
                  className="outline-none bg-transparent text-sm text-white placeholder:text-white placeholder:text-sm placeholder:font-medium"
                  placeholder="Property"
                  value={selectedProperty}
                />
                {isDropdownOpen ? (
                  <IoChevronUp className="text-white ml-14" size={24} />
                ) : (
                  <IoChevronDownOutline
                    className="text-white ml-14"
                    size={24}
                  />
                )}
                {isDropdownOpen && (
                  <div className="absolute w-full top-full mt-1 z-20 bg-[#324970] left-0 right-0  rounded-md">
                    {properties.map((property) => (
                      <div
                        key={property}
                        onClick={() => handlePropertySelect(property)}
                        className="cursor-pointer px-4 py-2 text-white hover:bg-[#2a3e60] text-sm"
                      >
                        {property}
                      </div>
                    ))}
                  </div>
                )}
              </div> */
}
