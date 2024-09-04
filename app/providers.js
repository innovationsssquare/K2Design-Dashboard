"use client";
import { usePathname, useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Nav from "@/components/Navbarcomponets/Nav";
import Sidenav from "@/components/Navbarcomponets/Sidenav";

export function Providers({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
      if (pathname === "/Signin") {
        router.push("/");
      }
    } else {
      setIsAuthenticated(false);
      if (pathname !== "/Signin") {
        router.push("/Signin");
      }
    }
  }, [pathname, router]);

  if (isAuthenticated && pathname === "/Signin") {
    // Render nothing or a loading state while redirecting
    return (
      <div className="flex justify-center flex-col gap-4 text-[#146eb4] items-center h-screen backgroundlayer">
        <span className="loader2"></span>Loading...
      </div>
    );
  }

  if (!isAuthenticated && pathname !== "/Signin") {
    // Render nothing or a loading state while redirecting
    return (
      <div className="flex justify-center flex-col gap-4 text-[#146eb4] items-center h-screen backgroundlayer">
        <span className="loader2"></span>Loading...
      </div>
    );
  }

  return (
    <NextUIProvider>
     {pathname !== "/Signin" ? <main className="grid grid-cols-1 md:grid-cols-[auto,1fr] bg-[#f7f7f7]  w-full">
        {pathname !== "/Signin" && (
          <div className="w-full  h-full">
            <Sidenav />
          </div>
        )}

        <section className="flex  flex-col gap-4 w-full h-full ">
          {pathname !== "/Signin" && <Nav />}
          {children}
        </section>
      </main>:children}
    </NextUIProvider>
  );
}
