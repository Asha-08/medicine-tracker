import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pill, Plus } from "lucide-react";

interface EmptyStateProps {
  onAdd: () => void;
}

export default function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-2">
      <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Pill className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground">No medicines yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add your first medicine to get started
          </p>
        </div>
        <Button onClick={onAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Medicine
        </Button>
      </CardContent>
    </Card>
  );
}
