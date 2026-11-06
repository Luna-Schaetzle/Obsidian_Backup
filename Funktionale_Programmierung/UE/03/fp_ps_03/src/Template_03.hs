module Template_03 where

-- Keine Änderungen oberhalb dieser Zeile sind erlaubt!
import Data.List (max)

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


{-
Muster i) 4
Muster ii) 2

-}

-- Aufgabe 2: Funktions-Definitionen
data Date = DMY Int Int Integer deriving (Show)
data List = Cons Integer List | Empty deriving (Show)

probablyValidDate :: Date -> Bool
probablyValidDate (DMY d m _) = d >= 1 && d <= 31 && m >= 1 && m <= 12

maxList :: List -> Integer
maxList Empty = error "maxList on empty list"
maxList (Cons x l) = max x (maxList l)

addSecond :: Integer -> List -> List
addSecond _ Empty                       = Empty
addSecond _ l@(Cons _ Empty)            = l
addSecond n (Cons x (Cons y l))
  = Cons x (Cons (y + n) (addSecond n l))


-- Aufgabe 3: Rekursive Datentypen und Funktionen
data QuadTree
  = Black
  | White
  | Node QuadTree QuadTree QuadTree QuadTree
  deriving (Show, Eq)

blackRatio :: QuadTree -> Double
blackRatio Black  = 1.0
blackRatio White  = 0.0
blackRatio (Node a b c d)
  = (blackRatio a + blackRatio b + blackRatio c + blackRatio d) / 4.0

-- optional: Hilfsunktion für compress
-- compressQuad :: QuadTree -> QuadTree -> QuadTree -> QuadTree -> QuadTree
-- compressQuad _ _ _ _ = undefined

compress :: QuadTree -> QuadTree
compress Black  = Black
compress White  = White
compress (Node a b c d)
  | a' == b' && b' == c' && c' == d'  = a'
  | otherwise                         = Node a' b' c' d'
  where
    a' = compress a
    b' = compress b
    c' = compress c
    d' = compress d

overlay :: QuadTree -> QuadTree -> QuadTree
overlay Black _ = Black
overlay _ Black = Black
overlay White t = t
overlay t White = t
overlay (Node a1 b1 c1 d1) (Node a2 b2 c2 d2)
  = Node (overlay a1 a2) (overlay b1 b2)
         (overlay c1 c2) (overlay d1 d2)
