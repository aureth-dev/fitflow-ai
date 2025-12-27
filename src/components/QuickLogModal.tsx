import { useState } from "react";
import { X, Plus, Minus, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface QuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exercise: { name: string; sets: number; reps: number; weight: number }) => void;
}

export const QuickLogModal = ({ isOpen, onClose, onSave }: QuickLogModalProps) => {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(0);

  const presetExercises = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Pull-ups",
    "Shoulder Press",
    "Rows",
  ];

  const handleSave = () => {
    if (!exercise) return;
    onSave({ name: exercise, sets, reps, weight });
    setExercise("");
    setSets(3);
    setReps(10);
    setWeight(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <Card
        variant="elevated"
        className="relative z-10 w-full max-w-md mx-4 mb-4 sm:mb-0 animate-slide-up border-border/50"
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-primary" />
            Quick Log
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Exercise name */}
          <div>
            <Input
              placeholder="Exercise name"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="h-12 text-base bg-secondary border-0 focus:ring-2 focus:ring-primary"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {presetExercises.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setExercise(preset)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    exercise === preset
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Sets, Reps, Weight */}
          <div className="grid grid-cols-3 gap-3">
            {/* Sets */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground uppercase tracking-wider">
                Sets
              </label>
              <div className="flex items-center gap-1">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setSets(Math.max(1, sets - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="flex-1 text-center text-xl font-bold">{sets}</span>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setSets(sets + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Reps */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground uppercase tracking-wider">
                Reps
              </label>
              <div className="flex items-center gap-1">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setReps(Math.max(1, reps - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="flex-1 text-center text-xl font-bold">{reps}</span>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setReps(reps + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground uppercase tracking-wider">
                lbs
              </label>
              <Input
                type="number"
                value={weight || ""}
                onChange={(e) => setWeight(Number(e.target.value))}
                placeholder="0"
                className="h-10 text-center text-xl font-bold bg-secondary border-0"
              />
            </div>
          </div>

          {/* Save button */}
          <Button
            variant="gym"
            size="lg"
            className="w-full mt-4"
            onClick={handleSave}
            disabled={!exercise}
          >
            Log Exercise
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
