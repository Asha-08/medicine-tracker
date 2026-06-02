import Link from "next/link";
import { Pill } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Pill className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">
                MedTracker
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your personal medicine companion. Track your medicines, manage
              stock, and never miss a dose.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "#features", label: "Features" },
                { href: "#about", label: "About" },
                { href: "/signup", label: "Get Started" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Account</h3>
            <ul className="space-y-2">
              {[
                { href: "/signin", label: "Sign In" },
                { href: "/signup", label: "Sign Up" },
                { href: "/dashboard", label: "Dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MedTracker. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for better health
          </p>
        </div>
      </div>
    </footer>
  );
}
