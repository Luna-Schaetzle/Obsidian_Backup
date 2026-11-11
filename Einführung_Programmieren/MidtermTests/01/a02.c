#include <stdio.h>
#include <stdlib.h>

int main(void) {

    //input
    int chosen_days = 0;
    if (scanf("%d", &chosen_days) != 1) {
        return EXIT_FAILURE;
    }

    //calculation
    int years = chosen_days / 360;
    int months = (chosen_days - (years * 360)) / 30;
    int days = chosen_days - (years * 360) - (months * 30);

    //Printing
    printf("%d years\n", years);
    printf("%d months\n", months);
    printf("%d days\n", days);

    //weekday calclation + printing
    int weekdays = chosen_days % 7;
    switch (weekdays) {
        case 0:
            printf("tuesday");
            break;
        case 1:
            printf("wednesday");
            break;
        case 2:
            printf("thursday");
            break;
        case 3:
            printf("friday");
            break;
        case 4:
            printf("saturday");
            break;
        case 5:
            printf("sunday");
            break;
        default:
            printf("monday");
            break;
    }

    return EXIT_SUCCESS;
}
