#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int is_monotonic(int values[], size_t length); //weder monoton steigen/fallend


int main(void) {


}

int is_monotonic(const int values[], size_t length) {
    bool steigend = true;   // durchgehend nicht fallend
    bool fallend  = true;   // durchgehend nicht steigend

    for (size_t i = 0; i + 1 < length; i++) {
        if (values[i + 1] < values[i]) steigend = false;
        if (values[i + 1] > values[i]) fallend  = false;
    }
    return steigend || fallend;
}
