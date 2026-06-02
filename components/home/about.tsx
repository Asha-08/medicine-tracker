import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pill, Bell, Package, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";

const highlights = [
  "Track multiple medicines easily",
  "Set daily and weekly reminders",
  "Get low stock alerts instantly",
  "Secure and private by design",
  "Simple and clean dashboard",
  "Works on all devices",
];

const cards = [
  {
    icon: <Pill className="w-5 h-5 text-primary" />,
    label: "Medicines",
    value: "All in one place",
  },
  {
    icon: <Bell className="w-5 h-5 text-primary" />,
    label: "Reminders",
    value: "Never miss a dose",
  },
  {
    icon: <Package className="w-5 h-5 text-primary" />,
    label: "Stock",
    value: "Always updated",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    label: "Privacy",
    value: "100% secure",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full">
                About
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Built For
                <span className="text-primary"> Real People</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                MedTracker was built to solve a simple but important problem —
                keeping track of medicines is hard. We forget doses, run out of
                stock, and lose track of schedules.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With MedTracker, you get a simple, secure, and easy-to-use
                platform that keeps everything organized. From adding medicines
                to setting reminders and tracking stock — we have got you
                covered.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/signup">
              <Button className="rounded-full px-8 h-12 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                Start Tracking Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Right — Cards */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((item) => (
              <Card
                key={item.label}
                className="group border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Big card */}
            <Card className="col-span-2 border-border bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Pill className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground">
                    Your health, organized
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Join MedTracker and take control of your medicine routine
                    today.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
