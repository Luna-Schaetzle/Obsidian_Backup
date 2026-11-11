{-# LANGUAGE GADTs #-}

module Tests_04 (runTests, boolTests) where
import Template_04
import Test.LeanCheck
import Test.LeanCheck.Error (errorToFalse)

-- Generic Setup
data Test = forall a. (Testable a) => Test String String a

runTests :: IO ()
runTests =
  flip
    mapM_
    tests
    (\(Test ex name t) -> putStrLn ("running " ++ ex ++ "(" ++ name ++ ")" ++ "-tests") >> checkFor 1000 t)

------------------------------------------------------------
-- Tests für Template_04
------------------------------------------------------------



formula :: BoolExpr String Bool
formula = And (Var "x") (Val True)
 
circuit :: BoolExpr Signal Bit
circuit = Or (Not (Var (Signal "enable" 0))) (Val Zero)
 
-- Tests for Boolean Expression
-- formula und circuit sind mit den Konstruktoren Var, Val, Not, And, Or aufgebaut
boolExprExamplesTest :: Bool
boolExprExamplesTest =
  errorToFalse $
    formula == And (Var "x") (Val True)
      && circuit == Or (Not (Var (Signal "enable" 0))) (Val Zero)

circuitToFormulaVarTest :: Bool
circuitToFormulaVarTest =
  circuitToFormula (Var (Signal "input" 3))
    == Var "input_p3"

circuitToFormulaBitTest :: Bool
circuitToFormulaBitTest =
  circuitToFormula (Val Zero) == Val False
    && circuitToFormula (Val One) == Val True

circuitToFormulaNotTest :: Bool
circuitToFormulaNotTest =
  circuitToFormula (Not (Val One))
    == Not (Val True)

circuitToFormulaNestedTest :: Bool
circuitToFormulaNestedTest =
  circuitToFormula
    ( And
        (Or (Var (Signal "a" 1)) (Val Zero))
        (Not (And (Val One) (Var (Signal "b" 2))))
    )
    == And
      (Or (Var "a_p1") (Val False))
      (Not (And (Val True) (Var "b_p2")))

circuitToFormulaCircuitTest :: Bool
circuitToFormulaCircuitTest =
  circuitToFormula circuit
    == Or (Not (Var "enable_p0")) (Val False)

-- Tests für evalFormula
evalFormulaValTest :: Bool
evalFormulaValTest =
  evalFormula [] (Val True :: BoolExpr String Bool) == True
    && evalFormula [] (Val False :: BoolExpr String Bool) == False

evalFormulaVarTest :: Bool
evalFormulaVarTest =
  evalFormula [("x", True), ("y", False)] (Var "x") == True
    && evalFormula [("x", True), ("y", False)] (Var "y") == False

evalFormulaUnknownVarTest :: Bool
evalFormulaUnknownVarTest =
  evalFormula [] (Var "x") == False
    && evalFormula [("y", True)] (Var "x") == False

evalFormulaNotTest :: Bool
evalFormulaNotTest =
  evalFormula [("x", True)] (Not (Var "x")) == False
    && evalFormula [("x", False)] (Not (Var "x")) == True

evalFormulaAndTest :: Bool
evalFormulaAndTest =
  evalFormula
    [("x", True), ("y", True)]
    (And (Var "x") (Var "y"))
    == True
    && evalFormula
      [("x", True), ("y", False)]
      (And (Var "x") (Var "y"))
      == False

evalFormulaOrTest :: Bool
evalFormulaOrTest =
  evalFormula
    [("x", False), ("y", True)]
    (Or (Var "x") (Var "y"))
    == True
    && evalFormula
      [("x", False), ("y", False)]
      (Or (Var "x") (Var "y"))
      == False

evalFormulaNestedTest :: Bool
evalFormulaNestedTest =
  evalFormula
    [("x", True), ("y", True), ("z", False)]
    (And (Var "x") (Or (Not (Var "y")) (Var "z")))
    == False
    && evalFormula
      [("x", True), ("y", False), ("z", False)]
      (And (Var "x") (Or (Not (Var "y")) (Var "z")))
      == True

evalFormulaFormulaTest :: Bool
evalFormulaFormulaTest =
  evalFormula [("x", True)] formula == True
    && evalFormula [("x", False)] formula == False

-- Gemeinsamer Test für Übersetzung und Auswertung

circuitEvaluationTest :: Bool
circuitEvaluationTest =
  evalFormula [("enable_p0", True)] (circuitToFormula circuit) == False
    && evalFormula [("enable_p0", False)] (circuitToFormula circuit) == True


------------------------------------------------
-- Aufgabe 2.1 Polymorphie und Listen: swapPairs
------------------------------------------------
evens :: [a] -> [a]
evens (x : _ : xs) = x : evens xs
evens xs = xs

odds :: [a] -> [a]
odds (_ : xs) = evens xs
odds [] = [] 

swapPairsExamples :: Bool
swapPairsExamples =
  errorToFalse $
    swapPairs [(1 :: Int, 'a'), (2, 'b')] == [('a', 1), ('b', 2)]
      && swapPairs [("Montag", True)] == [(True, "Montag")]
      && swapPairs ([] :: [(Int, Bool)]) == []
 
swapPairsProp :: [(Int, Bool)] -> Bool
swapPairsProp ps =
  errorToFalse $
    map fst rs == map snd ps
      && map snd rs == map fst ps
  where
    rs = swapPairs ps

-- Aufgabe 2.2 Polymorphie und Listen : interleave
interleaveExamples :: Bool
interleaveExamples =
  errorToFalse $
    interleave [1, 2, 3 :: Int] [10, 20] == [1, 10, 2, 20, 3]
      && interleave "ab" "xyz" == "axbyz"
      && interleave "" "abc" == "abc"
      && interleave "abc" "" == "abc"

interleaveProp :: [Int] -> [Int] -> Bool
interleaveProp xs ys =
  errorToFalse $
    length rs == length xs + length ys
      && evens front == take n xs
      && odds front == take n ys
      && back == drop n xs ++ drop n ys
  where
    rs = interleave xs ys
    n = min (length xs) (length ys)
    (front, back) = splitAt (2 * n) rs


-----------------------------------------------------
-- Aufgabe 3.1: Maybe, Either, und Listen: safeHeads
safeHeadsExamples :: Bool
safeHeadsExamples =
  errorToFalse $
    safeHeads [[1, 2], [], [3 :: Int]] == [Just 1, Nothing, Just 3]
      && safeHeads ["Mittwoch", "", "Rot"] == [Just 'M', Nothing, Just 'R']
      && safeHeads ([] :: [[Int]]) == []
 
-- One result per sublist: Nothing exactly for the empty sublists,
-- otherwise Just of an element that starts the sublist
safeHeadsProp :: [[Int]] -> Bool
safeHeadsProp xss =
  errorToFalse $
    length rs == length xss
      && and (zipWith ok xss rs)
  where
    rs = safeHeads xss
    ok xs Nothing = null xs
    ok xs (Just y) = take 1 xs == [y]
 

-- Aufgabe 3.2: fromMaybes
fromMaybesExamples :: Bool
fromMaybesExamples =
  errorToFalse $
    fromMaybes 0 [Just 1, Nothing, Just (3 :: Int)] == [1, 0, 3]
      && fromMaybes '_' [Just 'H', Nothing, Just 'P'] == "H_P"
      && fromMaybes 'x' [] == ""
 
-- One result per element:
-- the default value for Nothing,
-- the wrapped value for Just
fromMaybesProp :: Int -> [Maybe Int] -> Bool
fromMaybesProp d ms =
  errorToFalse $
    length rs == length ms
      && and (zipWith ok ms rs)
  where
    rs = fromMaybes d ms
    ok Nothing r = r == d
    ok (Just x) r = r == x
 

-- Aufgabe 3.3: initials
initialsExamples :: Bool
initialsExamples =
  errorToFalse $
    initials ["Haskell", "", "Prolog"] == "H_P"
      && initials ["Maybe", "Either"] == "ME"
      && initials [] == ""
 
-- a character per word:
-- '_' for the empty word,
-- otherwise its first char
initialsProp :: [String] -> Bool
initialsProp ws =
  errorToFalse $
    length rs == length ws
      && and (zipWith ok ws rs)
  where
    rs = initials ws
    ok w c = if null w then c == '_' else take 1 w == [c]


------------------------------------------------------------
-- Testsammlung
------------------------------------------------------------

tests :: [Test]
tests =
  [ Test "1.1" "BoolExpr: formula and circuit are built correctly" boolExprExamplesTest,
    Test "1.2" "circuitToFormula translates variables" circuitToFormulaVarTest,
    Test "1.2" "circuitToFormula translates bit values" circuitToFormulaBitTest,
    Test "1.2" "circuitToFormula translates negation" circuitToFormulaNotTest,
    Test "1.2" "circuitToFormula translates nested expressions" circuitToFormulaNestedTest,
    Test "1.2" "circuitToFormula translates example circuit" circuitToFormulaCircuitTest,
    Test "1.3" "evalFormula evaluates values" evalFormulaValTest,
    Test "1.3" "evalFormula evaluates known variables" evalFormulaVarTest,
    Test "1.3" "evalFormula evaluates unknown variables as False" evalFormulaUnknownVarTest,
    Test "1.3" "evalFormula evaluates negation" evalFormulaNotTest,
    Test "1.3" "evalFormula evaluates conjunction" evalFormulaAndTest,
    Test "1.3" "evalFormula evaluates disjunction" evalFormulaOrTest,
    Test "1.3" "evalFormula evaluates nested expressions" evalFormulaNestedTest,
    Test "1.3" "evalFormula evaluates example formula" evalFormulaFormulaTest,
    Test "1.3" "translated circuit is evaluated correctly" circuitEvaluationTest,
    Test "2.1" "swapPairs Beispiele" swapPairsExamples,
    Test "2.1" "swapPairs" swapPairsProp,
    Test "2.2" "interleave Beispiele" interleaveExamples,
    Test "2.2" "interleave" interleaveProp,
    Test "3.1" "safeHeads Beispiele" safeHeadsExamples,
    Test "3.1" "safeHeads" safeHeadsProp,
    Test "3.2" "fromMaybes Beispiele" fromMaybesExamples,
    Test "3.2" "fromMaybes" fromMaybesProp,
    Test "3.3" "initials Beispiele" initialsExamples,
    Test "3.3" "initials" initialsProp
  ]
 


boolTests :: [((String, String), Bool)]
boolTests = map (\(Test ex descr t) -> ((ex, descr), holds 1000 t)) tests
