
- [[#Vor/Nachteile Analogrechner | Digitalrechner|Vor/Nachteile Analogrechner | Digitalrechner]]
	- [[#Vor/Nachteile Analogrechner | Digitalrechner#Analogrechner|Analogrechner]]
	- [[#Vor/Nachteile Analogrechner | Digitalrechner#Digitalrechner|Digitalrechner]]
- [[#Kombinatorische Logik|Kombinatorische Logik]]
- [[#Elementare Operatoren|Elementare Operatoren]]
	- [[#Elementare Operatoren#OR - Operator|OR - Operator]]
	- [[#Elementare Operatoren#AND - Operator|AND - Operator]]
	- [[#Elementare Operatoren#NOT - Operator|NOT - Operator]]
- [[#Boolesche Axiome|Boolesche Axiome]]
- [[#Sätze|Sätze]]
- [[#De Morgansche Gesetze|De Morgansche Gesetze]]
- [[#Boolsche Funktionen|Boolsche Funktionen]]
- [[#Gatter|Gatter]]
- [[#Entwurfskriterien|Entwurfskriterien]]
	- [[#Entwurfskriterien#Laufzeitverhalten|Laufzeitverhalten]]
- [[#Wahrheitstabellen -> Boolscher austruck mit KKNF und KDNF|Wahrheitstabellen -> Boolscher austruck mit KKNF und KDNF]]
- [[#Karaugh-Veitc-Diagramme (KV)|Karaugh-Veitc-Diagramme (KV)]]

# Einleitung
- Entwerfung Digital/logische Schaltungen (Und/Oder/Nicht etc.)

# 1. Grundlagen der Digitaltechnik 

Digitaltechnik diskretiert ein Analoges Signal. Da Analoge signale viel zu viele einzelne werte hat. 
-> Digitaltechnik (beschrenkt werte auf bestimmte Werte 0,1,10,11, ...)

**Alle Arten von daten werden im digitalen als diskrete Zahlen gespeichert**

-> ASCII, Pixel, ...

## Vor/Nachteile Analogrechner | Digitalrechner
### Analogrechner
*Einfügen*
### Digitalrechner
*Einfügen*

## Kombinatorische Logik
digitale Zustände werden durch Gatter verbundne um einen austandszugang zu erhalten

Mehrstellige digitalschaltungen werden durch Vektoren dargestellt

# 2. Boolesche Algebra
## Elementare Operatoren
### OR - Operator
logische Summe  $+$    $v$

### AND - Operator
logisches Produkt 

### NOT - Operator
logisches Minus

## Boolesche Axiome
![[Pasted image 20261021090738.png]]

## Sätze 
![[Pasted image 20261021090751.png]]

## De Morgansche Gesetze
Wichtig für Vereinfachung von Formeln


## Boolsche Funktionen
Eine Schaltfunktion mit m = 1 heißt n-stellige Boolesche Funktion.
-> es gibt für jeden mögliche stelle eine Boolesche Funktion die das Beschreibt


# 3. Realisierung in Schaltung

Es ist möglich das man alle 

## Gatter
![[Pasted image 20261021092331.png]]

## Entwurfskriterien
- Flächenbedarf -> Anzahl Gatter -> Produktionskosten 
- Energieverbrauch
- Schaltgeschwindigkeit -> Anzahl Schaltebenen
- Laufzeitverhalten

### Laufzeitverhalten 

Bei dem entwurf einer Schaltung muss man beachten das die einzelnen Gatter eine gewisse Zeit brauchen bis sie zwischen zwei zuständen umschalten -> Laufzeiteffekt 
Diese Zeit nennt man Tau T

# Kombinatorische Logik Teil 2 Notizen

# Normalformen (Kanonische Darstellungen)
slide 6,7,8

## Wahrheitstabellen -> Boolscher austruck mit KKNF und KDNF

Es gibt jeweils eine eindeutige KDNF und eine KKNF.
Jede KDNF kann in KKNF konvertiert werden und vice versa 

KDNF -> wir schauen uns alle einsen an in der ausgangs spalte an 
alle null eingang spalten werden Negiert

KKNF -> wir schauen uns alle nullen an in der ausgangs spalte
alle einsen in den eingang spalten werden Negiert

## Karaugh-Veitc-Diagramme (KV)


# Optimierung

bis slide 29

# Synthese von Schaltungen 

