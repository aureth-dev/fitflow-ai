-- Create foods table for storing food items with nutritional info
CREATE TABLE public.foods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  serving_size TEXT NOT NULL DEFAULT '100g',
  calories INTEGER NOT NULL DEFAULT 0,
  protein DECIMAL(8,2) NOT NULL DEFAULT 0,
  carbs DECIMAL(8,2) NOT NULL DEFAULT 0,
  fat DECIMAL(8,2) NOT NULL DEFAULT 0,
  fiber DECIMAL(8,2) DEFAULT 0,
  sugar DECIMAL(8,2) DEFAULT 0,
  sodium INTEGER DEFAULT 0,
  is_custom BOOLEAN NOT NULL DEFAULT false,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster text search
CREATE INDEX idx_foods_name_search ON public.foods USING gin(to_tsvector('english', name));
CREATE INDEX idx_foods_user_id ON public.foods(user_id);

-- Enable Row Level Security
ALTER TABLE public.foods ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view non-custom foods (public database)
CREATE POLICY "Anyone can view public foods" 
ON public.foods 
FOR SELECT 
USING (is_custom = false);

-- Policy: Authenticated users can view their own custom foods
CREATE POLICY "Users can view their own custom foods" 
ON public.foods 
FOR SELECT 
USING (auth.uid() = user_id AND is_custom = true);

-- Policy: Authenticated users can create custom foods
CREATE POLICY "Users can create custom foods" 
ON public.foods 
FOR INSERT 
WITH CHECK (auth.uid() = user_id AND is_custom = true);

-- Policy: Users can update their own custom foods
CREATE POLICY "Users can update their own custom foods" 
ON public.foods 
FOR UPDATE 
USING (auth.uid() = user_id AND is_custom = true);

-- Policy: Users can delete their own custom foods
CREATE POLICY "Users can delete their own custom foods" 
ON public.foods 
FOR DELETE 
USING (auth.uid() = user_id AND is_custom = true);

-- Seed with common foods (public database)
INSERT INTO public.foods (name, brand, serving_size, calories, protein, carbs, fat, fiber, is_custom) VALUES
('Chicken Breast (Grilled)', NULL, '100g', 165, 31, 0, 3.6, 0, false),
('Brown Rice (Cooked)', NULL, '100g', 123, 2.7, 25.6, 1, 1.6, false),
('Broccoli (Steamed)', NULL, '100g', 35, 2.4, 7.2, 0.4, 3.3, false),
('Eggs (Large, Whole)', NULL, '1 egg (50g)', 72, 6.3, 0.4, 4.8, 0, false),
('Oatmeal (Cooked)', NULL, '100g', 71, 2.5, 12, 1.5, 1.7, false),
('Salmon (Baked)', NULL, '100g', 208, 20.4, 0, 13.4, 0, false),
('Sweet Potato (Baked)', NULL, '100g', 90, 2, 21, 0.1, 3.3, false),
('Greek Yogurt (Plain, Nonfat)', NULL, '100g', 59, 10.2, 3.6, 0.7, 0, false),
('Banana', NULL, '1 medium (118g)', 105, 1.3, 27, 0.4, 3.1, false),
('Apple', NULL, '1 medium (182g)', 95, 0.5, 25, 0.3, 4.4, false),
('Almonds (Raw)', NULL, '28g (1 oz)', 164, 6, 6, 14, 3.5, false),
('Avocado', NULL, '100g', 160, 2, 9, 15, 7, false),
('Spinach (Raw)', NULL, '100g', 23, 2.9, 3.6, 0.4, 2.2, false),
('Ground Beef (90% Lean)', NULL, '100g', 176, 20, 0, 10, 0, false),
('Whole Wheat Bread', NULL, '1 slice (43g)', 81, 4, 14, 1.1, 1.9, false),
('Cottage Cheese (Low Fat)', NULL, '100g', 72, 12.4, 2.7, 1, 0, false),
('Tuna (Canned in Water)', NULL, '100g', 116, 25.5, 0, 0.8, 0, false),
('Black Beans (Cooked)', NULL, '100g', 132, 8.9, 24, 0.5, 8.7, false),
('Peanut Butter', NULL, '2 tbsp (32g)', 188, 8, 6, 16, 2, false),
('Quinoa (Cooked)', NULL, '100g', 120, 4.4, 21.3, 1.9, 2.8, false),
('White Rice (Cooked)', NULL, '100g', 130, 2.7, 28, 0.3, 0.4, false),
('Pasta (Cooked)', NULL, '100g', 131, 5, 25, 1.1, 1.8, false),
('Milk (Whole)', NULL, '240ml', 149, 8, 12, 8, 0, false),
('Milk (Skim)', NULL, '240ml', 83, 8, 12, 0.2, 0, false),
('Whey Protein Powder', 'Generic', '1 scoop (30g)', 120, 24, 3, 1, 0, false),
('Orange', NULL, '1 medium (131g)', 62, 1.2, 15, 0.2, 3.1, false),
('Strawberries', NULL, '100g', 32, 0.7, 7.7, 0.3, 2, false),
('Blueberries', NULL, '100g', 57, 0.7, 14, 0.3, 2.4, false),
('Honey', NULL, '1 tbsp (21g)', 64, 0.1, 17, 0, 0, false),
('Olive Oil', NULL, '1 tbsp (14ml)', 119, 0, 0, 13.5, 0, false);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_foods_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_foods_updated_at
  BEFORE UPDATE ON public.foods
  FOR EACH ROW
  EXECUTE FUNCTION public.update_foods_updated_at();