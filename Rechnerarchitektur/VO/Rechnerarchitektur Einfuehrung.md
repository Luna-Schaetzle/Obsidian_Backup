# Prozessor (CPU)

Eine CPU besteht aus zwei Hauptbestandteilen:

- **Steuerwerk** (Control Unit) – steuert und koordiniert alle Abläufe
- **Rechenwerk** (ALU, Arithmetic Logic Unit) – führt Berechnungen aus

Die CPU arbeitet mit einem **Takt** – dem „Herzschlag" der CPU. Die Taktfrequenz (z. B. in GHz) gibt an, wie viele Takte pro Sekunde erfolgen.

## Befehlszyklus (Fetch-Decode-Execute)

In jedem Befehlszyklus werden folgende Schritte durchlaufen:

1. **Holen (Fetch):** Instruktion aus dem Speicher laden
2. **Dekodieren (Decode):** Instruktion im Steuerwerk interpretieren
3. **Operanden laden:** Austausch benötigter Daten (= Operanden) mit dem Speicher
4. **Ausführen (Execute):** Befehl im Rechenwerk ausführen

---

# Zahlendarstellung

| System | Basis | Ziffern |
| --- | --- | --- |
| Binär (dual) | 2 | 0, 1 |
| Oktal | 8 | 0–7 |
| Hexadezimal | 16 | 0–9, A–F |

## Binär → Hexadezimal

Die Binärzahl wird in **4er-Gruppen** (von rechts) unterteilt. Jede Gruppe entspricht einer Hexadezimalziffer.

Beispiel: `1010 1101`

| 8 | 4 | 2 | 1 |  | 8 | 4 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 1 | 0 |  | 1 | 1 | 0 | 1 |
| 8+0+2+0 = **10** → **A** | | | |  | 8+4+0+1 = **13** → **D** | | | |

Ergebnis: $(AD)_{16}$

## Binär → Oktal

Die Binärzahl wird in **3er-Gruppen** (von rechts) unterteilt. Jede Gruppe entspricht einer Oktalziffer.

Beispiel: `101 101 101`

| 4 | 2 | 1 |  | 4 | 2 | 1 |  | 4 | 2 | 1 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 1 |  | 1 | 0 | 1 |  | 1 | 0 | 1 |
| 5 | | |  | 5 | | |  | 5 | | |

Ergebnis: $(555)_8$

---

# Aufbau von Mikrochips

*(Nur oberflächliches Wissen nötig – Grundprinzipien verstehen.)*

## Vom Silizium zum Chip

1. **Rohmaterial:** hochreines Silizium (Sand → Reinstsilizium)
2. **Wafer:** Silizium wird zu kreisförmigen Scheiben (Wafern) gezogen
3. **Strukturierung:** Durch **Photolithografie** werden Strukturen (Leiterbahnen, Transistoren) Schicht für Schicht auf den Wafer aufgebracht
4. **Zerlegung:** Der Wafer wird in einzelne **Dies** (Chips) zerschnitten, diese werden verpackt (Gehäuse mit Kontakten = Package)

## Wichtige Bauelemente

- **Transistor:** elementarer Schalter (an/aus); bildet zusammen mit weiteren die Logikgatter – moderne Chips enthalten Milliarden davon
- **Logikgatter** (UND, ODER, NICHT …): setzen sich aus Transistoren zusammen und realisieren digitale Schaltungen

## Beeinflussende Faktoren

- **Strukturgröße** (z. B. 5 nm, 3 nm): kleinere Strukturen → mehr Transistoren pro Fläche, weniger Stromverbrauch, mehr Geschwindigkeit
- Je kleiner die Strukturen, desto aufwendiger und teurer die Fertigung (EUV-Lithografie)

---

# Moore's Law (Mooresches Gesetz)

## Aussage

1965 beobachtete **Gordon Moore** (Mitgründer von Intel):

> Die Anzahl der Transistoren auf einem Mikrochip **verdoppelt sich etwa alle 2 Jahre** – bei annähernd konstanten Kosten.

## Bedeutung

- **Treibermotor der Computertechnik:** stetige Steigerung von Rechenleistung und Speicherkapazität bei gleichbleibenden oder sinkenden Kosten
- Langfristige **Planungssicherheit** für die Halbleiterindustrie (Intel nutzte es jahrzehntelang als Roadmap)
- **Technologischer Sog:** Software wächst mit der Hardware mit, weil mehr Leistung verfügbar wird

## Aktuelle Situation

- Physikalische Grenzen werden erreicht → reine Verkleinerung stößt an Grenzen
- **Moore's Law verlangsamt sich / gilt nicht mehr uneingeschränkt**
- Auswege der Industrie: 3D-Chips (Chiplets), spezialisierte Beschleuniger (GPUs, TPUs), neue *Materialien*