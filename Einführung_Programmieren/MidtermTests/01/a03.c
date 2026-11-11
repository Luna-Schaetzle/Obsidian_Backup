#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int width = 6;
    printf("width = %d\n\n", width);

    //  Draw top of the sandglass ===
    for (int i = 1; i <= width; i++) {
        printf("-");
    }
    printf("\n");
    // end =========================

    // Body of the sandglass
    for (int j = 0; j < width; j++) {
        for (int i = 0; i < width; i++) {
            //  replace the wrong code ===
            if (i==j) {
                printf("\\");
            }
            else if ((width - (j-1)) == (i+2)) {
                printf("/");
            }
            else {
                printf(".");
            }
            //  2: end =======================
        }
        printf("\n");
    }

    //3: Draw bottom of the sandglass ===
    for (int i = 1; i <= width; i++) {
        printf("-");
    }
    printf("\n");
    //  3: end ============================

    return EXIT_SUCCESS;
}