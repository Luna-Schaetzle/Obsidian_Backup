module Template_03 where

important = "Keine Änderungen oberhalb dieser Zeile sind erlaubt!"

-- Aufgabe 1: Pattern Matching
data Course
  = FunctionalProgramming -- Funktionale Programmierung
  | LinearAlgebra         -- Lineare Algebra
  | Algorithms            -- Algorithmen und Datenstrukturen
  | OperatingSystems      -- Betriebssysteme

data Registration
  = Lecture Course        -- VO
  | Exercise Course       -- UE
  | Tutor Course Course   -- Tutor:innen betreuen zwei Lehrveranstaltungen

data Student
  = Student
      String              -- Name
      Integer             -- Matrikelnummer
      Bool                -- aktiv inskribiert?
      Registration


-- Aufgabe 2: Funktions-Definitionen
data Date = DMY Int Int Integer deriving (Show)
data List = Cons Integer List | Empty deriving (Show)

probablyValidDate :: Date -> Bool
probablyValidDate = undefined

maxList :: List -> Integer
maxList = undefined

addSecond :: Integer -> List -> List
addSecond = undefined


-- Aufgabe 3: Rekursive Datentypen und Funktionen
data QuadTree
  = Black
  | White
  | Node QuadTree QuadTree QuadTree QuadTree
  deriving (Show, Eq)

blackRatio :: QuadTree -> Double
blackRatio Black = 1.0
blackRatio _ = undefined

-- optional: Hilfsunktion für compress
-- compressQuad :: QuadTree -> QuadTree -> QuadTree -> QuadTree -> QuadTree
-- compressQuad _ _ _ _ = undefined

compress :: QuadTree -> QuadTree
compress _ = undefined

overlay :: QuadTree -> QuadTree -> QuadTree
overlay _ _ = undefined