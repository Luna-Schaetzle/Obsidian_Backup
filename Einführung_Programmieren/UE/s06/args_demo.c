#include <stdio.h>
#include <stdlib.h>

/*
 * TODO: compile and call:
 * ./args_demo with some parameters
 * ./args_demo "with some parameters"
 */

int main(int argc, char *argv[]) {
    for (int i = 0; i < argc; ++i) {
        printf("argv[%d]: %s\n", i, argv[i]);
    }
    return EXIT_SUCCESS;
}

