import { useState } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodSearch } from "@/components/FoodSearch";
import { CreateFoodModal } from "@/components/CreateFoodModal";

interface Food {
  id: string;
  name: string;
  brand: string | null;
  serving_size: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  is_custom: boolean;
}

interface FoodSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFood: (food: Food, servings: number) => void;
}

export const FoodSearchModal = ({ isOpen, onClose, onSelectFood }: FoodSearchModalProps) => {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [servings, setServings] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleFoodSelect = (food: Food) => {
    setSelectedFood(food);
    setServings(1);
  };

  const handleConfirm = () => {
    if (selectedFood) {
      onSelectFood(selectedFood, servings);
      setSelectedFood(null);
      setServings(1);
      onClose();
    }
  };

  const handleBack = () => {
    setSelectedFood(null);
    setServings(1);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <Card
          variant="elevated"
          className="relative z-10 w-full max-w-md mx-4 mb-4 sm:mb-0 animate-slide-up border-border/50 max-h-[85vh] overflow-hidden flex flex-col"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              {selectedFood ? "Confirm Food" : "Search Foods"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="overflow-y-auto flex-1">
            {!selectedFood ? (
              <FoodSearch
                onSelectFood={handleFoodSelect}
                onCreateCustom={() => setShowCreateModal(true)}
              />
            ) : (
              <div className="space-y-4">
                {/* Selected Food Display */}
                <Card variant="glass" className="border-primary/30">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground">{selectedFood.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedFood.serving_size}
                      {selectedFood.brand && ` · ${selectedFood.brand}`}
                    </p>
                  </CardContent>
                </Card>

                {/* Servings Selector */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Number of servings</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setServings(Math.max(0.25, servings - 0.25))}
                    >
                      -
                    </Button>
                    <span className="flex-1 text-center text-2xl font-bold">{servings}</span>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setServings(servings + 0.25)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Calculated Nutrition */}
                <div className="p-4 rounded-xl bg-secondary/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Calories</span>
                    <span className="text-xl font-bold text-primary">
                      {Math.round(selectedFood.calories * servings)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
                    <div className="text-center">
                      <p className="font-semibold text-foreground">
                        {(Number(selectedFood.protein) * servings).toFixed(1)}g
                      </p>
                      <p className="text-xs text-muted-foreground">Protein</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground">
                        {(Number(selectedFood.carbs) * servings).toFixed(1)}g
                      </p>
                      <p className="text-xs text-muted-foreground">Carbs</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground">
                        {(Number(selectedFood.fat) * servings).toFixed(1)}g
                      </p>
                      <p className="text-xs text-muted-foreground">Fat</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleBack}>
                    Back
                  </Button>
                  <Button variant="gym" className="flex-1" onClick={handleConfirm}>
                    Add Food
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Custom Food Modal */}
      <CreateFoodModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={() => {
          setShowCreateModal(false);
        }}
      />
    </>
  );
};
