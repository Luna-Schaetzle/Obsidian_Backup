#include <stddef.h>
#include <stdbool.h>
#include <limits.h>
#include <stdio.h>

bool safe_division(const int *x, const int *y, int *result) {
    if (x == NULL || y == NULL || result == NULL) {
        return false;
    }
    if (*y == 0) {
        return false;
    }
    if (*x == INT_MIN && *y == -1) {   // Überlauf vermeiden
        return false;
    }
    *result = *x / *y;
    return true;
}

int main(void) {
    int x = 3, y = 3;
    printf("x = %d and y = %d\n", x, y);
    printf("safe_division() = %d\n", safe_division(&x, &y, &x));
    printf("result = %d\n", safe_division(&x, &y, &x));
}

