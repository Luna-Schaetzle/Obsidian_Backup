#include <stdlib.h>
#include <stdio.h>

int main(void) {
    int quantity = 3;
    int value = 2;
    int incrementionVariable = 0;
    int caculatedNextValue = 0;

    while (incrementionVariable < quantity) {
        incrementionVariable++;
        caculatedNextValue = caculatedNextValue + value;
        printf("%d\n", caculatedNextValue);
    }

    return EXIT_SUCCESS;
}
