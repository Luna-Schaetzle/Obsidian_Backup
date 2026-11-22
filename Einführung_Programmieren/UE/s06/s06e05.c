#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LETTERS_SIZE 27

void count_letter_occurrence(char text[], int letters[]);
void print_letter_occurrence(int letters[]);
long long char_array_length(char text[]);
void letters_to_lower(char text[]);
void set_array_zero(int letters[]);



int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "usage: %s <text>\n", argv[0]);
        return EXIT_FAILURE;
    }
    int letters[LETTERS_SIZE];
    count_letter_occurrence(argv[1], letters);
    print_letter_occurrence(letters);
    return EXIT_SUCCESS;
}

void count_letter_occurrence(char text[], int letters[]) {
    set_array_zero(letters);
    letters_to_lower(text);
        for (int i = 0; text[i] != '\0'; i++) {  //Nullzeichen ASCII 00
            int idx = text[i] - 'a';
            if (idx >= 0 && idx < 26) {
                letters[idx]++;
            } else {
                letters[26]++;   // "other"
            }
        }
}

void print_letter_occurrence(int letters[]) {
    for (int i = 0; i < 26; i++) {
        if (letters[i] > 0) {
            printf("  '%c': %*d\n", 'a' + i, 4,letters[i]);
        }
    }
    if (letters[26] > 0) {
        printf("other: %*d\n", 4, letters[26]);
    }
}

long long char_array_length(char text[]) {
    return strlen(text);
}

void letters_to_lower(char text[]) {
       for (int i = 0; i < char_array_length(text); i++) {
           if (text[i] >= 'A' && text[i] <= 'Z') {
               text[i] += 32;
           }
       }
}

void set_array_zero(int letters[]) {
    for (int i = 0; i < LETTERS_SIZE; i++) {
        letters[i] = 0;
    }
}
