import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pill } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary -z-10" />
      <div className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />

      {/* Blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto text-center space-y-8 relative">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm">
          <Pill className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Take Control
            <br />
            of Your Health?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            Join MedTracker today. Set up your medicines, reminders, and stock
            tracking in minutes — completely free.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button
              size="lg"
              className="w-full sm:w-auto px-10 h-12 text-base font-semibold rounded-full bg-white text-primary hover:bg-white/90 shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Create Free Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/signin">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-10 h-12 text-base rounded-full border-white/30 text-black hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              Already have an account?
            </Button>
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
          {[
            "✦ 100% Free",
            "✦ No credit card",
            "✦ Secure & Private",
          ].map((badge) => (
            <span key={badge} className="text-sm text-white/60 font-medium">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
