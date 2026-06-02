import { Card, CardContent } from "@/components/ui/card";
import { Pill, Bell, Package, ShieldCheck, Clock, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <Pill className="w-6 h-6 text-primary" />,
    title: "Medicine Management",
    description:
      "Add, edit, and organize all your medicines in one place. Track dosage, unit, and schedule easily.",
    bg: "bg-primary/10",
  },
  {
    icon: <Bell className="w-6 h-6 text-primary" />,
    title: "Smart Reminders",
    description:
      "Set daily or weekly reminders for each medicine. Never miss a dose again with our smart scheduling.",
    bg: "bg-primary/10",
  },
  {
    icon: <Package className="w-6 h-6 text-primary" />,
    title: "Stock Tracking",
    description:
      "Monitor your medicine stock levels in real time. Get alerts when stock is running low.",
    bg: "bg-primary/10",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Secure & Private",
    description:
      "Your health data is protected with secure authentication. Only you can access your information.",
    bg: "bg-primary/10",
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Daily Schedule",
    description:
      "View your complete daily medicine schedule at a glance. Mark medicines as taken with one click.",
    bg: "bg-primary/10",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    title: "Stock History",
    description:
      "Keep a detailed log of all stock changes. Track when you bought or used your medicines.",
    bg: "bg-primary/10",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Powerful features to help you stay on top of your medicine routine.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 bg-card"
            >
              <CardContent className="p-7 space-y-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 ${feature.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                {/* Number */}
                <span className="text-xs font-bold text-primary/40 tracking-widest">
                  0{index + 1}
                </span>

                <h3 className="font-bold text-lg text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
