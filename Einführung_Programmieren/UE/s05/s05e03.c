#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

unsigned sum(unsigned n);
unsigned long long fac(unsigned char n);
unsigned number_sequence(unsigned char n);
unsigned digit_sum(int n);


int main(void) {
    // Test Cases
    printf("sum(10) = %u\n", sum(10));
    printf("fac(10) = %llu\n", fac(10));
    printf("number_sequence(10) = %u\n", number_sequence(10));
    printf("digit_sum(123456789) = %u\n", digit_sum(123456789));
    printf("digit_sum(-12345) = %u\n", digit_sum(-12345));
    printf("sum(0) = %u\n", sum(0));
    printf("fac(0) = %llu\n", fac(0));
    printf("number_sequence(0) = %u\n", number_sequence(0));
    printf("digit_sum(0) = %u\n", digit_sum(0));
    printf("sum(1) = %u\n", sum(1));
    printf("fac(1) = %llu\n", fac(1));
    printf("number_sequence(1) = %u\n", number_sequence(1));
    printf("digit_sum(123) = %u\n", digit_sum(123));
    printf("digit_sum(-123) = %u\n", digit_sum(-123));
    printf("sum(5) = %u\n", sum(5));
    printf("fac(5) = %llu\n", fac(5));
    printf("number_sequence(5) = %u\n", number_sequence(5));
    printf("digit_sum(12345) = %u\n", digit_sum(12345));
    printf("digit_sum(-12345) = %u\n", digit_sum(-12345));
    return EXIT_SUCCESS;
}

unsigned sum(unsigned n) {
    if (n <= 0) {
        return 0;
    }
    return n+sum(n-1);
}

unsigned long long fac(unsigned char n) {
    if (n == 0) {
        return 1;
    }
    return n*fac(n-1);
}

unsigned number_sequence(unsigned char n) {
    if (n == 0) return 2;
    if (n == 1) return 1;
    return number_sequence(n - 1) + number_sequence(n - 2);
}

unsigned digit_sum(int n) {
    if (n < 0) {
        n = n*-1;
    }
    if (n <= 0) {
        return 0;
    }
    return (n%10) + digit_sum(n/10);
}