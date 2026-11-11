- [[#1. Übersicht der Operatoren|1. Übersicht der Operatoren]]
	- [[#1. Übersicht der Operatoren#Wahrheitstabelle|Wahrheitstabelle]]
	- [[#1. Übersicht der Operatoren#Rechenbeispiel (8 Bit)|Rechenbeispiel (8 Bit)]]
- [[#2. Wichtig: Bitweise ≠ Logisch!|2. Wichtig: Bitweise ≠ Logisch!]]
- [[#3. Operator-Präzedenz (Reihenfolge) – häufige Testfalle!|3. Operator-Präzedenz (Reihenfolge) – häufige Testfalle!]]
- [[#4. Zahlenliterale und Ausgabe|4. Zahlenliterale und Ausgabe]]
	- [[#4. Zahlenliterale und Ausgabe#Binärausgabe (printf kann kein %b!)|Binärausgabe (printf kann kein %b!)]]
	- [[#4. Zahlenliterale und Ausgabe#Hex ↔ Binär Merktabelle|Hex ↔ Binär Merktabelle]]
- [[#5. DIE 5 Grundoperationen auf einzelnen Bits|5. DIE 5 Grundoperationen auf einzelnen Bits]]
	- [[#5. DIE 5 Grundoperationen auf einzelnen Bits#Merksatz|Merksatz]]
- [[#6. Masken|6. Masken]]
	- [[#6. Masken#Nibble / Byte extrahieren|Nibble / Byte extrahieren]]
	- [[#6. Masken#Bitfeld (mehrere Bits) auslesen und setzen|Bitfeld (mehrere Bits) auslesen und setzen]]
- [[#7. Shifts im Detail|7. Shifts im Detail]]
	- [[#7. Shifts im Detail#Logischer vs. arithmetischer Rechtsshift|Logischer vs. arithmetischer Rechtsshift]]
	- [[#7. Shifts im Detail#Undefined Behavior bei Shifts!|Undefined Behavior bei Shifts!]]
- [[#8. Zweierkomplement (negative Zahlen)|8. Zweierkomplement (negative Zahlen)]]
- [[#9. Nützliche Bit-Tricks|9. Nützliche Bit-Tricks]]
- [[#10. XOR-Eigenschaften|10. XOR-Eigenschaften]]
	- [[#10. XOR-Eigenschaften#Swap ohne Hilfsvariable|Swap ohne Hilfsvariable]]
	- [[#10. XOR-Eigenschaften#Einzelnes Vorkommen finden|Einzelnes Vorkommen finden]]
	- [[#10. XOR-Eigenschaften#Einfache XOR-"Verschlüsselung"|Einfache XOR-"Verschlüsselung"]]
	- [[#10. XOR-Eigenschaften#Parität|Parität]]
- [[#11. Flags (mehrere Optionen in einer Variable)|11. Flags (mehrere Optionen in einer Variable)]]
- [[#12. Rotation (Bits "im Kreis" schieben)|12. Rotation (Bits "im Kreis" schieben)]]
- [[#13. Bytes zusammenbauen / zerlegen|13. Bytes zusammenbauen / zerlegen]]
	- [[#13. Bytes zusammenbauen / zerlegen#RGB-Farbe packen / entpacken|RGB-Farbe packen / entpacken]]
	- [[#13. Bytes zusammenbauen / zerlegen#Bits umkehren (Reverse)|Bits umkehren (Reverse)]]
- [[#14. Bitfelder in structs|14. Bitfelder in structs]]
- [[#15. Fallen und typische Fehler|15. Fallen und typische Fehler]]
	- [[#15. Fallen und typische Fehler#a) Integer Promotion|a) Integer Promotion]]
	- [[#15. Fallen und typische Fehler#b) Signed Rechtsshift mit negativen Zahlen|b) Signed Rechtsshift mit negativen Zahlen]]
	- [[#15. Fallen und typische Fehler#c) Datentyp der Konstante|c) Datentyp der Konstante]]
	- [[#15. Fallen und typische Fehler#d) `&` statt `&&` (und umgekehrt)|d) `&` statt `&&` (und umgekehrt)]]
	- [[#15. Fallen und typische Fehler#e) `==` ohne Klammern (siehe Abschnitt 3)|e) `==` ohne Klammern (siehe Abschnitt 3)]]
	- [[#15. Fallen und typische Fehler#f) Maske nach Bitverschiebung bei vorzeichenbehafteten Typen|f) Maske nach Bitverschiebung bei vorzeichenbehafteten Typen]]
- [[#16. Typische Testaufgaben – Schnellrezepte|16. Typische Testaufgaben – Schnellrezepte]]
- [[#17. Rechenbeispiele zum Üben (mit Lösungen)|17. Rechenbeispiele zum Üben (mit Lösungen)]]
- [[#18. Kurze Checkliste für den Test|18. Kurze Checkliste für den Test]]


## 1. Übersicht der Operatoren

|Operator|Name|Beispiel|Bedeutung|
|---|---|---|---|
|`&`|AND|`a & b`|Bit ist 1, wenn **beide** Bits 1 sind|
|`\|`|OR|`a \| b`|Bit ist 1, wenn **mindestens eines** 1 ist|
|`^`|XOR|`a ^ b`|Bit ist 1, wenn Bits **verschieden** sind|
|`~`|NOT|`~a`|Alle Bits **invertieren** (Einerkomplement)|
|`<<`|Linksshift|`a << n`|Bits um n nach links, rechts mit 0 füllen|
|`>>`|Rechtsshift|`a >> n`|Bits um n nach rechts|

Zuweisungsformen: `&= |= ^= <<= >>=`

### Wahrheitstabelle

|a|b|a & b|a \| b|a ^ b|
|---|---|---|---|---|
|0|0|0|0|0|
|0|1|0|1|1|
|1|0|0|1|1|
|1|1|1|1|0|

### Rechenbeispiel (8 Bit)

```c
  a     = 0b11001010   // 202
  b     = 0b10101100   // 172

  a & b = 0b10001000
  a | b = 0b11101110
  a ^ b = 0b01100110
 ~a     = 0b00110101   // bei 8 Bit (siehe Abschnitt "Fallen" zu int-Promotion!)
  a << 2= 0b00101000   // vorne abgeschnitten bei 8 Bit
  a >> 2= 0b00110010
```

---

## 2. Wichtig: Bitweise ≠ Logisch!

```c
int a = 6, b = 1;      // 0b110 und 0b001

a &  b   // 0   (bitweise: 110 & 001 = 000)
a && b   // 1   (logisch: beides "wahr" -> 1)

a |  b   // 7
a || b   // 1

~a       // -7  (bitweise NOT)
!a       // 0   (logisches NOT)
```

---

## 3. Operator-Präzedenz (Reihenfolge) – häufige Testfalle!

Von **hoch** nach **niedrig** (nur relevante):

```
1.  ~  !  (unär)
2.  *  /  %
3.  +  -
4.  <<  >>
5.  <  <=  >  >=
6.  ==  !=          <-- bindet STÄRKER als &, ^, |
7.  &
8.  ^
9.  |
10. &&
11. ||
12. = += &= ...
```

```c
// FALSCH (== bindet stärker als &):
if (x & 0x04 == 0x04)    // wird zu: x & (0x04 == 0x04) -> x & 1 !

// RICHTIG:
if ((x & 0x04) == 0x04)

// Auch Shift vs. Plus:
1 << 2 + 1     // = 1 << 3 = 8   (+ bindet stärker als <<)
(1 << 2) + 1   // = 5
```

**Regel: Im Zweifel immer Klammern setzen!**

---

## 4. Zahlenliterale und Ausgabe

```c
int d = 42;          // dezimal
int b = 0b101010;    // binär  (GCC-Erweiterung / C23)
int o = 052;         // oktal  (führende 0!)
int h = 0x2A;        // hexadezimal

printf("%d\n", x);   // dezimal
printf("%x\n", x);   // hex klein
printf("%X\n", x);   // hex groß
printf("%o\n", x);   // oktal
printf("%#x\n", x);  // hex mit 0x-Präfix
printf("%u\n", x);   // unsigned
```

### Binärausgabe (printf kann kein %b!)

```c
#include <stdio.h>

void print_bin(unsigned int n) {
    for (int i = sizeof(n) * 8 - 1; i >= 0; i--) {
        putchar((n >> i) & 1 ? '1' : '0');
        if (i % 4 == 0 && i != 0) putchar(' ');   // Gruppierung (optional)
    }
    putchar('\n');
}

// Nur 8 Bit ausgeben:
void print_bin8(unsigned char n) {
    for (int i = 7; i >= 0; i--)
        putchar((n >> i) & 1 ? '1' : '0');
    putchar('\n');
}
```

### Hex ↔ Binär Merktabelle

```
0=0000  1=0001  2=0010  3=0011
4=0100  5=0101  6=0110  7=0111
8=1000  9=1001  A=1010  B=1011
C=1100  D=1101  E=1110  F=1111
```

---

## 5. DIE 5 Grundoperationen auf einzelnen Bits

Bit-Position zählt **von rechts, ab 0** (LSB = Bit 0).

```c
unsigned int x = 0b00001010;
int n = 2;                      // Bit-Nummer

// 1) Bit n SETZEN (auf 1)
x |= (1u << n);                 // 0b00001110

// 2) Bit n LÖSCHEN (auf 0)
x &= ~(1u << n);                // 0b00001010

// 3) Bit n UMSCHALTEN (toggle)
x ^= (1u << n);                 // 0 -> 1, 1 -> 0

// 4) Bit n PRÜFEN (ist es gesetzt?)
if (x & (1u << n)) { /* gesetzt */ }

// 5) Bit n auslesen als 0 oder 1
int bit = (x >> n) & 1u;

// Bonus: Bit n auf Wert v (0 oder 1) setzen
x = (x & ~(1u << n)) | ((unsigned)v << n);
```

### Merksatz

|Ziel|Operation|Maske|
|---|---|---|
|setzen|`x \|= maske`|`1 << n`|
|löschen|`x &= maske`|`~(1 << n)`|
|toggeln|`x ^= maske`|`1 << n`|
|prüfen|`x & maske`|`1 << n`|

- **OR** setzt Bits (`|` mit 1 → 1)
- **AND** löscht/filtert Bits (`&` mit 0 → 0, `&` mit 1 → behalten)
- **XOR** kippt Bits (`^` mit 1 → invertiert, `^` mit 0 → bleibt)

---

## 6. Masken

```c
#define BIT(n)   (1u << (n))

0x01   // 0000 0001  -> Bit 0
0x0F   // 0000 1111  -> untere 4 Bit (Low-Nibble)
0xF0   // 1111 0000  -> obere 4 Bit  (High-Nibble)
0xFF   // 1111 1111  -> unteres Byte
0x80   // 1000 0000  -> Bit 7 (MSB bei 8 Bit)

// Maske mit den untersten n Bits gesetzt:
unsigned mask = (1u << n) - 1;      // n=4 -> 0b1111

// Mehrere Bits gleichzeitig:
x |=  (BIT(1) | BIT(3));            // Bit 1 und 3 setzen
x &= ~(BIT(1) | BIT(3));            // Bit 1 und 3 löschen
x ^=  (BIT(1) | BIT(3));            // Bit 1 und 3 toggeln

// Alle Bits setzen / löschen
x = ~0u;      // alle 1
x = 0;        // alle 0
```

### Nibble / Byte extrahieren

```c
unsigned char b = 0xAB;
unsigned char high = (b >> 4) & 0x0F;   // 0xA
unsigned char low  = b & 0x0F;          // 0xB
```

### Bitfeld (mehrere Bits) auslesen und setzen

```c
// Bits [pos .. pos+len-1] auslesen:
unsigned get_bits(unsigned x, int pos, int len) {
    return (x >> pos) & ((1u << len) - 1);
}

// Bits [pos .. pos+len-1] auf Wert v setzen:
unsigned set_bits(unsigned x, int pos, int len, unsigned v) {
    unsigned mask = ((1u << len) - 1) << pos;
    return (x & ~mask) | ((v << pos) & mask);
}

// Beispiel: x = 0b10110100, get_bits(x, 2, 3) -> bits 4..2 = 0b101 = 5
```

---

## 7. Shifts im Detail

```c
x << n    // entspricht x * 2^n   (solange kein Überlauf)
x >> n    // entspricht x / 2^n   (Ganzzahldivision, bei positiven Werten)
```

```c
5 << 1    // 10
5 << 3    // 40
40 >> 3   // 5
13 >> 1   // 6   (Nachkommastelle fällt weg)

// Schnelle Multiplikation z.B. mit 10:
x * 10  ==  (x << 3) + (x << 1)     // 8x + 2x
```

### Logischer vs. arithmetischer Rechtsshift

|Typ|`>>` Verhalten|
|---|---|
|`unsigned`|**logisch**: links wird mit **0** aufgefüllt|
|`signed`|**implementation-defined**, meist **arithmetisch**: Vorzeichenbit wird nachgezogen|

```c
unsigned char u = 0b10000000;   // 128
u >> 1                          // 0b01000000 = 64

signed char s = -128;           // 0b10000000
s >> 1                          // meist 0b11000000 = -64 (Vorzeichen bleibt)

-8 >> 1    // meist -4
```

### Undefined Behavior bei Shifts!

```c
1 << 32        // UB bei 32-Bit int (Shift >= Breite des Typs)
1 << -1        // UB (negativer Shift-Count)
(-1) << 1      // UB bei negativen signed-Werten (Linksshift)
1 << 31        // bei signed int: Überlauf ins Vorzeichenbit -> problematisch
1u << 31       // OK mit unsigned!
```

**Tipp:** Immer `1u` bzw. `1UL`/`1ULL` verwenden, nicht `1`.

---

## 8. Zweierkomplement (negative Zahlen)

```c
-x == ~x + 1          // Negation per Zweierkomplement

// 8-Bit Beispiel:  5  = 0000 0101
//                 ~5  = 1111 1010
//                ~5+1 = 1111 1011 = -5
```

```c
~x        ==  -x - 1        // z.B. ~0 == -1,  ~5 == -6
~0        ==  -1            // alle Bits 1
```

Wertebereich (n Bit, signed): `-2^(n-1)` ... `2^(n-1) - 1` z.B. 8 Bit: -128 ... 127

---

## 9. Nützliche Bit-Tricks

```c
// Gerade / ungerade
if (x & 1) { /* ungerade */ }
else       { /* gerade   */ }

// Ist x eine Zweierpotenz? (x > 0)
if (x && !(x & (x - 1))) { /* ja */ }

// Niedrigstes gesetztes Bit löschen
x & (x - 1)             // 0b01101000 -> 0b01100000

// Niedrigstes gesetztes Bit isolieren
x & -x                  // 0b01101000 -> 0b00001000

// Anzahl gesetzter Bits zählen (Kernighan)
int count_bits(unsigned x) {
    int c = 0;
    while (x) {
        x &= (x - 1);   // jeweils niedrigstes 1-Bit löschen
        c++;
    }
    return c;
}

// Alternative, simpel:
int count_bits2(unsigned x) {
    int c = 0;
    while (x) { c += x & 1; x >>= 1; }
    return c;
}

// Modulo mit Zweierpotenz:  x % 2^n  ==  x & (2^n - 1)
x % 8   ==  x & 7        // (nur für unsigned/positive x)
x % 16  ==  x & 15

// Auf Vielfaches von 8 abrunden
x & ~7u

// Auf Vielfaches von 8 aufrunden
(x + 7) & ~7u

// Vorzeichen prüfen (32 Bit)
if (x & 0x80000000) { /* negativ (Vorzeichenbit) */ }

// Groß-/Kleinbuchstabe umwandeln (ASCII: Bit 5 = 0x20)
c |  0x20      // -> Kleinbuchstabe   ('A' -> 'a')
c & ~0x20      // -> Großbuchstabe    ('a' -> 'A')
c ^  0x20      // -> umschalten
```

---

## 10. XOR-Eigenschaften

```c
a ^ a == 0          // sich selbst auslöschen
a ^ 0 == a          // neutrales Element
a ^ b == b ^ a      // kommutativ
(a ^ b) ^ b == a    // doppelt anwenden = rückgängig (Verschlüsselung!)
```

### Swap ohne Hilfsvariable

```c
a ^= b;
b ^= a;
a ^= b;
// ACHTUNG: Funktioniert NICHT, wenn a und b dieselbe Variable sind
// (z.B. swap(&x, &x) -> Ergebnis 0)
```

### Einzelnes Vorkommen finden

```c
// Alle Zahlen kommen doppelt vor, eine nur einmal:
int result = 0;
for (int i = 0; i < n; i++)
    result ^= arr[i];
// result = die einzelne Zahl
```

### Einfache XOR-"Verschlüsselung"

```c
for (int i = 0; i < len; i++)
    data[i] ^= key;       // 2x anwenden stellt Original wieder her
```

### Parität

```c
// 1 wenn ungerade Anzahl an 1-Bits
int parity(unsigned x) {
    int p = 0;
    while (x) { p ^= (x & 1); x >>= 1; }
    return p;
}
```

---

## 11. Flags (mehrere Optionen in einer Variable)

```c
#define FLAG_READ   (1u << 0)   // 0001
#define FLAG_WRITE  (1u << 1)   // 0010
#define FLAG_EXEC   (1u << 2)   // 0100

unsigned perms = 0;

perms |= FLAG_READ | FLAG_WRITE;     // setzen   -> 0011
perms &= ~FLAG_WRITE;                // löschen  -> 0001
perms ^= FLAG_EXEC;                  // toggeln  -> 0101

if (perms & FLAG_READ)  { /* Lesen erlaubt */ }

// ALLE angegebenen Flags gesetzt?
if ((perms & (FLAG_READ | FLAG_WRITE)) == (FLAG_READ | FLAG_WRITE)) { }

// MINDESTENS EIN Flag gesetzt?
if (perms & (FLAG_READ | FLAG_WRITE)) { }

// Mit enum:
enum { A = 1 << 0, B = 1 << 1, C = 1 << 2 };
```

---

## 12. Rotation (Bits "im Kreis" schieben)

C hat keinen Rotationsoperator – selbst bauen (für 32 Bit, n in 1..31):

```c
#include <stdint.h>

uint32_t rotl32(uint32_t x, unsigned n) {
    return (x << n) | (x >> (32 - n));
}

uint32_t rotr32(uint32_t x, unsigned n) {
    return (x >> n) | (x << (32 - n));
}

// 8 Bit:
uint8_t rotl8(uint8_t x, unsigned n) {
    return (uint8_t)((x << n) | (x >> (8 - n)));
}

// Beispiel: rotl8(0b10010011, 2) = 0b01001110
```

---

## 13. Bytes zusammenbauen / zerlegen

```c
#include <stdint.h>

// 4 Bytes -> 32 Bit
uint32_t v = ((uint32_t)b3 << 24) | ((uint32_t)b2 << 16)
           | ((uint32_t)b1 <<  8) |  (uint32_t)b0;

// 32 Bit -> 4 Bytes
uint8_t b0 =  v        & 0xFF;
uint8_t b1 = (v >>  8) & 0xFF;
uint8_t b2 = (v >> 16) & 0xFF;
uint8_t b3 = (v >> 24) & 0xFF;

// Byte-Reihenfolge tauschen (Endianness)
uint32_t swap32(uint32_t x) {
    return ((x & 0x000000FF) << 24) |
           ((x & 0x0000FF00) <<  8) |
           ((x & 0x00FF0000) >>  8) |
           ((x & 0xFF000000) >> 24);
}

// Nibbles tauschen in einem Byte
uint8_t swap_nibbles(uint8_t x) {
    return (uint8_t)((x << 4) | (x >> 4));
}
```

### RGB-Farbe packen / entpacken

```c
uint32_t rgb = (r << 16) | (g << 8) | b;

uint8_t r = (rgb >> 16) & 0xFF;
uint8_t g = (rgb >>  8) & 0xFF;
uint8_t b =  rgb        & 0xFF;
```

### Bits umkehren (Reverse)

```c
uint8_t reverse8(uint8_t x) {
    uint8_t r = 0;
    for (int i = 0; i < 8; i++) {
        r = (r << 1) | (x & 1);
        x >>= 1;
    }
    return r;
}
```

---

## 14. Bitfelder in structs

```c
struct Flags {
    unsigned int a : 1;    // 1 Bit
    unsigned int b : 3;    // 3 Bit (0..7)
    unsigned int c : 4;    // 4 Bit (0..15)
};

struct Flags f = {0};
f.a = 1;
f.b = 5;
f.c = 20;      // Überlauf! 20 passt nicht in 4 Bit -> 20 % 16 = 4

printf("%zu\n", sizeof(struct Flags));   // meist 4
```

- Anordnung der Bits im Speicher ist **implementation-defined**
- Auf Bitfelder kann man **keine Adresse** (`&f.a`) nehmen

---

## 15. Fallen und typische Fehler

### a) Integer Promotion

`char`/`short` werden in Ausdrücken zu `int` erweitert:

```c
unsigned char a = 0b00001111;
~a                    // = 0xFFFFFFF0 (als int!), NICHT 0xF0
(unsigned char)~a     // = 0xF0
if (~a == 0xF0)       // FALSCH! (0xFFFFFFF0 != 0xF0)
if ((unsigned char)~a == 0xF0)   // richtig

unsigned char c = 0x80;
c << 1                // = 0x100 (als int, nicht abgeschnitten!)
(unsigned char)(c << 1) // = 0x00
```

### b) Signed Rechtsshift mit negativen Zahlen

```c
char c = 0x80;          // meist -128 (signed char)
c >> 4                  // meist 0xF8 (-8), nicht 0x08!
// Abhilfe: unsigned verwenden
unsigned char uc = 0x80;
uc >> 4                 // 0x08
```

### c) Datentyp der Konstante

```c
1 << 40          // UB: 1 ist int (32 Bit)
1ULL << 40       // OK
1u << 31         // OK
```

### d) `&` statt `&&` (und umgekehrt)

```c
if (a & b)       // bitweise  -> kann 0 sein, obwohl beide != 0
if (a && b)      // logisch
// z.B. a = 1, b = 2:  a & b = 0 (falsch!),  a && b = 1 (wahr)
```

### e) `==` ohne Klammern (siehe Abschnitt 3)

### f) Maske nach Bitverschiebung bei vorzeichenbehafteten Typen

Beim Extrahieren immer erst schieben, **dann** mit `& mask` auf die gewünschten Bits reduzieren – so ist ein mitgezogenes Vorzeichenbit egal.

---

## 16. Typische Testaufgaben – Schnellrezepte

|Aufgabe|Lösung|
|---|---|
|Bit n setzen|`x \|= 1u << n`|
|Bit n löschen|`x &= ~(1u << n)`|
|Bit n toggeln|`x ^= 1u << n`|
|Bit n lesen|`(x >> n) & 1`|
|Untere n Bits behalten|`x & ((1u << n) - 1)`|
|Untere n Bits löschen|`x & ~((1u << n) - 1)`|
|Gerade/ungerade|`x & 1`|
|x * 2^n|`x << n`|
|x / 2^n|`x >> n`|
|x % 2^n|`x & ((1u << n) - 1)`|
|Zweierpotenz?|`x && !(x & (x-1))`|
|Niedrigstes 1-Bit isolieren|`x & -x`|
|Niedrigstes 1-Bit löschen|`x & (x-1)`|
|Alle Bits invertieren|`~x`|
|Negation|`~x + 1`|
|Zwei Variablen tauschen|`a^=b; b^=a; a^=b;`|
|Low-Byte|`x & 0xFF`|
|High-Nibble eines Bytes|`(x >> 4) & 0x0F`|
|Nibbles tauschen|`(x << 4) \| (x >> 4)` (auf Byte kürzen)|
|Bits zählen|`while(x){x&=x-1;c++;}`|

---

## 17. Rechenbeispiele zum Üben (mit Lösungen)

```c
unsigned char a = 0b10110110;   // 0xB6 = 182
unsigned char b = 0b01101101;   // 0x6D = 109

a & b            // 0b00100100 = 0x24 = 36
a | b            // 0b11111111 = 0xFF = 255
a ^ b            // 0b11011011 = 0xDB = 219
(unsigned char)~a   // 0b01001001 = 0x49 = 73
(unsigned char)(a << 2)  // 0b11011000 = 0xD8 = 216
a >> 3           // 0b00010110 = 0x16 = 22
```

```c
int x = 0x0F;
x << 4           // 0xF0   = 240
x | 0xF0         // 0xFF   = 255
x ^ 0xFF         // 0xF0   = 240
x & 0x05         // 0x05   = 5
~x               // -16    (0xFFFFFFF0 bei 32 Bit)
```

---

## 18. Kurze Checkliste für den Test

1. **Typ beachten:** `signed` / `unsigned`, `char` / `int` (Promotion!)
2. **Klammern setzen** bei `&`, `|`, `^` zusammen mit `==`, `+`, `<<`
3. **Bit-Zählung** startet bei **0** von **rechts**
4. **`1u << n`** statt `1 << n`
5. **Shift ≥ Typbreite** und **Linksshift negativer Zahlen** = Undefined Behavior
6. `~` auf `unsigned char` liefert ein `int` → ggf. casten
7. **Setzen = OR, Löschen = AND mit ~Maske, Toggle = XOR, Prüfen = AND**
8. Binär ↔ Hex immer in **4er-Gruppen** umrechnen

Viel Erfolg beim Test! 🍀