{-# LANGUAGE GADTs #-}
{-# LANGUAGE PartialTypeSignatures #-}

module Tests_06 (runTests, boolTests) where

import Template_06 (Polynom (..), candies, flexibleAppend, normalize, shoppingCosts, veggies)
import Test.LeanCheck

-- Generic Setup
data Test = forall a. (Testable a) => Test String String a

runTests =
  flip
    mapM_
    tests
    (\(Test ex name t) -> putStrLn ("running " ++ ex ++ "(" ++ name ++ ")" ++ "-tests") >> checkFor 1000 t)

-- Tests for this week

------------------------------- Exercise 1 -------------------------------

-- 1. und 2. sind nicht gut testbar, ohne die vollständige Struktur bereits im Template zu verraten

-- 3.
approxEq eps x y = abs (x - y) < eps

shoppingCostsVeggies = approxEq 0.01 (shoppingCosts veggies) 17.15

shoppingCostsCandies = approxEq 0.01 (shoppingCosts candies) 8.99

-- 4.
flexibleAppendCorrect :: [(Int, Integer)] -> [(Bool, Integer)] -> Bool
flexibleAppendCorrect xs ys = flexibleAppend xs ys == map (\(x, y) -> (Left x, y)) xs ++ map (\(x, y) -> (Right x, y)) ys

shoppingCostsVeggiesAndCandies = approxEq 0.01 (shoppingCosts (flexibleAppend veggies candies)) 26.14

------------------------------- Exercise 2 -------------------------------

-- 1. Listable instance
instance Listable Polynom where
  tiers = cons1 Polynom -- generiert Polynome aus Listen von Int

-- 2. Hilfsfunktionen
eqPoly (Polynom xs) (Polynom ys) = normalize (Polynom xs) == normalize (Polynom ys)

samePolyValue (Polynom xs) (Polynom ys) = eqPoly (normalize (Polynom xs)) (normalize (Polynom ys))

negatePoly s (Polynom xs) = Polynom (map (s *) xs)

validPoly (Polynom xs) = True -- alle Int-Listen sind valide

-- 3. Normalize Tests
normalizeIdempotentTest p = validPoly p ==> eqPoly (normalize (normalize p)) (normalize p)

normalizeValueTest p = validPoly p ==> samePolyValue (normalize p) p

-- 4. Eq / Ord Tests
eqPolyTest p1 p2 = validPoly p1 ==> validPoly p2 ==> eqPoly p1 p2 == (normalize p1 == normalize p2)

eqPolyTest2 p1 = validPoly p1 ==> normalize p1 == p1

ordPolyTest p1 p2 = validPoly p1 ==> validPoly p2 ==> compare (normalize p1) (normalize p2) == compare p1 p2

-- 5. Num Tests
polyAddComm p1 p2 = validPoly p1 ==> validPoly p2 ==> p1 + p2 == p2 + p1

polyAddAssoc p1 p2 p3 = validPoly p1 ==> validPoly p2 ==> validPoly p3 ==> p1 + (p2 + p3) == (p1 + p2) + p3

polyMultComm p1 p2 = validPoly p1 ==> validPoly p2 ==> p1 * p2 == p2 * p1

polyMultAssoc p1 p2 p3 = validPoly p1 ==> validPoly p2 ==> validPoly p3 ==> p1 * (p2 * p3) == (p1 * p2) * p3

polyAddZero p = validPoly p ==> p + 0 == p

polyMultZero p = validPoly p ==> p * 0 == 0 && 0 * p == 0

polyMultOne p = validPoly p ==> p * 1 == p && 1 * p == p

polyAddNegate p = validPoly p ==> p + negate p == 0

polyDistrib p1 p2 p3 = validPoly p1 ==> validPoly p2 ==> validPoly p3 ==> p1 * (p2 + p3) == p1 * p2 + p1 * p3

-- 6. Show Tests
showPolyTest1 p = validPoly p ==> show (normalize p) == show (normalize p)

showPolyTest2 p1 p2 = validPoly p1 ==> validPoly p2 ==> eqPoly p1 p2 ==> show p1 == show p2

tests :: [Test]
tests =
  [ Test "1.3" "shopping costs of veggies" shoppingCostsVeggies,
    Test "1.3" "shopping costs of candies" shoppingCostsCandies,
    Test "1.4" "flexible append works" flexibleAppendCorrect,
    Test "1.4" "shopping costs of veggies and candies combined works" shoppingCostsVeggiesAndCandies,
    Test "2.1" "normalize is idempotent" normalizeIdempotentTest,
    Test "2.1" "normalize preserves value" normalizeValueTest,
    Test "2.1" "show preserves normalized value" showPolyTest1,
    Test "2.1" "show is consistent for equal polynomials" showPolyTest2,
    Test "2.2" "Eq works" eqPolyTest,
    Test "2.2" "Second Eq Tests" eqPolyTest2,
    Test "2.2" "Ord works" ordPolyTest,
    Test "2.3" "addition commutative" polyAddComm,
    Test "2.3" "addition associative" polyAddAssoc,
    Test "2.3" "multiplication commutative" polyMultComm,
    Test "2.3" "multiplication associative" polyMultAssoc,
    Test "2.3" "addition zero" polyAddZero,
    Test "2.3" "multiplication zero" polyMultZero,
    Test "2.3" "multiplication one" polyMultOne,
    Test "2.3" "addition with negate" polyAddNegate,
    Test "2.3" "distributive law" polyDistrib
  ]

boolTests :: [((String, String), Bool)]
boolTests = map (\(Test ex n t) -> ((ex, n), holds 1000 t)) tests
