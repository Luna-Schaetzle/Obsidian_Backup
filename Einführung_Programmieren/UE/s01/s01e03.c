#include <stdio.h>
#include <stdlib.h>

int main(void) {
    /* TODO: Implement logic */
    int x = 10;
    int y = 20;

    printf("initial state\n");
    printf("x = %d\n", x);
    printf("y = %d\n", y);
    int temp = x;
    x = y;
    y = temp;
    printf("swapped\n");
    printf("x = %d\n", x);
    printf("y = %d\n", y);
    return EXIT_SUCCESS;
}

