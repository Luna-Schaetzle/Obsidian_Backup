---
tags:
  - Rechnerarchitektur
---
# 1 Wertebereiche von Ganzzahlen

Es können in einem Byte 2⁸ mögliche Zahlen dargestellt werden die höchste zahl die Dargestellt werden kann ist $(FF)_{16}$ und die niedrigste Zahl ist die $(00)_{16}$. Diese Darstellung ist nicht eindeutig, da in dem oben genannten Beispiel nur die $\mathbb{N}_0$ haben dadurch haben wir keine negativen Zahlen also auch keine $\mathbb{Z}$ dafür könnte man einen Bit reservieren der darstellt ob die Zahl Positiv oder Negativ ist.

# 2 Einfache Konvertierung
a)  $(76)_{10} = (1001100)_2 = 1*2⁶+0*2⁵+0*2⁴+1*2³+1*2²*0*2¹+0*2^0= (4C)_{16} = 4*16¹ + 12 * 16⁰$
b) $(1024)_{10} = (10000000000)_2 = 1*2^{10}*0*2⁹+0*2⁸+0*2⁷+0*2⁶+0*2⁵+0*2⁴+0*2³+0*2²*0*2¹+0*2^0= (400)_{16} = 4*16² + 0*16¹ + 0 * 16⁰$
c) $(127)_{10} = (1111111)_2 =1*2⁶+1*2⁵+1*2⁴+1*2³+1*2²*1*2¹+1*2^0= (F7)_{16} = 7*16¹ + 15*16⁰$


# 3 Konvertierung zwischen Zweierpotenz-Basen
| Hexadezimal | oktal | binär     |
| ----------- | ----- | --------- |
| 16          | 20    | 10000     |
| 61          | 75    | 111001    |
| 800         | 440   | 110010000 |

i)
$(10000)_2 = 1*2⁴ = 16$
$16 = 2*8¹ + 0*8⁰$
ii) 
$(75)_8 = 7*8¹ + 5*6⁰ = 61$
$61 = 1*2⁵ + 1*2⁴ + 1*2³+ 0*2²+0*2¹ +1*2⁰ = (111001)_2$
iii) 
$800 = (440)_8$
$800 = (110010000)_2$

### Nebenrechnungen für Aufgabe 2&3
![[Zettel-01-NR.jpg]]
# 4 Moore's Law

https://www.cs.utexas.edu/~fussell/courses/cs352h/papers/moore.pdf

a) Relative Herstellkosten pro Component & Anzahl der Componenten pro integrierter Circuit 
b) Veröffentlicht wurde er April 19, 1965 (geschrieben wurde er vor diesem Datum)
c) $10⁴$
d) 1975
e) $65 000$ Components on a Single Chip
f) Nein nicht direkt aber sehr nahe und Moore korrigierte seine aussage auf "Verdopplung alle 2 Jahre"
g) 3-5 nm