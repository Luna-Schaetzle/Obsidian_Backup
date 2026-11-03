#include <stdio.h>
#include <stdlib.h>

int main() {
    int height;

    printf("height: ");
    if (scanf("%d", &height) != 1) {
        return EXIT_FAILURE;
    }

    for (int row = 1; row <= height; row++) {
        // Erste Zahl: Breite = Einrückung (2 pro fehlender Zahl) + 1 Ziffer
        printf("%*d", 2 * (height - row) + 1, 1);

        // Restliche Zahlen: Breite 2 (Leerzeichen + Ziffer)
        for (int n = 2; n <= row; n++) {
            printf("%*d", 2, n);
        }
        printf("\n");
    }

    return EXIT_SUCCESS;
}