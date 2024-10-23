"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsSignedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    setIsSignedIn(false);
    localStorage.removeItem("token");
  };

  return isSignedIn ? (
    <nav className="bg-slate-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={"/home"}>
              <h1 className="text-2xl font-bold text-white text-primary">
                UniLend
              </h1>
            </Link>{" "}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-8 h-8">
              <Link href={"/"}>
                <GraduationCap className="h-8 w-8 mr-2 text-blue-400" />
              </Link>
            </div>
            <Link href={"/"} onClick={handleSignOut}>
              <Button variant="outline">Sign Out</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <nav className="bg-slate-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={"/home"}>
              <h1 className="text-2xl font-bold text-white text-primary">
                UniLend
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href={"/signup"}>
              <Button variant="outline">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
