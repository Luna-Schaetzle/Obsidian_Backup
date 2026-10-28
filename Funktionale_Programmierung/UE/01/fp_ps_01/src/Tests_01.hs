{-# LANGUAGE GADTs #-}

module Tests_01 (runTests, boolTests) where

import Control.Monad
import Template_01 (gravitationalEnergy, kineticEnergy, totalEnergy, velocityByEnergy)
import Test.LeanCheck

-- Generic Setup
data Test = forall a. (Testable a) => Test String String a

runTests =
  forM_
    tests
    (\(Test ex name t) -> putStrLn ("test for exercise " ++ ex ++ ": " ++ name) >> checkFor 1000 t)

-- Tests for this week

data GET = GET Double Double Double

instance Show GET where
  show (GET m h e) = "mass = " ++ show m ++ ", height = " ++ show h ++ ", energy = " ++ show e

instance Listable GET where
  tiers = [[GET 0 0 0, GET 70 0 0, GET 0 70 0, GET 70 3 2100, GET (-70) 3 (-2100), GET 70 (-3) (-2100)]]

gravitationalEnergyTest :: GET -> Bool
gravitationalEnergyTest (GET m h e) = abs (gravitationalEnergy m h - e) < 0.00001

data KET = KET Double Double Double

instance Show KET where
  show (KET m v e) = "mass = " ++ show m ++ ", velocity = " ++ show v ++ ", energy = " ++ show e

instance Listable KET where
  tiers =
    [ [ KET 0 0 0,
        KET 70 0 0,
        KET 0 70 0,
        KET 70 5 875,
        KET 100 7 2450,
        KET 1 8 32,
        KET (-70) 5 (-875),
        KET 70 (-5) 875
      ]
    ]

kineticEnergyTest :: KET -> Bool
kineticEnergyTest (KET m v e) = abs (kineticEnergy m v - e) < 0.00001

data TET = TET Double Double Double Double

instance Show TET where
  show (TET m h v e) = "mass = " ++ show m ++ ", height = " ++ show h ++ ", velocity = " ++ show v ++ ", energy = " ++ show e

instance Listable TET where
  tiers =
    [ [ TET 0 0 0 0,
        TET 70 0 0 0,
        TET 0 3 0 0,
        TET 0 0 5 0,
        TET 0 3 5 0,
        TET 70 3 0 2100,
        TET 70 0 5 875,
        TET 70 3 5 2975,
        TET 70 (-3) 5 (-1225),
        TET 70 3 (-5) 2975
      ]
    ]

totalEnergyTest :: TET -> Bool
totalEnergyTest (TET m h v e) = abs (totalEnergy m h v - e) < 0.00001

data VBET = VBET Double Double Double

instance Show VBET where
  show (VBET m e v) = "mass = " ++ show m ++ ", energy = " ++ show e ++ ", velocity = " ++ show v

instance Listable VBET where
  tiers =
    [ [ VBET 70 0 0,
        VBET 70 875 5,
        VBET 100 2450 7,
        VBET 1 32 8
      ]
    ]

velocityByEnergyTest :: VBET -> Bool
velocityByEnergyTest (VBET m v e) = abs (velocityByEnergy m v - e) < 0.00001

tests :: [Test]
tests =
  [ Test "1" "checking gravitationalEnergy m h = e" gravitationalEnergyTest,
    Test "2" "checking kineticEnergy m v = e" kineticEnergyTest,
    Test "3" "checking totalEnergy m h v = e" totalEnergyTest,
    Test "5" "checking velocityByEnergy m e = v" velocityByEnergyTest
  ]

boolTests :: [((String, String), Bool)]
boolTests = map (\(Test ex descr t) -> ((ex, descr), holds 1000 t)) tests
