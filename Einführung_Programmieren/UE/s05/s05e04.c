#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>


_Bool bool1(int number) {
    return (number % 2 == 0);  //in dieser Funktion wierd die number mit %2 gerechnet und überprüft ob sie 0
                                //bei dem == wird es zu einer Aussage und dadurch zu einem Bool
}

_Bool bool2(int number) {
    return number;              //Das funktioniert da _bool so definiert ist das eine 0 -> false (0) wird und alle anderen nummern zu true (1)
                                //hier passiert die typumwandlung beim return
}

bool bool3(int number) {
    if (number % 2 == 0) {      //hier verwenden wir eine if bedingung um zu bestimmen ob es true oder false returnd werden soll
        return true;            //hier passiert die typumwandlung beim return wo die schlüsselwörter (true, false) in 0 und 1 umgewandelt werden
    }
    return false;
}

bool bool4(int number) {    //ähnlich wie bei der zwei
    return number;          //typumwandlung beim return
}

bool bool5(int number) {
    return (number % 2 == 0) ? 1 : 0;       //diese Funktion funktioniert mit hilfe des bedingungsoperator
}                                           //hier wird die typumwandlung beim Bedingungsoperator gemacht (weil entweder 1 oder 0)

_Bool bool6(bool a, bool b) {
    return a || b;                          //Die funktion funktioniert als ein einfaches Oder Gatter zweier Boolischer Werte
                                            //hier passiert eine typumwandlung beim return von bool auf _Bool
}

_Bool bool7(int number) {
    _Bool tmp = number + 5;                 //hier wird als erstes die number + 5 gerechnet dann wied es umgewandelt in 1 oder 0 je nach dem ob es 0 ergibt oder etwas anderes
    if (tmp) {                              //hier wird dann geschaut ob es 1 ist
        return true;
    }
    return false;                           //beim Return passiert nochmal eine typumwandlung bei true -> 1 und false -> 2
}

int bool8(_Bool a) {
    if (a) {                                //hier wird wieder eine If bedingung verwendet für 1 ture 0 false
        return true;                        //typumwandlung beim return von true auf 1
    }
    return 0;
}


void print_type_sizes(void) {
    printf("=== MEMORY FOOTPRINT (sizeof in Bytes) ===\n");
    printf("sizeof(_Bool):     %zu Byte(s)\n", sizeof(_Bool));
    printf("sizeof(bool):      %zu Byte(s)\n", sizeof(bool));
    printf("sizeof(int):       %zu Byte(s)\n\n", sizeof(int));
}


int main(void) {
    printf("1. %d\n", bool1(4));
    printf("2. %d\n", bool2(123));
    printf("3. %d\n", bool3(-7));
    printf("4. %d\n", bool4(18));
    printf("5. %d\n", bool5(4));
    printf("6. %d\n", bool6(-9, false));
    printf("7. %d\n", bool7(-5));
    printf("8. %d\n", bool8(123));

    print_type_sizes();

    return EXIT_SUCCESS;
}
