/* TODO: include other headers if needed */
#include <stdint.h>
#include <stdlib.h>
#include <stdio.h>

int main(void) {
    /* TODO: Implement logic */
    char number[10];
    scanf("%s", number);
    int numberInt;
    sscanf(number, "%d", &numberInt); //ref. https://www.geeksforgeeks.org/c/c-program-for-char-to-int-conversion/
    if (numberInt < 0) {
        printf("Fehler: negative number\n");
        return EXIT_FAILURE;
    }
    char reverseNumber[10];
    for (int i = 0; i < 10; i++) {
        reverseNumber[9-i] = number[i];
        printf("Num: %c", number[i]);
        printf("\nRev: %c\n", reverseNumber[9-i]);
        if (reverseNumber[9-i] == NULL) {
            printf("NULL\n");
            reverseNumber[9-i] = 0;
        }
    }
    int revers_INT;
    sscanf(reverseNumber, "%d", &revers_INT);
    printf("input: %d\noutput: %d", numberInt, revers_INT);
    return EXIT_SUCCESS;
}
