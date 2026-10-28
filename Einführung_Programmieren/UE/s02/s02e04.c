#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int main(void) {
    //Variables
    int number;
    int swapped_number = 0;
    int swapped_digit = 0;
    int lengh_number = 0;

    //Input und Error Handeling
    if (scanf("%d", &number) != 1) {
        printf("ERROR: While reading the 'int' value an error occurred!");
        return EXIT_FAILURE;
    }
    if (number < 0 || number > INT_MAX) {
        printf("ERROR: The input number is out of boundary [0-%d]", INT_MAX);
    }

    printf("input: %d\n", number);
    //swap digits
    while (number > 0) {
        swapped_digit =  number % 10;
        printf("debug: %d\n", swapped_digit);
        lengh_number++;
        swapped_number = swapped_number * 10 + swapped_digit;
        number = number / 10;
        //printf("debug: %d\n", number);
    }
    //output
    printf("output: %0*d\n", lengh_number ,swapped_number);

    return EXIT_SUCCESS;
}