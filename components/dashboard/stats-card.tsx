import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color?: "default" | "warning" | "danger" | "success";
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "default",
}: StatsCardProps) {
  const colorMap = {
    default: "bg-primary/10 text-primary",
    warning: "bg-yellow-500/10 text-yellow-500",
    danger: "bg-destructive/10 text-destructive",
    success: "bg-green-500/10 text-green-500",
  };

  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[color]}`}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
