#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int value;
    scanf("%d", &value);
    if (((value % 3 == 0) && (value % 7 != 0))||((value %3 != 0) && (value % 7 == 0))) {
        printf("%d is divisible by either 3 or 7\n", value);
    }
    return EXIT_SUCCESS;
}
