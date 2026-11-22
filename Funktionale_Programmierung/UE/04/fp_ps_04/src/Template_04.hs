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

-- Idee: Ein Ausdruck ist entweder ein "Blatt" (Variable oder Wert) oder
-- setzt sich rekursiv aus kleineren Ausdrücken zusammen (Not, And, Or).
-- Durch die zwei Typparameter bleibt die Struktur gleich, nur die Darstellung
-- von Variablen (var) und Werten (val) kann variieren, z.B.
-- BoolExpr String Bool (Formel) oder BoolExpr Signal Bit (Schaltung).
data BoolExpr var val
  = Var var
  | Val val
  | Not (BoolExpr var val)
  | And (BoolExpr var val) (BoolExpr var val)
  | Or (BoolExpr var val) (BoolExpr var val)
  deriving (Show, Eq)

-- Aufgabe 1.2
-- Übersetzen Sie eine Schaltung in eine boolesche Formel:
-- Signale werden mit signalToVarString übersetzt.
-- Zero wird zu False und One zu True.
-- Die Struktur des Ausdrucks soll erhalten bleiben.

circuitToFormula :: BoolExpr Signal Bit -> BoolExpr String Bool
-- Wir gehen den Ausdruck rekursiv durch (ein Fall pro Konstruktor):
--  * Var: das Signal wird mit signalToVarString zu einem String
--  * Val: das Bit wird mit der Hilfsfunktion bitToBool zu einem Bool
--  * Not/And/Or: Konstruktor bleibt, nur die Teilausdrücke werden übersetzt
--    (so bleibt die Struktur erhalten)
circuitToFormula (Var s) = Var (signalToVarString s)
circuitToFormula (Val b) = Val (bitToBool b)
circuitToFormula (Not e) = Not (circuitToFormula e)
circuitToFormula (And e1 e2) = And (circuitToFormula e1) (circuitToFormula e2)
circuitToFormula (Or e1 e2) = Or (circuitToFormula e1) (circuitToFormula e2)

-- Hilfsfunktion: Zero entspricht False, One entspricht True
bitToBool :: Bit -> Bool
bitToBool Zero = False
bitToBool One = True

-- Aufgabe 1.3
-- Berechnen Sie den Wert einer Formel für eine Variablen-Belegung (Schlüssel-Wert-Paare).
-- Variablen, die nicht in der Belegung vorkommen, gelten als False.
-- Hinweis: lookup :: Eq a => a -> [(a, b)] -> Maybe b

evalFormula :: (Eq var) => [(var, Bool)] -> BoolExpr var Bool -> Bool
-- Auch hier ein Fall pro Konstruktor:
--  * Var: lookup liefert Maybe Bool; bei Nothing (Variable nicht in der
--    Belegung) wird laut Angabe False verwendet
--  * Val: der Wert ist schon ein Bool und wird direkt zurückgegeben
--  * Not/And/Or: Teilausdrücke rekursiv auswerten und mit not, && bzw. ||
--    verknüpfen
evalFormula env (Var v) = case lookup v env of
  Just b -> b
  Nothing -> False
evalFormula _ (Val b) = b
evalFormula env (Not e) = not (evalFormula env e)
evalFormula env (And e1 e2) = evalFormula env e1 && evalFormula env e2
evalFormula env (Or e1 e2) = evalFormula env e1 || evalFormula env e2

-----------------------------------------------
-- Aufgabe 2: Polymorphie und Listen
-- Aufgabe 2.1
-- Vertauschen Sie in jedem Paar einer Liste die beiden Komponenten.

swapPairs :: [(a, b)] -> [(b, a)]
-- Rekursionsanker: leere Liste, es gibt nichts zu vertauschen.
-- Rekursionsschritt: erstes Paar (x, y) zu (y, x) vertauschen und den Rest
-- der Liste rekursiv bearbeiten. Funktioniert für beliebige Typen a und b.
swapPairs [] = []
swapPairs ((x, y) : ps) = (y, x) : swapPairs ps

-- Aufgabe 2.2
-- Fügen Sie zwei Listen abwechselnd zusammen, beginnend mit der ersten Liste.
-- Restliche Elemente der längeren Liste werden am Ende angehängt.

interleave :: [a] -> [a] -> [a]
-- Ist eine Liste leer, bleibt einfach die andere übrig (das deckt den Fall
-- "eine Liste ist länger" ab).
-- Sonst nehmen wir das erste Element der ersten Liste und rufen interleave
-- mit vertauschten Argumenten auf, damit danach die andere Liste dran ist.
interleave [] ys = ys
interleave xs [] = xs
interleave (x : xs) ys = x : interleave ys xs


-- Aufgabe 3: Maybe, Either und Listen

-- Aufgabe 3.1
-- Geben Sie für jede Teilliste deren erstes Element in Just zurück,
-- und für leere Teillisten Nothing.

safeHeads :: [[a]] -> [Maybe a]
-- Rekursionsanker: keine Teillisten, also auch keine Ergebnisse.
-- Leere Teilliste -> Nothing, sonst Just des ersten Elements.
-- Der Rest der äußeren Liste wird rekursiv behandelt.
safeHeads [] = []
safeHeads ([] : xss) = Nothing : safeHeads xss
safeHeads ((x : _) : xss) = Just x : safeHeads xss

-- Aufgabe 3.2
-- Ersetzen Sie jedes Just x durch x und jedes Nothing durch übergebenen Standardwert.

fromMaybes :: a -> [Maybe a] -> [a]
-- Wir gehen die Liste durch und packen jedes Maybe aus:
-- Nothing wird durch den Standardwert d ersetzt, Just x wird zu x.
fromMaybes _ [] = []
fromMaybes d (Nothing : ms) = d : fromMaybes d ms
fromMaybes d (Just x : ms) = x : fromMaybes d ms

-- Aufgabe 3.3
-- Bilden Sie die Anfangsbuchstaben einer Liste von Wörtern ('_' für leere Wörter).
-- Verwenden Sie safeHeads und fromMaybes aus den Aufgaben 3.1 und 3.2.

initials :: [String] -> String
-- safeHeads liefert zu jedem Wort Just Anfangsbuchstabe bzw. Nothing bei
-- einem leeren Wort. fromMaybes ersetzt die Nothing-Fälle anschließend
-- durch '_'. (String ist ja nur [Char], daher passt safeHeads hier.)
initials ws = fromMaybes '_' (safeHeads ws)