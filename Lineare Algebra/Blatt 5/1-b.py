from math import sqrt

N = 30          # Suchbereich: a, b in {-N, ..., N}
ANZAHL = 420

# Alle Elemente a + sqrt(2)*b als (Wert, a, b)
elemente = [(a + sqrt(2) * b, a, b)
            for a in range(-N, N + 1)
            for b in range(-N, N + 1)]

positiv = sorted(e for e in elemente if e[0] > 0)[:ANZAHL]
negativ = sorted((e for e in elemente if e[0] < 0), reverse=True)[:ANZAHL]

def ausgeben(titel, liste):
    print(titel)
    for wert, a, b in liste:
        print(f"{a:>3} + √2 · {b:>3}  =  {wert: .6f}")
    print()

ausgeben(f"Die {ANZAHL} kleinsten positiven Elemente:", positiv)
ausgeben(f"Die {ANZAHL} größten negativen Elemente:", negativ)
