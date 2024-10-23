"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LendItemForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [item, setItem] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItem((prevItem) => ({
          ...prevItem,
          image: reader.result,
        }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setItem((prevItem) => ({
        ...prevItem,
        image: "",
      }));
      setPreview("");
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !item.name.trim() ||
      !item.image ||
      !item.price.trim() ||
      !item.description.trim()
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields and upload an image.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Item added", data);
      toast({
        title: "Item Added Successfully",
        description: "Your item has been listed for lending.",
      });
      router.push("/home"); // Redirect the user
    } catch (error) {
      console.log("Error adding item:", error);
      toast({
        title: "Failed to Add Item",
        description: "There was an error adding your item. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Lend an Item
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={item.name}
              onChange={handleChange}
              placeholder="Enter item name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <Input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
          {preview && (
            <div className="mt-4">
              <Image
                src={preview}
                alt="Preview"
                width={200}
                height={200}
                objectFit="cover"
              />
            </div>
          )}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price (total)
            </label>
            <Input
              type="number"
              id="price"
              name="price"
              value={item.price}
              onChange={handleChange}
              placeholder="Enter your price"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Duration
            </label>
            <Textarea
              id="description"
              name="description"
              value={item.description}
              onChange={handleChange}
              placeholder="Enter time here (days)"
              rows={3}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-500">
            Add Item for Lending
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
