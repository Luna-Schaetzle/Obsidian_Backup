#Programmierung #C #Test-Vorbereitung

> [!abstract] Inhalt
> 
> 1. [[#01 – Einführung]]
> 2. [[#02 – Vorschau]]
> 3. [[#03 – Variablen und Datentypen]]
> 4. [[#04 – Operatoren und Ausdrücke]]
> 5. [[#05 – Kontrollstrukturen]]
> 6. [[#Cheat-Sheets]]
> 7. [[#Lösungen zu den Übungsaufgaben]]

> [!info] Kompilieren in dieser VO (Pflicht-Flags)
> 
> ```bash
> gcc -Wall -Wextra -Werror -Wpedantic -std=c18 program.c -o program
> ```
> 
> `-Werror` macht **jede Warnung zum Fehler**. Code, der „nur“ eine Warnung erzeugt, kompiliert also nicht.

> [!info]  Folien
> 
Foliensätze 01–05 
[[EidP-01-Einfuehrung.pdf]]
[[EidP-02-Vorschau.pdf]]
[[EidP-03-VariablenDatentypen.pdf]]
[[EidP-04-OperatorenAusdruecke.pdf]]
[[EidP-05-Kontrollstrukturen.pdf]]

---

# 01 – Einführung

## Programmierung allgemein

### Maschinensprache

- Ein Computer löst Probleme, indem er **Befehle (instructions)** ausführt.
- Eine **CPU** kennt nur eine begrenzte Menge einfacher Maschinenbefehle = **Maschinensprache**.
    - Verschiedene CPUs können verschiedene Maschinensprachen haben (z. B. Intel x64 vs. ARM64).
- Eine Folge von Befehlen für eine Aufgabe = **Programm**.
- **Alle Programme müssen in Maschinensprache umgewandelt werden**, bevor sie ausführbar sind.
- Beispiel ARM64: Bitmuster `00010001000000000000010000000000` = `add w0, w0, #1` (Register w0 um 1 erhöhen).

### Höhere Programmiersprachen

- Maschinenprogramme sind **zeitaufwändig und fehleranfällig**.
- Höhere Sprachen ermöglichen eine **fachspezifische Notation** und eine **Abstraktion von der Hardware** (nicht mehr CPU-spezifisch).
- Die Maschine kennt diese Befehle nicht → sie müssen **übersetzt** werden.
### Compilieren vs. Interpretieren

| |**Compiler**|**Interpreter**|
|---|---|---|
|Übersetzung|Ganzes Programm **auf einmal** in eine ausführbare Datei|Befehle **einzeln während der Ausführung**|
|Ausführung|Maschinenprogramm aus der ausführbaren Datei|Interpreter übersetzt **und** führt aus|

- Übersetzungskette bei C: **C-Code → (Compiler) → Assembler-Code → (Assembler) → binärer Maschinencode**.
- In der Realität besteht die Übersetzung aus **mehreren Stufen** mit zusätzlichen Programmen.
- Beispiel `swap(int v[], int k)` führt zu **unterschiedlichem** Assembler/Maschinencode auf Intel x64 und ARM64.

---

## C-Hintergrund

### Eigenschaften von C

- **Imperative** Programmiersprache
- **Wenige Schlüsselwörter** (reservierte Wörter)
- **Direkte Speicherzugriffe**, sehr **hardwarenah**
- **Schwach ausgeprägtes Modulkonzept**
- Trotz weniger Schlüsselwörter **sehr mächtig** → **Vor- und Nachteil**

### Geschichte / Versionen

|Jahr|Version|
|---|---|
|1969|Erste C-Version von **Dennis Ritchie & Ken Thompson** (AT&T Bell Labs) für **Unix**|
|1978|**K&R-C** (Kernighan & Ritchie), Buch _The C Programming Language_|
|1989|**C89** (ANSI C, „Standard C“)|
|1990|ANSI C von ISO übernommen (**C90**)|
|1999|**C99**|
|2011|**C11**|
|2018|**C18** (auch C17 genannt) ← **wird in dieser LV verwendet**|
|2023|C23|

### Aktualität

- **Verwendung heute:** Betriebssysteme (z. B. Linux), Systemprogrammierung, hardwarenahe Programmierung, eingebettete Systeme, Spiele, Interpreter anderer Sprachen (Ruby, Python …).
- **Grundlage anderer Sprachen:** C++ (objektorientierte Variante), Objective C; beeinflusst: Java, C#, Swift, Python, R, Rust …
- C-Compiler gibt es für **fast alle Systeme**.
- Laut **TIOBE-Index** (Stand Sept. 2026) gehört C weiterhin zu den meistgenutzten Sprachen (Python liegt klar vorne).

---

## Das erste C-Programm

### Dateitypen

|Typ|Endung|Inhalt|
|---|---|---|
|**Quelltextdatei**|`.c`|Quellcode|
|**Headerdatei**|`.h`|Infos für die Übersetzung, neu definierte Datentypen|

Kleine Programme passen in **eine** Quelltextdatei.

### Programmerzeugung (vereinfacht)

1. **Schritt 1:** Programm in Texteditor/IDE schreiben (kate, gedit, nano, Eclipse, CLion, VS Code), speichern als sinnvoller Name mit Endung `.c`.
2. **Schritt 2:** Kompilieren, z. B. `gcc program.c -o program` (oder `cc …`).

### gcc

```bash
gcc program.c                 # Minimal → a.out (Linux) / a.exe (Windows, z.B. MinGW)
gcc program.c -o program      # Output-Datei benennen
gcc -Wall -Wextra -Werror -Wpedantic -std=c18 program.c -o program   # Konvention der VO
./program                     # Ausführen
```

`a.out` = _assembler output_.

### Hello World

```c
/* Das erste C-Programm */        // 1. Kommentar
#include <stdio.h>                // 2. Präprozessordirektiven
#include <stdlib.h>

int main(void) {                  // 3. Einstiegspunkt
    printf("Hello World!\n");     // 4. Ausgabe
    return EXIT_SUCCESS;          // 5. Rückgabewert
}
```

|Nr.|Bedeutung|
|---|---|
|**1. Kommentar**|Hat **keinen Einfluss** auf den Ablauf. Zwei Formen: Block `/* … */` (ein- oder mehrzeilig) und Zeile `// …` (einzeilig).|
|**2. `#include`**|**Präprozessordirektive** (beginnt mit `#`). Der Präprozessor arbeitet durch **reine Textersetzung** und übergibt das Ergebnis an den Compiler. `#include` setzt den **Inhalt der Datei an dieser Stelle ein**. `stdio.h` enthält Infos zu `printf`.|
|**3. `main()`**|Funktion, die **in jedem Programm** vorhanden sein muss = **Einstiegspunkt**. `(void)` = keine Parameter; `int` = Rückgabetyp. Anweisungen stehen zwischen `{` und `}`.|
|**4. `printf`**|Funktionsaufruf mit Zeichenkette; `\n` = **Zeilenumbruch**. Aufruf mit **Semikolon** abschließen! Ausgabe auf **Standardausgabe (Konsole)**.|
|**5. `return`**|Rückgabe eines Wertes. `return 0;` möglich, aber `EXIT_SUCCESS` ist **lesbarer**. `EXIT_FAILURE` = nicht erfolgreich beendet. Beide Konstanten sind in **`stdlib.h`** definiert.|

> [!warning] Klassischer Fehler Fehlende `#include <stdio.h>` / `<stdlib.h>` → `printf` und `EXIT_SUCCESS` sind unbekannt → **Kompilierfehler**.

### Erlaubte Zeichen (Mindestanforderung lt. C-Standard)

- Buchstaben `A–Z`, `a–z`
- Dezimalziffern `0–9`
- **29 Grafiksymbole:** `! " % & / ( ) [ ] { } \ ? = ' # + * ~ - _ . : ; , | < > ^`
- **Whitespace:** Leerzeichen, Tabulator (horizontal/vertikal), neue Zeile, neue Seite
- Moderne Compiler unterstützen **erweiterte Zeichensätze** (ISO 8859-1, UTF-8): Umlaute, Emojis …

---

# 02 – Vorschau

> [!warning] Disclaimer des Vortragenden Dieser Foliensatz ist nur eine **Kurzfassung** von Themen, die später ausführlich behandelt werden. **Für die Klausurvorbereitung die späteren Foliensätze (03–05 usw.) verwenden.** Ziel: schnell komplexeres Verhalten programmieren können.

**Motivation:** Bisher gab das Programm nur festen Text aus. Ziel: Probleme lösen (gerade Zahlen ausgeben, Fibonacci …). Dafür braucht man: **Werte speichern, rechnen, je nach Ergebnis verzweigen, Code wiederholen.**

Kurzüberblick (Details siehe 03–05):

- **Variable** = benannte Speicherstelle (Datentyp, Name, Wert, Adresse, Gültigkeitszeitraum, Sichtbarkeitsbereich); muss **vor Verwendung deklariert** werden; ohne Initialisierung **zufälliger Wert**.
- Ausgewählte Typen: `char` (Zeichen/Ganzzahl), `int` (Ganzzahl mit Vorzeichen), `float` (einfache Genauigkeit), `double` (doppelte Genauigkeit).
- Operatoren: `=`, `* / + - %`, Vergleiche, `&& || !`.
- `printf("x = %d\n", x);` mit Platzhalter `%d`.
- `if`/`else`, `while` (siehe 05).
- Ergebnis eines Vergleichs ist `int`: **0 = falsch, ungleich 0 = wahr**; Vergleiche liefern 0 oder 1.

**Beispiele (x=2, y=8, z=10):**

|Ausdruck|Ergebnis|
|---|---|
|`5 % 3`|2|
|`(y / x) - 1`|3|
|`(x * y) + z`|26|
|`(x + y) == z`|1|
|`(x >= y) \| (x <= z)`|1|
|`(x != 0) && (!(y == 8))`|0|

Übungsaufgaben aus dem Foliensatz: siehe [[#Lösungen zu den Übungsaufgaben]].

---

# 03 – Variablen und Datentypen

## Datentypen

> [!note] Kernidee Dieselben Bits können je nach Datentyp etwas anderes bedeuten: `11111111` ist als `unsigned char` **255**, als `signed char` **-1**.

Der **Datentyp** legt fest:

1. **Wertebereich**
2. **Repräsentation im Speicher** (wie viele Bytes)
3. **erlaubte Operationen**

### Typ-Klassifizierung

```
Datentypen
├── Arithmetische Typen
│   ├── Ganzzahl-Typen
│   └── Gleitkomma-Typen
├── Abgeleitete Typen: Array-, Funktions-, Pointer-, Struktur-, Union-Typen
└── void
```

In dieser Vorlesung: Ganzzahl- und Gleitkomma-Typen; die abgeleiteten Typen kommen in späteren Einheiten.

```
Ganzzahl-Typen
├── char
├── Vorzeichenbehaftet: signed char, short int, int, long int, long long int
├── Vorzeichenlos: unsigned char, unsigned short int, unsigned int,
│                  unsigned long int, unsigned long long int, _Bool
└── Aufzählungstypen (enum)
```

### Ganzzahl-Typen

- Intern **binär**. Vorzeichenbehaftet: Vorzeichen+Betrag, Einerkomplement oder **Zweierkomplement (häufigste)**. Bei allen drei bestimmt das **höchste Bit das Vorzeichen**.
- Positiver Bereich eines `signed`-Typs ist eine **Teilmenge** des entsprechenden `unsigned`-Typs (Vorzeichenbit wird bei unsigned für Werte frei).
- **Ordnung nach Größe:**

$$\texttt{char} < \texttt{short} \le \texttt{int} \le \texttt{long} \le \texttt{long long}$$

### Datentyp `char`

- Teil der Ganzzahl-Typen. Je nach Implementierung Synonym für `signed char` **oder** `unsigned char`; formal sind `char`, `signed char`, `unsigned char` **drei verschiedene Typen**.
- Wert kann als **Zeichen** oder als **Ganzzahl** interpretiert werden; man kann damit **rechnen**.
- Größe **immer 1 Byte**.

### `signed` / `unsigned` und Synonyme

- `signed` ist für alle vorzeichenbehafteten Typen **außer `char` optional**.
- `unsigned` **muss** für vorzeichenlose Typen angegeben werden (außer `_Bool`).

|Typ|Synonyme|
|---|---|
|`int`|`signed`, `signed int`|
|`short`|`short int`, `signed short`, `signed short int`|
|`long`|`long int`, `signed long`, `signed long int`|
|`long long`|`long long int`, `signed long long (int)`|
|`unsigned int`|`unsigned`|
|`unsigned short`|`unsigned short int`|
|`unsigned long`|`unsigned long int`|
|`unsigned long long`|`unsigned long long int`|

### Minimale Größen (C-Standard garantiert nur Minima!)

|Typ|Min. Bits|Min. Wertebereich (garantiert)|
|---|---|---|
|`signed char`|8|-127 … 127|
|`unsigned char`|8|0 … 255|
|`short`|16|-32.767 … 32.767|
|`unsigned short`|16|0 … 65.535|
|`int`|16|-32.767 … 32.767|
|`unsigned`|16|0 … 65.535|
|`long`|32|-2.147.483.647 … 2.147.483.647|
|`unsigned long`|32|0 … 4.294.967.295|
|`long long`|64|±9.223.372.036.854.775.807|
|`unsigned long long`|64|0 … 18.446.744.073.709.551.615|

> [!important] Tatsächliche Größe ist **systemabhängig** Genaue Werte stehen in Headerdateien:
> 
> - **`limits.h`** (Ganzzahlen): `INT_MAX`, `INT_MIN`, `UINT_MAX`, `SHRT_MAX`, `LONG_MAX` …
> - **`float.h`** (Gleitkomma): `DBL_MAX`, `DBL_MIN`, `FLT_MAX`, `FLT_DIG`, `DBL_DIG` …
> - **`stdint.h`**: Integer mit **fester Bitbreite**

```c
printf("INT_MAX = %d\n", INT_MAX);
printf("UINT_MAX = %u\n", UINT_MAX);   // %u für unsigned
```

### Aufzählungstypen (`enum`)

```c
enum color     {RED, GREEN, BLUE};                      // 0, 1, 2
enum direction {NORTH, EAST, SOUTH = 15, WEST};         // 0, 1, 15, 16
enum roman     {I=1, V=5, X=10, L=50, C=100, D=500, M=1000};
```

- Allgemeine Form: `enum [Bezeichner] {Aufzaehlungskonstanten}`
- Konstanten haben Typ **`int`**. Ohne Initialisierung: **erste = 0**, sonst **Vorgänger + 1**.
- ⚠️ Der Compiler **prüft nicht**, ob einer Enum-Variable ein gültiger Konstantenwert zugewiesen wird: `enum roman r = 101;` ist erlaubt.

### Gleitkomma-Typen

- **Begrenzte Genauigkeit**, nur eine Menge **diskreter** Werte darstellbar → **Rundungsfehler** möglich.

|Typ|Genauigkeit (mind.)|Relation|
|---|---|---|
|`float`|6 Stellen (einfach)|Teilmenge von `double`|
|`double`|10 Stellen (doppelt)|Teilmenge von `long double`|
|`long double`|10 Stellen (erweitert)||

- Beispiel: `float f = 9123456e5f;` wird mit `%f` als `912345595904.000000` ausgegeben (Rundungsfehler!).
- Typische Werte: `FLT_DIG = 6`, `DBL_DIG = 15`, `FLT_MAX ≈ 3.4e+38`, `DBL_MAX ≈ 1.8e+308`.

### Boolesche Ausdrücke

- **Vor C99:** keine explizite Unterstützung; `int` mit 0 = false, 1 = true (oft `typedef int bool;`).
- **Seit C99:**
    1. Eigener Typ **`_Bool`**: nur Werte 0 oder 1, keine Schlüsselwörter `true`/`false`.
    2. Header **`<stdbool.h>`**: Makros `bool → _Bool`, `true → 1`, `false → 0`.
- Es gibt **keine Literale** für `_Bool` → immer implizite Typumwandlung.

---

## Variablen

- Eine Variable ist eine **benannte Speicherstelle**; Programme legen Daten und Ergebnisse darin ab.

|Kennzeichen|Bedeutung|
|---|---|
|**Datentyp**|Wertebereich, Speicherdarstellung, erlaubte Operationen|
|**Name** (Bezeichner)|Zugriff auf die Speicherstelle|
|**Wert**|Kann sich ändern. **Initialisierung** = erster Wert. Ohne Initialisierung **zufälliger Wert** – **nicht** automatisch 0!|
|**Adresse**|Nummer der **ersten** Speicherzelle des belegten (zusammenhängenden) Bereichs|
|**Gültigkeitszeitraum**|später (Speicherklassen)|
|**Sichtbarkeitsbereich**|später|

### Deklaration vs. Definition

- **Deklaration:** legt Eigenschaften und Art eines Bezeichners fest (für Variablen mind. **Datentyp + Bezeichner**). Bezeichner müssen **vor Verwendung deklariert** werden.
- **Definition** = Deklaration, die **zusätzlich**:
    - bei Variablen **Speicherplatz zur Laufzeit reserviert**,
    - bei Aufzählungskonstanten sicherstellt, dass keine weitere mit gleichem Namen existiert,
    - bei Funktionen den **Funktionsrumpf** angibt.
- Bei einfachen Programmen gilt: **Deklaration = Definition**. Unterschiede erst bei mehreren Dateien (Schlüsselwort `extern`).

```c
int height;
int limit;
char letter;
double area;
```

### Bezeichner (Namen)

**Regeln (vom Compiler erzwungen):**

- Folge aus **Buchstaben, Ziffern, `_`**
- **Erstes Zeichen keine Ziffer**
- **Kein reserviertes Schlüsselwort**
- C ist **case-sensitive** (`a` ≠ `A`)

|Gültig|Ungültig|
|---|---|
|`letter`, `carwheel`, `max_count`, `test2`|`1letter`, `car-Wheel`, `car/Wheel`, `while`, `$%`|

**Konventionen (guter Stil):**

|Regel|Schlecht|Gut|
|---|---|---|
|Vollständige Wörter|`c`|`counter`|
|Kleinschreibung|`COUNTER`|`counter`|
|Neue Teile mit Unterstrich|`firstletterintext`|`first_letter_in_text`|
|Sinnvolle Namen|`asdfg`|`counter`|
|Abkürzungen vermeiden|`bc`|`byte_count`|
|Englische Namen|`erster_buchstabe`|`first_letter`|

- Einzelbuchstaben sind manchmal ok (Schleifenvariablen); **GROSSSCHREIBUNG für Konstanten**.
- **Unterstrich am Anfang vermeiden** (wird in Bibliotheken verwendet). **Keine Emojis** (obwohl technisch möglich).

### Reservierte Schlüsselwörter

```
auto break case char const continue default do double else enum extern
float for goto if int long register return short signed sizeof static
struct switch typedef union unsigned void volatile while
```

- Seit **C99**: `restrict`, `inline`, `_Bool`, `_Complex`, `_Imaginary`
- Seit **C11**: `_Alignas`, `_Alignof`, `_Atomic`, `_Generic`, `_Noreturn`, `_Static_assert`, `_Thread_local`

---

## Literale

Ein **Literal** ist ein **konstanter Wert**; sein Typ ergibt sich aus Art und Wert. Arten: Ganzzahlenliterale, Gleitkommaliterale, Zeichenliterale, String-Literale (→ Arrays), Aufzählungskonstanten.

### Ganzzahlenliterale

|System|Präfix|Ziffern|
|---|---|---|
|Oktal|`0`|0–7|
|Dezimal|–|0–9|
|Hexadezimal|`0x`, `0X`|0–9, a–f, A–F|

**Suffixe:**

|Suffix|Typ|
|---|---|
|`u` / `U`|`unsigned`|
|`l` / `L`|`long`|
|`ul`, `uL`, `Ul`, `UL`|`unsigned long`|
|`ll` / `LL`|`long long`|
|`ull`, `uLL`, `Ull`, `ULL`|`unsigned long long`|

- **Empfehlung:** Großbuchstaben (Verwechslung `l` ↔ `1` vermeiden).
- **Ohne Suffix:** `int` bzw. der **kleinste** Typ mit ausreichendem Wertebereich:
    - Dezimal: `int`, `long`, `long long`
    - Oktal/Hex: `int`, `unsigned`, `long`, `unsigned long`, `long long`, `unsigned long long`
- Beispiele: `123` → `int`; `123L` → `long`; `0XFULL` → 15, `unsigned long long`.

### Gleitkommaliterale

- Dezimal oder hexadezimal; bestehen aus Vorkommateil, Punkt, Nachkommateil, Exponent, Suffix.
- **Ohne Suffix: `double`**. Suffix `f`/`F` → `float`, `l`/`L` → `long double`.
- Es muss **mindestens Dezimalpunkt oder Exponent** vorhanden sein (sonst Ganzzahlenliteral). Bei **Hex** ist der Exponent **immer** nötig.

|Literal|Typ / Wert|
|---|---|
|`10.5`|`double`|
|`10.5f`|`float`|
|`.4`|`double`|
|`7.5e-1f`|`float`, = 0,75|
|`0xa.fp-1`|`double`, = 5,46875|

Verschiedene Schreibweisen für 0,19: `0.19`, `.19`, `1.9e-1`, `19e-2`.

### Zeichenliterale

- Ein Zeichen oder eine **Escapesequenz** in **einfachen** Anführungszeichen: `'A'`, `'%'`, `'5'`.
- Escapesequenzen (stellen **ein** Zeichen dar): `'\n'` Zeilentrenner, `'\t'` Tab, `'\''` Hochkomma, `'\\'` Backslash, `'\101'` (oktal), `'\x41'` (hex).
- ⚠️ **Zeichenliterale haben den Typ `int`** (Wert = numerischer Wert im Zeichensatz), können aber `char`-Variablen zugewiesen werden.
- Der C-Standard legt den Zeichensatz **nicht** fest (ASCII 7 Bit, ISO-Latin-1 8 Bit, Unicode 8/16/32 Bit, EBCDIC …).

> [!question]- Aufgabe: Welche `char`-Zuweisungen führen zu einem Kompilierfehler?
> 
> ```c
> char c1 = '\n';   // ok
> char c2 = '';     // FEHLER: leeres Zeichenliteral
> char c3 = 65;     // ok (ganzzahlige Konstante)
> char c4 = B;      // FEHLER: B ist ein nicht deklarierter Bezeichner
> char c5 = "B";    // FEHLER: String-Literal (char*) statt Zeichen
> char c6 = 'C';    // ok
> char c7 = c1;     // ok
> ```
> 
> Fehler bei **c2, c4, c5**. _(Hinweis: Lösung von mir ergänzt, nicht auf den Folien.)_

---

## Grundlegende Ein- und Ausgabe

### `printf` (Ausgabe)

- **Keine** Sprachfunktion, sondern Funktion der **C Standard Library** (`stdio.h`).
- Form: `printf(Formatstring, Parameterliste)`
- **Rückgabewert:** Anzahl der ausgegebenen Zeichen.
- Platzhalter-Struktur:

```
%[flags][width][.precision][modifier]converter
```

(alles in `[]` optional)

#### Converter

|Converter|Bedeutung|erwarteter Typ|
|---|---|---|
|`d`, `i`|vorzeichenbehaftete Ganzzahl (dezimal)|`int`|
|`u`|vorzeichenlose Ganzzahl (dezimal)|`unsigned int`|
|`o`|vorzeichenlos, oktal|`unsigned int`|
|`x`, `X`|vorzeichenlos, hex (klein/groß)|`unsigned int`|
|`c`|einzelnes Zeichen|`int`|
|`s`|Zeichenkette|`char*`|
|`f`|Gleitkommazahl dezimal|`double`|
|`e`, `E`|Exponentialdarstellung|`double`|
|`g`, `G`|dezimal **oder** exponentiell je nach Wert|`double`|
|`a`, `A` (C99)|Hex-Exponentialdarstellung|`double`|
|`p`|Adresse (implementierungsabhängig)|`void*`|
|`n`|speichert Anzahl bisher ausgegebener Zeichen|`int*`|
|`%`|gibt `%` aus|–|

```c
printf("%d %u", -2, -2);   // → -2  4294967294  (unsigned-Interpretation, plattformabhängig)
printf("%d %c %c", 'A', 65, 'A');   // → 65 A A
printf("%f %e", 30.5, 30.5);        // → 30.500000 3.050000e+01
```

#### Modifier (Typ des Parameters präzisieren)

|Modifier|Typ|Beispiel|
|---|---|---|
|`hh`|`signed/unsigned char`|`%hhd`, `%hhu`|
|`h`|`short`|`%hd`, `%hu`|
|`l`|`long`|`%ld`, `%lu`|
|`ll`|`long long`|`%lld`, `%llu`|
|`j`|`intmax_t` / `uintmax_t`|`%jd`, `%ju`|
|`z`|`size_t`|`%zu`|
|`t`|`ptrdiff_t`|`%td`|
|`L`|`long double`|`%Lf`|

Beispiel: `signed char cs2 = -1; printf("%hhu", cs2);` → `255`.

#### Flags

|Flag|Wirkung|
|---|---|
|`-`|linksbündig|
|`+`|Vorzeichen auch bei positiven Zahlen|
|`0`|mit führenden Nullen auffüllen|
|`#`|alternative Form (`man 3 printf`)|
|Leerzeichen|wird vorangestellt, wenn erstes Zeichen kein Vorzeichen ist|

#### Width (Mindestbreite)

- Direkt als Zahl oder per `*` + Parameter. Auffüllen mit Leerzeichen; wenn die Ausgabe **länger** ist, wird width **ignoriert**.

```c
printf("|%3d|",  1);     // |  1|
printf("|%-3d|", 1);     // |1  |
printf("|%03d|", 1);     // |001|
printf("|%03d|", 1234);  // |1234|
printf("|%*d|", 3, 1);   // |  1|
```

#### `.precision`

|Converter|Bedeutung|
|---|---|
|`d i o u x X`|Mindestanzahl Stellen (mit Nullen aufgefüllt); Wert **und** Präzision 0 → **nichts** ausgegeben|
|`a A e E f F`|Anzahl der **Nachkommastellen**|
|`g G`|max. Anzahl signifikanter Stellen|
|`s`|max. Anzahl ausgegebener Bytes|

```c
printf("|%.0d|", 0);          // ||
printf("|%5.2f|", 0.899);     // | 0.90|
printf("|%.1f|", 20.11);      // |20.1|
printf("|%.5s|", "Hello World!");  // |Hello|
```

### `scanf` (Eingabe)

- Liest **zeichenweise** Eingabefelder ein. Für **jeden** Platzhalter muss die **Adresse** einer Variable passenden Typs übergeben werden: `&x`.
- Platzhalter ähnlich zu `printf`, aber **zum Einlesen** (z. B. `double` → **`%lf`**).
- **Rückgabewert:** Anzahl der **erfolgreich zugewiesenen** Werte → immer prüfen!

```c
int i;
printf("Bitte geben Sie eine Zahl ein: ");
if (scanf("%d", &i) != 1) {
    printf("Fehler beim Einlesen des Werts für i!\n");
    return EXIT_FAILURE;
}
printf("Die Zahl, die Sie eingegeben haben, war %d\n", i);
```

> [!question]- Aufgabe `scanf`: Fehler finden
> 
> ```c
> scanf("%d", var1);                         // 1) &var1 fehlt
> scanf("%s", var2);                         // 2) %d statt %s, und &var2 fehlt
> printf("%d + %d = %d\n", var1 + var2);     // 3) 3 Platzhalter, aber nur 1 Argument
> ```
> 
> **Korrektur:**
> 
> ```c
> scanf("%d", &var1);
> scanf("%d", &var2);
> printf("%d + %d = %d\n", var1, var2, var1 + var2);
> ```
> 
> _(Lösung von mir ergänzt.)_

---

# 04 – Operatoren und Ausdrücke

## Terminologie

**Operatoren** belegen Variablen mit Werten oder verändern gespeicherte Werte.

|Einteilung nach|Arten|
|---|---|
|**Anzahl Operanden**|**unär** (1), **binär** (2), **ternär** (3)|
|**Position**|**Präfix** (davor), **Postfix** (dahinter), **Infix** (dazwischen, binär)|
|**Assoziativität**|**links**assoziativ (links → rechts), **rechts**assoziativ (rechts → links)|

**Ausdruck (expression):** Folge aus Literalen, Bezeichnern und Operatoren. Hat einen **Typ** und einen **Wert**, kann **Seiteneffekte** haben. Beispiel: `2 + 6` → Wert 8, Typ `int`.

**Anweisung (statement):** Ausdruck + **Semikolon** = Ausdrucksanweisung. Spezifiziert eine Aktion.

- `2 + 6;` möglich, aber sinnlos. `i++;` sinnvoll (Seiteneffekt).

**Seiteneffekt (Nebeneffekt):** Ein Zustand wird verändert (Wert einer Variable, Dateiinhalt, Ausgabe auf Standardausgabe).

---

## Operatoren

### Zuweisungsoperator `=`

- Binär, **rechtsassoziativ**. Wert des rechten Operanden wird dem **Speicherplatz links** zugewiesen (Seiteneffekt).
- Zuweisungsausdruck hat **Wert und Typ des linken Operanden** (nach der Zuweisung) → in Ausdrücken weiterverwendbar (`a = b = 0;`).
- `x = x + 1;` ist sinnvoll (alter Wert + 1 → zurück in `x`).

### Arithmetische Operatoren

- Unär `+`, `-`: **rechts**assoziativ. Binär `+ - * /`: **links**assoziativ.
- `x / 0` und `x % 0` bei Ganzzahlen: **undefiniert**.

|Op|Name|Hinweis|
|---|---|---|
|`-x`|Vorzeichenwechsel||
|`+ - *`|Summe, Differenz, Produkt||
|`/`|Division|bei Ganzzahlen **ganzzahlig**, Nachkommaanteil wird **abgeschnitten**|
|`%`|Rest|**nur Ganzzahl-Typen**|

```c
5 / 2       // 2
5.0 / 2.0   // 2.5
-5 / 2      // -2   (Richtung 0 abgeschnitten)
-5 / 2.0    // -2.5
5 % 2       // 1
-5 % 2      // -1   (Vorzeichen folgt dem linken Operanden)
```

### Überlauf bei Ganzzahlen (integer overflow)

> [!danger] Wichtig
> 
> - **`signed`:** Überlauf = **undefiniertes Verhalten**!
> - **`unsigned`:** Es wird **modulo 2ⁿ** gerechnet (n = Anzahl Bits) → definiert.

```c
unsigned a = UINT_MAX, b = 0;
a + 1;   // 0
b - 1;   // UINT_MAX (4294967295)
```

### Inkrement `++` / Dekrement `--`

|Op|Name|Nebeneffekt|**Wert des Ausdrucks**|
|---|---|---|---|
|`++x`|Präinkrement|`x = x + 1`|Wert **nach** dem Inkrement|
|`x++`|Postinkrement|`x = x + 1`|Wert **vor** dem Inkrement|
|`--x`|Prädekrement|`x = x - 1`|Wert **nach** dem Dekrement|
|`x--`|Postdekrement|`x = x - 1`|Wert **vor** dem Dekrement|

```c
int a = 3;
int b = 3 * ++a;   // a=4, b=12
int c = 3 * a++;   // c=12, danach a=5
// a=5, b=12, c=12
```

### Vergleichsoperatoren

- Liefern `int`: **0** (falsch) oder **1** (wahr). **Linksassoziativ.**

|C|Math.|
|---|---|
|`a < b`, `a > b`|< , >|
|`a <= b`, `a >= b`|≤ , ≥|
|`a == b`|=|
|`a != b`|≠|

> [!warning] `=` vs. `==` `if (a = 5)` **weist zu** und ist (da 5 ≠ 0) immer wahr! Vergleichen: `a == 5`.

### Logische Operatoren

- Ergebnis `int` (0 oder 1). Operand **0 = falsch**, **jeder andere Wert = wahr**. Linksassoziativ.

|Op|Name|Resultat|
|---|---|---|
|`&&`|logisches UND|1, wenn beide ≠ 0|
|`\|`|logisches ODER|1, wenn mind. einer ≠ 0|
|`!`|Negation|1, wenn Operand = 0|

**Kurzschlussauswertung (short circuit):** `&&` und `||` werden **von links nach rechts** ausgewertet und **brechen ab**, sobald das Ergebnis feststeht.

```c
int a = 0, b = 0;
printf("%d\n", (a++) && (++b));   // 0
// a = 1, b = 0   → (++b) wurde NIE ausgewertet!
```

> [!tip] Seiteneffekte im 2. Operanden von `&&`/`||` **vermeiden**.

Beispiel (x=5, y=9, z=0): `x && y` → 1; `!x` → 0; `!(y - (x + 4))` → 1; `z && (x + y)` → 0; `(z < x) && (x < y)` → 1; `(x == 3) || (y == 9)` → 1.

### Bitoperationen (nur Ganzzahlen)

|Op|Name|Resultat pro Bit|
|---|---|---|
|`&`|UND|1, wenn **beide** 1|
|`\|`|ODER|1, wenn **mind. eines** 1|
|`^`|XOR|1, wenn **genau eines** 1|
|`~`|Negation|Bit wird invertiert|
|`x << y`|Linksshift|Bits um y Stellen nach links|
|`x >> y`|Rechtsshift|Bits um y Stellen nach rechts|

Beispiel `x = 5u` (`101`), `y = 9u` (`1001`):

|Ausdruck|Binär|Dezimal|
|---|---|---|
|`x & y`|`1`|1|
|`x \| y`|`1101`|13|
|`x ^ y`|`1100`|12|
|`x << 1u`|`1010`|10|
|`x >> 2u`|`1`|1|

> [!tip] Faustregeln `x << n` ≙ `x · 2ⁿ` und `x >> n` ≙ `x / 2ⁿ` (ganzzahlig, für `unsigned`).

### Kombinierte Zuweisungsoperatoren

`+= -= *= /= %=` und `&= |= ^= <<= >>=`

|Kurz|Äquivalent|
|---|---|
|`a += 2;`|`a = a + 2;`|
|`b <<= 1;`|`b = b << 1;`|
|`c *= a - 10;`|`c = c * (a - 10);` ← **rechte Seite wird geklammert!**|

### Bedingungsoperator `?:` (einziger ternärer Operator)

- Form: **`A ? B : C`**, rechtsassoziativ. Zuerst `A`: **≠ 0 → B**, sonst **C**.

```c
max_ab = (a > b) ? a : b;
```

### `sizeof`-Operator

- Liefert die **Größe in Bytes** von Datentypen/Objekten, Ergebnistyp **`size_t`** (vorzeichenlos, `stddef.h`, architekturabhängig).
- Anwendbar auf Ausdruck **oder** Typ. Ein Ausdruck wird **nicht ausgewertet** (`sizeof(3 / 0)` ist ok!).
- Beispiele: `sizeof(i)`, `sizeof i`, `sizeof(int)`, `sizeof(3 + 1)`.
- **Klammern:** bei **Typ zwingend**, bei Ausdruck optional (aber üblich).
- ⚠️ **Hohe Präzedenz:** `sizeof x + y` = `sizeof(x) + y`, **nicht** `sizeof(x + y)`. → Besser `sizeof(x) + y`.

### Operatorpräzedenz & Assoziativität

- **Präzedenz:** Rangfolge zwischen verschiedenen Stufen („Punkt vor Strich“). **Assoziativität:** Rangfolge innerhalb **gleicher** Stufe. Mit **Klammern** änderbar: `(5 + 2) * 3 = 21`.

|Priorität (hoch → niedrig)|Operatoren|Assoziativität|
|---|---|---|
|1 Postfix|`() [] {} -> . ++ --`|links|
|2 Präfix|`! ~ ++ -- + - * & sizeof (type) _Alignof`|**rechts**|
|3 Multiplikativ|`* / %`|links|
|4 Additiv|`+ -`|links|
|5 Shift|`<< >>`|links|
|6 Vergleich|`< <= > >=`|links|
|7 Gleichheit|`== !=`|links|
|8 Bitweises UND|`&`|links|
|9 Bitweises XOR|`^`|links|
|10 Bitweises ODER|`\|`|links|
|11 Logisches UND|`&&`|links|
|12 Logisches ODER|`\|`|links|
|13 Bedingung|`?:`|**rechts**|
|14 Zuweisung|`= += -= *= /= %= &= ^= \|= <<= >>=`|**rechts**|
|15 Komma|`,`|links|

|Ausdruck|Explizit geklammert|
|---|---|
|`a && b \| c < 0`|`(a && b) \| (c < 0)`|
|`6 * 5 + 4 << 3 / 2`|`((6 * 5) + 4) << (3 / 2)`|
|`a < 5 == 0`|`(a < 5) == 0`|
|`a / b % c`|`(a / b) % c`|
|`1 + 2 + 3 + 4 * 5`|`((1 + 2) + 3) + (4 * 5)`|

> [!warning] Auswertungsreihenfolge ≠ Verknüpfungsreihenfolge Bei `1 * 2 + 3 * 4` ist das Ergebnis eindeutig, aber der Standard schreibt **nicht** vor, ob `1 * 2` oder `3 * 4` zuerst ausgewertet wird.

---

## Typumwandlung (Type-Casting)

- **Explizit:** erzwungen per **cast-Operator** `(Typname) Ausdruck` (unär).
- **Implizit:** automatisch durch den Compiler (z. B. `float f = 3;`), nur zwischen **verträglichen** Typen.
- Gleiche Konvertierungsregeln für beide Arten.

```c
printf("%d\n", (int) 5.6);          // 5   (abgeschnitten)
printf("%f\n", (double) (4 / 3));   // 1.000000  (4/3 ist zuerst int-Division = 1!)
```

### Regeln je nach Typ

|Umwandlung|Verhalten|
|---|---|
|**→ `_Bool`**|Wert `== 0` → **0**, sonst **1**|
|**`_Bool` → arithmetisch**|0 bzw. 1 in der Darstellung des Zieltyps|
|**Ganzzahl → unsigned**|wiederholt `Max+1` addieren/subtrahieren (= **modulo**), Größenordnung kann verloren gehen. `int a = -1; unsigned b = a;` → `UINT_MAX`. `(unsigned char) 1025` → **1**|
|**Ganzzahl → signed**|Wert bleibt, wenn er passt; sonst **implementierungsabhängig**|
|**Gleitkomma → Ganzzahl**|Nachkommastellen **abgeschnitten** (Richtung 0); passt Vorkommateil nicht → **undefiniert**|
|**Ganzzahl → Gleitkomma**|exakt wenn möglich, sonst nächster darstellbarer Wert; außerhalb des Bereichs → undefiniert|
|**Gleitkomma → Gleitkomma**|exakt wenn möglich, sonst nächster darstellbarer Wert; außerhalb → undefiniert|

### Rangordnung der Typen (steigend)

$$\texttt{_Bool} < \texttt{char} < \texttt{short} < \texttt{int} < \texttt{long} < \texttt{long long} < \texttt{float} < \texttt{double} < \texttt{long double}$$ (`signed` und `unsigned` Varianten haben **denselben Rang**.)

### Gewöhnliche arithmetische Typumwandlung

Bei **allen binären Operatoren außer `&&`, `||` und Zuweisungen**, außerdem beim `?:` (Typ des Ergebnisses).

1. Typ mit **höherem Rang** finden.
2. Ist das ein **Gleitkomma-Typ** → der andere Operand wird dorthin umgewandelt.
3. Sind **beide Ganzzahl-Typen** → zuerst **Integer Promotion**, dann Ganzzahl-Regeln (unten).

#### Integer Promotion

- Typen mit Rang **kleiner als `int`** (`_Bool`, `char`, `short`) werden zu **`int`** (wenn alle Werte in `int` passen), sonst zu `unsigned int`. Wert und Vorzeichen bleiben gleich.
- Angewandt bei gewöhnlichen arithmetischen Umwandlungen, bei unären `+ - ~` und bei **beiden Operanden** der Shift-Operatoren.

#### Ganzzahl-Regeln nach der Promotion

1. **Beide gleich** → nichts zu tun. _(`signed char + short` → beide `int`)_
2. **Beide signed oder beide unsigned** → niedrigerer Rang → höherer Rang. _(`int + long` → `long`)_
3. **unsigned-Typ hat Rang ≥ dem anderen** → der andere wird zu **unsigned**. _(`int a = -1; unsigned long b = 2; a + b` → `a` wird `unsigned long`, Ergebnis 1)_
4. **signed-Typ kann alle Werte des unsigned-Typs darstellen** → der andere wird zu **signed**. _(`long long + unsigned` → `long long`)_
5. Sonst → beide zum **unsigned-Typ mit dem Rang des signed-Typs** (untypisch, kommt praktisch nicht vor).

### Ergebnistypen (Übung)

|Ausdruck|Typ|
|---|---|
|`2 + 5.0`|`double`|
|`5.0f + 5`|`float`|
|`1.0f + 2.0`|`double`|
|`(int)10.0 + 5.0f`|`float`|
|`2 + 3UL`|`unsigned long`|
|`'C' + '-' + 'V' + 'O'`|`int`|
|`(char)(2 + 4)`|`char`|
|`3 > 5`|`int`|
|`(short)10 + 3U`|`unsigned`|

---

# 05 – Kontrollstrukturen

**Motivation:** Bisher wurden Zeilen **sequentiell** abgearbeitet. Kontrollstrukturen legen fest, **in welcher Reihenfolge** Anweisungen ausgeführt werden (auswählen / wiederholen).

## Arten von Anweisungen

|Art|Beispiele|
|---|---|
|**Block**|`{ … }` – syntaktisch **eine** Anweisung, schachtelbar, **kein Semikolon** nach `}`|
|**Ausdrucksanweisung**|Ausdruck + `;`|
|**Selektion**|`if`, `switch`|
|**Iteration**|`while`, `do-while`, `for`|
|**Sprung**|`break`, `continue`, `return`, `goto`|

## Selektionsanweisungen (Verzweigungen)

### `if` / `else`

```c
if (Ausdruck)
    Anweisung_1
else
    Anweisung_2
```

- Ausdruck **≠ 0** → `Anweisung_1`; **= 0** → `Anweisung_2`.
- `else` ist **optional**. `if` kann **verschachtelt** werden.
- **Mehrere Anweisungen → Block `{ }` nötig!**

```c
if (value > 10)
    printf("Statement1\n");
    printf("Statement2\n");     // wird IMMER ausgeführt (gehört nicht zum if)!
```

### Mehrfachselektion (`else if`)

```c
if (Ausdruck_1)      Anweisung_1
else if (Ausdruck_2) Anweisung_2
…
else                 Anweisung_else
```

Bedingungen werden **von oben nach unten** geprüft; die **erste wahre** wird ausgeführt, der Rest übersprungen.

### Dangling else

```c
if (counter < 5)
    if (counter % 2 == 0)
        printf("HERE1");
else
    printf("HERE2");
```

Das `else` gehört zum **textuell letzten freien `if`** im selben Block (hier: das **innere** `if`).

- `counter = 7` → keine Ausgabe; `counter = 3` → `HERE2`.

> [!tip] Empfehlung Für `if` und Schleifen **immer Blöcke `{ }`** verwenden.

### `switch`

```c
switch (Ausdruck) {
    case k1:
        Anweisungen_1
        break;
    case k2:
        Anweisungen_2
        break;
    default:
        Anweisungen_default
        break;
}
```

- Nach `case` muss ein **konstanter ganzzahliger Ausdruck** stehen; alle Werte **verschieden**.
- Bei Übereinstimmung wird **hinter dieser Marke** weiter ausgeführt.
- **`break`** verlässt das `switch`. **Ohne `break` → „fall through“**: es laufen alle folgenden Anweisungen bis zum nächsten `break`/Ende.
- Kein Treffer → Sprung zu **`default`** (falls vorhanden), sonst Anweisung **nach** dem `switch`.

```c
switch (day) {
    case MON: case TUE: case WED: case THU: case FRI:
        printf("business day\n");  break;
    case SAT: case SUN:
        printf("weekend\n");       break;
}
```

**`switch` vs. `if`:**

- `switch` prüft **nur Gleichheit**, `if` wertet beliebige Bedingungen aus.
- `case` nur mit **ganzzahligen Konstanten**.
- `switch` ist übersichtlicher und leichter erweiterbar.

## Iterationsanweisungen (Schleifen)

Wiederholen einen **Schleifenkörper**. Mehrere Anweisungen → **Block**.

### `while` (abweisende Schleife)

```c
while (Ausdruck)
    Anweisung
```

1. Bedingung auswerten → 2. **≠ 0**: Körper ausführen, zurück zu 1 → 3. **= 0**: nach der Schleife weitermachen.

- ⚠️ Im Körper muss sich ein Teil der Bedingung ändern, sonst **Endlosschleife**.
- Bedingung kann **schon beim ersten Mal falsch** sein → Körper läuft dann **0-mal**.

```c
int i = 0;
while (i <= 10) {
    printf("%d", i);
    if (i < 10) printf(", ");
    ++i;
}
// 0, 1, 2, ..., 10
```

### `for`

```c
for (Ausdruck_1; Ausdruck_2; Ausdruck_3)
    Anweisung
```

|Teil|Rolle|
|---|---|
|`Ausdruck_1`|**Initialisierung** (einmalig; Variable darf hier deklariert werden: `int i = 0`)|
|`Ausdruck_2`|**Schleifenbedingung**|
|`Ausdruck_3`|**Anpassung** (z. B. `++i`)|

**Ablauf:** (1) Init → (2) Bedingung → (3) wenn ≠ 0: Körper, dann Anpassung, zurück zu (2) → (4) wenn = 0: Ende.

```c
for (int i = 0; i <= 10; ++i) { … }
```

**Komma-Operator** im Schleifenkopf (mehrere Variablen initialisieren/ändern):

```c
for (int i = 0, j = 9; i < j; ++i, --j) {
    printf("i = %d, j = %d\n", i, j);   // (0,9) (1,8) (2,7) (3,6) (4,5)
}
```

**Geschachtelte Schleifen** (1×1 … 3×3): äußere Schleife `i`, innere `j`, Ausgabe `i * j`.

**Spezialfälle:**

- `Ausdruck_1` fehlt → keine Initialisierung; `Ausdruck_2` fehlt → **immer wahr (Endlosschleife)**; `Ausdruck_3` fehlt → keine Anpassung.
- **Leere Anweisung:** `for(…);` oder `for(…){}`.

### `while` oder `for`?

- **`for`:** fester Bereich mit Startwert, Endwert und fester Schrittweite.
- **`while`:** nur ein Endkriterium, Anzahl der Durchläufe nicht vorhersagbar.
- Im Zweifel die **lesbarere** Variante. **Jede `for`-Schleife ↔ `while`-Schleife** ineinander umformbar:

```c
for (E1; E2; E3) S;        ≙        E1;
                                    while (E2) { S; E3; }
```

### `do-while` (annehmende Schleife)

```c
do {
    Anweisung
} while (Ausdruck);        // ← Semikolon am Ende!
```

Körper läuft **mindestens einmal**, **danach** wird die Bedingung geprüft; ≠ 0 → wiederholen.

```c
int value = 12345; unsigned char digits = 0;
do { ++digits; value /= 10; } while (value);   // digits = 5 (Stellenzahl)
```

### Endlosschleifen

- Erzeugen: `while(1) {…}`, `for(;;) {…}`, `for(;1;) {…}`.
- Beenden: **`break`**, **`return`** (Funktion beenden), **`exit`** (Programm beenden).

## Sprunganweisungen

|Anweisung|Wirkung|Hinweise|
|---|---|---|
|`break`|beendet umgebende **Schleife oder `switch`**|nur dort erlaubt; bei `switch` meist **nötig**, in Schleifen **sparsam**|
|`continue`|**überspringt den Rest** des Schleifenkörpers, weiter mit der nächsten Iteration|nur im Schleifenkörper|
|`return`|beendet Funktion (→ Funktionen)||
|`goto Marke;`|Sprung zu `Marke: Anweisung`|**nur in ganz wenigen Ausnahmefällen sinnvoll**; jedes Programm geht auch ohne `goto`|

> [!warning] `continue` in `while` Bei `while` springt `continue` direkt zur **Bedingung**. Wird die Zählvariable **vor** dem `continue` nicht verändert, entsteht eine **Endlosschleife** (siehe Aufgabe unten). Bei `for` wird zuerst die Anpassung (`Ausdruck_3`) ausgeführt.

`goto`-Beispiel: aus **zwei** verschachtelten Schleifen auf einmal ausbrechen (`goto breakout;` → Marke `breakout:` nach den Schleifen).

---

# Cheat-Sheets

## ✅ Top-Fallen (Klausur!)

> [!danger] Merken
> 
> 1. **`=` vs. `==`** in Bedingungen.
> 2. **Integer-Division:** `5 / 2 = 2`; `(double)(4/3)` ist `1.0`, nicht `1.33`.
> 3. **`%` bei negativen Zahlen:** `-5 % 2 = -1`.
> 4. **signed-Überlauf = undefiniert**, unsigned = modulo 2ⁿ.
> 5. **Uninitialisierte Variablen** haben **zufällige** Werte.
> 6. **`++x` vs. `x++`:** Wert nach vs. vor dem Inkrement.
> 7. **Kurzschlussauswertung** bei `&&` / `||`.
> 8. **Zeichenliterale haben Typ `int`**, Gleitkommaliterale **`double`**.
> 9. **`if`/Schleife ohne `{ }`:** nur die **erste** Anweisung gehört dazu.
> 10. **`switch` ohne `break`** → fall through.
> 11. **Gleitkomma nie mit `==`/`!=` als Schleifenbedingung** (`0.1f` nicht exakt darstellbar).
> 12. **`scanf` braucht `&`**, `printf` braucht Platzhalter **passend zu den Argumenten** (Anzahl **und** Typ).
> 13. **`sizeof x + y`** ≠ `sizeof(x + y)`.
> 14. **Enum-Zuweisungen** werden nicht geprüft.
> 15. **`-Werror`**: Warnungen sind Fehler.

## printf – Schnellreferenz

|Ziel|Platzhalter|
|---|---|
|`int`|`%d`|
|`unsigned`|`%u`|
|`unsigned char`|`%hhu`|
|`long` / `unsigned long`|`%ld` / `%lu`|
|`long long`|`%lld`|
|`size_t` (z. B. `sizeof`)|`%zu`|
|`double` (printf)|`%f` (`%e`, `%g`)|
|`double` (**scanf**)|`%lf`|
|`char` als Zeichen|`%c`|
|Hex / Oktal|`%x` / `%o`|
|String|`%s`|
|Prozentzeichen|`%%`|

## Typen: Ranghierarchie

`_Bool < char < short < int < long < long long < float < double < long double`

---

# Lösungen zu den Übungsaufgaben

> [!note] Hinweis Die Lösungen aus den Folien sind übernommen. Mit **(ergänzt)** markierte Lösungen stammen von mir und stehen nicht auf den Folien: bitte selbst nachprüfen!

## 01 – Einführung

> [!question]- Aufgabe: Warum kompiliert das Programm nicht? (`printf` / `EXIT_SUCCESS` ohne Header) Es fehlen `#include <stdio.h>` (für `printf`) und `#include <stdlib.h>` (für `EXIT_SUCCESS`).

## 02 – Vorschau

> [!question]- Operatoren (a=1, b=2)
> 
> ```
> 1. 3     (a + 2)
> 2. 4     ((a + 1) * b)
> 3. 0     (b != 2)
> 4. 1     ((a < b) && (b > 0))
> 5. 1     (!(b - 2 * a) = !(0))
> ```

> [!question]- if-Anweisungen (a=1, b=3) Ausgabe: **`1235`** `a < b` → "1"; `!(a-1)` = `!0` → "2"; `a + 2 == b` → "3" (kein else); danach "5".

> [!question]- while-Schleifen (5 Fragmente)
> 
> 6. `i` wird nie verändert → **Endlosschleife**, gibt immer `1` aus.
> 7. `1`, `0`
> 8. **keine Ausgabe** (Bedingung gleich anfangs falsch)
> 9. `1`, `3`
> 10. `1`, `2`, `4`, `8`, `16`

> [!question]- Zusatzaufgaben (ergänzt, Lösungsideen)
> 
> - **n im Bereich [1,10]:** `if (n >= 1 && n <= 10) printf("valid\n"); else printf("invalid\n");`
> - **Minimum/Maximum:** `if (x < y) { minimum = x; maximum = y; } else { minimum = y; maximum = x; }`
> - **Absteigend 0..n:** `int i = n; while (i >= 0) { printf("%d\n", i); --i; }`
> - **Aufsteigend:** `int i = 0; while (i <= n) { printf("%d\n", i); ++i; }`
> - **Anzahl Teiler:** `int count = 0; int i = 1; while (i <= n) { if (n % i == 0) ++count; ++i; }`

## 03 – Variablen und Datentypen

Siehe die aufklappbaren Aufgaben `char`-Zuweisungen und `scanf` oben im Abschnitt 03.

## 04 – Operatoren

> [!question]- Inkrement/Dekrement (`i = 1`)
> 
> ```c
> printf("%d\n", i--);      // 1  (danach i = 0)
> printf("%d\n", ++i);      // 1  (i = 1)
> printf("%d\n", 2 * i++);  // 2  (danach i = 2)
> printf("%d\n", 2 * --i);  // 2  (i = 1)
> ```
> 
> Ausgabe: `1 1 2 2`

> [!question]- Logische Operatoren (a=1, b=2)
> 
> ```
> !(a <= b)            → 0
> !(a - b + 1)         → 1   (!0)
> (a < b) && (b >= 2)  → 1
> (a <= 0) && (b = 0)  → 0   (Kurzschluss! b bleibt 2)
> (a = 5) || (b == 0)  → 1   (Kurzschluss, a ist jetzt 5)
> b || (a != 5)        → 1   (b = 2 ≠ 0)
> ```
> 
> Ausgabe: `0 1 1 0 1 1`

> [!question]- Bitoperationen (a=32, b=15, c=17)
> 
> ```
> 1. a | 1u   → 33
> 2. b & 0u   → 0
> 3. c ^ 3u   → 18   (10001 ^ 00011 = 10010)
> 4. a << 2u  → 128
> 5. a >> 1u  → 16
> 6. a >> 4u  → 2
> ```

> [!question]- Kombinierte Zuweisungen (a=5, b=4, c=9, d=7)
> 
> ```
> a += b;        → a = 9
> b -= (c % b);  → b = 4 - 1 = 3
> c *= (d + 3);  → c = 90
> d /= 3;        → d = 2
> ```
> 
> Ausgabe: `a = 9, b = 3, c = 90, d = 2`

> [!question]- Ergebnistypen Siehe Tabelle im Abschnitt „Typumwandlung → Ergebnistypen (Übung)“.

> [!question]- Zusatzaufgaben Operatoren (ergänzt, Lösungsideen)
> 
> - **x gerade ohne `%`** (1 = gerade): `!(x & 1u)`
> - **Ungerades y mit x ≤ y ≤ x+1, Typ unsigned:** `x | 1u` (x ungerade → y = x; x gerade → y = x + 1)
> - **Zweierpotenzen 2⁰ … 2ⁿ nur mit `=`, `<<=`, `<`, `<<`, `,`:**
>     
>     ```c
>     unsigned limit = 1u << n;                       // 2^nfor (unsigned p = 1u; p <= limit; p <<= 1u) {   // p = 2^0, 2^1, ..., 2^n    printf("%u\n", p);}
>     ```
>     
>     Idee: `p` startet bei `1u` und wird mit `p <<= 1u` in jedem Schritt verdoppelt; die Obergrenze `2^n` wird mit `1u << n` berechnet.
> - **Werte/Typen:**
>     - `4 >= 2 ? 5 : 3.4` → **5.0**, Typ `double` (gewöhnliche arithmetische Umwandlung)
>     - `'0' - '5' == -5` → **1**, Typ `int`
>     - `~0` → **-1**, Typ `int` (alle Bits 1, Zweierkomplement)
>     - `(int)(2.5 * 3)` → **7**, Typ `int` (7,5 abgeschnitten)
>     - `-10 + 1U + 10LL` → `-10 + 1U` wird `unsigned` = 4294967287; `+ 10LL` → `long long` (kann alle `unsigned`-Werte darstellen) = **4294967297**, Typ `long long`

## 05 – Kontrollstrukturen

> [!question]- `if` → `switch`
> 
> ```c
> switch (option) {
>     case 1:  printf("option 1\n"); break;
>     case 2:  printf("option 2\n"); break;
>     default: printf("unknown option!\n"); break;
> }
> ```

> [!question]- `while`-Schleife korrigieren (0 bis 9 ausgeben) Fehler: Bedingung `i > 10` (falsch), **fehlende Klammern** `{ }`, wodurch `i++` nicht im Körper steht.
> 
> ```c
> int i = 0;
> while (i < 10) {
>     printf("%d\n", i);
>     i++;
> }
> ```

> [!question]- `for`-Schleife mit `float` terminiert nicht `0.1f` ist binär **nicht exakt darstellbar**; `i` erreicht daher nie **genau** `1.0f` → `i != 1.0f` bleibt immer wahr. **Lösung:** ganzzahlige Zählvariable verwenden:
> 
> ```c
> for (int i = 0; i < 10; ++i) {
>     printf("%f\n", i / 10.0f);
> }
> ```

> [!question]- `while` → `for` (Summe ungerader Zahlen 0…5) Ausgabe: **`sum = 9`** (1 + 3 + 5).
> 
> ```c
> for (int i = 0; i <= 5; ++i) { if (i % 2) sum += i; }
> // oder kompakter:
> for (int i = 1; i <= 5; i += 2) { sum += i; }
> ```

> [!question]- `continue`: Warum Endlosschleife? Bei `i = 1` (ungerade) wird `continue` ausgeführt, **bevor** `i++` erreicht wird → `i` bleibt für immer 1. (Das Original prüft zudem `i % 2` für _ungerade_ und gibt dann _gerade_ Zahlen aus.) **Korrektur (ungerade Zahlen 1…19):**
> 
> ```c
> int i = 0;
> while (i < 20) {
>     if (i % 2) printf("%d\n", i);
>     i++;
> }
> // oder
> for (int i = 1; i < 20; i += 2) printf("%d\n", i);
> ```

[^1]: 
	
