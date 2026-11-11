#include <stdio.h>
#include <stdlib.h>

int main(void) {
    unsigned x = 15;  // will be changed by Artemis
    unsigned y = 125; // will be changed by Artemis
    unsigned z = 77;  // will be changed by Artemis

    /*
     * For the following conditions, print "1" if they are true,
     * otherwise print "2".
     */

    printf("A");
    /* Check, if
     *   - x is in the interval (10, 20],
     * OR
     *   - y divided by 10 is 12
     */
    if ((x > 10 && x <= 20) || ((y/10) == 12)) {
        printf("1");
    } else {
        printf("2");
    }

    printf("\nB");
    /* Check, if
     *   - z is a multiple of x,
     * OR
     *   - z equals the ASCII value of the character 'M'
     */
    if ((z == 'M') || (z%x == 0)) {
        printf("1");
    } else {
        printf("2");
    }

    printf("\nC");
    /* Check, if
     *   - x equals the hexadecimal value ABC,
     * OR
     *   - y is greater or equal to the octal value 26
     */
    if ((x == 0xABC) || (y >= 026)) {
        printf("1");
    } else {
        printf("2");
    }

    printf("\nD");
    /* Check, if
     *   - the bit representation of x has a 1 at the least significant bit (the
     * rightmost bit), AND
     *   - the floating-point division of y by 4
     *     differs from the integer division of y by 4
     */
    if ((x & 1) && ((y/4.0) != (y/4))) {
        printf("1");
    } else {
        printf("2");
    }

    printf("\nE");
    /* Check, if
     *   - x left-shifted by 3 is strictly greater than y left-shifted by 2
     * AND
     *   - y left-shifted by 2 is strictly greater than z right-shifted by 1
     */
    if (((x<<3) > (y<<2)) && ((y<<2) >  (z>>1))) {
        printf("1");
    } else {
        printf("2");
    }

    return EXIT_SUCCESS;
}
