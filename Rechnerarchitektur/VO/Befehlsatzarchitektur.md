
die Regiester sind quasi wie wariablen die man verwenden kann
Auser die letzten drei die sind für besondere sachen

r13 Stack (Pointer)
r14 für schleifen und unterprogramme
r14 Programmzähler

labels sind wie funktionen

Wichtig erste ist Ziehlregister


Die Flags werden mit den Bedingungen zugegriffen man setzt sie mit einem s

bei der verschibung können nur in geraden schritten verschoben werden beim Barrel shifter

Es können quasi immer nur zwei Nullen nach hinten verschoben werden 

Wichtig es kann kein Immediate-wert und die Barrel shifter verschibungen verwendet werden

Herausfinden wie ob die zahl darstellbar ist: 
- wenn es in 8bit darstellbar ist und mit Gerader Anzahl an nullen hinten drann dann geht es.
- zweierpotenzen gehen immer
- Schauen ob die Bitwise Invertierbare in 8 Bit geht
- Bis 255 ist es immer möglich

sprünge:

wir passen den programmzähler an

Branch B und BL funktioniert genau ähnlich

Vergleiche brauchen keine Flags




# 2

Speicherzugriff ist die reinfolge anders -> STR von links nach rechts schreiben r0, [r1] schreibt in r1 den inhalt von r0

Bei STR sind Immediate 12 Bit plus Vorzeichen

	 

