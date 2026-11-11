#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 9; // this value may be changed by Artemis


    //middle
    int middle = n-n/2;

    int mirror = middle-1;    //mirror x axis
    int my; //middle y axsis


    for (int i = 1; i <= n; i++) {
        my = middle;
        for (int j = 1; j <= n; j++) {

            if (j > my) {
                my--;
            }
            if ((i==1 || i==n) || (j==1 || j==n)) { //bottom and Top AND sides
                printf("1 ");
            }
            else if (i > middle){ //over the middle
                if (j>mirror) {
                    if (my>mirror) {
                        printf("%d ", mirror);
                    }
                    else{
                        printf("%d ", my);
                    }
                }
                else {
                        printf("%d ", j);
                }
                //printf("%d ", mirror);
            }
            else {
                if (j>middle) {
                    if (my>i) {
                        printf("%d ", i);
                    }
                    else{
                        printf("%d ", my);
                    }
                }
                else {
                    if (j>i) {
                        printf("%d ", i);
                    }
                    else {
                        printf("%d ", j);
                    }
                }
                //printf("%d ", i);
            }

        }
        if (i > middle) {
            mirror--;
        }
        printf("\n");
    }



    return EXIT_SUCCESS;
}
