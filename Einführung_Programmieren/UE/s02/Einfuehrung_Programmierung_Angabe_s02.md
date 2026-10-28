# Aufgabe 1 (4 Punkte)

## Vorlesungsfolien

* Variablen und Datentypen (EidP-03-VariablenDatentypen.pdf)

## Beschreibung

### Teilaufgabe a)

Beantworten Sie folgende Fragen:

1. Welche grundlegenden arithmetischen Datentypen stellt die Programmiersprache C bereit?
2. Wovon ist die Speichergröße der Basistypen für ganze Zahlen abhängig? Gibt es Datentypen, die garantiert immer
   dieselbe Größe haben?
3. Wie unterscheidet sich die Speichergröße von vorzeichenlosen und vorzeichenbehafteten Ganzzahlen? Können beide gleich
   viele unterschiedliche Werte abbilden? Warum?

### Teilaufgabe b)

Es folgt eine Liste mit Beschreibungen von Variablen. Geben Sie jeweils einen sinnvollen Namen und Typ für die Variable
an:

1. Eine Variable, welche innerhalb einer `while`-Schleife zum Zählen verwendet wird.
2. Eine Variable, welche die Note einer Lehrveranstaltung enthält. Die Note kann A, B, C, D oder F sein.
3. Eine Variable, welche die Anzahl an Kaffees, die eine Person an einem Tag getrunken hat, enthält.
4. Eine Variable, welche das Gewicht einer Person in Kilogramm enthält. Das Gewicht wird mit einer Personenwaage mit
   einer Genauigkeit von $`\pm`$ 0,5 Kilogramm gemessen.
5. Eine Variable, welche festhält, ob ein Flugzeug voll ist oder nicht.
6. Eine Variable, welche den Äquatordurchmesser eines Planeten in
   unserem [Sonnensystem](https://en.wikipedia.org/wiki/Solar_System) in Meter angibt.

# Aufgabe 2 (5 Punkte)

## Vorlesungsfolien

* Variablen und Datentypen (EidP-03-VariablenDatentypen.pdf)

## Beschreibung

Geben Sie den Datentyp und den Wert im Dezimalsystem der folgenden C-Literale an:

1. `25`
2. `3e3L`
3. `7L`
4. `54102`
5. `0.425`
6. `9.L`
7. `0xBull`
8. `084`
9. `'A'`
10. `0xcoffee`
11. `3.21f`
12. `034`
13. `6e-3`
14. `'\n'`
15. `0xcafe`
16. `0.3`
17. `63u`
18. `.2f`
19. `0xFL`
20. `'9'`

*Achtung:* Es haben sich ungültige Literale eingeschlichen! Markieren Sie diese mit „ungültig“.

### Hinweise

- Nehmen Sie für Zeichen an, dass ein ASCII-Code kompatibler Zeichensatz verwendet wird!

# Aufgabe 3 (5 Punkte)

## Vorlesungsfolien

* Variablen und Datentypen (EidP-03-VariablenDatentypen.pdf)

## Teilaufgabe a)

### Beschreibung

In dieser Aufgabe sollen diverse Ausgaben mit `printf` durch entsprechende Formatstrings ausgegeben werden. Verwenden
Sie das vorgegebene C-Programm als Grundlage für die Ausarbeitung der Arbeitsschritte. Nach jedem Arbeitsschritt muss
eine zusätzliche Leerzeile ausgegeben werden.

### Arbeitsschritte

1. Geben Sie den Text `"a = <a>\nb = <b>\nc = <c>\nd = <d>\ne = <e>\nf = <f>\ng = <g>\n"` auf der Standardausgabe aus,
   wobei die Platzhalter `<a>`, `<b>`, `<c>`, `<d>`, `<e>`, `<f>` und `<g>` wie folgt ersetzt werden:
    - `<a>`: Wert der Variable `a` als Zeichen
    - `<b>`: Wert der Variable `b` als Dezimalzahl
    - `<c>`: Wert der Variable `c` als Dezimalzahl, wobei das Vorzeichen immer ausgegeben werden soll.
    - `<d>`: Wert der Variable `d` als Dezimalzahl
    - `<e>`: Wert der Variable `e` als Dezimalzahl
    - `<f>`: Wert der Variable `f` als Dezimalzahl mit 2 Nachkommastellen
    - `<g>`: Wert der Variable `g` als Dezimalzahl in Exponentialdarstellung mit kleingeschriebenem e und 5
      Nachkommastellen.
2. Geben Sie den Text `"f_10 = <f>\n"`, wobei der Platzhalter `<f>` durch den Wert von `f` als Gleitkommazahl mit zehn
   Nachkommastellen ersetzt werden soll. Was beobachten Sie bei dieser Ausgabe? Dokumentieren Sie Ihre Erkenntnisse
   mithilfe von Kommentaren im Code!
3. Geben Sie den Text `"d_pad = <d>\n"`, wobei der Platzhalter `<d>` durch den Wert von `d` als Dezimalzahl mit einer
   Mindestbreite von $`c - b`$ Stellen ersetzt werden soll. Sofern die Zahl `d` weniger als diese aus der Differenz
   von `c` und `b` angegebenen Stellen aufweist, werden von links Nullen eingefügt (engl. zero padding).
4. Geben Sie den Text `"a = <a>\nb = <b>\nc = <c>\nd = <d>\ne = <e>\nf = <f>\ng = <g>\n"` auf der Standardausgabe aus,
   wobei alle Platzhalter mit Dezimalzahlen ersetzt werden sollen, sodass die Dezimalstellen (z. B. Einer-, Zehner-,
   Hunderterstelle, usw.) der sieben Zahlen untereinander stehen. Für die rechtsbündige Ausgabe sollen $`16`$
   Vorkommastellen angenommen werden und für alle Gleitkommazahlen sollen vier Nachkommastellen ausgegeben werden.

### Hinweise

- Die Handbuchseite `man 3 printf` kann zum Identifizieren der notwendigen Formatspecifier behilflich sein.
- Verwenden Sie für alle Transformationen nur `printf` und keine eigens implementierte Logik.
- Verwenden Sie in den `printf`-Aufrufen ausschließlich die bereits deklarierten Variablen ohne jegliche Veränderung von
  den Werten dieser Variablen.
- Stellen Sie sicher, dass vor dem Zeilenumbruch kein Leerzeichen ausgegeben wird.
- Um die Korrektheit Ihres Programms zu überprüfen, werden bei Ein-/Ausgabetests mit Substitution teilweise die Werte
  von Variablen in Ihrem Programm verändert! Sofern in diesem Test Fehler auftreten, stellen Sie bitte sicher, dass Sie
  die entsprechenden Formatspecifier verwenden!

### Tests


## Teilaufgabe b)

Folgender Code ist gegeben.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int zero;
    printf("zero = %hd\n", zero);
    return EXIT_SUCCESS;
}

```

Studieren Sie den Code und analysieren, ob bei diesem Programm Probleme auftreten können. Sie können das Programm
beispielsweise mehrfach ausführen. Dokumentieren Sie Ihre Erkenntnisse mithilfe von Kommentaren im Code!

### Hinweise

- Um den für Teilaufgabe b gegebenen Code zu kompilieren, müssen Sie `gcc` lediglich mit den
  Optionen `-Wall -Wextra -Wpedantic -std=c18` aufrufen!

# Aufgabe 4 (5 Punkte)

## Vorlesungsfolien

* Vorschau (EidP-02-Vorschau.pdf)

## Beschreibung

Erstellen Sie ein C-Programm, welches mithilfe einer `while`-Schleife die Ziffern einer eingelesenen nicht negativen
Ganzzahl `number`, d. h. $`0 \leq \texttt{number} \leq \texttt{INT\_MAX}`$, in umgekehrter Reihenfolge auf der
Standardausgabe ausgibt. Die Ganzzahl (`int`) `number` wird von dem\*der Benutzer\*in eingelesen.

### Ablauf

- Der\*die Benutzer\*in gibt einen Wert für `number` ein.
    - Wird ein negativer Wert eingegeben, gibt das Programm eine Fehlermeldung auf der Standardausgabe aus. Anschließend
      wird das Programm nicht erfolgreich mit dem Rückgabewert `EXIT_FAILURE` beendet. Sie können einen entsprechenden,
      sinnvollen Text für die Fehlermeldung frei wählen!
- Ausgabe eines Zeilenumbruchs.
- Der Text `"input:  <number>\noutput: "` wird auf der Standardausgabe ausgegeben, wobei der Platzhalter `<number>`
  durch den gewählten Wert von `number` ersetzt wird.
- Schrittweise werden die Ziffern der Zahl `number` in umgekehrter Reihenfolge auf der Standardausgabe ausgegeben.

### Beispielausgaben

Beispiel 1: Programmablauf bei der Eingabe der Zahl `1234`. Die Zahl `1234` in der ersten Zeile der Beispielausgabe
wurde durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
1234

input:  1234
output: 4321
```

Beispiel 2: Programmablauf bei der Eingabe der Zahl `510`. Die Zahl `510` in der ersten Zeile der Beispielausgabe wurde
durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
510

input:  510
output: 015
```

Beispiel 3: Programmablauf bei der Eingabe der Zahl `0001`. Die Zahl `0001` in der ersten Zeile der Beispielausgabe
wurde durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
0001

input:  1
output: 1
```

Beispiel 4: Programmablauf bei der Eingabe der Zahl `1000`. Die Zahl `1000` in der ersten Zeile der Beispielausgabe
wurde durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
1000

input:  1000
output: 0001
```

### Hinweise

- Die Konstante `INT_MAX` ($`\texttt{INT\_MAX} \geq 32767`$) stellt den plattformabhängigen Maximalwert des
  Datentyps `int` dar.
- Sie können das Programm `s02e04.c` als Grundlage für Ihre Implementierung heranziehen. Dieses Programm liest eine
  Ganzzahl `number` vom Typ `int` ein und gibt den Wert von `number` anschließend auf der Standardausgabe aus (sofern
  beim Einlesen kein Fehler auftrat).
- Die letzte Ziffer der Dezimalzahl `number` können Sie mithilfe des Ausdrucks `n % 10` berechnen (Restwert).
- Die letzte Ziffer der Dezimalzahl `number` können Sie mithilfe des Ausdrucks `n / 10` "abschneiden" (Ganzzahldivision)
  .
- Halten Sie sich genau an das Format der Beispiele und geben Sie keine weiteren Texte aus!

# Aufgabe 5 (5 Punkte)

## Vorlesungsfolien

* Vorschau (EidP-02-Vorschau.pdf)

## Beschreibung

Erstellen Sie ein C-Programm, welches mithilfe einer `while`-Schleife die Summe aller Ganzzahlen von 1 bis `n`
berechnet ($`\sum_{i=1}^{n} i`$).

### Arbeitsschritte

Führen Sie folgende Arbeitsschritte aus:
- Lesen Sie vom Benutzer eine Ganzzahl (`n`) ein
- Berechnen Sie mithilfe einer `while`-Schleife die Summe der Zahlen von `1` bis `n`.
- Geben Sie den Text `"sum from 1 to <n> = <sum>"` aus, wobei anstelle von `<n>` bzw. `<sum>` der Wert der Variable `n`
  bzw. `sum` ausgegeben wird!
- Nach der Ausgabe wird das Programm erfolgreich (`EXIT_SUCCESS`) beendet.

### Hinweise

- Artemis gibt beim Testen für die Variable `n` nur Werte zwischen $`0`$ und $`1000`$, d. h.
  $`0 \le \mathtt{n} \le 1000`$, ein.
- Verwenden Sie `scanf` für das Einlesen von `n`.

### Beispielausgaben

Beispiel 1: Programmablauf bei der Eingabe der Zahlen `5`. Die Zahl `5` in ersten Zeile der Beispielausgabe wurde durch
den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```
5
sum from 1 to 5 = 15
```

Beispiel 2: Programmablauf bei der Eingabe der Zahlen `100`. Die Zahl `100` in ersten Zeile der Beispielausgabe wurde
durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```
100
sum from 1 to 100 = 5050
```

# Aufgabe 6 (6 Punkte)

## Vorlesungsfolien

* Variablen und Datentypen (EidP-03-VariablenDatentypen.pdf)

## Beschreibung

Erstellen Sie ein C-Programm, welches alle Buchstaben zwischen zwei Buchstaben (inklusive der Grenzen) in entsprechender
Reihenfolge untereinander auf der Standardausgabe ausgibt. Die zwei Buchstaben werden als Zeichen von dem\*der Benutzer\*in
eingelesen.

## Ablauf

- Der\*die Benutzer\*in gibt den Start- und Endwert im Format `<start>-<end>` ein.
    - Bei dieser Eingabe werden nur Kleinbuchstaben akzeptiert. Wird ein anderes Zeichen eingegeben, gibt das Programm
      nach der Eingabe die Fehlermeldung `"ERROR: At least one input was not a lowercase letter!"` auf der
      Standardausgabe aus und beendet nicht erfolgreich (`EXIT_FAILURE`).
- Ausgabe eines Zeilenumbruchs.
- Ausgehend vom zuerst eingegebenen Buchstaben werden alle Buchstaben bis zum zweiten Buchstaben in entsprechender
  Reihenfolge untereinander auf der Standardausgabe ausgegeben.

## Beispielausgaben

Beispiel 1: Programmablauf bei der Eingabe der Zeichen `a` und `d`. Der Text `a-d` in der ersten Zeile der
Beispielausgabe wurde durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
a-d

a
b
c
d
```

Beispiel 2: Programmablauf bei der Eingabe der Zeichen `d` und `a`. Der Text `d-a` in der ersten Zeile der
Beispielausgabe wurde durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
d-a

d
c
b
a
```

Beispiel 3: Programmablauf bei der Eingabe der Zeichen `u` und `u`. Der Text `u-u` in der ersten Zeile der
Beispielausgabe wurde durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
u-u

u
```

Beispiel 4: Programmablauf bei der Eingabe der Zeichen `A` und `d`. Der Text `A-d` in der ersten Zeile der
Beispielausgabe wurde durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
A-d

ERROR: At least one input was not a lowercase letter!
```

## Hinweise

- Halten Sie sich genau an das Format der Beispiele und geben Sie keine weiteren Texte aus!
