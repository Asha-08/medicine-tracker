import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pill,
  Bell,
  Package,
  ShieldCheck,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import About from "@/components/home/about";
import CTA from "@/components/home/cta";

export default function HomePage() {
  const features = [
    {
      icon: <Pill className="w-6 h-6 text-primary" />,
      title: "Medicine Management",
      description:
        "Add, edit, and organize all your medicines in one place. Track dosage, unit, and schedule easily.",
    },
    {
      icon: <Bell className="w-6 h-6 text-primary" />,
      title: "Smart Reminders",
      description:
        "Set daily or weekly reminders for each medicine. Never miss a dose again with our smart scheduling.",
    },
    {
      icon: <Package className="w-6 h-6 text-primary" />,
      title: "Stock Tracking",
      description:
        "Monitor your medicine stock levels in real time. Get alerts when stock is running low.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Secure & Private",
      description:
        "Your health data is protected with secure authentication. Only you can access your information.",
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Daily Schedule",
      description:
        "View your complete daily medicine schedule at a glance. Mark medicines as taken with one click.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: "Stock History",
      description:
        "Keep a detailed log of all stock changes. Track when you bought or used your medicines.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <Hero />


      {/* Features Section */}
      <Features></Features>

      {/* About Section */}
      <About></About>


      {/* CTA Section */}
     <CTA></CTA>

      <Footer />
    </div>
  );
}
