## Organisation (Kurzfassung)

|Thema|Details|
|---|---|
|Vorlesung|Montag 12:00–13:30, HS B (aufgezeichnet, Videos in OLAT)|
|Sprechstunde|Dienstag 10:15–11:15, Raum 3M09 (ICT)|
|Webseite|https://cl-teaching.uibk.ac.at/26w/fp/|
|Sprache|Deutsch, Quelltext auf Englisch|
|Tutorium|Montag 17:00–17:45, SR 12 (freiwillig, Lilly Schönherr)|
|Registrierung|online bis 31. Januar 2027|

**Wöchentlicher Ablauf**

- **Mo** – Vorlesung zu Thema _n_, Tutorium
- **Di 20:00** – Frist: Übungsblatt _n−1_ hochladen + Kreuzliste in OLAT-UE
- **Mi** – Übungsgruppen (Besprechung Blatt _n−1_); Blatt _n_ online spätestens Mittwoch

**Wichtige Termine**

- Vorlesung 3 entfällt live → **Video**; Fragen dazu in den Übungsgruppen am 4. November
- Keine VO am 5.10., 26.10., 2.11.
- 25. Januar: Probeklausur + Q&A (**nicht** klausurrelevant)
- Klausur: **3. Februar 2027** (Anmeldung 30.12.–20.1. via LFU), 2. Termin 22. März 2027, 3. Termin Juli/September 2027
- Es reicht, **eine** Klausur zu bestehen

**Benotung**

- **VO:** nur Klausur (schriftlich, Papier, closed book)
- **UE/PS:** 80 % Übungsblätter + 20 % Präsentation der Lösung
- Übungsgruppen ab 21. Oktober **verpflichtend**

> [!warning] KI-Ampel in dieser LV
> 
> |Bereich|Status|
> |---|---|
> |Kreative Aufgaben (Ideen, Texte, Folien)|🔴 verboten|
> |Fachliche Kernaufgaben (Programmierung, Beweise)|🔴 verboten|
> |Unterstützende Aufgaben (Literatursuche, Zusammenfassung/Übersetzung ohne direkte Übernahme, Beweisüberprüfung)|🟠 eingeschränkt, kennzeichnen|
> |Aufbereitung der Darstellung (Rechtschreibung, Textverbesserung)|🟡 erlaubt|
> 
> Ausdrücklich **verboten:** Generierung von Lösungshinweisen. Studierende sind für alle Abgaben selbst verantwortlich. _(Dieses Dokument ist eine KI-gestützte Zusammenfassung der Folien!)_

> [!tip] Wie man Programmieren lernt ✅ (viele) Programme lesen, verstehen, schreiben · aktiv teilnehmen · Übungen selbst/in kleinen Gruppen lösen ❌ Lösungen von anderen oder aus dem Internet kopieren
> 
> Literatur: Richard Bird – _Introduction to Functional Programming using Haskell_, 2nd Ed. Folien auswendig lernen reicht **nicht** – Anwendung auf neue Beispiele wird verlangt.

---

## Algorithmus vs. Programm

- **Algorithmus** = sprachunabhängige Beschreibung der Lösung
- **Programm** = konkrete Umsetzung in einer Programmiersprache

Beispiel „Maximum von `m` und einer Liste":

```haskell
maxlist m []       = m
maxlist m (x : xs) = maxlist (max m x) xs
```

## Programmierparadigmen

| |Imperativ|Funktional|
|---|---|---|
|Grundidee|Zustand (Variablen → Daten), Zuweisungen ändern ihn|Funktionen im mathematischen Sinn|
|Auswertung|Zustandsänderungen|„Gleiches durch Gleiches ersetzen"|
|Beispiel|`x := (x + y) / 2`|`average x y = (x + y) / 2`|

```haskell
average 7 3 = (7 + 3) / 2 = 10 / 2 = 5   -- nur Substitution, kein Zustand
```

**Vorteile FP:** intuitive Auswertung · gut für Verifikation · ausdrucksstarke Konzepte · Parallelisierung leichter **Nachteile FP:** Zustände & I/O aufwändiger · rein funktionale Sprachen selten (aber FP-Konzepte in Scala, Python, F#, Rust, Clojure, Kotlin …)

**Historie (Auswahl):** Kombinatorische Logik (1924/30) → λ-Kalkül (Church, 1936) → LISP (1958) → ML (1973) → Erlang (1987) → **Haskell (1990)** → F#, Scala (2002/03)

## Syntax vs. Semantik

- **Syntax:** definiert, welche Programme _gültig_ sind (Computer lehnen syntaktische Fehler ab)
- **Semantik:** definiert die _Bedeutung_ gültiger Programme

## Haskell-Skripte

```haskell
-- einzeiliger Kommentar
average x y = (x + y) / 2

{- mehrzeiliger Kommentar
   kann Teile des Skripts deaktivieren -}
fahrenheitToCelsius f = (f - 32) * 5 / 9
```

- Dateiendung `.hs`; Skript = Sammlung von **Funktionsdefinitionen** (Gleichungen: links Name + Argumente, rechts Ausdruck)
- Namen von Funktionen/Variablen: **beginnen mit Kleinbuchstaben**, dürfen Zahlen enthalten; lange Namen in `camelCase`
- **Leerraum ist wichtig:** vorerst jede Zeile **ohne Einrückung** beginnen
- Syntax-Highlighting macht Code lesbarer (wird automatisch vom Editor gemacht)

## `ghci` und der REPL

```text
$ ghci Script_01.hs          -- Skript laden
ghci> 5 * (3 + 4)            -- Ausdruck auswerten
35
ghci> fahrenheitToCelsius 95
35.0
ghci> :load Script_01.hs     -- (neu) laden
ghci> :quit                  -- oder :q
```

**Ablauf:** Funktionen im Skript definieren → mit `ghci` laden (Erfolg oder Fehlermeldung) → Ausdrücke eingeben (**Read-Eval-Print-Loop**)

- **Parse-Fehler:** `5 + (3 * 7` (Klammer fehlt)
- **Typfehler:** `5 + "five"`
- Fehlermeldungen können verwirrend sein (`True + False`, `if 0 then 1 else 2`)
- **Resultat** = Wert, der nicht weiter vereinfacht werden kann (`42`, `"hello"`, `[7,1,3]`) – **nicht** `5 + 7`
- Eingebaute Funktionen (`+`, `*`, `:`, `++`, `head`, `tail`, …) stammen aus der **Prelude**

> [!example] FP vs. Taschenrechner Taschenrechner: `(8 - 32) * 5 / 9`, `(9 - 32) * 5 / 9`, … (immer neu eintippen) FP: einmal `fahrenheitToCelsius f = (f - 32) * 5 / 9` definieren, dann `fahrenheitToCelsius 8`, … Noch kürzer mit `map fahrenheitToCelsius [8,9,300]`.
> 
> **Ein funktionales Programm ist ein Rezept, um Eingaben in Ausgaben zu verwandeln.**

