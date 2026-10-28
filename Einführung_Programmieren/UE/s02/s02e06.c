#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char first;
    char last;
    scanf("%c-%c", &first, &last);
    if ((first < 97 || first > 122) || (last < 97 || last > 122)) {
        printf("\nERROR: At least one input was not a lowercase letter!");
        return EXIT_FAILURE;
    }
    if (last > first){
    while (first < (last+1)) {          //Plus 1 damit wir die letzte zahl auch ncoh mit erhalten sonst würde die letzte Numer nicht mit ausgegeben
        printf("\n%c", first);
        first++;
    }
    }
    else {
        while ((first+1) > last) {          //Plus 1 damit wir die letzte zahl auch ncoh mit erhalten sonst würde die letzte Numer nicht mit ausgegeben
            printf("\n%c", first);
            first--;
        }
    }

    return EXIT_SUCCESS;
}