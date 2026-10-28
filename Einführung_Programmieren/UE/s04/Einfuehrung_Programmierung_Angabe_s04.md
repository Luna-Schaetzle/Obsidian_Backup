# Aufgabe 1 (5 Punkte)

## Vorlesungsfolien

* Kontrollstrukturen (EidP-05-Kontrollstrukturen.pdf)

## Beschreibung 

In dieser Aufgabe muss die Erreichbarkeit von bestimmten Positionen basierend auf der Initialisierung der Variablen `a`
und `b` ermittelt werden. Dafür ist der folgende Code gegeben.

```c
#include <stdlib.h>

int main(void) {
    int a, b;
    // initialize variables
    if (a < b) {
        // position 1
        if (a > 10) {
            // position 2
        }
    } else if ((a > b) && !(a < 30)) {
        if (a > 50 && b <= 50) {
            // position 3
        } else {
            // position 4
        }
    } else {
        // position 5
        if (4 & 2) {
            // position 6
        } else if ((a = 2)) {
            // position 7
        }
    }
    if (++a == 3) {
        // position 8
    } else if (b) {
        // position 9 (challenge)
    }
    // position 10
    return EXIT_SUCCESS;
}

```

Beschreiben Sie unter welcher Bedingung die Positionen (1-8 und 10) im Code basierend auf der Initialisierung der
Variablen `a` und `b` erreicht werden können, indem Sie die Tabelle in der Datei `s04e01.txt` ausfüllen. Sofern die
betrachtete Position erreichbar ist, geben Sie, neben der Bedingung wie diese Position erreicht werden kann, eine
mögliche Belegung der Variablen `a` und `b` an.

Sie können optional – als zusätzliche kleine Herausforderung – die notwendige Bedingung und eine mögliche
Beispielbelegung, um Position 9 zu erreichen, ermitteln.

# Aufgabe 2 (6 Punkte)

## Vorlesungsfolien

* Variablen und Datentypen (EidP-03-VariablenDatentypen.pdf)
* Kontrollstrukturen (EidP-05-Kontrollstrukturen.pdf)

## Beschreibung

In dieser Aufgabe soll eine Ampel simuliert werden, deren Farben (Grün, Gelb, Rot) über einen `enum` repräsentiert
werden. Nachdem der Benutzer die Startfarbe und die Anzahl an Simulationsschritten eingegeben hat, soll die Ampel die
entsprechende Anzahl an Farbumschaltungen durchführen und jeweils die aktuelle Farbe ausgeben (siehe Beispiele).

## Ablauf

- Das Programm gibt den Text `"start (1=green, 2=red): "` auf der Standardausgabe aus.
- Der\*die Benutzer\*in gibt einen Dezimalwert für `start` ein. Wird keine Ganzzahl eingegeben, dann wird das Programm
  als nicht erfolgreich beendet.
- Das Programm gibt den Text `"steps: "` auf der Standardausgabe aus.
- Der\*die Benutzer\*in gibt einen Dezimalwert für `steps` ein. Wird keine Ganzzahl eingegeben oder ist `steps` kleiner
  als `0`, dann wird das Programm
  als nicht erfolgreich beendet.
- Ausgabe eines Zeilenumbruchs.
- Bestimmen Sie die Startfarbe mittels einer `switch`- Anweisung wie folgt:
    - Hat `start` den Wert `1`: Startfarbe ist grün.
    - Hat `start` den Wert `2`: Startfarbe ist rot.
    - Hat `start` einen beliebigen anderen Wert: Startfarbe ist rot.
- Geben Sie die Startfarbe (in Englisch) aus.
- Schalten Sie nun `steps` mal die Farbe weiter und geben Sie die neue Farbe nach jedem Schritt aus. Die Umschaltung
  funktioniert dabei wie in Österreich üblich: `grün -> gelb -> rot -> gelb -> grün -> gelb -> ...` Verwenden Sie dazu
  ebenfalls eine `switch`-Anweisung und halten Sie sich dabei an das Format der Beispiele.

## Hinweise

- Sie müssen sich beim Umschalten von Gelb merken, von welcher Farbe Sie gekommen sind.
- Die Aufgabe stellt sicher, dass nicht direkt bei Gelb gestartet wird.

## Beispiele

Beispiel 1: Möglicher Programmablauf bei der Eingabe `start` = `1` und `steps` = `6`. Die Zahlen in der Beispielausgabe
wurden durch den\*die
Benutzer\*in eingegeben und sollen nicht von Ihrem Programm ausgegeben werden.

```text
start (1=green, 2=red): 1
steps: 6

green
yellow
red
yellow
green
yellow
red
```

Beispiel 2: Möglicher Programmablauf bei der Eingabe `start` = `2` und `steps` = `1`. Die Zahlen in der Beispielausgabe
wurden durch den\*die
Benutzer\*in eingegeben und sollen nicht von Ihrem Programm ausgegeben werden.

```text
start (1=green, 2=red): 2
steps: 1

red
yellow
```

Beispiel 3: Möglicher Programmablauf bei der Eingabe `start` = `2` und `steps` = `6`. Die Zahlen in der Beispielausgabe
wurden durch den\*die
Benutzer\*in eingegeben und sollen nicht von Ihrem Programm ausgegeben werden.

```text
start (1=green, 2=red): 8
steps: 10

red
yellow
green
yellow
red
yellow
green
yellow
red
yellow
green
```

Beispiel 4: Das Programm bricht nach falscher Eingabe ab:

```text
start (1=green, 2=red): abc
```

Beispiel 5: Das Programm bricht nach falscher Eingabe ab:

```text
start (1=green, 2=red): 1
steps: def
```

# Aufgabe 3 (4 Punkte)

## Vorlesungsfolien

* Operatoren und Ausdrücke (EidP-04-OperatorenAusdruecke.pdf)

## Beschreibung

Gegeben sei das folgende C-Programm.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int value;
    scanf("%d", &value);
    if (value % 3 == 0) {
        if (value % 7 != 0) {
            printf("%d is divisible by either 3 or 7\n", value);
        }
    }
    if (value % 3 != 0) {
        if (value % 7 == 0) {
            printf("%d is divisible by either 3 or 7\n", value);
        }
    }
    return EXIT_SUCCESS;
}
```

Verändern Sie die Struktur des Programms, sodass nur eine `if`-Anweisung benötigt wird, ohne dabei das beobachtbare
Verhalten des Programms zu verändern.

### Hinweise

- Eine Zahl $`a`$, die _entweder_ durch drei _oder_ sieben teilbar ist (engl. `"divisible by either 3 or 7"`) – d. h.
  $`3|a \oplus 7|a`$ –, ist nicht durch drei _und_ sieben teilbar – d. h. $`3|a \land 7|a`$.
- In Artemis wird bei dieser Aufgabe nur die Funktionalität Ihrer Lösung getestet.
- Stellen Sie sicher, dass in Ihrer Lösung nur eine `if`-Anweisung verwendet wird! Ansonsten werden Sie für diese
  Aufgabe keine Punkte erhalten.

# Aufgabe 4 (8 Punkte)

## Vorlesungsfolien

* Variablen und Datentypen (EidP-03-VariablenDatentypen.pdf)
* Kontrollstrukturen (EidP-05-Kontrollstrukturen.pdf)

## Beschreibung

Erstellen Sie ein C-Programm, welches den Umriss eines Dreiecks mit der Höhe `height` auf der Standardausgabe ausgibt.
Die Ganzzahl (`int`) `height` wird von dem\*der Benutzer\*in eingelesen.

## Ablauf

- Das Programm gibt den Text `"height: "` auf der Standardausgabe aus.
- Der\*die Benutzer\*in gibt die Höhe als Ganzzahl ein.
    - Wird durch die Eingabe das Format nicht erfüllt, wird das Programm mit einem entsprechenden Fehler beendet. Sie
      können einen entsprechenden, sinnvollen Text für die Fehlermeldung frei wählen!
    - Sofern die Höhe negativ ist, wird eine Fehlermeldung ausgegeben und das Programm nicht erfolgreich beendet. Sie
      können einen entsprechenden, sinnvollen Text für die Fehlermeldung frei wählen!
- Ausgabe eines Zeilenumbruchs.
- Das Dreieck wird entsprechend dem Format der Beispielausgaben auf der Standardausgabe ausgegeben.

## Hinweise

- Halten Sie sich genau an das Format der Beispiele und geben Sie keine weiteren Texte aus!

## Beispiele

Beispiel 1: Programmablauf bei der Eingabe `1`. Die Zahl $`1`$ in der ersten Zeile der Beispielausgabe wurde
durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
height: 1

x
```

Beispiel 2: Programmablauf bei der Eingabe `2`. Die Zahl $`2`$ in der ersten Zeile der Beispielausgabe wurde
durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
height: 2

 x
x x
```

Beispiel 3: Programmablauf bei der Eingabe `4`. Die Zahl $`4`$ in der ersten Zeile der Beispielausgabe wurde
durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
height: 4

   x
  x x
 x   x
x x x x
```

Beispiel 4: Programmablauf bei der Eingabe `7`. Die Zahl $`7`$ in der ersten Zeile der Beispielausgabe wurde
durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
height: 7

      x
     x x
    x   x
   x     x
  x       x
 x         x
x x x x x x x
```

# Aufgabe 5 (7 Punkte)

## Vorlesungsfolien

* Variablen und Datentypen (EidP-03-VariablenDatentypen.pdf)
* Kontrollstrukturen (EidP-05-Kontrollstrukturen.pdf)

## Beschreibung

Erstellen Sie ein C-Programm, welches eine Zifferntreppe mit der Höhe `height` auf der Standardausgabe ausgibt. Die
Ganzzahl (`int`) `height` wird von dem\*der Benutzer\*in eingelesen.

## Ablauf

- Das Programm gibt den Text `"height: "` auf der Standardausgabe aus.
- Der\*die Benutzer\*in gibt die Höhe als Ganzzahl ein.
    - Wird durch die Eingabe das Format nicht erfüllt, wird das Programm mit einem entsprechenden Fehler beendet. Sie
      können einen entsprechenden Text für die Fehlermeldung frei wählen!
    - Sofern die Höhe negativ ist, wird eine Fehlermeldung ausgegeben und das Programm nicht erfolgreich beendet. Sie
      können einen entsprechenden Text für die Fehlermeldung frei wählen!
- Ausgabe eines Zeilenumbruchs.
- Die Zifferntreppe wird entsprechend dem Format der Beispielausgaben auf der Standardausgabe ausgegeben. Beachten Sie,
  dass jede Zahl mit einer Mindestbreite von zwei Stellen ausgegeben wird. Sofern die ausgegebene Zahl weniger als diese
  zwei Stellen aufweist, werden von links Leerzeichen eingefügt. Innerhalb einer Zeile werden zwischen Zahlen keine
  weiteren Abstände ausgegeben.

## Beispiele

Beispiel 1: Programmablauf bei der Eingabe `height` = `2`. Die Zahl `2` in der ersten Zeile der Beispielausgabe wurde
durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
height: 2

   1
 1 2
```

Beispiel 2: Programmablauf bei der Eingabe `height` = `4`. Die Zahl `4` in der ersten Zeile der Beispielausgabe wurde
durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
height: 4

       1
     1 2
   1 2 3
 1 2 3 4
```

Beispiel 3: Programmablauf bei der Eingabe `height` = `12`. Die Zahl `12` in der ersten Zeile der Beispielausgabe wurde
durch den\*die Benutzer\*in eingegeben und soll nicht von Ihrem Programm ausgegeben werden.

```text
height: 12

                       1
                     1 2
                   1 2 3
                 1 2 3 4
               1 2 3 4 5
             1 2 3 4 5 6
           1 2 3 4 5 6 7
         1 2 3 4 5 6 7 8
       1 2 3 4 5 6 7 8 9
     1 2 3 4 5 6 7 8 910
   1 2 3 4 5 6 7 8 91011
 1 2 3 4 5 6 7 8 9101112
```

## Hinweise

- Halten Sie sich genau an das Format der Beispiele und geben Sie keine weiteren Texte aus!
- Geben Sie die Zahlen mit einer Mindestbreite von zwei Stellen aus. Sofern die ausgegebene Zahl weniger als diese zwei
  Stellen aufweist, werden von links Leerzeichen eingefügt.
