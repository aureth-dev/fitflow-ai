import { useState } from "react";
import { 
  Play, 
  Plus, 
  Dumbbell, 
  Clock, 
  TrendingUp,
  ChevronRight,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { QuickLogModal } from "@/components/QuickLogModal";

const workoutTemplates = [
  { name: "Push Day", exercises: 6, duration: "45 min", icon: "🏋️" },
  { name: "Pull Day", exercises: 5, duration: "40 min", icon: "💪" },
  { name: "Leg Day", exercises: 7, duration: "50 min", icon: "🦵" },
  { name: "Full Body", exercises: 8, duration: "55 min", icon: "🔥" },
];

const recentWorkouts = [
  { name: "Push Day", date: "Yesterday", duration: "42 min", volume: "12,450 lbs" },
  { name: "Leg Day", date: "2 days ago", duration: "48 min", volume: "18,200 lbs" },
];

const Workout = () => {
  const [showQuickLog, setShowQuickLog] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50 safe-area-pt">
        <div className="px-4 py-4 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Workout</h1>
          <p className="text-sm text-muted-foreground">Build your strength</p>
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Quick Start */}
        <Card variant="glass" className="border-primary/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <CardContent className="p-5 relative">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Start Empty Workout</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Log exercises as you go
                </p>
              </div>
              <Button variant="gym" size="icon-lg" onClick={() => setShowQuickLog(true)}>
                <Play className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workout Templates */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Templates</h2>
            <Button variant="gym-ghost" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {workoutTemplates.map((template, i) => (
              <Card
                key={i}
                variant="glass"
                className="cursor-pointer hover:border-primary/30 transition-all group"
              >
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">{template.icon}</div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {template.exercises} exercises · {template.duration}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Workouts */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span>Recent Workouts</span>
              <Button variant="gym-ghost" size="sm" className="h-8">
                History
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {recentWorkouts.map((workout, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{workout.name}</p>
                    <p className="text-sm text-muted-foreground">{workout.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{workout.volume}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {workout.duration}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Stats */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base">This Week</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-xl bg-secondary/50">
                <Dumbbell className="w-5 h-5 mx-auto text-primary mb-2" />
                <p className="text-xl font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Workouts</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/50">
                <Clock className="w-5 h-5 mx-auto text-primary mb-2" />
                <p className="text-xl font-bold text-foreground">3.2h</p>
                <p className="text-xs text-muted-foreground">Time</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/50">
                <TrendingUp className="w-5 h-5 mx-auto text-primary mb-2" />
                <p className="text-xl font-bold text-foreground">52k</p>
                <p className="text-xs text-muted-foreground">Volume</p>
              </div>
            </div>
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

      <QuickLogModal
        isOpen={showQuickLog}
        onClose={() => setShowQuickLog(false)}
        onSave={() => {}}
      />

      <BottomNav />
    </div>
  );
};

export default Workout;
