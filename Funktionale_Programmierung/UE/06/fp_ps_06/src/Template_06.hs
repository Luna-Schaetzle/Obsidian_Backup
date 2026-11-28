module Template_06 (Polynom (..), normalize, veggies, candies, Product, shoppingCosts, flexibleAppend) where

-- IMPORTANT -----------------------------
doNotModify anything above this line = True

{- Exercise 1 -}

data Brand = Store | Named -- Platzhalter-Konstruktor
  deriving (Show)

data Vegetable = (Corn n) | (Mushroom n) | (Tomato n) -- Platzhalter-Konstruktor
  deriving (Show)

data Size = TodoSize -- Platzhalter-Konstruktor
  deriving (Show)

data CandyBar = TodoCandyBar -- Platzhalter-Konstruktor
  deriving (Show)

type ShoppingList a = [(a, Integer)] -- Produkt und Anzahl

veggies :: ShoppingList Vegetable
-- Verwenden Sie diese Beispielliste, sobald Sie die Datentypen definiert haben
veggies = undefined -- [(Corn Store, 2), (Corn Named, 3), (Mushroom Named, 1), (Tomato, 5)]

candies :: ShoppingList CandyBar
-- Verwenden Sie diese Beispielliste, sobald Sie die Datentypen definiert haben
candies = undefined -- [(Duplo Tenpack, 1), (Twix Single, 5), (Balisto, 2)]

class Product a where
  getCost :: a -> Double

instance Product Vegetable where
  getCost _ = undefined

instance Product CandyBar where
  getCost _ = undefined

shoppingCosts :: (Product a) => ShoppingList a -> Double
shoppingCosts _ = undefined

flexibleAppend :: ShoppingList a -> ShoppingList b -> ShoppingList (Either a b)
flexibleAppend _ _ = undefined

{- Exercise 2 -}
data Polynom = Polynom [Int]

normalize :: Polynom -> Polynom
normalize = undefined

instance Show Polynom where
  show = undefined

allZero :: [Int] -> Bool
allZero [] = True
allZero (x : xs)
  | x == 0 = allZero xs
  | otherwise = False

instance Eq Polynom where
  (==) = undefined

instance Ord Polynom where
  compare = undefined

instance Num Polynom where
  (+) = undefined
  (*) = undefined
  negate = undefined
  fromInteger = undefined
  abs = undefined
  signum = undefined