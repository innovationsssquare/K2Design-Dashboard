// src/hooks/useSocket.js (create a custom hook)
"use client"
import { useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  useEffect(() => {
    const socket = io("http://localhost:8086"); // Replace with your backend URL

    socket.on("connection", () => {
      console.log("Connected to the socket server:", socket.id);
    });
    
    socket.on("test", (data) => {
        console.log("Test event received:", data);
    });
    // Listen for 'orderCreated' events
    socket.on("orderCreated", (data) => {
      console.log("New order notification:", data);
      // Add logic here to display the notification in the dashboard
      alert(`New Order Created: ${data.order._id}`);
    });

    

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useSocket;
