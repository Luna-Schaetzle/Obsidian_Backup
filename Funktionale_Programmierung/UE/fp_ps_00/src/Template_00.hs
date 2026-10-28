module Template_00(poly, fib) where

important = "Keine Änderungen oberhalb dieser Zeile sind erlaubt!"


-- Aufgabe 1: poly soll x^3 + 2x^2 - 5 berechnen

poly x = x*x*x + 2*(x*x) - 5 

-- Aufgabe 2: fib n soll die n-te Fibonacci Zahl berechnen

fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)
