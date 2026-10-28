#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char a = 'c';
    short b = 11995;
    int c = +12005;
    unsigned d = 36772;
    long e = -510543188;
    float f = -279.29;
    double g = 4.92108e+15;

    /* TODO print variables */
    //1)
    printf("a = %c\nb = %d\nc = +%u\nd = %d\ne = %ld\nf = %.2f\ng = %.5e\n\n", a,b,c,d,e,f,g);
    //2
    printf("f_10 = %.10f\n\n",f);

    int lenght = c-b;
    //3
    printf("d_pad = %0*d\n\n", lenght, d);
    //4
    printf("a = %16d\nb = %16d\nc = %16d\nd = %16d\ne = %16ld\nf = %21.4f\ng = %21.4f\n", a,b,c,d,e,f,g);


    return EXIT_SUCCESS;
}
