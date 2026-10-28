#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    scanf("%d", &n);
    if (n < 1) {
        printf("n must be greater than zero\n");
        return EXIT_FAILURE;
    }
    int upperBound = n;
    int sum = 0;
    while (n > 0) {
        sum = sum + n;
        n--;
    }
    printf("sum from 1 to %d = %d", upperBound, sum);
    return EXIT_SUCCESS;
}