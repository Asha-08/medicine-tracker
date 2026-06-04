import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock } from "lucide-react";

import { TodayReminder } from "@/types/dashboard";

interface TodaysRemindersProps {
  reminders: TodayReminder[];
}

export default function TodaysReminders({ reminders }: TodaysRemindersProps) {
  if (reminders.length === 0) {
    return (
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Today's Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 space-y-2">
            <Bell className="w-8 h-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              No reminders for today
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          Today's Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`flex items-center justify-between p-3 rounded-xl ${
              reminder.isTaken
                ? "bg-green-500/5 border border-green-500/20"
                : reminder.isPending
                ? "bg-destructive/5 border border-destructive/20"
                : "bg-muted/50 border border-border"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  reminder.isTaken
                    ? "bg-green-500/10"
                    : reminder.isPending
                    ? "bg-destructive/10"
                    : "bg-primary/10"
                }`}
              >
                <Clock
                  className={`w-4 h-4 ${
                    reminder.isTaken
                      ? "text-green-500"
                      : reminder.isPending
                      ? "text-destructive"
                      : "text-primary"
                  }`}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {reminder.medicineName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {reminder.dosage} {reminder.unit} · {reminder.time}
                </p>
              </div>
            </div>
            <Badge
              className={
                reminder.isTaken
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : reminder.isPending
                  ? "bg-destructive/10 text-destructive border-destructive/20"
                  : "bg-primary/10 text-primary border-primary/20"
              }
            >
              {reminder.isTaken
                ? "Taken ✓"
                : reminder.isPending
                ? "Pending"
                : "Upcoming"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
