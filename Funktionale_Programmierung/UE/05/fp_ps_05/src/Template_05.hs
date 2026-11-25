module Template_05 (factorial, factorialList, eulerList, eulerConvergence, Fraction, ggT, normalize, addFrac, divFrac, eulerFrac) where

important = "Keine Änderungen oberhalb dieser Zeile sind erlaubt!"


-- Aufgabe 1
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n-1)


euler :: Integer -> Double
euler 0 = 1
euler n = 1 / fromIntegral (factorial n) + euler (n-1)

factorialListNaive :: Integer -> [Integer]
factorialListNaive n
  | n == 0 = [1]
  | otherwise = factorial n : factorialListNaive (n-1)

factorialList :: Integer -> [Integer]
factorialList n = reverse (scanl (*) 1 [1..n])

eulerList :: Integer -> Double
eulerList n = eulerListAux (factorialList n)
  where
    eulerListAux []     = 0
    eulerListAux (f:fs) = 1 / fromIntegral f + eulerListAux fs

eulerConvergence :: [Double]
eulerConvergence = map eulerList [0 .. 15]

-----------------------------------------------------------------
-- Aufgabe 2) Exaktes Rechnen mit Brüchen

-- 2.1
type Fraction = (Integer, Integer)

ggT :: Integer -> Integer -> Integer
ggT a 0 = abs a
ggT a b = ggT b (a `mod` b)

-- 2.2
normalize :: Fraction -> Maybe Fraction
normalize (a, b)
  | b == 0    = Nothing
  | otherwise = Just ((s * a) `div` g, (s * b) `div` g)
  where
    g = ggT a b
    s = signum b

-- 2.3
addFrac :: Fraction -> Fraction -> Maybe Fraction
addFrac (a, b) (c, d)
  | b == 0 || d == 0 = Nothing
  | otherwise        = normalize (a * d + c * b, b * d)

-- 2.4
-- (a/b) / (c/d) = (a*d) / (b*c)
divFrac :: Fraction -> Fraction -> Maybe Fraction
divFrac (a, b) (c, d)
  | b == 0 || d == 0 || c == 0 = Nothing
  | otherwise                  = normalize (a * d, b * c)

----------------------------------------------------------------
-- 2.5 Bonus
eulerFrac :: Integer -> Maybe Fraction
eulerFrac n
  | n < 0 = Nothing
  | otherwise = eulerFracAux 1 (1, 1) (1, 1)
  where
    -- i: aktueller Index, t: 1/(i-1)! als Bruch, acc: e_(i-1) als Bruch
    eulerFracAux i t acc
      | i > n = Just acc
      | otherwise = case divFrac t (i, 1) of
          Nothing -> Nothing
          Just t' -> case addFrac acc t' of
            Nothing -> Nothing
            Just s -> eulerFracAux (i + 1) t' s


{-
(a) Antwort:

eulerFracAux 1 (1, 1) (1, 1)
eulerFracAux 2 (1, 1) (2, 1)
eulerFracAux 3 (1, 2) (5, 2)
eulerFracAux 4 (1, 6) (8, 3)   -- i > 3, = Just (8, 3)

mit Index i gilt:
  t   = ti-1 = 1/(i-1)!
  acc = ei-1 = 1/0! + 1/1! + ... + 1/(i-1)!


(b) Antwort:
Double kann die meistten Zahlen (z. B. 1/6) nur gerundet speichern,
und jedes plus rundet das ergebnis erneut. 
+ -> ist deshalb nicht assoziativ

eulerFrac rechnet mit exakten brüchen und rundet nur einmal am Ende. euler rechnet dagegen mit doubl und rundet bei
jedem Term und jeder Addition. 
Die Rundungsfehler Stacken sich und sohmit ist die Reihenfolge wichtig
-> reihenfolge wichtig!
-}