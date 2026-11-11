module Template_04
  ( BoolExpr (..),
    Signal (..),
    Bit (..),
    circuitToFormula,
    evalFormula,
    swapPairs,
    interleave,
    safeHeads,
    fromMaybes,
    initials,
  )
where

important = "Keine Änderungen oberhalb dieser Zeile sind erlaubt!"

-- Hinweise:
-- Diese Namen und Typsignaturen bitte nicht ändern (sie werden im Test verwendet):
-- BoolExpr (mit den Konstruktoren Var, Val, Not, And, Or), formula, circuit,
-- circuitToFormula, evalFormula, swapPairs, interleave, safeHeads, fromMaybes und initials.
-- Hilfsfunktionen dürfen Sie beliebig hinzufügen.

-- Aufgabe 1

-- Aufgabe 1.1
-- Definieren Sie hier den parametrischen Datentyp BoolExpr var val mit den Konstruktoren:
-- Var, Val, Not, And und Or.
-- Der Konstruktor UndefinedBoolExpr ist nur ein Platzhalter.
-- Die Zeile "deriving (Show, Eq)" bitte nicht entfernen (sie wird im Test benötigt).

-- Aufgabe 1: Boolesche Ausdrücke
-- Vorgegebene Typen und Funktionen (bitte nicht ändern):

data Bit
  = Zero
  | One
  deriving (Show, Eq)

data Signal = Signal String Int
  deriving (Show, Eq)

signalToVarString :: Signal -> String
signalToVarString (Signal m p) = m ++ "_p" ++ show p

-- Aufgabe 1.1
-- Definieren Sie hier den parametrischen Datentyp BoolExpr var val mit den Konstruktoren:
-- Var, Val, Not, And und Or.
-- Dabei ist var der Typ der Variablen und val der Typ der Werte.
-- Der Konstruktor UndefinedBoolExpr ist nur ein Platzhalter.
-- Die Zeile "deriving (Show, Eq)" bitte nicht entfernen (sie wird im Test benötigt).

data BoolExpr var val
  = UndefinedBoolExpr
  deriving (Show, Eq)

-- Aufgabe 1.2
-- Übersetzen Sie eine Schaltung in eine boolesche Formel:
-- Signale werden mit signalToVarString übersetzt.
-- Zero wird zu False und One zu True.
-- Die Struktur des Ausdrucks soll erhalten bleiben.

circuitToFormula :: BoolExpr Signal Bit -> BoolExpr String Bool
circuitToFormula = undefined

-- Aufgabe 1.3
-- Berechnen Sie den Wert einer Formel für eine Variablen-Belegung (Schlüssel-Wert-Paare).
-- Variablen, die nicht in der Belegung vorkommen, gelten als False.
-- Hinweis: lookup :: Eq a => a -> [(a, b)] -> Maybe b

evalFormula :: (Eq var) => [(var, Bool)] -> BoolExpr var Bool -> Bool
evalFormula = undefined

-----------------------------------------------
-- Aufgabe 2: Polymorphie und Listen
-- Aufgabe 2.1
-- Vertauschen Sie in jedem Paar einer Liste die beiden Komponenten.

swapPairs :: [(a, b)] -> [(b, a)]
swapPairs = undefined

-- Aufgabe 2.2
-- Fügen Sie zwei Listen abwechselnd zusammen, beginnend mit der ersten Liste.
-- Restliche Elemente der längeren Liste werden am Ende angehängt.

interleave :: [a] -> [a] -> [a]
interleave = undefined

-- Aufgabe 3: Maybe, Either und Listen

-- Aufgabe 3.1
-- Geben Sie für jede Teilliste deren erstes Element in Just zurück,
-- und für leere Teillisten Nothing.

safeHeads :: [[a]] -> [Maybe a]
safeHeads = undefined

-- Aufgabe 3.2
-- Ersetzen Sie jedes Just x durch x und jedes Nothing durch übergebenen Standardwert.

fromMaybes :: a -> [Maybe a] -> [a]
fromMaybes = undefined

-- Aufgabe 3.3
-- Bilden Sie die Anfangsbuchstaben einer Liste von Wörtern ('_' für leere Wörter).
-- Verwenden Sie safeHeads und fromMaybes aus den Aufgaben 3.1 und 3.2.

initials :: [String] -> String
initials = undefined
