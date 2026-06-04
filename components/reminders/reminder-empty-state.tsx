import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Plus, Pill, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ReminderEmptyStateProps {
  onAdd: () => void;
  hasMedicines: boolean;
}

export default function ReminderEmptyState({
  onAdd,
  hasMedicines,
}: ReminderEmptyStateProps) {
  // if there is no medicine
  if (!hasMedicines) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Pill className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">No medicines found</p>
            <p className="text-sm text-muted-foreground mt-1">
              You need to add a medicine before creating a reminder
            </p>
          </div>
          <Link href="/dashboard/medicines">
            <Button className="gap-2">
              <ArrowRight className="w-4 h-4" />
              Go to Medicines
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // if there is medicine but no reminder
  return (
    <Card className="border-dashed border-2">
      <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Bell className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground">No reminders yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add your first reminder to get started
          </p>
        </div>
        <Button onClick={onAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Reminder
        </Button>
      </CardContent>
    </Card>
  );
}
