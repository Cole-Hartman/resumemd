"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 401) {
          console.log("caught yo ass");
          router.replace("/");
          return;
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems([...data.data]);
      } catch (error) {
        console.error("There was a problem fetching the items:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-slate-800 px-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Marketplace
      </h1>
      <Link href={"/create"}>
        <Button className="mb-5 hover:bg-blue-600 transition-colors duration-300">
          + Lend your Item
        </Button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items &&
          items.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <Link href={`/details/${item.id}`}>
                <CardHeader className="p-0">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl mb-2 group-hover:text-blue-500 transition-colors duration-300">
                    {item.name}
                  </CardTitle>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.description}
                  </p>
                  <p className="text-lg font-bold group-hover:text-green-500 transition-colors duration-300">
                    ${item.price.toFixed(2)}
                  </p>
                </CardContent>
              </Link>
              <CardFooter>
                <Link href={"/chat"} className="mx-2 w-full">
                  <Button className="w-full hover:bg-green-500 transition-colors duration-300">
                    Rent Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
