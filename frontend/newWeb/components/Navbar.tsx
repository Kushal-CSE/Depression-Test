"use client";

import Link from "next/link";
import { Lightbulb, Menu, X } from "lucide-react";
import { useState } from "react";
import { UserMenu } from "./UserMenu";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <span className="text-base sm:text-lg font-bold text-gray-900">
              MindCare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="#assessments"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Assessments
            </a>

            <UserMenu />
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <UserMenu />

            {/* <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button> */}
          </div>
        </div>

        {/* Mobile Menu */}
        {/* {isOpen && (
          <div className="border-t border-gray-200 py-3 md:hidden">
            <a
              href="#assessments"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            >
              Assessments
            </a>
          </div>
        )} */}
      </div>
    </nav>
  );
}