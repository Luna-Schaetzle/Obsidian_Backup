{-# LANGUAGE GADTs #-}

module Tests_02 (runTests, boolTests) where

import Data.Char (isDigit)
import Data.List (isInfixOf, isPrefixOf, tails)
import Template_02 (duneTwo, exampleWatchlist, oppenheimer, strangerthings)
import Test.LeanCheck
import Test.LeanCheck.Error (errorToFalse)

-- Setup
data Test = forall a. (Testable a) => Test String String a

runTests :: IO ()
runTests =
  flip
    mapM_
    tests
    (\(Test ex name t) -> putStrLn ("running " ++ ex ++ "(" ++ name ++ ")" ++ "-tests") >> checkFor 1000 t)

safeShow :: Show a => a -> String
safeShow = take 100000 . show

-- Extracting all integer literals (maximal sequences of digits) from a string.
intsIn :: (Show a) => a -> [Integer]
intsIn x = go (safeShow x)
  where
    go s = case dropWhile (not . isDigit) s of
      "" -> []
      s' ->
        let (n, rest) = span isDigit s'
         in read n : go rest

-- does a specific integer appears in the Show output?
hasInt :: (Show a) => Integer -> a -> Bool
hasInt n x = n `elem` intsIn x

-- does a string (as a Haskell String literal) appears in the Show output?
hasString :: (Show a) => String -> a -> Bool
hasString s x = show s `isInfixOf` show x

-- Count occurrences of a substring in a string.
occurrences :: String -> String -> Int
occurrences pat s = length (filter (pat `isPrefixOf`) (tails s))

-- Titles as they appear in Show output (with quotes).
titleOppenheimer, titleStranger, titleDune :: String
titleOppenheimer = show "Oppenheimer"
titleStranger = show "Stranger Things"
titleDune = show "Dune: Part Two"

-- Aufgabe 3.2
oppenheimerTest :: Bool
oppenheimerTest =
  errorToFalse $
    hasString "Oppenheimer" oppenheimer
      && hasInt 2023 oppenheimer
      && hasInt 180 oppenheimer
      && hasInt 12 oppenheimer
      && hasInt 2025 oppenheimer

strangerthingsTest :: Bool
strangerthingsTest =
  errorToFalse $
    hasString "Stranger Things" strangerthings
      && hasInt 2016 strangerthings
      && hasInt 5 strangerthings
      && hasInt 42 strangerthings
      && hasInt 65 strangerthings

duneTwoTest :: Bool
duneTwoTest =
  errorToFalse $
    hasString "Dune: Part Two" duneTwo
      && hasInt 2024 duneTwo
      && (hasInt 165 duneTwo || hasInt 166 duneTwo)

-- Aufgabe 3.3: Check that the Show output of exampleWatchlist does not contain '['.
-- This assumes that if the built-in list type is used anywhere in the derived Show,
-- square brackets will appear.
noBuiltinListTest :: Bool
noBuiltinListTest =
  errorToFalse $
    not ('[' `elem` safeShow exampleWatchlist)
      && hasString "Stranger Things" exampleWatchlist

-- Aufgabe 3.4
exampleWatchlistTest :: Bool
exampleWatchlistTest =
  errorToFalse $
    occurrences titleStranger s == 1
      && occurrences titleDune s == 2
      && occurrences titleOppenheimer s == 0
  where
    s = safeShow exampleWatchlist

tests :: [Test]
tests =
  [ Test "2a" "oppenheimer" oppenheimerTest,
    Test "2b" "strangerthings" strangerthingsTest,
    Test "2c" "duneTwo" duneTwoTest,
    Test "3" "Watchlist ohne eingebaute Liste" noBuiltinListTest,
    Test "4" "exampleWatchlist" exampleWatchlistTest
  ]

boolTests :: [((String, String), Bool)]
boolTests = map (\(Test ex descr t) -> ((ex, descr), holds 1000 t)) tests
