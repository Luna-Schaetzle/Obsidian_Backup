#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

void *insert_pointer(void *array[], size_t length, void *pointer);

int main(void) {

    return EXIT_SUCCESS;
}

void * insert_pointer(void *array[], size_t length, void *pointer) {
        for (size_t i = 0; i < length; i++) {
            if (array[i] == NULL) {
                array[i] = pointer;
                return &array[i];
            }
        }
    return NULL;
}