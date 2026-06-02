"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Pill, Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Pill className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">
              MedTracker
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button size="sm">Dashboard</Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button size="sm" variant="outline">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button size="sm" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/signin">
                    <Button size="sm" variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
