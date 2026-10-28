#include <stdio.h>
#include <stdlib.h>

int main() {
    int height;
    int iter = 0;
    int witdh = 0;


    printf("height: ");
    if (scanf("%d", &height) != 1) {
        return EXIT_FAILURE;
    }
    iter = height;

    //first
    printf("\n%*s\n",height,"x");
    while (iter > 2) {
        witdh+=2;
        printf("%*s%*s\n",(iter-1),"x",(witdh),"x");
        iter--;
    }
    //last
    if (height > 1){
    while (height > 0) {
     printf("x ");
        height --;
    }
    }

    return EXIT_SUCCESS;
}
