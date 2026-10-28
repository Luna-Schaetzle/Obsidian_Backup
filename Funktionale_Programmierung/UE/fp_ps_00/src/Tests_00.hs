{-# LANGUAGE GADTs #-}

module Tests_00(runTests, boolTests) where

import Template_00(fib, poly)
import Test.LeanCheck

-- Generic Setup 
data Test = forall a. Testable a => Test String String a

runTests = flip mapM_ tests
  (\ (Test ex name t) -> putStrLn ("running " ++ ex ++ "(" ++ name ++ ")" ++ "-tests") >> checkFor 1000 t)

-- Tests for this week 


data PT = PT Integer Integer 

instance Show PT where
  show (PT x y) = "x = " ++ show x ++ ", y = " ++ show y

instance Listable PT where
  tiers = [[PT (-10) (-805),PT (-9) (-572),PT (-8) (-389),PT (-7) (-250),PT (-6) (-149),PT (-5) (-80),PT (-4) (-37),PT (-3) (-14),PT (-2) (-5),PT (-1) (-4),PT 0 (-5),PT 1 (-2),PT 2 11,PT 3 40,PT 4 91,PT 5 170,PT 6 283,PT 7 436,PT 8 635,PT 9 886,PT 10 1195]]

polyTest :: PT -> Bool
polyTest (PT x y) = poly x == y

data FT = FT Integer Integer 

instance Show FT where
  show (FT x y) = "n = " ++ show x ++ ", m = " ++ show y

instance Listable FT where
  tiers = [[FT 0 0,FT 1 1,FT 2 1,FT 3 2,FT 4 3,FT 5 5,FT 6 8,FT 7 13,FT 8 21,FT 9 34,FT 10 55,FT 11 89,FT 12 144,FT 13 233,FT 14 377,FT 15 610,FT 16 987,FT 17 1597,FT 18 2584,FT 19 4181,FT 20 6765]]

fibTest :: FT -> Bool
fibTest (FT x y) = fib x == y

tests :: [Test]
tests = [
  Test "1" "poly x = y" polyTest,
  Test "2" "fib n = m" fibTest
  ]

boolTests :: [((String,String), Bool)]
boolTests = map (\ (Test ex descr t) -> ((ex, descr), holds 1000 t)) tests
