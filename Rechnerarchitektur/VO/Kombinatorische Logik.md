- [[#Vor-/Nachteile Analogrechner | Digitalrechner|Vor-/Nachteile Analogrechner | Digitalrechner]]
- [[#Kombinatorische Logik|Kombinatorische Logik]]
- [[#Definition|Definition]]
- [[#Elementare Operatoren|Elementare Operatoren]]
- [[#Boolesche Axiome|Boolesche Axiome]]
- [[#Sätze|Sätze]]
- [[#Weitere Eigenschaften einer Booleschen Algebra|Weitere Eigenschaften einer Booleschen Algebra]]
- [[#De Morgansche Gesetze|De Morgansche Gesetze]]
- [[#Einstellige Boolesche Funktionen|Einstellige Boolesche Funktionen]]
- [[#Zweistellige Boolesche Funktionen|Zweistellige Boolesche Funktionen]]
	- [[#Zweistellige Boolesche Funktionen#Wichtige Bezeichnungen der zweistelligen Booleschen Funktionen|Wichtige Bezeichnungen der zweistelligen Booleschen Funktionen]]
- [[#Gatter|Gatter]]
- [[#Entwurfskriterien|Entwurfskriterien]]
	- [[#Entwurfskriterien#Laufzeitverhalten|Laufzeitverhalten]]
- [[#Wahrheitstabelle → Boolescher Ausdruck (KDNF und KKNF)|Wahrheitstabelle → Boolescher Ausdruck (KDNF und KKNF)]]
- [[#Bemerkung: Technische Realisierung|Bemerkung: Technische Realisierung]]
- [[#Resolutionsregeln|Resolutionsregeln]]
- [[#Karnaugh-Veitch-Diagramme (KV-Diagramme)|Karnaugh-Veitch-Diagramme (KV-Diagramme)]]
- [[#Dekodierer|Dekodierer]]
- [[#Kodierer|Kodierer]]
	- [[#Kodierer#Prioritätskodierer|Prioritätskodierer]]
- [[#Multiplexer|Multiplexer]]
	- [[#Multiplexer#Demultiplexer|Demultiplexer]]

# Einleitung

- Ziel: Entwurf digitaler logischer Schaltungen (UND, ODER, NICHT usw.)
- Kombinatorische Logik: Die Ausgänge hängen **nur von den aktuellen Eingängen** ab, es gibt keinen Speicher. Das Gegenstück ist die [[Sequenzielle Logik]].

---

# 1. Grundlagen der Digitaltechnik

![[Pasted image 20261028104214.png]]

Ein analoges Signal hat unendlich viele mögliche Werte. Die Digitaltechnik **diskretisiert** es, d. h. sie beschränkt die Werte auf endlich viele (z. B. $0, 1, 10, 11, \dots$).

- Binäre Werte können auch als **0/1, L/H (Low/High) oder F/T (falsch/wahr)** dargestellt werden.
- **Alle Arten von Daten werden digital als diskrete Zahlen gespeichert** (z. B. Text als ASCII, Bilder als Pixelwerte).

## Vor-/Nachteile Analogrechner | Digitalrechner

Analogrechner rechnen mit kontinuierlichen Signalen (z. B. Spannungen), Digitalrechner nur mit 0 und 1.

| |Analogrechner|Digitalrechner|
|---|---|---|
|Signal|kontinuierlich|diskret (0/1)|
|Genauigkeit|begrenzt durch Rauschen und Bauteiltoleranzen|beliebig steigerbar (mehr Bits)|
|Störanfälligkeit|hoch|gering (nur zwei Pegel müssen unterschieden werden)|
|Speichern/Kopieren|verlustbehaftet|verlustfrei|
|Flexibilität|feste Schaltung pro Aufgabe|frei programmierbar|


## Kombinatorische Logik

- Digitale Zustände werden durch **Gatter** miteinander verknüpft, sodass sich aus den Eingangszuständen ein Ausgangszustand ergibt.
- Mehrstellige digitale Signale werden durch **Vektoren** dargestellt, z. B. $x = (x_2, x_1, x_0)$.

---

# 2. Boolesche Algebra

## Definition

Die Kombination der Booleschen Menge $B = {0,1}$ mit den Operatoren **OR, AND und NOT** wird als **Boolesche Algebra** bezeichnet. ![[Pasted image 20261028104732.png]]

## Elementare Operatoren

![[Pasted image 20261028104802.png]]

|Operator|Schreibweise|Ergebnis|
|---|---|---|
|OR|$a + b$|1, wenn **mindestens ein** Eingang 1 ist|
|AND|$a \cdot b$|1, wenn **alle** Eingänge 1 sind|
|NOT|$\overline{a}$|invertiert den Eingang|

## Boolesche Axiome

![[Pasted image 20261021090738.png]]

## Sätze

![[Pasted image 20261021090751.png]]

## Weitere Eigenschaften einer Booleschen Algebra

- **Komplement**
    - $\overline{0} = 1$ und $\overline{1} = 0$
- **Abgeschlossenheit**
    - Boolesche Operationen liefern nur boolesche Werte als Ergebnis.
- **Dualität**
    - Für jede aus den Axiomen ableitbare Aussage existiert eine **duale Aussage**. Man erhält sie durch Vertauschen der Operatoren $+$ und $\cdot$ sowie der Werte $0$ und $1$.

## De Morgansche Gesetze

Wichtig für die Vereinfachung von Formeln und für die [[#5. Normalformen (Kanonische Darstellungen)|Normalformen]].

Sie beschreiben, wie man einen **gesamten Ausdruck negiert**: Die Negation wird "hineingezogen", dabei wechselt der Operator (AND ↔ OR).

1. $\overline{a \cdot b} = \overline{a} + \overline{b}$ 
    
2. $\overline{a + b} = \overline{a} \cdot \overline{b}$ 
    

Beispiel: ![[Pasted image 20261028105739.png]]

---

# 3. Boolesche Funktionen

Eine Schaltfunktion mit $m = 1$ Ausgang heißt **$n$-stellige Boolesche Funktion**, mit $n$ Eingängen und einem Ausgang.

- Jede Belegung der Eingänge kann auf 0 oder 1 abgebildet werden. Eine Wahrheitstabelle hat $2^n$ Zeilen, also gibt es $2^{2^n}$ verschiedene Boolesche Funktionen mit $n$ Eingängen.
- Beispiele: $n = 1 \Rightarrow 2^2 = 4$ Funktionen, $n = 2 \Rightarrow 2^4 = 16$ Funktionen.

## Einstellige Boolesche Funktionen

![[Pasted image 20261028110322.png]]

## Zweistellige Boolesche Funktionen

![[Pasted image 20261028110502.png]] ![[Pasted image 20261028110515.png]]

### Wichtige Bezeichnungen der zweistelligen Booleschen Funktionen

|Bezeichnung|Gatter / Bedeutung|Formel|
|---|---|---|
|Konjunktion|AND – [[#Gatter]]|$a \cdot b$|
|Disjunktion|OR – [[#Gatter]]|$a + b$|
|Antivalenz|XOR – [[#Gatter]] (genau eine Eingabe ist 1)|$a \oplus b$|
|Äquivalenz|XNOR ("genau dann, wenn")|$\overline{a \oplus b}$|
|Negatdisjunktion|NOR – [[#Gatter]]|$\overline{a + b}$|
|Negatkonjunktion|NAND – [[#Gatter]]|$\overline{a \cdot b}$|
|Implikation|"wenn a, dann b"|$a \Rightarrow b = \overline{a} + b$|
|Negation|NOT – [[#Gatter]] (einstellig)|$\overline{a}$|

---

# 4. Realisierung in Schaltungen

Die wichtigsten Booleschen Funktionen werden als eigene **Gatter** realisiert.

## Gatter

![[Pasted image 20261021092331.png]] Siehe auch: [[#Wichtige Bezeichnungen der zweistelligen Booleschen Funktionen]]

## Entwurfskriterien

- **Flächenbedarf** → Anzahl der Gatter → Produktionskosten
- **Energieverbrauch**
- **Schaltgeschwindigkeit** → Anzahl der Schaltebenen
- **Laufzeitverhalten**

### Laufzeitverhalten

Jedes Gatter braucht eine gewisse Zeit, um zwischen den beiden Zuständen umzuschalten (**Laufzeiteffekt**). Diese Zeit wird mit $\tau$ bezeichnet (wird im Kapitel [[Sequenzielle Logik]] wieder wichtig).

Durch unterschiedliche Laufzeiten auf verschiedenen Signalwegen kann es zu einer **Race Condition** kommen. Dadurch entstehen **Hazards**: ein unerwünschter Wert (Glitch) tritt am Ausgang kurzzeitig auf.

---

# 5. Normalformen (Kanonische Darstellungen)

Boolesche Funktionen lassen sich aus Produkt- und Summentermen aufbauen:

- **Produktterm** → Konjunktion von Variablen (UND)
- **Summenterm** → Disjunktion von Variablen (ODER)

Daraus ergeben sich:

- **DNF** (Disjunktive Normalform): Disjunktion von Produkttermen
- **KNF** (Konjunktive Normalform): Konjunktion von Summentermen

Eine ==🟣eindeutige== Darstellung einer Booleschen Funktion $f$ als

- **Disjunktion von Mintermen** (Produktterme, die _alle_ Variablen enthalten) heißt **KDNF** (Kanonische DNF),
- **Konjunktion von Maxtermen** (Summenterme, die _alle_ Variablen enthalten) heißt **KKNF** (Kanonische KNF).

## Wahrheitstabelle → Boolescher Ausdruck (KDNF und KKNF)

Zu jeder Booleschen Funktion gibt es genau eine KDNF und genau eine KKNF. Jede KDNF kann in eine KKNF umgewandelt werden und umgekehrt.

**KDNF**

1. Alle Zeilen betrachten, in denen der **Ausgang = 1** ist.
2. Pro Zeile einen Minterm (UND) bilden. Eingänge mit Wert **0** werden **negiert**.
3. Alle Minterme mit ODER verknüpfen.

**KKNF**

1. Alle Zeilen betrachten, in denen der **Ausgang = 0** ist.
2. Pro Zeile einen Maxterm (ODER) bilden. Eingänge mit Wert **1** werden **negiert**.
3. Alle Maxterme mit UND verknüpfen.

> [!example] Beispiel XOR ($y = 1$ bei $(0,1)$ und $(1,0)$)
> 
> - KDNF: $y = \overline{a},b + a,\overline{b}$
> - KKNF: $y = (a + b)(\overline{a} + \overline{b})$

## Bemerkung: Technische Realisierung

Eine Boolesche Funktion kann mit **maximal drei Gatterebenen** realisiert werden (Inverter, AND, OR). Sind alle Eingänge sowohl negiert als auch nicht negiert verfügbar, genügen **zwei** Ebenen.

Standardbauteile haben meist nur **zwei Eingänge**. Gatter mit mehr Eingängen werden daher aus mehreren 2-Eingangs-Gattern aufgebaut. Bei $k$ Eingängen:

- Anzahl Gatter: $k - 1$
- Anzahl Ebenen: $\lceil \log_2 k \rceil$

![[Pasted image 20261028150510.png]]

---

# 6. Minimierung

KDNF und KKNF sind zwar eindeutig, aber **nicht optimal** (viele Terme, viele Gatter). Ziel der Minimierung ist ein Ausdruck mit möglichst wenigen Termen und Literalen.

## Resolutionsregeln

Unterscheiden sich zwei Summanden/Faktoren in **genau einer** komplementären Variable, können beide Terme durch ihren **gemeinsamen Teil** ersetzt werden.

- DNF: $a,x + a,\overline{x} = a$
- KNF: $(a + x)(a + \overline{x}) = a$

## Karnaugh-Veitch-Diagramme (KV-Diagramme)

Grafisches Verfahren zur Minimierung. Die Zeilen und Spalten sind so angeordnet (**Gray-Code**), dass sich benachbarte Felder in genau einer Variable unterscheiden. Dadurch lassen sich Resolutionsregeln direkt ablesen: Benachbarte Einsen werden zu Blöcken der Größe $2^k$ (1, 2, 4, 8, ...) zusammengefasst, und jeder Block ergibt einen vereinfachten Term.

Wichtig: Die Ränder des Diagramms gelten als **benachbart** (zyklisch).

2 Variablen: ![[Pasted image 20261028151159.png]] 3 Variablen: ![[Pasted image 20261028151211.png]] 4 Variablen: ![[Pasted image 20261028151224.png]]

![[Pasted image 20261028150909.png]]

---

# 7. Typische Schaltnetze

Eine Schaltung kann mehrere Ausgänge haben. Dann gibt es für jeden Ausgang $m$ eine eigene Boolesche Funktion $y_m = f_m(x_1, \dots, x_n)$.

## Dekodierer

Ein **Dekodierer** (Decoder) wandelt einen $n$-stelligen Binärcode in eine **1-aus-$2^n$-Darstellung** um: Genau ein Ausgang ist 1, nämlich der, dessen Nummer dem Eingangswert entspricht.

- $n$ Eingänge, $2^n$ Ausgänge
- Jeder Ausgang ist genau ein **Minterm** der Eingänge.
- Typische Anwendungen: Adressdekodierung (Speicher), Ansteuerung von 7-Segment-Anzeigen, Auswahl von Bausteinen (Chip-Select)

**Beispiel: 2-zu-4-Dekodierer**

|$x_1$|$x_0$|$y_0$|$y_1$|$y_2$|$y_3$|
|---|---|---|---|---|---|
|0|0|1|0|0|0|
|0|1|0|1|0|0|
|1|0|0|0|1|0|
|1|1|0|0|0|1|

$$y_0 = \overline{x_1},\overline{x_0} \qquad y_1 = \overline{x_1},x_0 \qquad y_2 = x_1,\overline{x_0} \qquad y_3 = x_1,x_0$$

Oft gibt es zusätzlich einen **Enable-Eingang** $E$: Ist $E = 0$, sind alle Ausgänge 0. Dann wird jeder Term zusätzlich mit $E$ verundet.

## Kodierer

Ein **Kodierer** (Encoder) ist die Umkehrung des Dekodierers: Er wandelt eine **1-aus-$2^n$-Darstellung** in einen $n$-stelligen Binärcode um.

- $2^n$ Eingänge, $n$ Ausgänge
- Es darf **genau ein Eingang** 1 sein. Sind mehrere Eingänge gleichzeitig 1 (oder keiner), ist das Ergebnis undefiniert.

**Beispiel: 4-zu-2-Kodierer**

|$x_3$|$x_2$|$x_1$|$x_0$|$y_1$|$y_0$|
|---|---|---|---|---|---|
|0|0|0|1|0|0|
|0|0|1|0|0|1|
|0|1|0|0|1|0|
|1|0|0|0|1|1|

$$y_1 = x_2 + x_3 \qquad y_0 = x_1 + x_3$$

(Alle anderen Eingangskombinationen sind nicht zugelassen und werden als Don't Care behandelt, deshalb ist $x_0$ nicht nötig.)

### Prioritätskodierer

Beim **Prioritätskodierer** dürfen mehrere Eingänge gleichzeitig 1 sein. Es zählt der Eingang mit der **höchsten Priorität** (hier: höchster Index). Ein zusätzlicher Ausgang $g$ zeigt an, ob überhaupt ein Eingang aktiv ist.

$$y_1 = x_3 + x_2 \qquad y_0 = x_3 + \overline{x_2},x_1 \qquad g = x_3 + x_2 + x_1 + x_0$$

Anwendung: Interrupt-Steuerung (welche Unterbrechung wird zuerst bedient?)

## Multiplexer

Ein **Multiplexer** (MUX) ist ein **digitaler Umschalter**: Über $n$ **Steuereingänge** (Select) wird einer von $2^n$ **Dateneingängen** auf den einen Ausgang durchgeschaltet.

- $2^n$ Dateneingänge $d_i$, $n$ Steuereingänge $s$, 1 Ausgang $y$
- $y = d_i$, wobei $i$ der durch $s$ codierte Wert ist.

**2-zu-1-Multiplexer**

|$s$|$y$|
|---|---|
|0|$d_0$|
|1|$d_1$|

$$y = \overline{s},d_0 + s,d_1$$

**4-zu-1-Multiplexer**

$$y = \overline{s_1},\overline{s_0},d_0 + \overline{s_1},s_0,d_1 + s_1,\overline{s_0},d_2 + s_1,s_0,d_3$$

Das ist eine **UND-ODER-Struktur**: Ein Dekodierer der Steuereingänge schaltet das jeweilige UND-Gatter frei, das ODER sammelt alles am Ausgang.

> [!tip] Multiplexer als universelle Funktionsgeneratoren Mit einem $2^n$-zu-1-Multiplexer lässt sich **jede** Boolesche Funktion mit $n$ Variablen realisieren: Die Variablen kommen an die Steuereingänge, an die Dateneingänge werden die **Funktionswerte der Wahrheitstabelle** (0 oder 1) gelegt.

### Demultiplexer

Der **Demultiplexer** (DEMUX) ist die Umkehrung: Ein Dateneingang $d$ wird über die Steuereingänge auf einen von $2^n$ Ausgängen geleitet, die anderen Ausgänge sind 0.

$$y_i = d \text{ falls } s = i, \text{ sonst } y_i = 0$$

Ein Dekodierer mit Enable-Eingang ist ein Demultiplexer, wenn man den Enable-Eingang als Dateneingang $d$ verwendet.

# Bemerkung: OTP Logikanordnung

**OTP** steht für **One Time Programmable**, also **einmalig programmierbar**. Eine Logikanordnung (z. B. **PLA**/**PAL** oder ein **ROM**) besteht aus zwei Ebenen:

- einer **UND-Ebene**, die Produktterme bildet,
- einer **ODER-Ebene**, die diese zu Summen verknüpft.

Damit lässt sich jede Boolesche Funktion in **disjunktiver Form (DNF)** realisieren. Die Verbindungen zwischen den Leitungen werden einmalig durch das Durchbrennen von Sicherungen (**Fuses**) oder das Herstellen von Verbindungen (**Antifuses**) festgelegt und können danach **nicht mehr verändert** werden.</new_str>