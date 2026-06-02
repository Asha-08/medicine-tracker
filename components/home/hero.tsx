import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pill, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Smart Medicine Management
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
            Never Miss
            <br />
            <span className="relative inline-block">
              <span className="text-primary">A Dose</span>
              {/* Underline decoration */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 8C50 3 150 1 298 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary"
                />
              </svg>
            </span>
            <br />
            Again
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          MedTracker keeps your medicines, reminders, and stock levels
          organized — so you can focus on what matters most.
          <span className="text-foreground font-medium"> Your health.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button
              size="lg"
              className="w-full sm:w-auto px-10 h-13 text-base font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
            >
              Start For Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/signin">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-10 h-13 text-base rounded-full hover:-translate-y-0.5 transition-all"
            >
              Sign In
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
          {[
            { value: "100%", label: "Free to use", icon: "✦" },
            { value: "Secure", label: "End-to-end safe", icon: "✦" },
            { value: "24/7", label: "Always available", icon: "✦" },
          ].map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
              {index < 2 && (
                <div className="hidden sm:block w-px h-10 bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* Floating medicine cards */}
        <div className="relative mt-8 flex items-center justify-center gap-4 flex-wrap">
          {[
            { name: "Paracetamol", dose: "500mg", time: "8:00 AM", taken: true },
            { name: "Vitamin D", dose: "1000IU", time: "12:00 PM", taken: false },
            { name: "Metformin", dose: "850mg", time: "8:00 PM", taken: false },
          ].map((med) => (
            <div
              key={med.name}
              className="flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-3 shadow-lg backdrop-blur-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  med.taken ? "bg-primary" : "bg-muted"
                }`}
              >
                <Pill
                  className={`w-4 h-4 ${
                    med.taken ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">
                  {med.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {med.dose} · {med.time}
                </p>
              </div>
              {med.taken && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                  Taken ✓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
