#include <inttypes.h>
#include <stdio.h>
#include <stdlib.h>

void print_binary(uint32_t value);
void print_binary_rec(uint32_t value, int bits);

int main(void) {
    uint32_t value;
    printf("value: ");
    if (scanf("%"SCNu32, &value) != 1) {
        fprintf(stderr, "ERROR: While reading the 'uint32_t' value an error occurred!");
        return EXIT_FAILURE;
    }
    printf("\n");
    printf("%" PRIu32, value);
    printf(" = 0b");
    print_binary(value);
    printf("\n");
    return EXIT_SUCCESS;
}

void print_binary_rec(uint32_t value, int bits) {
    if (bits > 0) {                             //exit condition
        print_binary_rec(value >> 1, bits - 1);  //shift & recursion
        printf("%d", value & 1);
    }
}

void print_binary(uint32_t value) {
    print_binary_rec(value, 32);       //32 bit for nice formating
}