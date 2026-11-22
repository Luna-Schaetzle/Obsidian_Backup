{-# LANGUAGE GADTs #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}

module Tests_05 (runTests, boolTests) where

import Template_05
import Test.LeanCheck

-- Generic Setup
data Test = forall a. (Testable a) => Test String String a

runTests =
  flip
    mapM_
    tests
    (\(Test ex name t) -> putStrLn ("running " ++ ex ++ "(" ++ name ++ ")" ++ "-tests") >> checkFor 1000 t)

------------------------------------------------------------
-- Tests für Template_05
------------------------------------------------------------

-- Aufgabe 1: Factorial und Euler
data EulerTest = ET Integer

instance Show EulerTest where
  show (ET n) = "n = " ++ show n

instance Listable EulerTest where
  tiers = [map ET [0 .. 15]]

factorial_ :: Integer -> Integer
factorial_ 0 = 1
factorial_ n = n * factorial_ (n - 1)

euler_ :: Integer -> Double
euler_ n
  | n < 0 = error "negative inputs not allowed"
  | n == 0 = 1
  | otherwise = 1 / fromIntegral (factorial_ n) + euler_ (n - 1)

factorialListNaive_ :: Integer -> [Integer]
factorialListNaive_ n
  | n == 0 = [1]
  | otherwise = factorial_ n : factorialListNaive_ (n - 1)

eulerEqTest :: EulerTest -> Bool
eulerEqTest (ET n) = euler_ n == eulerList n

factorialListTest :: EulerTest -> Bool
factorialListTest (ET n) = factorialListNaive_ n == factorialList n

convergenceTest :: Bool
convergenceTest = let conv = eulerConvergence in not (null conv) && last conv == eulerList (fromIntegral (length conv - 1))

-- Exaktes Rechnen mit Brüchen
-- student solutions arent allowed to use proper gcd calls

-- a result is normalized here if the denominator>0 and
-- nominator and denominator coprime
isNormalized :: (Integer, Integer) -> Bool
isNormalized (a, b) = b > 0 && gcd a b == 1

-- a/b == c/d (with b, d /= 0)
sameValue :: (Integer, Integer) -> (Integer, Integer) -> Bool
sameValue (a, b) (c, d) = a * d == c * b

-- To check, if r is a normalized fraction with the correspondign value ref.
matches :: Maybe (Integer, Integer) -> Maybe (Integer, Integer) -> Bool
matches Nothing Nothing = True
matches (Just r) (Just ref) = isNormalized r && sameValue r ref
matches _ _ = False

ggTTest :: Integer -> Integer -> Bool
ggTTest a b = ggT a b == gcd a b

ggTExamples :: Bool
ggTExamples =
  ggT 12 18 == 6
    && ggT (-12) 18 == 6
    && ggT 12 (-18) == 6
    && ggT 7 0 == 7
    && ggT (-7) 0 == 7
    && ggT 0 5 == 5
    && ggT 0 0 == 0

normalizeTest :: (Integer, Integer) -> Bool
normalizeTest (a, b) = normalize (a, b) `matches` (if b == 0 then Nothing else Just (a, b))

normalizeExamples :: Bool
normalizeExamples =
  normalize (6, -4) == Just (-3, 2)
    && normalize (0, 5) == Just (0, 1)
    && normalize (3, 0) == Nothing
    && normalize (-2, -8) == Just (1, 4)

addFracTest :: (Integer, Integer) -> (Integer, Integer) -> Bool
addFracTest (a, b) (c, d) =
  addFrac (a, b) (c, d) `matches` (if b == 0 || d == 0 then Nothing else Just (a * d + c * b, b * d))

addFracExamples :: Bool
addFracExamples =
  addFrac (1, 6) (1, 3) == Just (1, 2)
    && addFrac (1, 0) (1, 2) == Nothing
    && addFrac (1, 2) (-1, 2) == Just (0, 1)
    && addFrac (1, 2) (1, 0) == Nothing

divFracTest :: (Integer, Integer) -> (Integer, Integer) -> Bool
divFracTest (a, b) (c, d) =
  divFrac (a, b) (c, d) `matches` (if b == 0 || d == 0 || c == 0 then Nothing else Just (a * d, b * c))

divFracExamples :: Bool
divFracExamples =
  divFrac (1, 2) (3, 4) == Just (2, 3)
    && divFrac (2, 1) (2, -4) == Just (-4, 1)
    && divFrac (1, 2) (0, 7) == Nothing
    && divFrac (1, 0) (1, 2) == Nothing
    && divFrac (1, 2) (0, -3) == Nothing

-- referring to: e_n = (sum_{k=0}^{n} n!/k!) / n!, but a bit shorter
eulerFrac_ :: Integer -> Maybe (Integer, Integer)
eulerFrac_ n
  | n < 0 = Nothing
  | otherwise =
      let nf = factorial_ n
          num = sum [nf `div` factorial_ k | k <- [0 .. n]]
          g = gcd num nf
       in Just (num `div` g, nf `div` g)

eulerFracTest :: EulerTest -> Bool
eulerFracTest (ET n) = eulerFrac n == eulerFrac_ n

eulerFracExamples :: Bool
eulerFracExamples =
  eulerFrac 0 == Just (1, 1)
    && eulerFrac 3 == Just (8, 3)
    && eulerFrac (-1) == Nothing
    && fmap (\(a, b) -> fromIntegral a / fromIntegral b) (eulerFrac 20) == Just (2.718281828459045 :: Double)

------------------------------------------------------------
-- Testsammlung
------------------------------------------------------------

tests :: [Test]
tests =
  [ Test "1.1" "euler == eulerList" eulerEqTest,
    Test "1.2" "factorialList == factorialListNaive" factorialListTest,
    Test "1.3" "eulerConvergence property" convergenceTest,
    -- precise fractions
    Test "2.1" "ggT == gcd" ggTTest,
    Test "2.1" "ggT examples" ggTExamples,
    Test "2.2" "normalize property" normalizeTest,
    Test "2.2" "normalize examples" normalizeExamples,
    Test "2.3" "addFrac property" addFracTest,
    Test "2.3" "addFrac examples" addFracExamples,
    Test "2.4" "divFrac property" divFracTest,
    Test "2.4" "divFrac examples" divFracExamples,
    Test "2.5" "eulerFrac == reference" eulerFracTest,
    Test "2.5" "eulerFrac examples" eulerFracExamples
  ]

boolTests :: [((String, String), Bool)]
boolTests = map (\(Test ex descr t) -> ((ex, descr), holds 1000 t)) tests
