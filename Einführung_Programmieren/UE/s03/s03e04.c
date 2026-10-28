#include <stdint.h>
#include <stdlib.h>
#include <stdio.h>
#include <inttypes.h>

int main(void) {
    //declare Variables
    uint32_t value;
    int count_zeros = 0;
    uint32_t temp;
    int iter = 0;
    int most_significant_bit_place;
    int save_value;
    printf("value: ");
    //User Input & Error Handeling
    if (scanf("%" SCNu32, &value) != 1) { //SCNu32 ... to read uint32_t
        printf("Input error\n");
        return EXIT_FAILURE;
    }

    if (value == 0) {
       printf("\nThe number 0 contains 1 zero in the significant digits of the binary representation!");
        return EXIT_SUCCESS;
    }

    //Calculate Zeros
    temp = value;

    //count where the most significant bit is
    while (temp != 0) {
        temp = temp >> 1u;
        iter++;
    }
    most_significant_bit_place = iter-1;

    save_value = value;
    //count zeros
    while (most_significant_bit_place != 0) {
        most_significant_bit_place--;
        if (value & 1) {

        }
        else {
            count_zeros++;
        }
        value = value >> 1u;
        //(value & 1) ? : count_zeros++;
    }


    //Output
    if (count_zeros == 1) {
        printf("\nThe number %u contains 1 zero in the significant digits of the binary representation!", save_value);
        return EXIT_SUCCESS;
    }
    else {
        printf("\nThe number %u contains %d zeros in the significant digits of the binary representation!", save_value, count_zeros);
    }

    return EXIT_SUCCESS;
}
