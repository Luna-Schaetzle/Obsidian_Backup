#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int chosen_minutes = 3024;
    int days = chosen_minutes / 1440;
    int hours = (chosen_minutes - (days * 1440)) / 60;
    int minutes = chosen_minutes - (days * 1440) - (hours * 60);

    printf("%dm -> %dd %dh %dm", chosen_minutes, days, hours, minutes);

    return EXIT_SUCCESS;
}
