#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int upper;
    int lower;
    int prim[upper];
    int number = 1;
    int iter = 0;
    bool is_prim = true;


    //User Input
    printf("Lower bound: ");
    if (scanf("%d", &lower) != 1) return EXIT_FAILURE;
    if (lower < 0) return EXIT_FAILURE;
    printf("Upper bound: ");
    if (scanf("%d", &upper) != 1) return EXIT_FAILURE;
    if (upper < 0) return EXIT_FAILURE;

    //Calculation
    while (number < upper) {
        iter = 0;
        while (iter < number) {
            if (number % prim[iter] == 0) { is_prim = false; break; }
            iter++;
        }
        if (is_prim) {prim[number] = lower; number++;} //TODO: FIX
        number++;
    }

}

