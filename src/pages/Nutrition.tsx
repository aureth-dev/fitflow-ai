import { useState } from "react";
import { Plus, Search, ChevronRight, Apple, Coffee, Sandwich, Pizza } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CalorieRing } from "@/components/CalorieRing";
import { BottomNav } from "@/components/BottomNav";

const meals = [
  {
    name: "Breakfast",
    icon: Coffee,
    time: "7:30 AM",
    calories: 420,
    items: ["Oatmeal with berries", "2 eggs scrambled"],
  },
  {
    name: "Lunch",
    icon: Sandwich,
    time: "12:30 PM",
    calories: 650,
    items: ["Grilled chicken salad", "Whole grain bread"],
  },
  {
    name: "Snack",
    icon: Apple,
    time: "3:00 PM",
    calories: 180,
    items: ["Greek yogurt", "Almonds"],
  },
];

const macros = {
  protein: { current: 145, target: 180 },
  carbs: { current: 180, target: 250 },
  fat: { current: 55, target: 70 },
};

const Nutrition = () => {
  const caloriesConsumed = 1650;
  const caloriesTarget = 2200;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50 safe-area-pt">
        <div className="px-4 py-4 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Nutrition</h1>
          <p className="text-sm text-muted-foreground">Track your fuel</p>
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Calorie Overview */}
        <Card variant="glass">
          <CardContent className="p-5">
            <div className="flex items-center gap-6">
              <CalorieRing consumed={caloriesConsumed} target={caloriesTarget} size="sm" />
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Consumed</span>
                    <span className="font-semibold text-foreground">{caloriesConsumed}</span>
                  </div>
                  <Progress value={(caloriesConsumed / caloriesTarget) * 100} variant="lime" />
                </div>
                <div className="flex items-center justify-between text-sm pt-1 border-t border-border/50">
                  <span className="text-muted-foreground">Target</span>
                  <span className="font-medium text-foreground">{caloriesTarget} kcal</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Macros */}
        <Card variant="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Macros</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            {Object.entries(macros).map(([name, { current, target }]) => (
              <div key={name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="capitalize text-foreground font-medium">{name}</span>
                  <span className="text-muted-foreground">
                    {current}g / {target}g
                  </span>
                </div>
                <Progress 
                  value={(current / target) * 100} 
                  variant={current >= target ? "success" : "default"} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Meals */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Today's Meals</h2>
            <Button variant="gym-ghost" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Meal
            </Button>
          </div>

          <div className="space-y-3">
            {meals.map((meal, i) => (
              <Card key={i} variant="glass" className="hover:border-primary/30 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <meal.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{meal.name}</h3>
                        <span className="text-sm font-bold text-primary">{meal.calories} kcal</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{meal.time}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {meal.items.join(" · ")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add dinner placeholder */}
            <Card
              variant="glass"
              className="border-dashed hover:border-primary/50 transition-all cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Pizza className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Dinner</p>
                    <p className="text-sm">Tap to add</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* FAB */}
      <Button
        variant="fab"
        size="icon-xl"
        className="fixed bottom-24 right-4 z-50 animate-glow"
      >
        <Plus className="w-7 h-7" />
      </Button>

      <BottomNav />
    </div>
  );
};

export default Nutrition;
