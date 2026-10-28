# include <stdio.h>
# include <stdlib.h>

int main(void) {
    //Declaire Variables
    int n;
    int x_0 = 2;
    int x_1 = 4;
    int x_2 = 4;
    int iter = 0;

    bool switching = 1;

    //Check user Input
    if (scanf("%d", &n) != 1) {
        printf("ERROR: Input is wrong!");
        return EXIT_FAILURE;
    }
    if (n < 1) {
        printf( "\nERROR: The provided number %d is smaller than 1!" , n);
        return EXIT_FAILURE;
    }

    //Calculation and Output
    printf("\n%d", x_0);
    while (iter < (n-1)) {
        printf(", %d", x_1); //Print bevore advancing iterables
        iter++;        //advance iterable and x iterables
        x_2 = x_0 + 1; //calculation of x_i+2 and set of x_i+2
        x_0 = x_1;     //set x_i to x_i+1
        x_1 = x_2;     //set x_i+2 to x_i+2
    }

    return EXIT_SUCCESS;
}
