# UE Lineare Algebra (1) – Zusatzübungen zur Midterm-Vorbereitung

Drei Übungsblätter im Stil der Blätter 1–7. Die Lösungen stehen in der separaten Datei `LinAlg1_Midterm_Loesungen.md`.

| Blatt | Themen | entspricht ca. |
|---|---|---|
| **A** | Logik, Beweise, Mengen, Relationen, Abbildungen | Blatt 1–3 |
| **B** | Lineare Gleichungssysteme, Gruppen, Ringe, Körper | Blatt 3–5 |
| **C** | Matrizen, Vektorräume, Untervektorräume, Basen | Blatt 5–7 |

---

# Blatt A – Logik, Mengen, Relationen, Abbildungen

**(1)** (a) Übersetzen Sie die folgenden Aussagen gegebenenfalls in mathematische Schreibweise, verneinen Sie sie und begründen Sie, ob jeweils die ursprüngliche oder die verneinte Aussage richtig ist.

 (i) Jede natürliche Zahl ist auch eine rationale Zahl.
 (ii) $\forall x \in \mathbb{R}\ \exists y \in \mathbb{Z} : y > x$.
 (iii) Es existiert eine reelle Zahl, die kleiner ist als jede natürliche Zahl.
 (iv) $\forall x \in \mathbb{Q}\ \exists y \in \mathbb{Q} : x \cdot y = 1$.

(b) Vergleichen Sie die Aussagen. Sind sie richtig?

 (i) $\forall x \in \mathbb{R}\ \exists y \in \mathbb{R} : x + y = 0$
 (ii) $\exists y \in \mathbb{R}\ \forall x \in \mathbb{R} : x + y = 0$

(c) Welche der folgenden Aussagen sind richtig? (Begründen Sie.)

 (i) $x \in \mathbb{Q},\ y \in \mathbb{Q} \Rightarrow x + y \in \mathbb{Q}$
 (ii) $x \in \mathbb{R},\ x^2 = 1 \iff x = 1$
 (iii) $x \in \mathbb{R},\ x^2 - x - 6 = 0 \iff x \in \{-2, 3\}$

**(2)** Seien $A, B, C$ logische Aussagen.

(a) Zeigen Sie mit einer Wahrheitstabelle
$$\big[(A \Rightarrow B) \wedge (A \Rightarrow C)\big] \iff \big[A \Rightarrow (B \wedge C)\big].$$

(b) Zeigen Sie durch Umformen (mit den Rechenregeln aus Satz 1.3.1, z.B. $(X \Rightarrow Y) \iff (\neg X \vee Y)$, De Morgan, Distributivgesetze)
$$\big[(A \Rightarrow C) \wedge (B \Rightarrow C)\big] \iff \big[(A \vee B) \Rightarrow C\big].$$

(c) Widerlegen Sie durch ein Gegenbeispiel (mit $x \in \mathbb{R}$):
$$\big[\forall x : A(x) \Rightarrow B(x)\big] \iff \big[(\forall x : A(x)) \Rightarrow (\forall x : B(x))\big].$$
Welche der beiden Richtungen "$\Rightarrow$" und "$\Leftarrow$" gilt trotzdem?

**(3)** Beweisen Sie die folgenden Aussagen mit der angegebenen Technik:

(a) direkter Beweis: Seien $a, b \in \mathbb{R}$ mit $a + b = 1$. Dann gilt $a^2 + b^2 \ge \tfrac{1}{2}$.

(b) direkter Beweis mit Fallunterscheidung: Für alle $x \in \mathbb{R}$ gilt $|x - 1| + |x + 1| \ge 2$.

(c) Beweis durch Widerspruch: Für jedes $x \in \mathbb{R}$ mit $x > 0$ gilt $x + \dfrac{9}{x} \ge 6$.

(d) Beweis durch Induktion: Für $n \in \mathbb{N}$ gilt $\displaystyle\sum_{k=1}^{n} k \cdot k! = (n+1)! - 1$.

**(4)** (a) Schreiben Sie für $M = \{1, \{1\}\}$ die Potenzmenge $\mathcal{P}(M)$ explizit an.

(b) Welche der folgenden Aussagen sind richtig? (Begründen Sie.)

 (i) $\emptyset \subseteq \{\emptyset\}$  (ii) $\emptyset \in \{\{\emptyset\}\}$  (iii) $\{1\} \in \{1, \{1\}\}$
 (iv) $\{1, 2\} \subseteq \{1, \{2\}\}$  (v) $\{\emptyset\} \in \mathcal{P}(\mathcal{P}(\emptyset))$

 Wie viele Elemente hat $\mathcal{P}(\mathcal{P}(\mathcal{P}(\emptyset)))$?

(c) Zeigen (Überprüfen von $x \in A \iff x \in B$) oder widerlegen (einfaches Gegenbeispiel) Sie für Mengen $S, T, V$:

 (i) $(S \cup T) \setminus V = (S \setminus V) \cup (T \setminus V)$
 (ii) $S \setminus (T \setminus V) = (S \setminus T) \cup V$

**(5)** (a) Zeigen Sie, dass auf $\mathbb{R}^2$ durch
$$(x_1, x_2) \sim (y_1, y_2) \;:\iff\; x_1 + x_2 = y_1 + y_2$$
eine Äquivalenzrelation definiert ist. Skizzieren Sie die Äquivalenzklasse von $\binom{1}{2}$.

(b) Zeigen Sie, dass auf $\mathbb{Z}$ durch $a \sim b :\iff 5 \mid (a^2 - b^2)$ eine Äquivalenzrelation definiert ist. Bestimmen Sie alle Äquivalenzklassen.

(c) Welche der folgenden Relationen sind Äquivalenzrelationen? (Begründen Sie.)

 (i) auf $\mathbb{R}$: $x \sim y :\iff |x - y| \le 1$
 (ii) auf $\mathbb{R} \setminus \{0\}$: $x \sim y :\iff x \cdot y > 0$
 (iii) auf $\mathbb{R}$: $x \sim y :\iff x - y \in \mathbb{Q}$

**(6)** (a) Untersuchen Sie die folgenden Abbildungen auf Injektivität und Surjektivität:

 (i) $f_1 : \mathbb{R} \to \mathbb{R},\ x \mapsto x^3 - x$
 (ii) $f_2 : \mathbb{R}^2 \to \mathbb{R}^2,\ (x, y) \mapsto (x + 2y,\ 3x - y)$
 (iii) $f_3 : \mathbb{R} \to \mathbb{R}^2,\ t \mapsto (t, t^2)$
 (iv) $f_4 : \mathbb{R}^2 \to \mathbb{R},\ (x, y) \mapsto x \cdot y$

(b) Seien $f : M \to N$ und $g : N \to O$ Abbildungen. Zeigen Sie: Ist $g \circ f$ surjektiv, so ist $g$ surjektiv. Finden Sie ein Beispiel, bei dem $g \circ f$ bijektiv ist, aber $f$ nicht surjektiv.

(c) Sei $f : M \to T$ eine Abbildung und $N_1, N_2 \subseteq M$. Zeigen Sie $f(N_1 \cap N_2) \subseteq f(N_1) \cap f(N_2)$ und finden Sie ein Beispiel, in dem keine Gleichheit gilt. Zeigen Sie, dass Gleichheit gilt, wenn $f$ injektiv ist.

---

# Blatt B – Gleichungssysteme, Gruppen, Ringe, Körper

**(1)** Für welche $\lambda, \mu \in \mathbb{R}$ besitzt das folgende Gleichungssystem keine, genau eine bzw. unendlich viele Lösungen? Bestimmen Sie jeweils die Lösungsmenge.
$$\begin{aligned} x + y + z &= 1 \\ x + 2y + 3z &= 2 \\ 2x + 3y + \lambda z &= \mu \end{aligned}$$

**(2)** Bestimmen Sie die Lösungsmengen der folgenden linearen Gleichungssysteme in den angegebenen Körpern.

(a) in $(\mathbb{Z}/5\mathbb{Z})^2$:  $\quad 2x + 3y = 1,\quad 4x + y = 2$

(b) in $(\mathbb{Z}/7\mathbb{Z})^2$:  $\quad x + 2y = 3,\quad 3x + y = 4$

Wie viele Lösungen hat jeweils das System?

**(3)** (a) Sei $(G, *)$ eine Gruppe mit $g * g = e$ für alle $g \in G$. Zeigen Sie, dass $G$ abelsch ist.

(b) Seien $e, g_2, g_3, g_4 : \mathbb{R} \setminus \{0\} \to \mathbb{R} \setminus \{0\}$ definiert durch
$$e(x) = x,\quad g_2(x) = -x,\quad g_3(x) = \tfrac{1}{x},\quad g_4(x) = -\tfrac{1}{x}.$$
Erstellen Sie die Verknüpfungstafel von $(\{e, g_2, g_3, g_4\}, \circ)$ und zeigen Sie damit, dass es eine abelsche Gruppe ist.

(c) Eine nichtleere Teilmenge $H \subseteq G$ ist genau dann eine Untergruppe, wenn für alle $a, b \in H$ gilt $a * b^{-1} \in H$. Zeigen Sie, dass $3\mathbb{Z}$ eine Untergruppe von $(\mathbb{Z}, +)$ ist, aber $2\mathbb{Z} \cup 3\mathbb{Z}$ nicht.

**(4)** Sei $R$ ein Ring mit $r \cdot r = r$ für alle $r \in R$ (ein sogenannter *Boolescher Ring*, z.B. $(\mathcal{P}(M), \Delta, \cap)$). Zeigen Sie:

(a) $r + r = 0$ für alle $r \in R$, also $-r = r$.

(b) $R$ ist kommutativ. *(Hinweis: Betrachten Sie $(r + s)^2$.)*

**(5)** Sei $\mathbb{Z}[i] := \{a + bi \mid a, b \in \mathbb{Z}\} \subseteq \mathbb{C}$.

(a) Zeigen Sie, dass $\mathbb{Z}[i]$ ein Unterring von $\mathbb{C}$ ist (siehe Blatt 5, Aufgabe 1).

(b) Ist $\mathbb{Z}[i]$ ein Körper?

(c) Bestimmen Sie alle Einheiten von $\mathbb{Z}[i]$. *(Hinweis: Betrachten Sie $|z|^2 = a^2 + b^2$.)*

**(6)** (a) Zeigen Sie: Ist $n \in \mathbb{N}$ nicht prim ($n \ge 2$), so ist $\mathbb{Z}/n\mathbb{Z}$ kein Körper.

(b) Zeigen Sie: Ist $p$ prim, so ist $\mathbb{Z}/p\mathbb{Z}$ ein Körper. *(Hinweis: Bézout.)*

(c) Bestimmen Sie die Einheitengruppe von $\mathbb{Z}/12\mathbb{Z}$.

---

# Blatt C – Matrizen, Vektorräume, Basen

**(1)** Gegeben seien die Matrizen über $\mathbb{R}$:
$$A = \begin{pmatrix} 1 & 2 \\ 0 & -1 \end{pmatrix},\quad B = \begin{pmatrix} 2 & 0 & 1 \\ 1 & 3 & -1 \end{pmatrix},\quad C = \begin{pmatrix} 1 & 1 \\ 0 & 2 \\ -1 & 1 \end{pmatrix}.$$

(a) Berechnen Sie – falls existent – die Produkte $AB,\ BA,\ AC,\ BC,\ CA$.

(b) Überprüfen Sie $(AB)^t = B^t A^t$ an diesem Beispiel.

(c) Berechnen Sie $A^2$ und folgern Sie $A^{-1}$.

**(2)** Berechnen Sie die inverse Matrix von
$$A = \begin{pmatrix} 1 & 1 & 0 \\ 0 & 1 & 1 \\ 1 & 0 & 1 \end{pmatrix} \in \mathrm{Mat}_3(\mathbb{Z}/3\mathbb{Z})$$
mit dem Gaußalgorithmus und führen Sie die Probe durch. Ist $A$ auch über $\mathbb{Z}/2\mathbb{Z}$ invertierbar?

**(3)** Sei $V = \mathcal{F}(\mathbb{R}, \mathbb{R})$ der $\mathbb{R}$-Vektorraum aller Abbildungen von $\mathbb{R}$ nach $\mathbb{R}$. Welche der folgenden Teilmengen sind Untervektorräume von $V$? Begründen Sie Ihre Aussage!

(a) $U_1 = \{f \in V \mid f(1) = 2 f(0)\}$
(b) $U_2 = \{f \in V \mid f(0) \cdot f(1) = 0\}$
(c) $U_3 = \{f \in V \mid \forall x \in \mathbb{R} : f(x) = f(-x)\}$
(d) $U_4 = \{f \in V \mid \forall x \in \mathbb{R} : f(x) \ge 0\}$
(e) $U_5 = \{f \in V \mid \exists c \in \mathbb{R}\ \forall x \ge c : f(x) = 0\}$

**(4)** Wir betrachten die Menge
$$Q := \{M \in \mathrm{Mat}_2(\mathbb{Z}/3\mathbb{Z}) \mid \text{jede Zeile und jede Spalte von } M \text{ summiert sich zu } 1\}.$$

(a) Zeigen Sie, dass $Q$ ein affiner Unterraum von $\mathrm{Mat}_2(\mathbb{Z}/3\mathbb{Z})$ ist und bestimmen Sie den zu $Q$ parallelen Untervektorraum $U$.

(b) Bestimmen Sie eine Basis von $U$ und schreiben Sie alle Elemente von $Q$ explizit auf.

**(5)** Sei $V$ ein $K$-Vektorraum und seien $U_1, U_2 \subseteq V$ Untervektorräume.

(a) Zeigen Sie, dass $U_1 \cap U_2$ ein Untervektorraum ist.

(b) Zeigen Sie: $U_1 \cup U_2$ ist genau dann ein Untervektorraum, wenn $U_1 \subseteq U_2$ oder $U_2 \subseteq U_1$ gilt.

**(6)** Sei $V = \{p \in \mathbb{R}_{\le 3}[t] \mid p(1) = 0\}$ und seien
$$p_1 = t^2 - 1,\quad p_2 = t^3 - t,\quad p_3 = t^3 - 2t^2 + t,\quad p_4 = t - 1,\quad p_5 = t^3 - 1,\quad p_6 = t^2 - 2t + 1.$$

Bestimmen Sie zunächst $\dim V$. Überprüfen Sie dann jeweils, ob die gegebenen Vektoren linear unabhängig bzw. ein Erzeugendensystem von $V$ sind. Falls möglich, ergänzen bzw. reduzieren Sie die Vektoren zu einer Basis von $V$.

(a) $(p_1, p_2, p_3)$  (b) $(p_2, p_4, p_5)$  (c) $(p_1, p_4, p_6)$  (d) $(p_1, p_2, p_4, p_5)$
