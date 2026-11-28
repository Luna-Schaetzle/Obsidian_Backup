# UE Lineare Algebra (1) – Lösungen zu den Zusatzübungen

Erst selbst versuchen, dann vergleichen! Bei Beweisen sind die Lösungen als Musterlösung zu verstehen – andere saubere Wege sind genauso gültig.

---

# Lösungen Blatt A

## (1) Quantoren

**(a)**

(i) $\forall x \in \mathbb{N} : x \in \mathbb{Q}$. Verneinung: $\exists x \in \mathbb{N} : x \notin \mathbb{Q}$.
Die ursprüngliche Aussage ist richtig, denn $\mathbb{N} \subseteq \mathbb{Z} \subseteq \mathbb{Q}$.

(ii) Verneinung: $\exists x \in \mathbb{R}\ \forall y \in \mathbb{Z} : y \le x$.
Die ursprüngliche Aussage ist richtig: Zu $x \in \mathbb{R}$ wähle $y = \lfloor x \rfloor + 1 > x$. Die Verneinung ist falsch.

(iii) $\exists x \in \mathbb{R}\ \forall n \in \mathbb{N} : x < n$. Verneinung: $\forall x \in \mathbb{R}\ \exists n \in \mathbb{N} : n \le x$.
Die ursprüngliche Aussage ist richtig: $x = -1$ ist kleiner als jedes $n \in \mathbb{N}$. Die Verneinung ist falsch.

(iv) Verneinung: $\exists x \in \mathbb{Q}\ \forall y \in \mathbb{Q} : x \cdot y \ne 1$.
Die Verneinung ist richtig: $x = 0$ liefert $0 \cdot y = 0 \ne 1$ für alle $y$. Die ursprüngliche Aussage ist falsch.

**(b)** (i) ist richtig: Zu jedem $x$ wähle $y = -x$.
(ii) ist falsch: Angenommen $y$ existiert. Für $x = 0$ folgt $y = 0$, für $x = 1$ folgt $y = -1$. Widerspruch.
Merke: Aus $\exists\forall$ folgt immer $\forall\exists$, aber nicht umgekehrt. Die Reihenfolge der Quantoren ist wichtig, weil bei (i) das $y$ von $x$ abhängen darf.

**(c)**
(i) richtig: $\mathbb{Q}$ ist abgeschlossen unter Addition (Körper).
(ii) falsch: $x = -1$ erfüllt $x^2 = 1$, aber $x \ne 1$. (Die Richtung $\Leftarrow$ stimmt.)
(iii) richtig: $x^2 - x - 6 = (x - 3)(x + 2)$, und ein Produkt in $\mathbb{R}$ ist genau dann $0$, wenn ein Faktor $0$ ist.

## (2) Aussagenlogik

**(a)** Mit $1 = $ wahr, $0 = $ falsch; $L$ = linke Seite, $R$ = rechte Seite:

| $A$ | $B$ | $C$ | $A\Rightarrow B$ | $A\Rightarrow C$ | $L$ | $B\wedge C$ | $R = A\Rightarrow(B\wedge C)$ |
|---|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 1 | 1 | 1 | 0 | 1 |
| 0 | 0 | 1 | 1 | 1 | 1 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 | 1 | 0 | 0 | 0 |
| 1 | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |

Die Spalten $L$ und $R$ stimmen in allen Zeilen überein, also gilt die Äquivalenz.

**(b)**
$$\begin{aligned}
(A \Rightarrow C) \wedge (B \Rightarrow C)
&\iff (\neg A \vee C) \wedge (\neg B \vee C) \\
&\iff (\neg A \wedge \neg B) \vee C &&\text{(Distributivgesetz)}\\
&\iff \neg(A \vee B) \vee C &&\text{(De Morgan)}\\
&\iff (A \vee B) \Rightarrow C.
\end{aligned}$$

**(c)** Gegenbeispiel für "$\Leftarrow$": $A(x) : x \ge 0$ und $B(x) : x \ge 1$ auf $\mathbb{R}$.
Rechte Seite: $\forall x : A(x)$ ist falsch, also ist die Implikation wahr.
Linke Seite: für $x = \tfrac12$ gilt $A(x)$, aber nicht $B(x)$. Also ist $\forall x : (A(x) \Rightarrow B(x))$ falsch.

Die Richtung "$\Rightarrow$" gilt trotzdem: Gilt $A \Rightarrow B$ für alle $x$ und gilt $A(x)$ für alle $x$, so gilt auch $B(x)$ für alle $x$.

## (3) Beweise

**(a)** Wegen $b = 1 - a$ gilt
$$a^2 + b^2 - \tfrac12 = a^2 + (1-a)^2 - \tfrac12 = 2a^2 - 2a + \tfrac12 = 2\left(a - \tfrac12\right)^2 \ge 0.$$

**(b)** Fallunterscheidung:
- $x \ge 1$: $|x-1| + |x+1| = (x-1) + (x+1) = 2x \ge 2$.
- $-1 \le x < 1$: $|x-1| + |x+1| = (1-x) + (x+1) = 2 \ge 2$.
- $x < -1$: $|x-1| + |x+1| = (1-x) + (-x-1) = -2x > 2$.

**(c)** Angenommen, es gibt $x > 0$ mit $x + \tfrac9x < 6$. Multiplikation mit $x > 0$ ergibt $x^2 + 9 < 6x$, also $(x-3)^2 = x^2 - 6x + 9 < 0$. Das ist ein Widerspruch, da Quadrate reeller Zahlen nichtnegativ sind.

**(d)** *Induktionsanfang* $n = 1$: $1 \cdot 1! = 1 = 2! - 1$.  done
*Induktionsschritt* $n \to n+1$: Unter der Induktionsvoraussetzung gilt
$$\sum_{k=1}^{n+1} k \cdot k! = (n+1)! - 1 + (n+1)\cdot(n+1)! = (n+1)!\,(1 + n + 1) - 1 = (n+2)! - 1.$$

## (4) Mengen

**(a)** $\mathcal{P}(M) = \big\{\emptyset,\ \{1\},\ \{\{1\}\},\ \{1, \{1\}\}\big\}$.

**(b)**
(i) richtig: $\emptyset$ ist Teilmenge jeder Menge.
(ii) falsch: Das einzige Element von $\{\{\emptyset\}\}$ ist $\{\emptyset\}$, nicht $\emptyset$.
(iii) richtig: $\{1\}$ ist ein Element der Menge.
(iv) falsch: $2 \in \{1,2\}$, aber $2 \notin \{1, \{2\}\}$ (das Element ist $\{2\}$, nicht $2$).
(v) richtig: $\mathcal{P}(\emptyset) = \{\emptyset\}$, also $\mathcal{P}(\mathcal{P}(\emptyset)) = \{\emptyset, \{\emptyset\}\}$ und $\{\emptyset\}$ ist ein Element davon.

Anzahl: $|\mathcal{P}(\emptyset)| = 1$, $|\mathcal{P}(\mathcal{P}(\emptyset))| = 2$, $|\mathcal{P}(\mathcal{P}(\mathcal{P}(\emptyset)))| = 2^2 = 4$.

**(c)**
(i) richtig: $x \in (S \cup T) \setminus V \iff (x \in S \vee x \in T) \wedge x \notin V \iff (x \in S \wedge x \notin V) \vee (x \in T \wedge x \notin V) \iff x \in (S \setminus V) \cup (T \setminus V)$.

(ii) falsch: $S = T = \emptyset$, $V = \{1\}$. Links: $\emptyset \setminus (\emptyset \setminus \{1\}) = \emptyset$. Rechts: $(\emptyset \setminus \emptyset) \cup \{1\} = \{1\}$.
(Richtig wäre $S \setminus (T \setminus V) = (S \setminus T) \cup (S \cap V)$.)

## (5) Relationen

**(a)** Reflexiv, symmetrisch und transitiv folgen sofort, weil $\sim$ die Gleichheit der Zahlen $x_1 + x_2$ ist (z.B. Transitivität: $x_1 + x_2 = y_1 + y_2$ und $y_1 + y_2 = z_1 + z_2 \Rightarrow x_1 + x_2 = z_1 + z_2$).
Die Klasse von $\binom12$ ist $\{(x,y) \in \mathbb{R}^2 \mid x + y = 3\}$, eine Gerade mit Steigung $-1$ durch $(3,0)$ und $(0,3)$. Es gibt eine Klasse für jedes $s \in \mathbb{R}$ (Geraden $x + y = s$).

**(b)**
- reflexiv: $5 \mid a^2 - a^2 = 0$.
- symmetrisch: $5 \mid a^2 - b^2 \Rightarrow 5 \mid -(a^2 - b^2) = b^2 - a^2$.
- transitiv: $a^2 - c^2 = (a^2 - b^2) + (b^2 - c^2)$ ist Summe zweier Vielfacher von 5.

Es gilt $a \sim b \iff [a]^2 = [b]^2$ in $\mathbb{Z}/5\mathbb{Z}$. Die Quadrate: $0^2 = 0$, $(\pm1)^2 = 1$, $(\pm2)^2 = 4$. Also gibt es genau **3 Klassen**:
$$5\mathbb{Z},\qquad \{a \mid a \equiv \pm 1 \bmod 5\},\qquad \{a \mid a \equiv \pm 2 \bmod 5\}.$$

**(c)**
(i) Keine Äquivalenzrelation: nicht transitiv, denn $0 \sim 1$ und $1 \sim 2$, aber $0 \not\sim 2$.
(ii) Äquivalenzrelation: reflexiv ($x^2 > 0$), symmetrisch, transitiv ($xy > 0$ und $yz > 0$ bedeuten gleiches Vorzeichen von $x, y, z$, also $xz > 0$). Zwei Klassen: $\mathbb{R}_{>0}$ und $\mathbb{R}_{<0}$.
(iii) Äquivalenzrelation: $0 \in \mathbb{Q}$, mit $q$ ist auch $-q \in \mathbb{Q}$, und $\mathbb{Q}$ ist abgeschlossen unter $+$.

## (6) Abbildungen

**(a)**
(i) Nicht injektiv ($f_1(0) = f_1(1) = 0$). Surjektiv: $f_1$ ist stetig mit $f_1(x) \to \pm\infty$ für $x \to \pm\infty$, nach dem Zwischenwertsatz wird jeder Wert angenommen.

(ii) Bijektiv. Zu $(a, b)$ ist das Gleichungssystem $x + 2y = a$, $3x - y = b$ eindeutig lösbar mit $x = \frac{a + 2b}{7}$, $y = \frac{3a - b}{7}$. (Probe: $x + 2y = \frac{a + 2b + 6a - 2b}{7} = a$ ; $3x - y = \frac{3a + 6b - 3a + b}{7} = b$ .)

(iii) Injektiv (die erste Komponente ist $t$), nicht surjektiv: $(0, 1)$ wird nicht getroffen, da $t = 0 \Rightarrow t^2 = 0$.

(iv) Nicht injektiv ($f_4(1,0) = f_4(0,0) = 0$), surjektiv: $f_4(r, 1) = r$.

**(b)** Sei $z \in O$. Da $g \circ f$ surjektiv ist, gibt es $m \in M$ mit $g(f(m)) = z$. Mit $n := f(m) \in N$ gilt $g(n) = z$. Also ist $g$ surjektiv.
Beispiel: $M = \{1\}$, $N = \{1, 2\}$, $O = \{1\}$, $f(1) = 1$, $g(1) = g(2) = 1$. Dann ist $g \circ f : \{1\} \to \{1\}$ bijektiv, aber $f$ nicht surjektiv (und $g$ nicht injektiv).

**(c)** Sei $y \in f(N_1 \cap N_2)$, also $y = f(a)$ mit $a \in N_1 \cap N_2$. Dann $y \in f(N_1)$ und $y \in f(N_2)$.
Gegenbeispiel: $f : \mathbb{R} \to \mathbb{R}$, $x \mapsto x^2$, $N_1 = \{1\}$, $N_2 = \{-1\}$. Dann $f(N_1 \cap N_2) = f(\emptyset) = \emptyset$, aber $f(N_1) \cap f(N_2) = \{1\}$.
Ist $f$ injektiv und $y \in f(N_1) \cap f(N_2)$, so gibt es $a \in N_1$, $b \in N_2$ mit $f(a) = y = f(b)$. Wegen Injektivität $a = b \in N_1 \cap N_2$, also $y \in f(N_1 \cap N_2)$.

---

# Lösungen Blatt B

## (1) LGS mit Parametern

Zeilenumformungen: $II - I$ und $III - 2I$ liefern
$$\begin{pmatrix} 1 & 1 & 1 & | & 1 \\ 0 & 1 & 2 & | & 1 \\ 0 & 1 & \lambda - 2 & | & \mu - 2 \end{pmatrix}
\xrightarrow{III - II}
\begin{pmatrix} 1 & 1 & 1 & | & 1 \\ 0 & 1 & 2 & | & 1 \\ 0 & 0 & \lambda - 4 & | & \mu - 3 \end{pmatrix}.$$

- **$\lambda \ne 4$**: genau eine Lösung. $z = \frac{\mu - 3}{\lambda - 4}$, $y = 1 - 2z$, $x = 1 - y - z = z$. Also $\mathbb{L} = \left\{ (z,\ 1 - 2z,\ z) \right\}$ mit diesem $z$.
- **$\lambda = 4$, $\mu \ne 3$**: letzte Zeile $0 = \mu - 3 \ne 0$, also **keine** Lösung.
- **$\lambda = 4$, $\mu = 3$**: letzte Zeile entfällt, $z = t$ frei, $\mathbb{L} = \{(t,\ 1 - 2t,\ t) \mid t \in \mathbb{R}\}$ (**unendlich viele**).

## (2) LGS über endlichen Körpern

**(a)** In $\mathbb{Z}/5\mathbb{Z}$: $2 \cdot (2x + 3y) = 4x + 6y = 4x + y$. Die zweite Gleichung ist also das 2-fache der ersten ($2 \cdot 1 = 2$ ). $II - 2 \cdot I$ ergibt $0 = 0$.
Aus $2x = 1 - 3y$ folgt (mit $2^{-1} = 3$) $x = 3 - 9y = 3 + y$. Mit $y = t$:
$$\mathbb{L} = \{(3 + t,\ t) \mid t \in \mathbb{Z}/5\mathbb{Z}\} = \{(3,0), (4,1), (0,2), (1,3), (2,4)\}.$$
**5 Lösungen.** Probe $(4,1)$: $8 + 3 = 11 = 1$ , $16 + 1 = 17 = 2$ .

**(b)** In $\mathbb{Z}/7\mathbb{Z}$: $II - 3 \cdot I$ ergibt $(1 - 6)y = 4 - 9$, also $-5y = -5$, d.h. $y = 1$ ($5$ ist invertierbar). Dann $x = 3 - 2 = 1$.
$\mathbb{L} = \{(1, 1)\}$, **genau eine Lösung**. Probe: $1 + 2 = 3$ , $3 + 1 = 4$ .

## (3) Gruppen

**(a)** Seien $g, h \in G$. Wegen $x * x = e$ ist jedes Element sein eigenes Inverses. Also
$$g * h = (g * h)^{-1} = h^{-1} * g^{-1} = h * g.$$

**(b)** Die Verknüpfungstafel ($\text{Zeile} \circ \text{Spalte}$):

| $\circ$ | $e$ | $g_2$ | $g_3$ | $g_4$ |
|---|---|---|---|---|
| $e$ | $e$ | $g_2$ | $g_3$ | $g_4$ |
| $g_2$ | $g_2$ | $e$ | $g_4$ | $g_3$ |
| $g_3$ | $g_3$ | $g_4$ | $e$ | $g_2$ |
| $g_4$ | $g_4$ | $g_3$ | $g_2$ | $e$ |

Nachrechnen der nicht-trivialen Einträge: $g_2 \circ g_3 (x) = -\tfrac1x = g_4(x) = g_3 \circ g_2 (x)$; $g_2 \circ g_4(x) = \tfrac1x = g_3(x)$; $g_3 \circ g_4(x) = -x = g_2(x)$; $g_4 \circ g_4 (x) = -\frac{1}{-1/x} = x$.
- Abgeschlossenheit: alle Einträge liegen in der Menge.
- Assoziativität: gilt für die Hintereinanderausführung von Abbildungen immer.
- Neutrales Element: $e$ (erste Zeile/Spalte).
- Inverse: in jeder Zeile steht genau ein $e$ (alle Elemente sind selbstinvers).
- Abelsch: Die Tafel ist symmetrisch zur Diagonale.

Das ist die Kleinsche Vierergruppe.

**(c)** $3\mathbb{Z} \ne \emptyset$. Für $a = 3k$, $b = 3l$ gilt $a - b = 3(k - l) \in 3\mathbb{Z}$ (additiv geschrieben: $a * b^{-1} = a + (-b)$). Also Untergruppe.
$2\mathbb{Z} \cup 3\mathbb{Z}$: $2$ und $3$ liegen drin, aber $3 - 2 = 1 \notin 2\mathbb{Z} \cup 3\mathbb{Z}$. Keine Untergruppe.

## (4) Boolesche Ringe

**(a)** Es gilt einerseits $(r + r)^2 = r + r$. Andererseits mit den Distributivgesetzen $(r+r)^2 = r^2 + r^2 + r^2 + r^2 = r + r + r + r$. Also $r + r = (r + r) + (r + r)$, und Addition von $-(r + r)$ ergibt $0 = r + r$. Somit $-r = r$.

**(b)** Für $r, s \in R$ gilt $r + s = (r + s)^2 = r^2 + rs + sr + s^2 = r + rs + sr + s$. Subtraktion von $r + s$ ergibt $rs + sr = 0$, also $rs = -sr = sr$ nach (a).

## (5) $\mathbb{Z}[i]$

**(a)** $0 = 0 + 0i$ und $1 = 1 + 0i$ liegen in $\mathbb{Z}[i]$. Für $a + bi,\ c + di \in \mathbb{Z}[i]$:
- $(a + bi) + (c + di) = (a + c) + (b + d)i \in \mathbb{Z}[i]$
- $(a + bi)(c + di) = (ac - bd) + (ad + bc)i \in \mathbb{Z}[i]$
- $-(a + bi) = (-a) + (-b)i \in \mathbb{Z}[i]$

Nach Blatt 5, Aufgabe 1 ist $\mathbb{Z}[i]$ ein Unterring von $\mathbb{C}$.

**(b)** Nein: $2 \in \mathbb{Z}[i]$, aber $2^{-1} = \tfrac12 \notin \mathbb{Z}[i]$ (das Inverse in $\mathbb{C}$ ist eindeutig, und $\frac12 + 0i$ hat keine ganzzahligen Koeffizienten).

**(c)** Sei $z = a + bi$ eine Einheit, d.h. $z w = 1$ mit $w \in \mathbb{Z}[i]$. Betragsquadrat: $(a^2 + b^2)(c^2 + d^2) = 1$ mit ganzen Zahlen $a^2 + b^2,\ c^2 + d^2 \ge 0$. Also $a^2 + b^2 = 1$, d.h. $(a,b) \in \{(\pm1, 0), (0, \pm1)\}$.
Einheitengruppe: $\mathbb{Z}[i]^\times = \{1, -1, i, -i\}$. (Umgekehrt sind diese tatsächlich Einheiten: $1 \cdot 1 = 1$, $(-1)(-1) = 1$, $i \cdot (-i) = 1$.)

## (6) $\mathbb{Z}/n\mathbb{Z}$

**(a)** Sei $n = ab$ mit $1 < a, b < n$. Dann sind $[a], [b] \ne [0]$, aber $[a] \cdot [b] = [n] = [0]$. In einem Körper folgt aus $xy = 0$ aber $x = 0$ oder $y = 0$ (sonst $y = x^{-1} x y = 0$). Also kein Körper.

**(b)** $\mathbb{Z}/p\mathbb{Z}$ ist ein kommutativer Ring mit $[0] \ne [1]$ (Satz 2.2.32). Sei $[a] \ne [0]$, d.h. $p \nmid a$. Da $p$ prim, ist $\operatorname{ggT}(a, p) = 1$. Nach Bézout gibt es $u, v \in \mathbb{Z}$ mit $ua + vp = 1$. Modulo $p$: $[u][a] = [1]$. Also hat jedes Element $\ne [0]$ ein Inverses.

**(c)** $[a]$ ist genau dann Einheit, wenn $\operatorname{ggT}(a, 12) = 1$:
$$(\mathbb{Z}/12\mathbb{Z})^\times = \{[1], [5], [7], [11]\}.$$
(Z.B. $5 \cdot 5 = 25 = 1$, $7 \cdot 7 = 49 = 1$, $11 \cdot 11 = 121 = 1$.)

---

# Lösungen Blatt C

## (1) Matrixprodukte

**(a)** Dimensionen: $A \in \mathrm{Mat}_{2,2}$, $B \in \mathrm{Mat}_{2,3}$, $C \in \mathrm{Mat}_{3,2}$.
- $AB$ (2×2 · 2×3): existiert
$$AB = \begin{pmatrix} 1\cdot2 + 2\cdot1 & 0 + 2\cdot3 & 1 - 2 \\ 0 - 1 & 0 - 3 & 0 + 1 \end{pmatrix} = \begin{pmatrix} 4 & 6 & -1 \\ -1 & -3 & 1 \end{pmatrix}.$$
- $BA$ (2×3 · 2×2): **nicht definiert**.
- $AC$ (2×2 · 3×2): **nicht definiert**.
- $BC$ (2×3 · 3×2): Erste Zeile $(2, 0, 1)$: mit Spalte 1 $(1, 0, -1)$ ergibt $2 - 1 = 1$; mit Spalte 2 $(1, 2, 1)$ ergibt $2 + 0 + 1 = 3$. Zweite Zeile $(1, 3, -1)$: mit Spalte 1: $1 + 0 + 1 = 2$; mit Spalte 2: $1 + 6 - 1 = 6$.
$$BC = \begin{pmatrix} 1 & 3 \\ 2 & 6 \end{pmatrix}.$$
- $CA$ (3×2 · 2×2):
$$CA = \begin{pmatrix} 1 & 1 \\ 0 & -2 \\ -1 & -3 \end{pmatrix}.$$

**(b)**
$$(AB)^t = \begin{pmatrix} 4 & -1 \\ 6 & -3 \\ -1 & 1 \end{pmatrix},\qquad
B^t A^t = \begin{pmatrix} 2 & 1 \\ 0 & 3 \\ 1 & -1 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 2 & -1 \end{pmatrix} = \begin{pmatrix} 4 & -1 \\ 6 & -3 \\ -1 & 1 \end{pmatrix}. $$

**(c)**
$$A^2 = \begin{pmatrix} 1 & 2 - 2 \\ 0 & 1 \end{pmatrix} = I_2.$$
Also $A \cdot A = I_2$ und damit $A^{-1} = A$.

## (2) Inverse in $\mathrm{Mat}_3(\mathbb{Z}/3\mathbb{Z})$

Rechnung in $\mathbb{Z}/3\mathbb{Z}$ (also $-1 = 2$, $2 \cdot 2 = 1$):
$$\left(\begin{array}{ccc|ccc} 1&1&0&1&0&0\\ 0&1&1&0&1&0\\ 1&0&1&0&0&1 \end{array}\right)$$

1. $III \leftarrow III - I$: $(0, -1, 1 \mid -1, 0, 1) = (0, 2, 1 \mid 2, 0, 1)$
2. $III \leftarrow III + II$: $(0, 0, 2 \mid 2, 1, 1)$
3. $III \leftarrow 2 \cdot III$: $(0, 0, 1 \mid 1, 2, 2)$
4. $II \leftarrow II - III$: $(0, 1, 0 \mid 0 - 1,\ 1 - 2,\ 0 - 2) = (0, 1, 0 \mid 2, 2, 1)$
5. $I \leftarrow I - II$: $(1, 0, 0 \mid 1 - 2,\ 0 - 2,\ 0 - 1) = (1, 0, 0 \mid 2, 1, 2)$

$$A^{-1} = \begin{pmatrix} 2 & 1 & 2 \\ 2 & 2 & 1 \\ 1 & 2 & 2 \end{pmatrix}.$$

**Probe** $A \cdot A^{-1}$ (Zeile · Spalte, mod 3):
- Zeile 1 $(1,1,0)$: $2 + 2 = 4 = 1$; $1 + 2 = 0$; $2 + 1 = 0$ → $(1, 0, 0)$ 
- Zeile 2 $(0,1,1)$: $2 + 1 = 0$; $2 + 2 = 1$; $1 + 2 = 0$ → $(0, 1, 0)$ 
- Zeile 3 $(1,0,1)$: $2 + 1 = 0$; $1 + 2 = 0$; $2 + 2 = 1$ → $(0, 0, 1)$ 

**Über $\mathbb{Z}/2\mathbb{Z}$:** Über $\mathbb{Q}$ gilt $A \cdot \begin{pmatrix} 1&-1&1\\ 1&1&-1\\ -1&1&1 \end{pmatrix} = 2 I_3$, also $\det A = 2$. Modulo 3 ist $2 \ne 0$ (invertierbar, passend zu oben), modulo 2 ist $\det A = 0$. Also ist $A$ über $\mathbb{Z}/2\mathbb{Z}$ **nicht** invertierbar. (Direkt: Die Summe der drei Zeilen ist $(2,2,2) = 0$ in $\mathbb{Z}/2\mathbb{Z}$, die Zeilen sind linear abhängig.)

## (3) Untervektorräume von $\mathcal{F}(\mathbb{R}, \mathbb{R})$

**(a)** Ja. $0 \in U_1$ ($0 = 2 \cdot 0$). Für $f, g \in U_1$, $\alpha \in \mathbb{R}$: $(f + g)(1) = f(1) + g(1) = 2f(0) + 2g(0) = 2(f + g)(0)$ und $(\alpha f)(1) = \alpha \cdot 2f(0) = 2(\alpha f)(0)$.

**(b)** Nein. $f(x) = x$ und $g(x) = 1 - x$ liegen in $U_2$ ($f(0) = 0$, $g(1) = 0$), aber $(f + g)(x) = 1$, also $(f+g)(0) \cdot (f+g)(1) = 1 \ne 0$.

**(c)** Ja. $0$ ist gerade. Für gerade $f, g$ und $\alpha \in \mathbb{R}$: $(f + g)(-x) = f(-x) + g(-x) = f(x) + g(x) = (f + g)(x)$, und $(\alpha f)(-x) = \alpha f(x) = (\alpha f)(x)$.

**(d)** Nein. $f \equiv 1 \in U_4$, aber $(-1) \cdot f \equiv -1 \notin U_4$.

**(e)** Ja. $0 \in U_5$ (mit $c = 0$). Seien $f, g \in U_5$ mit Konstanten $c_f, c_g$. Für $x \ge \max(c_f, c_g)$ gilt $(f + g)(x) = 0$. Für $\alpha \in \mathbb{R}$ gilt $(\alpha f)(x) = 0$ für $x \ge c_f$.

## (4) Magische Quadrate in $\mathrm{Mat}_2(\mathbb{Z}/3\mathbb{Z})$

**(a)** Mit $M = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ lauten die Bedingungen
$$a + b = 1,\quad c + d = 1,\quad a + c = 1,\quad b + d = 1.$$
Das ist ein inhomogenes lineares Gleichungssystem in den Einträgen $a, b, c, d$. Seine Lösungsmenge $Q$ ist ein affiner Unterraum, denn sie ist nichtleer: $I_2 \in Q$ ist eine spezielle Lösung.
Auflösen: $b = 1 - a$, $c = 1 - a$, $d = 1 - c = a$ (und $b + d = 1 - a + a = 1$ ). Also
$$Q = \left\{ \begin{pmatrix} a & 1 - a \\ 1 - a & a \end{pmatrix} \;\middle|\; a \in \mathbb{Z}/3\mathbb{Z} \right\} = I_2 + U,$$
mit dem parallelen Untervektorraum (homogenes System: alle Summen $= 0$)
$$U = \left\{ \begin{pmatrix} a & -a \\ -a & a \end{pmatrix} \;\middle|\; a \in \mathbb{Z}/3\mathbb{Z} \right\}.$$

**(b)** Eine Basis von $U$ ist $\left( \begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix} \right)$, also $\dim U = 1$. Die Elemente von $Q$ ($|Q| = 3$):
$$a = 0: \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix},\qquad a = 1: \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix},\qquad a = 2: \begin{pmatrix} 2 & 2 \\ 2 & 2 \end{pmatrix}.$$

## (5) Durchschnitt und Vereinigung

**(a)** $0 \in U_1 \cap U_2$. Seien $u, v \in U_1 \cap U_2$, $\alpha \in K$. Da $U_1, U_2$ Untervektorräume sind, liegen $u + v$ und $\alpha u$ in $U_1$ und in $U_2$, also in $U_1 \cap U_2$.

**(b)** "$\Leftarrow$": Gilt z.B. $U_1 \subseteq U_2$, so ist $U_1 \cup U_2 = U_2$ ein Untervektorraum.
"$\Rightarrow$": Sei $U_1 \cup U_2$ ein Untervektorraum und angenommen $U_1 \not\subseteq U_2$ und $U_2 \not\subseteq U_1$. Wähle $u_1 \in U_1 \setminus U_2$ und $u_2 \in U_2 \setminus U_1$. Dann ist $u_1 + u_2 \in U_1 \cup U_2$.
- Fall $u_1 + u_2 \in U_1$: dann $u_2 = (u_1 + u_2) - u_1 \in U_1$. Widerspruch.
- Fall $u_1 + u_2 \in U_2$: dann $u_1 = (u_1 + u_2) - u_2 \in U_2$. Widerspruch.

## (6) Basen in $V = \{p \in \mathbb{R}_{\le 3}[t] \mid p(1) = 0\}$

**Dimension:** $p(1) = 0 \iff p = (t - 1) \cdot q$ mit $\deg q \le 2$. Also hat $V$ die Basis $(t - 1,\ t(t - 1),\ t^2(t - 1))$ und $\dim V = 3$. (Alternativ: $V$ ist der Kern der Linearform $p \mapsto p(1)$ auf dem 4-dimensionalen $\mathbb{R}_{\le 3}[t]$.)

Koeffizientenvektoren bezüglich $(1, t, t^2, t^3)$:
$p_1 = (-1, 0, 1, 0)$, $p_2 = (0, -1, 0, 1)$, $p_3 = (0, 1, -2, 1)$, $p_4 = (-1, 1, 0, 0)$, $p_5 = (-1, 0, 0, 1)$, $p_6 = (1, -2, 1, 0)$.
Alle $p_i$ liegen in $V$ (Probe $p_i(1) = 0$).

**(a)** $(p_1, p_2, p_3)$: Aus $\alpha p_1 + \beta p_2 + \gamma p_3 = 0$ folgt (Koeffizient von $1$) $-\alpha = 0$, (von $t^2$) $\alpha - 2\gamma = 0$, also $\gamma = 0$, und (von $t$) $-\beta + \gamma = 0$, also $\beta = 0$. Linear unabhängig. Drei linear unabhängige Vektoren in einem 3-dimensionalen Raum sind eine **Basis**, also auch Erzeugendensystem.

**(b)** $(p_2, p_4, p_5)$: Es gilt $p_5 - p_4 = (t^3 - 1) - (t - 1) = t^3 - t = p_2$. Also **linear abhängig**, und der Span ist nur 2-dimensional, daher **kein** Erzeugendensystem.
Reduzieren: $(p_4, p_5)$ ist linear unabhängig. Ergänzen mit $p_1$: $(p_4, p_5, p_1)$ ist linear unabhängig (aus $\alpha p_4 + \beta p_5 + \gamma p_1 = 0$ folgt über den Koeffizient von $t^3$: $\beta = 0$, über $t^2$: $\gamma = 0$, über $t$: $\alpha = 0$) und damit eine Basis.

**(c)** $(p_1, p_4, p_6)$: Es gilt $p_1 - 2p_4 = t^2 - 1 - 2t + 2 = t^2 - 2t + 1 = p_6$. Also **linear abhängig**, kein Erzeugendensystem (Span hat Dimension 2).
Reduzieren zu $(p_1, p_4)$ (linear unabhängig, da keines ein Vielfaches des anderen ist) und ergänzen mit $p_5$ (hat $t^3$-Anteil): Basis $(p_1, p_4, p_5)$.

**(d)** $(p_1, p_2, p_4, p_5)$: 4 Vektoren in einem 3-dimensionalen Raum, also **linear abhängig** (konkret $p_2 = p_5 - p_4$). Wegen (b) ist $(p_1, p_4, p_5)$ eine Basis, also ist das System ein **Erzeugendensystem**. Reduzieren: $p_2$ streichen, Basis $(p_1, p_4, p_5)$.

---

## Tipps für den Midterm

- **Quantoren verneinen:** $\forall \leftrightarrow \exists$ vertauschen, Aussage verneinen. Reihenfolge nie vertauschen!
- **Struktur-Beweise (Gruppe, Ring, Körper, UVR):** Immer die Axiome einzeln durchgehen. Bei Unterstrukturen reichen Unterstruktur-Kriterien (Abgeschlossenheit + $0$, $1$ bzw. Negatives).
- **Gaußalgorithmus über $\mathbb{Z}/p\mathbb{Z}$:** Vor dem Rechnen die Inversen aller Elemente $\ne 0$ aufschreiben und zwischendurch mod $p$ reduzieren.
- **Basisaufgaben:** Dimension des Raumes zuerst bestimmen, dann Koeffizientenvektoren aufschreiben, auf lineare Unabhängigkeit prüfen und die Anzahl der Vektoren mit der Dimension vergleichen.
