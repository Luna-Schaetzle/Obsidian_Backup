module Template_02 where

important = "Keine Änderungen oberhalb dieser Zeile sind erlaubt!"

-- Hinweise:
-- Diese Namen bitte nicht ändern (sie werden im Test verwendet):
-- WatchItem, Watchlist, oppenheimer, strangerthings, duneTwo, und exampleWatchlist.
-- Alle Datentypen (auch Hilfsdatentypen) benötigen "deriving (Show)".

-- Die Konstruktoren UndefinedWatchItem und UndefinedWatchlist sind nur Platzhalter.
-- Ersetzen Sie die platzhalter durch Ihre eigenen Definitionen.


----------------------------------------------
 
--Aufgabe 1)
{-

Abstrakter Syntax Baum für: (negate (-6) - 2) * pi * square r


*
├── Square
│   └── r
└── *
    ├── Pi
    └── -
        ├── 2
        └── negate
            └── (-6)

-}

--Aufgabe 2)
-- (a) 42                       -> belibig genaue Ganzzahl
-- (b) 42 :: Integer            -> Belibig genaue Ganzzahl
-- (c) 42 :: Int                -> Ganzzahl mit fixer genauer Ganzzahl
-- (d) 3.14 :: Int              -> nicht Typkorekt -> 3.14 Kommerzahl also eine Ganzzahl
-- (e) 3.14                     ->  Fractional (Double oder Float) [Fractional -> Typeclass]
-- (f) 'x'                      ->  Char
-- (g) True                     -> Bool
-- (h) "xdfdf"                  -> String
-- (i) applyDiscountD           -> Double
--(j) applyDiscountD 19.99 0.2  -> Double
--(k) applyDiscountI            -> Int
--(l) Product                   -> String Integer Double (=Product)
--(m) Product "Notebook" 5 799.0->  Product (String Integer Double)

--


-- Aufgabe 3.1
-- Definieren Sie hier den Datentyp WatchItem (und ggf. Hilfsdatentypen).

data Datum = Datum
    Int  --d 
    Int  --m
    Int  --y
    deriving (Show)

data Status
  = Ungesehen
  | Wird_geschaut Int
  | Fertig_angeschaut Datum
  deriving (Show)

data Format
  = Film Int        --  Länge in Minuten
  | Serie Int Int   --  Anzahl Staffeln, Minuten pro Episode
  deriving (Show)

data WatchItem = WatchItem
  String   --  Titel des Films / der Serie
  Integer  --  Erscheinungsjahr
  Status   --  Aktueller Zuschau-Status
  Format   --  Film oder Serie (mit Längenangaben)
  deriving (Show)


----------------------------------------------
-- Aufgabe 3.2
-- Definieren Sie hier die drei Watchlist-Einträge.

oppenheimer :: WatchItem
oppenheimer = WatchItem "Oppenheimer" 2023 (Fertig_angeschaut (Datum 12 1 2025)) (Film 180)

strangerthings :: WatchItem
strangerthings = WatchItem "Stranger Things" 2016 (Wird_geschaut 65) (Serie 5 42)

duneTwo :: WatchItem
duneTwo = WatchItem "Dune: Part Two" 2024 Ungesehen (Film 165)


----------------------------------------------
-- Aufgabe 3.3
-- Definieren Sie hier den Datentyp Watchlist, ohne den eingebauten
-- Listentyp zu verwenden.

data Watchlist
  = Emtpty                  --  Leere Watchlist (Listenende)
  | Cons WatchItem Watchlist -- Kopf-Element + Rest der Liste
  deriving (Show)

-- Aufgabe 3.4
-- Definieren Sie hier die Beispiel-Watchlist
-- (Stranger Things einmal, Dune: Part Two zweimal).

exampleWatchlist :: Watchlist
--exampleWatchlist = Cons strangerthings (Cons duneTwo (Cons duneTwo Emtpty))
exampleWatchlist = Cons strangerthings $ Cons duneTwo $ Cons duneTwo Emtpty --alternative schreibweiße mit (Funktionsapplikation ohne Klammern)
