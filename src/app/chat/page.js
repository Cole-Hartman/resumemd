"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ChatRoom() {
  const { toast } = useToast();
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { content: message };
    console.log("newMessage", newMessage);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    };

    try {
      const response = await fetch("/api/messages", options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Message sent", data);
      router.push("/home"); // Redirect the user
      setMessage("");
    } catch (error) {
      console.log("Error sending message:", error);
      toast({
        title: "Message Failed",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-28">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Message Seller
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full">
          <Input
            type="text"
            placeholder="Type your message..."
            className="flex-grow mr-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
