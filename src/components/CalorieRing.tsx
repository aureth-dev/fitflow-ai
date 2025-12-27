import { Progress } from "@/components/ui/progress";

interface CalorieRingProps {
  consumed: number;
  target: number;
  size?: "sm" | "md" | "lg";
}

export const CalorieRing = ({ consumed, target, size = "md" }: CalorieRingProps) => {
  const percentage = Math.min((consumed / target) * 100, 100);
  const remaining = Math.max(target - consumed, 0);
  const isOver = consumed > target;

  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-44 h-44",
    lg: "w-56 h-56",
  };

  const radius = size === "sm" ? 52 : size === "md" ? 72 : 92;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      {/* Background ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={size === "sm" ? 8 : 10}
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke={isOver ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
          strokeWidth={size === "sm" ? 8 : 10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700 ease-out"
          style={{
            filter: isOver ? "none" : "drop-shadow(0 0 8px hsl(84 81% 44% / 0.5))",
          }}
        />
      </svg>

      {/* Center content */}
      <div className="text-center z-10">
        <p className={`font-bold ${size === "sm" ? "text-2xl" : "text-3xl"} text-foreground`}>
          {remaining}
        </p>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
          {isOver ? "over" : "left"}
        </p>
      </div>
    </div>
  );
};
