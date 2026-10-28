module Template_01 (gravitationalEnergy, kineticEnergy, totalEnergy, velocityByEnergy) where

important = "Keine Änderungen oberhalb dieser Zeile sind erlaubt!"

-- Aufgabe 1:

gravitationalEnergy m h = m * 10 * h

kineticEnergy m v = (1/2 * m) * v*v

totalEnergy m h v = kineticEnergy m v + gravitationalEnergy m h

velocityByEnergy m e = sqrt(2 * e / m)

totalVelocity m h v = undefined

-- Erklären Sie hier den Unterschied zwischen `gravitationalEnergy 70 3 + 1` und `gravitationalEnergy 70 (3 + 1)`:
