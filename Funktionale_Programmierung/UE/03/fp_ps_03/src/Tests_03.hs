{-# LANGUAGE GADTs #-}

module Tests_03 (runTests, boolTests) where

import Template_03
import Test.LeanCheck

-- Generic Setup
data Test = forall a. (Testable a) => Test String String a

runTests =
  flip
    mapM_
    tests
    (\(Test ex name t) -> putStrLn ("running " ++ ex ++ "(" ++ name ++ ")" ++ "-tests") >> checkFor 1000 t)

-- Tests for this week

-- only take a few sample numbers, more important is to increase in length of list
sampleIntegers :: [[Integer]]
sampleIntegers = [[4490], [-3901], [-17], [0], [22]]

instance Listable List where
  tiers = cons0 Empty \/ (delay $ mapT (uncurry Cons) (sampleIntegers >< tiers))

-- boundaries around the allowed ranges for day (1..31) and month (1..12)
instance Listable Date where
  list =
    [ DMY d m y
    | d <- [-1, 0, 1, 2, 30, 31, 32],
      m <- [-1, 0, 1, 2, 11, 12, 13],
      y <- [0, 2024]
    ]

toList :: List -> [Integer]
toList Empty = []
toList (Cons x xs) = x : toList xs

testGen f1 f2 f3 g1 g2 g3 x = (f3 . f2 . f1) x == (g3 . g2 . g1) x

probablyValidDateTest :: Date -> Bool
probablyValidDateTest d@(DMY day month _) =
  probablyValidDate d == (1 <= day && day <= 31 && 1 <= month && month <= 12)

maxListTest :: List -> Bool
-- maxList Empty must throw an error, which a pure property can't check, so skipping
maxListTest Empty = True
maxListTest l = maximum (toList l) == maxList l

addedValue :: Integer
addedValue = 8

-- expected result: addedValue added to every second element (like 2nd, 4th, ...),
-- all other elements should be unchanged, length preserved
addSecondTest :: List -> Bool
addSecondTest l =
  toList (addSecond addedValue l) == zipWith (+) (cycle [0, addedValue]) (toList l)

-- QuadTree
instance Listable QuadTree where
  tiers =
    cons0 Black
      \/ cons0 White
      \/ cons4 Node

approxEq :: Double -> Double -> Bool
approxEq a b = abs (a - b) < 1e-9

-- test helper only, not part of the exercise: needed for invertRatio
invert :: QuadTree -> QuadTree
invert Black = White
invert White = Black
invert (Node a b c d) = Node (invert a) (invert b) (invert c) (invert d)

-- invertColour :: QuadTree -> Bool
-- invertColour Black = invert Black == White
-- invertColour White = invert White == Black
-- invertColour _ = True
--
-- invertInvolutive :: QuadTree -> Bool
-- invertInvolutive q = invert (invert q) == q

-- blackRatio

blackRatioExamples :: Bool
blackRatioExamples =
  approxEq (blackRatio Black) 1.0
    && approxEq (blackRatio White) 0.0
    && approxEq (blackRatio (Node Black White White Black)) 0.5 -- example from the sheet
    && approxEq (blackRatio (Node Black White White White)) 0.25
    && approxEq (blackRatio (Node Black Black White Black)) 0.75
    && approxEq (blackRatio (Node Black White (Node Black Black White White) White)) 0.375

blackRatioInRange :: QuadTree -> Bool
blackRatioInRange q = 0.0 <= r && r <= 1.0
  where
    r = blackRatio q

invertRatio :: QuadTree -> Bool
invertRatio q = approxEq (blackRatio (invert q)) (1.0 - blackRatio q)

-- compress

-- no Node anywhere in the tree whose four children are the same leaf
isCompressed :: QuadTree -> Bool
isCompressed (Node Black Black Black Black) = False
isCompressed (Node White White White White) = False
isCompressed (Node a b c d) = all isCompressed [a, b, c, d]
isCompressed _ = True

compressExamples :: Bool
compressExamples =
  compress (Node Black Black Black Black) == Black -- example from the sheet
    && compress (Node White White White White) == White
    && compress (Node Black White Black White) == Node Black White Black White
    && compress (Node (Node Black Black Black Black) Black Black Black) == Black
    && compress (Node (Node White White White White) Black White Black)
      == Node White Black White Black

compressIsCompressed :: QuadTree -> Bool
compressIsCompressed q = isCompressed (compress q)

compressPreservesRatio :: QuadTree -> Bool
compressPreservesRatio q = approxEq (blackRatio (compress q)) (blackRatio q)

compressIdempotent :: QuadTree -> Bool
compressIdempotent q = compress (compress q) == compress q

-- overlay
overlayExamples :: Bool
overlayExamples =
  overlay Black (Node White Black White White) == Black -- example from the sheet
    && overlay (Node Black White White White) (Node White Black White White)
      == Node Black Black White White
    && overlay (Node Black White White White) (Node (Node White Black White White) White White White)
      == Node Black White White White
    && overlay (Node (Node Black White White White) White White White) (Node (Node White White White Black) White White White)
      == Node (Node Black White White Black) White White White

overlayBlackAbsorbs :: QuadTree -> Bool
overlayBlackAbsorbs q = overlay Black q == Black && overlay q Black == Black

overlayWhiteIdentity :: QuadTree -> Bool
overlayWhiteIdentity q = overlay White q == q && overlay q White == q

overlayCommutative :: QuadTree -> QuadTree -> Bool
overlayCommutative q1 q2 = overlay q1 q2 == overlay q2 q1

-- the overlay is at least as black as each of its inputs
overlayRatioAtLeast :: QuadTree -> QuadTree -> Bool
overlayRatioAtLeast q1 q2 =
  r >= blackRatio q1 - 1e-9 && r >= blackRatio q2 - 1e-9
  where
    r = blackRatio (overlay q1 q2)

tests :: [Test]
tests =
  [ Test "2.1" "probablyValidDate" probablyValidDateTest,
    Test "2.2" "maxList" maxListTest,
    Test "2.3" "addSecond" addSecondTest,
    -- quadtree
    Test "3.1" "blackRatio examples" blackRatioExamples,
    Test "3.1" "0 <= ratio <= 1" blackRatioInRange,
    Test "3.1" "ratio == 1 - ratio . invert" invertRatio,
    Test "3.2" "compress examples" compressExamples,
    Test "3.2" "compress result is fully compressed" compressIsCompressed,
    Test "3.2" "ratio == ratio . compress" compressPreservesRatio,
    Test "3.2" "compress == compress . compress" compressIdempotent,
    Test "3.3" "overlay examples" overlayExamples,
    Test "3.3" "black + _ == black" overlayBlackAbsorbs,
    Test "3.3" "q + white == q" overlayWhiteIdentity,
    Test "3.3" "overlay q1 q2 == overlay q2 q1" overlayCommutative,
    Test "3.3" "ratio (overlay q1 q2) >= ratio q1, ratio q2" overlayRatioAtLeast
  ]

boolTests :: [((String, String), Bool)]
boolTests = map (\(Test ex descr t) -> ((ex, descr), holds 1000 t)) tests