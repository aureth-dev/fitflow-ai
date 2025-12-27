import { Flame, Check } from "lucide-react";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  todayCheckedIn: boolean;
}

export const StreakDisplay = ({
  currentStreak,
  longestStreak,
  todayCheckedIn,
}: StreakDisplayProps) => {
  // Generate last 7 days
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1; // Convert Sunday=0 to Sunday=6

  // Mock streak data (last 7 days)
  const streakDays = Array.from({ length: 7 }, (_, i) => {
    if (i <= adjustedToday) {
      return i < adjustedToday ? true : todayCheckedIn;
    }
    return null; // Future days
  });

  return (
    <div className="space-y-4">
      {/* Main streak count */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Flame className="w-7 h-7 text-primary animate-pulse-lime" />
          </div>
          {currentStreak > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-lime">
              {currentStreak}
            </div>
          )}
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{currentStreak} days</p>
          <p className="text-sm text-muted-foreground">Current streak</p>
        </div>
      </div>

      {/* Week visualization */}
      <div className="flex items-center justify-between gap-1.5">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                streakDays[i] === true
                  ? "bg-primary text-primary-foreground shadow-lime"
                  : streakDays[i] === false
                  ? "bg-destructive/20 text-destructive"
                  : "bg-muted text-muted-foreground"
              } ${i === adjustedToday ? "ring-2 ring-primary/50" : ""}`}
            >
              {streakDays[i] === true ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-xs font-medium">{day}</span>
              )}
            </div>
            <span
              className={`text-[10px] ${
                i === adjustedToday ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
            >
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Best streak */}
      <div className="pt-2 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Best streak</span>
          <span className="font-semibold text-foreground">{longestStreak} days</span>
        </div>
      </div>
    </div>
  );
};
