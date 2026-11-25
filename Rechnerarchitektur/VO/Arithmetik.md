# Vorgehensweise beim Entwurf

3 binär koordierte Zustandstabelle:
log_2 (Anzahl der Zustände) Aufgerundet.
Anzahl der Flip Flops ist anzahl von den bit an q 

bei meely automaten ist da q x und y entscheiden dann braucht man 3 bei Moore nur q und q' 

# Zahlendarstellung
das rechteste bit ist quasi das negative bit
der hintere teil wird zum vordersten teil dazuaddiert also die rechteste zahl ist minus und wird zu den hinter ergebenden zahlen addiert.
=> alles einsen ist -1 

> [!info] Aritmetische Negation in Zweierkomplement-Darstellung
> Einfügen


## Fallunterscheidung

Einfügen:

> [!example] Beispiele
> 


# ALU (Arithmetisch-logische Einheit)




# Arithmetik II

# Multiplikation 

algorithmus:
add bei eins und shift bei null wenn wir weiter gehen shift 

Algorithmus von Booth Klausur Relevant

## Algorithmus von Booth 
- Zahlne in Binär konvertieren
- von der ersten zahl das zweierkompliment berechnen
- zweite zahl um eine null hinten ergänzen für einfachkeit (damit wir ein bit einfacher zurück schauen können)
- Bei 00/11 eine null drunter schreiben unter der stelle
- bei 10 zweierkompliment in die Zeile schrieben
	- Falls eine 1 steht mit einsen aufüllen
	- Falls eine 0 steht mit nullen auffüllen
- addieren positive zahl schreiben 
- am ende alle Zeilen Addieren
- einen möglichen überlauf wird abgeschnitten/Ignoriert


> [!example] Beispiele
> 


# Division

für n bit 

- load Nullen n mal und dann a 
- shift um links und eine Null hinzufügen (Shift mitzählen man benötigt nur n shifts)
- wir substrakten 
- wenn vorne eine 1 steht dann restore mit add
- am ende hat man den rest ganz vorne und den Qoutienten ganz hinten in der Bit folge

> [!example] Beispiele
> 


# Festkommadarstellung 

Die Komma stelle ist fix und dahinter gehts gebrochen weiter 
Meaning: 421.1/2 1/4 1/8

# Gleitkommadarstellung

![[Pasted image 20261118095406.png]]


m MAthise ist das hinter dem Kommer 

ganz vorne sind immer zwei Zahlen das vorzeichen bit und der wert vor dem Komma 

falls bei der Multiplikation zu viel addiert wird also vor dem kommer mehr als zwei zahlen dann muss normalisiert wreden -> kommerverschieben das wieder zwei vor dem Komma sind

[Wissen woher der Bias kommt und grundsätzlich wie die Zahlen aufgebaut sind also nicht im detail für die Prüfung]


