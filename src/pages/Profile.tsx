import { 
  User, 
  Settings, 
  Trophy, 
  Target, 
  Calendar, 
  ChevronRight,
  Flame,
  Dumbbell,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BottomNav } from "@/components/BottomNav";

const achievements = [
  { name: "First Workout", icon: "🏋️", unlocked: true },
  { name: "7-Day Streak", icon: "🔥", unlocked: true },
  { name: "30-Day Streak", icon: "⚡", unlocked: false },
  { name: "1000 lb Club", icon: "🏆", unlocked: false },
];

const stats = [
  { label: "Total Workouts", value: "47" },
  { label: "This Month", value: "12" },
  { label: "Best Streak", value: "28 days" },
  { label: "Total Volume", value: "425k lbs" },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50 safe-area-pt">
        <div className="px-4 py-4 max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Profile Card */}
        <Card variant="glass" className="border-primary/30">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">Khushal</h2>
                <p className="text-sm text-muted-foreground">Member since Dec 2024</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                    <Flame className="w-4 h-4" />
                    12 day streak
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals Progress */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Weekly Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-foreground">Workouts</span>
                <span className="text-muted-foreground">4 / 5</span>
              </div>
              <Progress value={80} variant="lime" className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-foreground">Calories Goal</span>
                <span className="text-muted-foreground">5 / 7 days</span>
              </div>
              <Progress value={71} variant="lime" className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-foreground">Protein Target</span>
                <span className="text-muted-foreground">6 / 7 days</span>
              </div>
              <Progress value={86} variant="lime" className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <Card key={i} variant="glass">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Achievements
              </span>
              <Button variant="gym-ghost" size="sm" className="h-8">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {achievements.map((achievement, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 w-20 text-center ${
                    !achievement.unlocked ? "opacity-40" : ""
                  }`}
                >
                  <div
                    className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl ${
                      achievement.unlocked
                        ? "bg-primary/20 shadow-lime"
                        : "bg-muted"
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {achievement.name}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card variant="glass">
          <CardContent className="p-2">
            {[
              { icon: Calendar, label: "Workout History", action: () => {} },
              { icon: TrendingUp, label: "Progress Photos", action: () => {} },
              { icon: Target, label: "Edit Goals", action: () => {} },
              { icon: Settings, label: "Settings", action: () => {} },
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1 text-left font-medium text-foreground">
                  {item.label}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
