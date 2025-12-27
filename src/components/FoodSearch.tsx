import { useState } from "react";
import { Search, X, Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

interface FoodSearchProps {
  onSelectFood: (food: Food) => void;
  onCreateCustom: () => void;
}

export const FoodSearch = ({ onSelectFood, onCreateCustom }: FoodSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const searchFoods = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase
        .from("foods")
        .select("id, name, brand, serving_size, calories, protein, carbs, fat, is_custom")
        .ilike("name", `%${searchQuery}%`)
        .order("name")
        .limit(20);

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "Unable to search foods. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      searchFoods(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search foods..."
          value={query}
          onChange={handleInputChange}
          className="pl-12 pr-12 h-14 text-base"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

      {/* Results */}
      {!isLoading && results.length > 0 && (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {results.map((food) => (
            <Card
              key={food.id}
              variant="glass"
              className="cursor-pointer hover:border-primary/30 transition-all"
              onClick={() => onSelectFood(food)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{food.name}</h4>
                      {food.is_custom && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
                          Custom
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {food.serving_size}
                      {food.brand && ` · ${food.brand}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{food.calories}</p>
                    <p className="text-xs text-muted-foreground">kcal</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span>P: {Number(food.protein).toFixed(0)}g</span>
                  <span>C: {Number(food.carbs).toFixed(0)}g</span>
                  <span>F: {Number(food.fat).toFixed(0)}g</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && hasSearched && results.length === 0 && query && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No foods found for "{query}"</p>
          <Button variant="gym-outline" onClick={onCreateCustom}>
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Food
          </Button>
        </div>
      )}

      {/* Create Custom Button (always visible when has results) */}
      {!isLoading && results.length > 0 && (
        <Button
          variant="gym-ghost"
          className="w-full"
          onClick={onCreateCustom}
        >
          <Plus className="w-4 h-4 mr-2" />
          Can't find it? Create custom food
        </Button>
      )}
    </div>
  );
};
