#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int main(void) {
    int upper;
    int lower;
    int iter;
    long long iter_squared;
    _Bool isPrime = true;
    int printformat=0;


    //User Input
    printf("Lower bound: ");
    if (scanf("%d", &lower) != 1) return EXIT_FAILURE;
    if (lower < 0) {
        lower = 0;
    }
    printf("Upper bound: ");
    if (scanf("%d", &upper) != 1) return EXIT_FAILURE;
    if (upper < 0) {
        printf("Invalid upper boundary!");
        return EXIT_FAILURE;
    }


    //Pre calculation steps
    printf("\n");
    if (lower > upper) return EXIT_SUCCESS;

    //calculation (ref.: https://www.geeksforgeeks.org/maths/how-to-find-prime-numbers/)
    while (lower <= upper) {
        if (lower == 2 || lower == 3) { //to later skip 2&3 in the prim calulation
            printf("%3d ", lower);
            printformat++;
            lower++;
        }
        else if (lower % 2 == 0 || lower == 1) {        //skip even numbers and 1
            lower++;
        }
        else { //prime calculation
            //reset Variables
            iter = 3;
            isPrime = true;
            iter_squared = iter * iter;
            while (iter_squared <= lower) {
                if (lower % iter == 0) {
                    isPrime = false;
                    break;
                }
                iter++;
                iter_squared = iter * iter;
            }
            if (isPrime) {
                printf("%3d ", lower);
                printformat++;
            }
            lower++;
        }
        if (printformat == 15) {
            printf("\n");
            printformat=0;
        }
    }

    return EXIT_SUCCESS;
}