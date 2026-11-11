#include <stdio.h>
#include <stdlib.h>

double power_of_2(int n);

int main() {
    printf("10: %0.4f", power_of_2(10));
    printf("\n5: %0.4f", power_of_2(5));
    printf("\n2: %0.4f", power_of_2(2));
    printf("\n1: %0.4f", power_of_2(1));
    printf("\n0: %0.4f", power_of_2(0));
    printf("\n-1: %0.4f", power_of_2(-1));
    printf("\n-2: %0.4f", power_of_2(-2));
    printf("\n-5: %0.4f", power_of_2(-5));
    printf("\n-10: %0.4f", power_of_2(-10));



    return EXIT_SUCCESS;
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

/*
Wenn die funktion  unsigned long long power_of_2(unsigned n) gefordert wäre,
dann benötigen wir keine negativen zahlen fall da es nur positive gäbe ind die
Variable return_val müsste ebenfalls vom typen unsigned long long sein.
Ebenfalls müsst eich in der for loop auch die deklaration von i auf unsigned long long ändern muss.
 */