import { useState } from "react";
import { Plus, Dumbbell, Flame, Utensils, Target, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/StatCard";
import { CalorieRing } from "@/components/CalorieRing";
import { StreakDisplay } from "@/components/StreakDisplay";
import { QuickLogModal } from "@/components/QuickLogModal";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [exercises, setExercises] = useState<
    { name: string; sets: number; reps: number; weight: number }[]
  >([]);

  // Mock data
  const caloriesConsumed = 1650;
  const caloriesTarget = 2200;
  const currentStreak = 12;
  const longestStreak = 28;
  const todayCheckedIn = true;
  const workoutsThisWeek = 4;
  const workoutsGoal = 5;

  const handleSaveExercise = (exercise: {
    name: string;
    sets: number;
    reps: number;
    weight: number;
  }) => {
    setExercises([...exercises, exercise]);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50 safe-area-pt">
        <div className="px-4 py-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Fit<span className="text-primary">Verse</span>
              </h1>
              <p className="text-sm text-muted-foreground">Friday, Dec 27</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                {currentStreak}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Daily Check-in Status */}
        <Card variant="glass" className="border-primary/30">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Daily Check-in</p>
                <p className="text-sm text-primary">Completed</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Dumbbell className="w-5 h-5" />}
            label="Workouts"
            value={`${workoutsThisWeek}/${workoutsGoal}`}
            subValue="This week"
            trend="up"
            accentColor
          />
          <StatCard
            icon={<Utensils className="w-5 h-5" />}
            label="Calories"
            value={caloriesConsumed}
            subValue={`/ ${caloriesTarget} target`}
            trend="neutral"
          />
        </div>

        {/* Calorie Ring Section */}
        <Card variant="glass">
          <CardHeader className="pb-0">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Today's Nutrition</span>
              <Button variant="gym-ghost" size="sm" className="h-8">
                Add Meal
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-6">
            <CalorieRing consumed={caloriesConsumed} target={caloriesTarget} size="md" />
          </CardContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-foreground">145g</p>
                <p className="text-xs text-muted-foreground">Protein</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">180g</p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">55g</p>
                <p className="text-xs text-muted-foreground">Fat</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak Section */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base">Weekly Streak</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <StreakDisplay
              currentStreak={currentStreak}
              longestStreak={longestStreak}
              todayCheckedIn={todayCheckedIn}
            />
          </CardContent>
        </Card>

        {/* Recent Workouts */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>Today's Workout</span>
              <Button variant="gym-ghost" size="sm" className="h-8">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {exercises.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Dumbbell className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No exercises logged yet</p>
                <p className="text-xs">Tap + to add your first exercise</p>
              </div>
            ) : (
              exercises.map((ex, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{ex.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {ex.sets} sets × {ex.reps} reps
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{ex.weight}</p>
                    <p className="text-xs text-muted-foreground">lbs</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </main>

      {/* FAB */}
      <Button
        variant="fab"
        size="icon-xl"
        className="fixed bottom-24 right-4 z-50 animate-glow"
        onClick={() => setShowQuickLog(true)}
      >
        <Plus className="w-7 h-7" />
      </Button>

      {/* Quick Log Modal */}
      <QuickLogModal
        isOpen={showQuickLog}
        onClose={() => setShowQuickLog(false)}
        onSave={handleSaveExercise}
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;
