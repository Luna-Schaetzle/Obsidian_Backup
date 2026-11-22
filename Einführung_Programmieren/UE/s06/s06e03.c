#include <stdio.h>
#include <stdlib.h>

int contains_elements(int array[], size_t length_array, int elements[], size_t length_elements);

int main(void) {
    int array1[]    = {1, 5, 2, 5, 3};
    int elements1[] = {5, 2, 5};
    printf("%d\n", contains_elements(array1, 5, elements1, 3));          // 1

    int array2[]    = {1, 5, 2, 3};
    int elements2[] = {5, 2, 5};
    printf("%d\n", contains_elements(array2, 4, elements2, 3));          // 0

    int array3[]    = {9, 8, 7};
    int elements3[] = {4};
    printf("%d\n", contains_elements(array3, 3, elements3, 1));          // 0

    int array4[]    = {3, 3, 3};
    int elements4[] = {0};
    printf("%d\n", contains_elements(array4, 3, elements4, 0));          // 1

    return EXIT_SUCCESS;
}

int contains_elements(int array[], size_t length_array, int elements[], size_t length_elements) {
    int result = 1;

    for (size_t j = 0; j < length_elements; j++) {
        int found = 0;
        for (size_t i = 0; i < length_array; i++) {
            if (array[i] == elements[j]) {
                array[i] = -array[i];   // als verbraucht markieren
                found = 1;
                break;
            }
        }
        if (!found) {                   // Element fehlt → sofort abbrechen
            result = 0;
            break;
        }
    }

    /* Arrays wiederherstellen, auch bei frühzeitigem Abbruch */
    for (size_t i = 0; i < length_array; i++) {
        if (array[i] < 0) {
            array[i] = -array[i];
        }
    }

    return result;
}
