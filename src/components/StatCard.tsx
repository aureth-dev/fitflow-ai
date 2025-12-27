import { useState } from "react";
import { Flame, Dumbbell, Utensils, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
  accentColor?: boolean;
}

export const StatCard = ({
  icon,
  label,
  value,
  subValue,
  trend,
  accentColor = false,
}: StatCardProps) => {
  return (
    <Card variant="glass" className="group hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div
            className={`p-2.5 rounded-xl ${
              accentColor ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            }`}
          >
            {icon}
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                trend === "up"
                  ? "text-primary"
                  : trend === "down"
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              <TrendingUp
                className={`w-3 h-3 ${trend === "down" ? "rotate-180" : ""}`}
              />
              <span>{trend === "up" ? "+5%" : trend === "down" ? "-3%" : "0%"}</span>
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
          {subValue && (
            <p className="text-xs text-muted-foreground/70 mt-1">{subValue}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
