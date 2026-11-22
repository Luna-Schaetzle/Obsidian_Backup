#include <stdlib.h>
#include <stdio.h>

//funktion decleration
long long sum(int values[], size_t length);
int min(int values[], size_t length);
int max(int values[], size_t length);

int main(void){
  //Testing funtkions
    int a[] = {1, 2, 3};
    int b[] = {4, 7, 10, -1};
    int c[] = {8, 2, 9, 2, 9};

    printf("a: sum=%lld (erwartet 6), min=%d (erwartet 1), max=%d (erwartet 3)\n",
           sum(a, 3), min(a, 3), max(a, 3));

    printf("b: sum=%lld (erwartet 20), min=%d (erwartet -1), max=%d (erwartet 10)\n",
           sum(b, 4), min(b, 4), max(b, 4));

    printf("c: sum=%lld (erwartet 30), min=%d (erwartet 2), max=%d (erwartet 9)\n",
           sum(c, 5), min(c, 5), max(c, 5));

    return EXIT_SUCCESS;
}

long long sum(int values[], size_t length) {
       if (length > 0) {
              return values[length-1] + sum(values, length-1);
       }
    return  0;
}

int min(int values[], size_t length) {
       int minimum = values[0];
       for (size_t i = 1; i < length; i++) {
              if (values[i] < values[i-1]) {
                     minimum = values[i];
              }
       }
       return minimum;
}

int max(int values[], size_t length) {
       int maximum = values[0];
       for (size_t i = 1; i < length; i++) {
              if (values[i] > values[i-1]) {
                     maximum = values[i];
              }
       }
       return maximum;
}
