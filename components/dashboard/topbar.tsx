"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Pill, LayoutDashboard, Bell, Package, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    href: "/dashboard/medicines",
    label: "Medicines",
    icon: <Pill className="w-4 h-4" />,
  },
  {
    href: "/dashboard/reminders",
    label: "Reminders",
    icon: <Bell className="w-4 h-4" />,
  },
  {
    href: "/dashboard/stock",
    label: "Stock",
    icon: <Package className="w-4 h-4" />,
  },
];

export default function Topbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pageTitle = navItems.find((item) => item.href === pathname)?.label ?? "Dashboard";

  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 h-16 flex items-center justify-between">
      {/* Left — Page title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <h1 className="font-semibold text-foreground">{pageTitle}</h1>
      </div>

      {/* Right — User info */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-primary">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {session?.user?.name}
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-card border-b border-border z-50 px-4 py-3 space-y-1 md:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      )}
    </header>
  );
}
