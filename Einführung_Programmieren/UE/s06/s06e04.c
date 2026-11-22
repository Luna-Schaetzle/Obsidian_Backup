#include <stdlib.h>
#include <stdio.h>
#include <string.h>

unsigned binary_str_to_number(char binary[]);


int main(void) {
    //tests
    printf("tests\n");
    printf("%d\n", binary_str_to_number("1001101")); //in Dezimal: 77
    printf("%d\n", binary_str_to_number("011001101"));
    printf("%d\n", binary_str_to_number("101"));
    printf("%d\n", binary_str_to_number("1"));
    printf("%d\n", binary_str_to_number("0"));

    return EXIT_SUCCESS;
}

unsigned binary_str_to_number(char binary[]) {
    unsigned result = 0;
    int char_to_binary = 0;
    int length = strlen(binary) / sizeof(binary[0]);
    for (long i = 0; i < length; i++) {
            char_to_binary = binary[i] - '0';  //calulating with ascii '1' - '0' = 1
            result = result * 2 + char_to_binary;
    }
    return result;
}

