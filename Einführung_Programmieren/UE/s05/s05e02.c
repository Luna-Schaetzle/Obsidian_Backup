#include <stdio.h>
#include <stdlib.h>

unsigned longest_sequence_set_bits(unsigned value);

int main(void) {
    printf("0: %u\n", longest_sequence_set_bits(0));   // 0
    printf("2: %u\n", longest_sequence_set_bits(2));   // 1  (10)
    printf("6: %u\n", longest_sequence_set_bits(6));   // 2  (110)
    printf("27: %u\n", longest_sequence_set_bits(27)); // 2  (11011)
    printf("31: %u\n", longest_sequence_set_bits(31)); // 5  (11111)

    return EXIT_SUCCESS;
}

unsigned longest_sequence_set_bits(unsigned value) {
    unsigned longest = 0;
    unsigned current = 0;

    while (value != 0) {
        if (value & 1) {      // letztes Bit ist 1
            current++;
            if (current > longest) {
                longest = current;
            }
        } else {              // letztes Bit ist 0 -> Folge unterbrochen
            current = 0;
        }
        value >>= 1;          // nächstes Bit nach rechts holen
    }
    return longest;
}