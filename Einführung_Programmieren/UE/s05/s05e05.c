#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <stdbool.h>

//functions declaration
double compute_discriminant(double a, double b, double c);
bool is_solvable(double discriminant);
double compute_x1(double a, double b, double c);
double compute_x2(double a, double b, double c);

//main
int main (void) {
    double a;
    double b;
    double c;



    //User input of a b c:
    printf("Quadratische Gleichung: a*x^2 + b*x + c = 0\n");

    printf("  a = ");
    if (scanf("%lf", &a) != 1) {
        fprintf(stderr, "Ungueltige Eingabe fuer a!\n");
        return EXIT_FAILURE;
    }

    printf("  b = ");
    if (scanf("%lf", &b) != 1) {
        fprintf(stderr, "Ungueltige Eingabe fuer b!\n");
        return EXIT_FAILURE;
    }

    printf("  c = ");
    if (scanf("%lf", &c) != 1) {
        fprintf(stderr, "Ungueltige Eingabe fuer c!\n");
        return EXIT_FAILURE;
    }

    printf("\nGleichung: %.2f*x^2 + %.2f*x + %.2f = 0\n", a, b, c);
    double discriminant = compute_discriminant(a,b,c);
    if (!is_solvable(discriminant)) {
        printf("Gleichung nicht lösbar!");
        return EXIT_FAILURE;
    }

    //sonderfälle a == 0 und b == 0 und c ==0
    if (a == 0.0) {
        if (b == 0.0) {
            if (c == 0.0) {
                printf("  Identitaet: 0 = 0, unendlich viele Loesungen.\n");
            } else {
                printf("  Widerspruch: keine Loesung.\n");
            }
        } else {
            printf("  Lineare Gleichung, Loesung: x = %.4f\n", -c / b);
        }
        return EXIT_SUCCESS;
    }

    printf("Discriminante: %.2f\n", discriminant);
    printf("sqrt(discreminante): %.2f\n", sqrt(discriminant));
    printf("x1: %.2f\n", compute_x1(a,b,c));
    printf("x2: %.2f\n", compute_x2(a,b,c));

    return EXIT_SUCCESS;
}

//funktions

double compute_discriminant(double a, double b, double c) {        //Calculate D (b² + 4ac)
    return b * b - 4 * a * c;
}

bool is_solvable(double discriminant) {
    return discriminant >= 0;
}

double compute_x1(double a, double b, double c) {               //+
    if (!is_solvable(compute_discriminant(a, b, c))) {
        return 0;
    }
    return ((-b + sqrt(compute_discriminant(a, b, c)))/(2*a));
}

double compute_x2(double a, double b, double c) {               //-
    if (!is_solvable(compute_discriminant(a, b, c))) {
        return 0;
    }
    return ((-b - sqrt(compute_discriminant(a, b, c)))/(2*a));
}
