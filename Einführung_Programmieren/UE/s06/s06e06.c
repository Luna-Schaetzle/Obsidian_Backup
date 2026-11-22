#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

size_t array_intersection(int dst[], const int arr1[], size_t len1, const int arr2[], size_t len2);

int main(void) {
    int arr1[] = {1, 2, 2, 3, 4};
    int arr2[] = {2, 4, 4, 5};
    int dst[5];
    size_t len = array_intersection(dst, arr1, 5, arr2, 4);

    printf("Anzahl: %zu\nElemente: ", len);
    for (size_t i = 0; i < len; i++) {
        printf("%d ", dst[i]);
    }
    printf("\n");
    return EXIT_SUCCESS;
}

size_t array_intersection(int dst[], const int arr1[], size_t len1, const int arr2[], size_t len2) {
    bool found = false;
    int dst_index = 0;
    for (size_t a1 = 0; a1 < len1; a1++) {
        for (size_t a2 = 0; a2 < len2; a2++) {
            if (arr1[a1] == arr2[a2]) {
                found = false;
                for (int dsti = 0; dsti < dst_index; dsti++) {
                    if (dst[dsti] == arr1[a1]) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    dst[dst_index] = arr2[a2];
                    dst_index++;
                }
            }
        }
    }
    return dst_index;
}