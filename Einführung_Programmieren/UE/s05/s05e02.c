#include <stdio.h>
#include <stdlib.h>

unsigned longest_sequence_set_bits(unsigned value);
double power_of_2(int n);


int main() {
    printf("0: %d", longest_sequence_set_bits(0));
    printf("2: %d", longest_sequence_set_bits(2));
    printf("6: %d", longest_sequence_set_bits(6));
    printf("27: %d", longest_sequence_set_bits(27));
    printf("31: %d", longest_sequence_set_bits(31));

    return EXIT_SUCCESS;
}

unsigned longest_sequence_set_bits(unsigned value) {
    int bit_and;
    int highest_bit_sequence;
    for (unsigned i = 0; i <= value; power_of_2(i) ) {
        bit_and = value & i;
        if (bit_and > highest_bit_sequence) {
            highest_bit_sequence = bit_and;
        }
    }
    return highest_bit_sequence;
}

double power_of_2(int n) {
    double return_val=1;

    if (n > 0) {
        for (int i = 1; i <= n; i++) {
            return_val = return_val * 2;
        }
        return return_val;
    }
    if (n < 0){

        for (int i = n; i < 0; i++) {
            return_val = return_val * 2;
        }
        return (1/return_val);
    }
    return 1;
}