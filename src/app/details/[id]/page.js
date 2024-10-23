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

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/items/${params.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("There was a problem fetching the product:", error);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id, router, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  console.log(product.data[0]);

  return (
    <div className="min-h-screen bg-slate-800 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {product.data[0].name}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square relative">
            <img
              src={product.data[0].img}
              alt={product.data[0].name}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              ${product.data[0].price}
            </h3>
            <p className="text-gray-700 mb-6">{product.data[0].description}</p>
            <ul className="list-disc list-inside text-gray-600"></ul>
          </div>
        </CardContent>
        <CardFooter>
          <Link href={"/chat"}>
            <Button className="w-full mx-2">Rent Now</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
