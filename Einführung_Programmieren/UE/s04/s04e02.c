#include <stdio.h>
#include <stdlib.h>

enum traffic_light {
    RED, YELLOW, GREEN
};

int main(void) {
    //Variables
    enum traffic_light current_state;
    int user_input;
    int steps;
    int was_green = 0;

    printf("start (1=green, 2=red): ");
    if (scanf("%d", &user_input) != 1) {
        return EXIT_FAILURE;
    }
    switch (user_input) {
        case 1:
            current_state = GREEN;
            was_green = 1;
            break;
        case 2:
            current_state = RED;
            break;
        default:
            current_state = RED;
            break;
    }

    printf("steps: ");
    if (scanf("%d", &steps) != 1) {
        return EXIT_FAILURE;
    }
    printf("\n");
    //Light Switching
    while (steps >= 0) {

        printf("%s\n", current_state == YELLOW? "yellow" : (current_state == GREEN ? "green" : "red"));
        //Switch
        switch (current_state) {
            case RED:
                current_state = YELLOW;
                was_green = 0;
                break;
            case GREEN:
                current_state = YELLOW;
                was_green = 1;
                break;
            default:
                was_green == 1 ? (current_state = RED) : (current_state = GREEN);
                break;
        }

        steps--;
    }
    return EXIT_SUCCESS;
}