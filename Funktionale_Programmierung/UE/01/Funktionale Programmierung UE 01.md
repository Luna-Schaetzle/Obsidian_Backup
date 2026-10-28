Aufgabe 1
4)
Bei dem erstem wird als erstes die *gravitationsEnergie* mit 70 und 3 berechnet und dann dazu eins gerechnet. 
Bei dem zweiten beispiel wird als erstes 3+1 gerechnet und dann die Funktion *gravitationalEnergy* mit den werden 70 und 4 ausgeführt

6)
i) Gesamtenergie: $1435.0$
ii) $6.4031242374328485  m/s$ 

Befehlszeilen:
```shell
luna@laptop$ ghci src/Template_01.hs
ghci> totalEnergy 70 2 1
1435.0
ghci> velocityByEnergy 70 1435.0
6.4031242374328485
```

Aufgabe 2

Github Projekt: https://github.com/jgm/pandoc

In diesem Projekt geht es darum Markup (Markdown, LaTeX, pptx) dateien zu konvertieren, in ein anders Format zum Beispiel pdf, html etc.

Zitat des Entwicklers (_John MacFarlane_):

> *"Why is pandoc written in Haskell? There could have been good answers to this question: Haskell is a very good language for writing this kind of application. But in fact, I didn’t decide to write a document converter, then decide to use Haskell for it. I decided to use Haskell, and then decided to write a document converter in it."*

-> das berühmteste Github Projekt verwendet Haskell weil der Entwickler Haskell verwenden wollte. Die aktuellste Version von Pandoc verwendet zu 81,8% Haskell. 