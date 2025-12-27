import { useState } from "react";
import { Plus, Search, ChevronRight, Coffee, Sandwich, Pizza, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalorieRing } from "@/components/CalorieRing";
import { BottomNav } from "@/components/BottomNav";
import { FoodSearchModal } from "@/components/FoodSearchModal";
import { useToast } from "@/hooks/use-toast";

interface MealEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servings: number;
}

interface Meal {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  time: string;
  entries: MealEntry[];
}

const Nutrition = () => {
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [activeMealIndex, setActiveMealIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const [meals, setMeals] = useState<Meal[]>([
    {
      name: "Breakfast",
      icon: Coffee,
      time: "7:30 AM",
      entries: [
        { id: "1", name: "Oatmeal", calories: 71, protein: 2.5, carbs: 12, fat: 1.5, servings: 2 },
        { id: "2", name: "Eggs", calories: 144, protein: 12.6, carbs: 0.8, fat: 9.6, servings: 2 },
      ],
    },
    {
      name: "Lunch",
      icon: Sandwich,
      time: "12:30 PM",
      entries: [
        { id: "3", name: "Chicken Breast", calories: 330, protein: 62, carbs: 0, fat: 7.2, servings: 2 },
        { id: "4", name: "Brown Rice", calories: 246, protein: 5.4, carbs: 51.2, fat: 2, servings: 2 },
      ],
    },
    {
      name: "Snack",
      icon: Apple,
      time: "3:00 PM",
      entries: [
        { id: "5", name: "Greek Yogurt", calories: 59, protein: 10.2, carbs: 3.6, fat: 0.7, servings: 1 },
        { id: "6", name: "Almonds", calories: 164, protein: 6, carbs: 6, fat: 14, servings: 1 },
      ],
    },
    {
      name: "Dinner",
      icon: Pizza,
      time: "7:00 PM",
      entries: [],
    },
  ]);

  // Calculate totals
  const totals = meals.reduce(
    (acc, meal) => {
      meal.entries.forEach((entry) => {
        acc.calories += entry.calories;
        acc.protein += entry.protein;
        acc.carbs += entry.carbs;
        acc.fat += entry.fat;
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const caloriesTarget = 2200;
  const macros = {
    protein: { current: Math.round(totals.protein), target: 180 },
    carbs: { current: Math.round(totals.carbs), target: 250 },
    fat: { current: Math.round(totals.fat), target: 70 },
  };

  const handleAddToMeal = (mealIndex: number) => {
    setActiveMealIndex(mealIndex);
    setShowFoodSearch(true);
  };

  const handleFoodSelect = (
    food: { id: string; name: string; calories: number; protein: number; carbs: number; fat: number },
    servings: number
  ) => {
    if (activeMealIndex === null) return;

    const newEntry: MealEntry = {
      id: `${Date.now()}`,
      name: food.name,
      calories: Math.round(food.calories * servings),
      protein: Number(food.protein) * servings,
      carbs: Number(food.carbs) * servings,
      fat: Number(food.fat) * servings,
      servings,
    };

    setMeals((prev) =>
      prev.map((meal, i) =>
        i === activeMealIndex
          ? { ...meal, entries: [...meal.entries, newEntry] }
          : meal
      )
    );

    toast({
      title: "Food added",
      description: `${food.name} added to ${meals[activeMealIndex].name}`,
    });

    setActiveMealIndex(null);
  };

  const getMealCalories = (meal: Meal) => {
    return meal.entries.reduce((sum, entry) => sum + entry.calories, 0);
  };

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
              <CalorieRing consumed={Math.round(totals.calories)} target={caloriesTarget} size="sm" />
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Consumed</span>
                    <span className="font-semibold text-foreground">{Math.round(totals.calories)}</span>
                  </div>
                  <Progress value={(totals.calories / caloriesTarget) * 100} variant="lime" />
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
          </div>

          <div className="space-y-3">
            {meals.map((meal, index) => (
              <Card
                key={meal.name}
                variant="glass"
                className={`transition-all ${
                  meal.entries.length === 0 ? "border-dashed" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <meal.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{meal.name}</h3>
                          <p className="text-xs text-muted-foreground">{meal.time}</p>
                        </div>
                        {meal.entries.length > 0 && (
                          <span className="text-sm font-bold text-primary">
                            {getMealCalories(meal)} kcal
                          </span>
                        )}
                      </div>

                      {/* Entries */}
                      {meal.entries.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                          {meal.entries.map((entry) => (
                            <div
                              key={entry.id}
                              className="flex items-center justify-between text-sm py-1 border-b border-border/30 last:border-0"
                            >
                              <span className="text-muted-foreground truncate flex-1">
                                {entry.name}
                              </span>
                              <span className="text-foreground font-medium ml-2">
                                {entry.calories} kcal
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Food Button */}
                      <Button
                        variant="gym-ghost"
                        size="sm"
                        className="mt-3 h-8"
                        onClick={() => handleAddToMeal(index)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Food
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* FAB - Search Foods */}
      <Button
        variant="fab"
        size="icon-xl"
        className="fixed bottom-24 right-4 z-50 animate-glow"
        onClick={() => {
          setActiveMealIndex(3); // Default to dinner
          setShowFoodSearch(true);
        }}
      >
        <Search className="w-6 h-6" />
      </Button>

      {/* Food Search Modal */}
      <FoodSearchModal
        isOpen={showFoodSearch}
        onClose={() => {
          setShowFoodSearch(false);
          setActiveMealIndex(null);
        }}
        onSelectFood={handleFoodSelect}
      />

      <BottomNav />
    </div>
  );
};

export default Nutrition;
