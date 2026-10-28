# Aufgabe 1 (7 Punkte)

## Vorlesungsfolien

* Operatoren und Ausdrücke (EidP-04-OperatorenAusdruecke.pdf)

## Beschreibung

In dieser Aufgabe sollen das theoretische Verständnis für die Auswertung von C-Ausdrücken/Anweisungen gefestigt werden.
Lösen Sie dafür die folgenden Unteraufgaben.

### Teilaufgabe a)

Geben Sie den **C-Datentyp** des Ergebnisses der folgenden C-Ausdrücke an:

1. `5 == 3`
2. `2.0 * 4 / 5`
3. `41 / (float)17`
4. `5.0e-2 * .02f`
5. `0xC0DE`
6. `0.1f == 0.1`
7. `'E' + 'A' + 'S' + 'Y'`
8. `INT_MAX & 0xF`
9. `12 | 5 ^ 4 & 3`
10. `0xBull`

### Teilaufgabe b)

Geben Sie das **Resultat** der folgenden C-Ausdrücke im Dezimalsystem an:

1. `0xF`
2. `2.0f * 017`
3. `0.1f + 0.2f == 0.3f`
4. `0.1f + 0.2f == 0.3`
5. `(1u << 2u) & 5u`
6. `1 + UINT_MAX`
7. `(1 + DBL_MAX) == DBL_MAX`

### Teilaufgabe c)

Setzen Sie für jeden Ausdruck Klammern, sodass die Auswertungsreihenfolge bereits durch die gesetzten Klammern
ersichtlich ist. Geben Sie an welcher Operator bei der Ausführung zuletzt ausgeführt wird.

1. `6 == (13 % 7) && (0 != 1)`
2. `(16 >> 1) == 8 || (0 != 1)`
3. `'D' - 'B' == 3 ? 0 : 1`
4. `double x = sizeof(float) * 2 && 25 / printf("abc\n") ^ 2 + 1;`
5. `1 + 2 - 3 * 5 / 2 & 4`

### Teilaufgabe d)

Beantworten Sie die folgenden Fragen:

1. Wie kann das Ergebnis eines Shifts nach links im Dezimalsystem berechnet werden, ohne die Binärdarstellung zu
  berechnen? Geben Sie eine Formel für die Berechnung des Wertes `x << n` an. 
2. Wie kann das Ergebnis eines Shifts nach rechts im Dezimalsystem berechnet werden, ohne die Binärdarstellung zu
  berechnen? Geben Sie eine Formel für die Berechnung des Wertes `x >> n` an. 
3. Gegeben sei der Ausdruck `6 == (13 % 7) && (1 != 2 >> 1) && 23 / 0`. Kann dieser Ausdruck in C ohne Probleme
  ausgewertet werden? Erklären Sie genau was bei der Auswertung dieses Ausdrucks passiert.

### Hinweise

- Verwenden Sie die bereitgestellte Datei `s03e01.txt` zum Lösen dieser Aufgabe.
- Die Konstantem `INT_MAX` und `UINT_MAX` sind im Header `limits.h` definiert.
- Die Konstante `DBL_MAX` ist im Header `float.h` definiert.
- Nehmen Sie an, dass die Ausdrücke auf einer Rechnerarchitektur ausgeführt werden, welche Ganzzahlen im
  Zweierkomplement darstellt, und ein zum ASCII-Code kompatibler Zeichensatz verwendet wird.

# Aufgabe 2 (6 Punkte)

## Vorlesungsfolien

* Vorschau (EidP-02-Vorschau.pdf)

## Beschreibung

Erstellen Sie ein C-Programm, welches die ersten `n`-Zahlen der linearen Differenzengleichung $`x_{i+2} = x_{i} + 1`$ 
mit den Anfangswerten $`x_0 = 2`$ und $`x_1 = 4`$ mithilfe einer `while`-Schleife berechnet und hintereinander
ausgibt. Die Ganzzahl (`int`) `n` wird von dem\*der Benutzer\*in eingelesen.

## Ablauf

- Der\*die Benutzer\*in gibt einen Dezimalwert für `n` ein.
    - Sofern die eingegebene Zahl kleiner als 1 ist, wird keine Berechnung ausgeführt, sondern eine Fehlermeldung auf
      der Standardausgabe ausgegeben und das Programm nicht erfolgreich beendet (`EXIT_FAILURE`). Als Fehlermeldung wird
      der Text `"ERROR: The provided number <n> is smaller than 1!"` verwendet, wobei der Platzhalter `<n>` durch den
      eingegebenen Wert ersetzt wird.
- Ausgabe eines Zeilenumbruchs.
- Die ersten `n`-Zahlen werden nacheinander in einer Zeile ausgegeben. Als Trennzeichen zwischen den Zahlen wird ein
  Beistrich gefolgt von einem Leerzeichen (`", "`) verwendet.

## Beispiele

Beispiel 1: Programmablauf bei der Eingabe der Zahlen `10`. Die Zahl `10` in der Beispielausgabe wurde durch den\*die
Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
10

2, 4, 3, 5, 4, 6, 5, 7, 6, 8
```

Beispiel 2: Programmablauf bei der Eingabe der Zahlen `17`. Die Zahl `17` in der Beispielausgabe wurde durch den\*die
Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
17

2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10
```

Beispiel 3: Programmablauf bei der Eingabe der Zahlen `-2`. Die Zahl `-2` in der ersten Zeile der Beispielausgabe wurde
durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
-2

ERROR: The provided number -2 is smaller than 1!
```

## Hinweise

- Verwenden Sie `scanf` für das Einlesen von `n`.
- Was passiert, wenn Sie eine ungültige Zahl eingeben (z.B. `Z`)?
- Am Anfang und Ende der ausgegebenen Zahlen soll *kein* Beistrich stehen!
- Halten Sie sich genau an das Format der Beispiele und geben Sie keine weiteren Texte aus!

# Aufgabe 3 (2 Punkte)

## Vorlesungsfolien

* Operatoren und Ausdrücke (EidP-04-OperatorenAusdruecke.pdf)

## Beschreibung

Geben Sie jeweils einen Ausdruck mit dem Bedingungsoperator an, der das geforderte Ergebnis ermittelt:

1. Maximum der Werte der `int`-Variablen `x` und `y`.
2. Minimum der Werte der `int`-Variablen `x` und `y`.
3. [Signum](https://en.wikipedia.org/wiki/Sign_function) des Werts der `int`-Variable `x`, d. h. $`\text{sgn}(\texttt{x})`$.
4. [Absolutbetrag](https://en.wikipedia.org/wiki/Absolute_value) des Werts der `int`-Variable `x`, d. h. $`|\texttt{x}|`$.

### Hinweise

- Möglicherweise wird für einzelne Ausdrücke mehr als ein Bedingungsoperator benötigt. 

# Aufgabe 4 (7 Punkte)

## Vorlesungsfolien

* Operatoren und Ausdrücke (EidP-04-OperatorenAusdruecke.pdf)

## Beschreibung

Erstellen Sie ein C-Programm, welches die Anzahl der Nullen der [signifikanten Stellen](https://en.wikipedia.org/wiki/Significant_figures) der Binärrepräsentation der Dezimalzahl `value` ermittelt.
Die Zahl `value` wird von dem\*der Benutzer\*in mittels `scanf` als positive Ganzzahl mit genau 32 Bit
(`uint32_t`) eingelesen.

### Ablauf

- Das Programm gibt den Text `"value: "` auf der Standardausgabe aus.
- Der\*die Benutzer\*in gibt eine positive Ganzzahl im Dezimalsystem für `value` ein.
- Ausgabe eines Zeilenumbruchs.
- Die Anzahl der Nullen der signifikanten Stellen der Binärrepräsentation der Dezimalzahl `value` wird ermittelt.
- Abhängig von der Anzahl an Nullen der signifikanten Stellen wird einer der folgenden Texte auf der Standardausgabe ausgegeben. Bei
  den folgenden Texten wird der Platzhalter `<n>` mit dem gewählten Wert und der Platzhalter `<zeros>`
  mit der Anzahl der Nullen der signifikanten Stellen ersetzt.
    - die signifikanten Stellen der Binärrepräsentation der Dezimalzahl `value` beinhalten genau eine
      Null: `"The number <n> contains 1 zero in the significant digits of the binary representation!"`
    - die signifikanten Stellen der Binärrepräsentation der Dezimalzahl `value` beinhalten keine oder mehr als eine
      Null: `"The number <n> contains <zeros> zeros in the significant digits of the binary representation!"`
- Nach der Ausgabe wird das Programm erfolgreich mit dem Rückgabewert `EXIT_SUCCESS` beendet.

## Hinweise

- Es wird angenommen, dass die signifikanten Stellen der Binärrepräsentation der Dezimalzahl $`0`$ eine Null beinhalten.
- Halten Sie sich genau an das Format der Beispiele und geben Sie keine weiteren Texte aus!
- Mithilfe des folgenden Codefragments können Sie mit `scanf` bzw. `printf` die Variable `value` vom Typ `uint32_t`
  einlesen bzw. ausgeben. Beachten Sie, dass Sie für die Konstanten `SCNu32` und `PRIu32` den Header `inttypes.h`
  inkludieren müssen.

  ```c
  scanf("%" SCNu32, &value);
  printf("%" PRIu32, value);
  ```

## Beispiele

Beispiel 1: Programmablauf bei der Eingabe von `5`. Die Zahl $`5`$ in der ersten Zeile der Beispielausgabe wurde durch
den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden. Die Dezimalzahl `5` entspricht der Binärzahl `101`.

```text
value: 5

The number 5 contains 1 zero in the significant digits of the binary representation!

```

Beispiel 2: Programmablauf bei der Eingabe von `3`. Die Zahl $`3`$ in der ersten Zeile der Beispielausgabe wurde durch
den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden. Die Dezimalzahl `3` entspricht der Binärzahl `11`. 


```text
value: 3

The number 3 contains 0 zeros in the significant digits of the binary representation!

```

Beispiel 3: Programmablauf bei der Eingabe von `64`. Die Zahl $`64`$ in der ersten Zeile der Beispielausgabe wurde durch
den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden. Die Dezimalzahl `64` entspricht der Binärzahl `1000000`.

```text
value: 64

The number 64 contains 6 zeros in the significant digits of the binary representation!

```

Beispiel 4: Programmablauf bei der Eingabe von `0`. Die Zahl $`0`$ in der ersten Zeile der Beispielausgabe wurde durch
den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
value: 0

The number 0 contains 1 zero in the significant digits of the binary representation!

```

# Aufgabe 5 (8 Punkte)

## Vorlesungsfolien

* Vorschau (EidP-02-Vorschau.pdf)

## Beschreibung

Erstellen Sie ein C-Programm, welches alle Primzahlen zwischen den zwei Grenzen `lower` und `upper` (inklusive der
Grenzen) ausgibt. Die beiden Grenzen `lower` und `upper` werden von dem\*der Benutzer\*in mittels `scanf` als
Ganzzahlen (`int`) eingelesen.

## Ablauf

- Das Programm gibt den Text `"Lower bound: "` auf der Standardausgabe aus.
- Der\*die Benutzer\*in gibt einen Wert für `lower` ein.
- Das Programm gibt den Text `"Upper bound: "` auf der Standardausgabe aus.
- Der\*die Benutzer\*in gibt einen Wert für `upper` ein.
- Ausgabe eines Zeilenumbruchs.
- Ausgehend vom Wert `lower` werden die Primzahlen zeilenweise mit einer Mindestbreite von drei auf der Standardausgabe
  ausgegeben. Dafür werden in jeder Zeile – mit Ausnahme der letzten Zeile – genau 15 Primzahlen ausgegeben. Die letzte
  Zeile beinhaltet maximal 15 Primzahlen. Zwischen den Primzahlen wird jeweils ein Leerzeichen als Trennzeichen
  verwendet.

## Hinweise

- Für die Formatierung der Ausgabe können Sie annehmen, dass das Programm für maximal dreistellige Zahlen verwendet
  wird.
- Sofern es im angegebenen Bereich keine Primzahlen gibt, erfolgt keine Ausgabe.
- Halten Sie sich genau an das Format der Beispiele und geben Sie keine weiteren Texte aus!
- Erinnern Sie sich: Mithilfe des Formatspecifier `% 3d` kann ein `int`-Wert mit der Mindestbreite von drei ausgegeben
  werden. Sofern der Wert weniger als drei Stellen hat, werden vor der Zahl Leerzeichen eingefügt, sodass die
  Mindestbreite von drei immer eingehalten wird.

## Beispiele

Beispiel 1: Möglicher Programmablauf bei der Eingabe der Grenzen `lower` = 3 und `upper` = 200. Die Zahlen `3` und `200`
in den ersten beiden Zeilen der Beispielausgabe wurden durch den\*die Benutzer\*in eingegeben und sollen nicht von Ihrem
Programm ausgegeben werden.

```text
Lower bound: 3
Upper bound: 200

  3   5   7  11  13  17  19  23  29  31  37  41  43  47  53
 59  61  67  71  73  79  83  89  97 101 103 107 109 113 127
131 137 139 149 151 157 163 167 173 179 181 191 193 197 199
```

Beispiel 2: Möglicher Programmablauf bei der Eingabe der Grenzen `lower` = `100` und `upper` = `400`. Die Zahlen `100`
und `400`
in den ersten beiden Zeilen der Beispielausgabe wurden durch den\*die Benutzer\*in eingegeben und sollen nicht von Ihrem
Programm ausgegeben werden.

```text
Lower bound: 100
Upper bound: 400

101 103 107 109 113 127 131 137 139 149 151 157 163 167 173
179 181 191 193 197 199 211 223 227 229 233 239 241 251 257
263 269 271 277 281 283 293 307 311 313 317 331 337 347 349
353 359 367 373 379 383 389 397
```

Beispiel 3: Möglicher Programmablauf bei der Eingabe der Grenzen `lower` = `100` und `upper` = `2`. Die Zahlen `100`
und `2` in den ersten beiden Zeilen der Beispielausgabe wurden durch den\*die Benutzer\*in eingegeben und sollen nicht
von Ihrem Programm ausgegeben werden.

```text
Lower bound: 100
Upper bound: 2

```
