#include <stdio.h>
#include <stdlib.h>

int main() {
    unsigned int input = 0;
    int count = 0;
    int digit = 0;
    int digit_Summ = 0;

    printf("User Input: \n");
    if (scanf("%u", &input) != 1) {
        return EXIT_FAILURE;
    }

    while (input > 0) {
        digit = input % 10;
        digit_Summ += digit;
        count++;
        input = input / 10;
    }

    printf("%u digits summed %u digits\n", digit_Summ, count);

    int a = 10;
    int b = 20;
    int c = 30;

    printf("Max: %d", a>b && a>c ? a : b>c ? b : c);

    return EXIT_SUCCESS;
}