"use client"
import Link from "next/link";
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import { ModeToggle } from "../../dark-mode";
import { Button } from "../../ui/button";
import { Menu, Search, X } from "lucide-react";
import { Input } from "../../ui/input";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Navbar = () => {
  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo & Desktop Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Byte
                </span>
                <span className="text-foreground">Code</span>
              </span>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/articles"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Articles
              </Link>
              <Link
                href="/tutorials"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Tutorials
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            </div>
          </div>
          {/* Right Section - Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Desktop) */}
            <SearchInput/>
             {/* Theme Toggle */}
             <ModeToggle/>
             {/* useraction */}
             <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <div className="hidden md:flex items-center gap-2">
                <SignInButton>
                  <Button variant="outline">Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Sign up</Button>
                </SignUpButton>
              </div>
            </SignedOut>
             {/* <div className="hidden md:flex items-center gap-2">
              <Button>Login</Button>
              <Button>Signup</Button>
             </div> */}
          </div>
          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
          </Button>
        </div>
         {/* Mobile Menu */}
         {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            {/* Search Bar (Mobile) */}
            <div className="px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 w-full focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 px-4">
              <Link
                href="/articles"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/tutorials"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tutorials
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            <SignedOut>
              <div className="px-4 flex flex-col gap-2">
                <SignInButton>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full">Sign up</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
