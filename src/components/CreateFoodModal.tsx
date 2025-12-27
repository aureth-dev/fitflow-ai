import { useState } from "react";
import { X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CreateFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const CreateFoodModal = ({ isOpen, onClose, onCreated }: CreateFoodModalProps) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [servingSize, setServingSize] = useState("100g");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setName("");
    setBrand("");
    setServingSize("100g");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a food name.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Sign in required",
          description: "Please sign in to create custom foods.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.from("foods").insert({
        name: name.trim(),
        brand: brand.trim() || null,
        serving_size: servingSize.trim() || "100g",
        calories: parseInt(calories) || 0,
        protein: parseFloat(protein) || 0,
        carbs: parseFloat(carbs) || 0,
        fat: parseFloat(fat) || 0,
        is_custom: true,
        user_id: user.id,
      });

      if (error) throw error;

      toast({
        title: "Food created",
        description: `${name} has been added to your custom foods.`,
      });

      resetForm();
      onCreated();
      onClose();
    } catch (error: any) {
      console.error("Create food error:", error);
      toast({
        title: "Failed to create food",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
        className="relative z-10 w-full max-w-md mx-4 mb-4 sm:mb-0 animate-slide-up border-border/50 max-h-[90vh] overflow-y-auto"
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Create Custom Food</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Food Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Homemade Protein Bar"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <Label htmlFor="brand">Brand (optional)</Label>
            <Input
              id="brand"
              placeholder="e.g., My Kitchen"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          {/* Serving Size */}
          <div className="space-y-2">
            <Label htmlFor="serving">Serving Size</Label>
            <Input
              id="serving"
              placeholder="e.g., 100g, 1 bar, 1 cup"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
            />
          </div>

          {/* Nutrition Grid */}
          <div className="pt-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
              Nutrition per serving
            </Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="space-y-1">
                <Label htmlFor="calories" className="text-sm">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="0"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="text-center"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="protein" className="text-sm">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="text-center"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="carbs" className="text-sm">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="text-center"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fat" className="text-sm">Fat (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  className="text-center"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button
            variant="gym"
            size="lg"
            className="w-full mt-4"
            onClick={handleSave}
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Food
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Sign in required to save custom foods
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
