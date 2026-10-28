#include <stdio.h>
#include <stdlib.h>

int main() {
    int height;
    int iter = 0;
    int witdh = 1;


    printf("height: ");
    if (scanf("%d", &height) != 1) {
        return EXIT_FAILURE;
    }
    iter = height;

    //first

    while (iter > 0) {

        while () {

        }
        printf("%*s%*s\n",(iter-1),"x",(witdh),"x");
        witdh++;
        iter--;
    }


    return EXIT_SUCCESS;
}
