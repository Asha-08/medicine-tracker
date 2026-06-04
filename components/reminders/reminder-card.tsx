import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Pencil, Trash2, Check, Clock } from "lucide-react";
import { Reminder, ReminderTime } from "@/types/reminder";

interface ReminderCardProps {
  reminder: Reminder;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: number) => void;
  onToggleTaken: (timeId: number, isTaken: boolean) => void;
}

function getTimeBadge(time: string, isTaken: boolean) {
  if (isTaken) {
    return {
      label: "Taken ✓",
      className: "bg-green-500/10 text-green-500 border-green-500/20",
    };
  }

  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  const reminderTime = new Date();
  reminderTime.setHours(hours, minutes, 0, 0);

  if (now > reminderTime) {
    return {
      label: "Pending",
      className: "bg-destructive/10 text-destructive border-destructive/20",
    };
  }

  return {
    label: "Upcoming",
    className: "bg-primary/10 text-primary border-primary/20",
  };
}

export default function ReminderCard({
  reminder,
  onEdit,
  onDelete,
  onToggleTaken,
}: ReminderCardProps) {
  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-4">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {reminder.medicine.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {reminder.medicine.dosage} {reminder.medicine.unit}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {reminder.frequency}
          </Badge>
        </div>

        {/* Time Slots */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Time Slots
          </p>
          {reminder.times.map((slot: ReminderTime) => {
            const badge = getTimeBadge(slot.time, slot.isTaken);
            return (
              <div
                key={slot.id}
                className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2"
              >
                <span className="text-sm font-medium text-foreground">
                  {slot.time}
                </span>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${badge.className}`}>
                    {badge.label}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 w-7 p-0 ${
                      slot.isTaken
                        ? "text-green-500 hover:text-muted-foreground"
                        : "text-muted-foreground hover:text-green-500"
                    }`}
                    onClick={() => onToggleTaken(slot.id, slot.isTaken)}
                  >
                    <Check className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1"
            onClick={() => onEdit(reminder)}
          >
            <Pencil className="w-3 h-3" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1 hover:text-destructive hover:border-destructive"
            onClick={() => onDelete(reminder.id)}
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}