// ============================================================================
//  TETRIS in ARM64 (AArch64) Assembly  -  Linux, reine Syscalls, keine libc
//
//  Bauen:    as -o tetris.o tetris.s && ld -o tetris tetris.o
//  Starten:  ./tetris
//  (Auf x86-Rechnern:  qemu-aarch64 ./tetris)
//
//  Steuerung:  A / Pfeil links   = links        D / Pfeil rechts = rechts
//              W / Pfeil hoch    = drehen       S / Pfeil runter = schneller fallen
//              LEERTASTE         = Hard Drop    R = Neustart     Q = Beenden
//
//  Register-Konvention (selbst festgelegt):
//    x19 = Zeiger auf den Spielzustand ("state")
//    x24 = Schreibzeiger im Ausgabepuffer ("outbuf")
//    x0-x15 sind Scratch, x20-x22 werden bei Bedarf gesichert
//
//  Layout "state" (Offsets in Bytes):
//     0 px      4 py      8 piece   12 rot    16 next
//    20 score  24 lines  28 level   32 gameover  36 rng  40 last_tick_ms (64 Bit)
// ============================================================================

        .equ    SYS_IOCTL,   29
        .equ    SYS_READ,    63
        .equ    SYS_WRITE,   64
        .equ    SYS_EXIT,    93
        .equ    SYS_CLOCK,   113
        .equ    TCGETS,      0x5401
        .equ    TCSETS,      0x5402

        .text
        .global _start

// ---------------------------------------------------------------------------
//  Programmstart
// ---------------------------------------------------------------------------
_start:
        adr     x19, state

        // --- Terminal in den Raw-Modus schalten -----------------------------
        mov     x0, #0
        mov     x1, #TCGETS
        adr     x2, term_orig
        mov     x8, #SYS_IOCTL
        svc     #0

        adr     x0, term_orig           // 36 Byte nach term_new kopieren
        adr     x1, term_new
        mov     w2, #0
1:      ldrb    w3, [x0, x2]
        strb    w3, [x1, x2]
        add     w2, w2, #1
        cmp     w2, #36
        b.lt    1b

        ldr     w2, [x1, #12]           // c_lflag: ICANON(0x2) und ECHO(0x8) aus
        mov     w3, #0xA
        bic     w2, w2, w3
        str     w2, [x1, #12]
        strb    wzr, [x1, #23]          // VMIN  = 0
        mov     w2, #1
        strb    w2, [x1, #22]           // VTIME = 1  (read wartet max. 100 ms)

        mov     x0, #0
        mov     x1, #TCSETS
        adr     x2, term_new
        mov     x8, #SYS_IOCTL
        svc     #0

        // --- Bildschirm löschen, Cursor verstecken --------------------------
        adr     x24, outbuf
        adr     x0, s_init
        bl      put_str
        bl      flush

        bl      init_game

// ---------------------------------------------------------------------------
//  Hauptschleife
// ---------------------------------------------------------------------------
main_loop:
        mov     x0, #0                  // read(0, keybuf, 3)
        adr     x1, keybuf
        mov     x2, #3
        mov     x8, #SYS_READ
        svc     #0
        cmp     x0, #1
        b.lt    .Lgravity               // keine Taste

        adr     x1, keybuf
        ldrb    w2, [x1]
        cmp     w2, #27                 // ESC -> evtl. Pfeiltaste (ESC [ A..D)
        b.ne    .Lkey
        cmp     x0, #3
        b.ne    .Lgravity
        ldrb    w3, [x1, #2]
        cmp     w3, #65                 // 'A' = hoch
        b.ne    1f
        mov     w2, #119                // -> 'w'
        b       .Lkey
1:      cmp     w3, #66                 // 'B' = runter
        b.ne    2f
        mov     w2, #115                // -> 's'
        b       .Lkey
2:      cmp     w3, #67                 // 'C' = rechts
        b.ne    3f
        mov     w2, #100                // -> 'd'
        b       .Lkey
3:      cmp     w3, #68                 // 'D' = links
        b.ne    .Lgravity
        mov     w2, #97                 // -> 'a'

.Lkey:
        orr     w2, w2, #0x20           // Kleinbuchstaben
        cmp     w2, #113                // 'q'
        b.eq    .Lquit
        cmp     w2, #114                // 'r'
        b.ne    .Lplaykeys
        bl      init_game
        b       .Lrender

.Lplaykeys:
        ldr     w3, [x19, #32]
        cbnz    w3, .Lgravity           // Game Over: keine Spieltasten
        cmp     w2, #97                 // 'a'
        b.ne    4f
        mov     w0, #-1
        mov     w1, #0
        bl      try_move
        b       .Lgravity
4:      cmp     w2, #100                // 'd'
        b.ne    5f
        mov     w0, #1
        mov     w1, #0
        bl      try_move
        b       .Lgravity
5:      cmp     w2, #115                // 's'
        b.ne    6f
        mov     w0, #0
        mov     w1, #1
        bl      try_move
        b       .Lgravity
6:      cmp     w2, #119                // 'w'
        b.ne    7f
        bl      try_rotate
        b       .Lgravity
7:      cmp     w2, #32                 // Leertaste
        b.ne    .Lgravity
        bl      hard_drop

.Lgravity:
        ldr     w3, [x19, #32]
        cbnz    w3, .Lrender
        bl      now_ms                  // x0 = Zeit in ms
        ldr     x1, [x19, #40]
        sub     x2, x0, x1              // vergangene ms
        ldr     w3, [x19, #28]          // Intervall = max(100, 800 - level*50)
        mov     w4, #50
        mul     w3, w3, w4
        mov     w4, #800
        sub     w3, w4, w3
        mov     w5, #100
        cmp     w3, #100
        csel    w3, w3, w5, gt
        cmp     x2, x3
        b.lt    .Lrender
        str     x0, [x19, #40]
        mov     w0, #0
        mov     w1, #1
        bl      try_move
        cbnz    w0, .Lrender
        bl      do_lock                 // konnte nicht fallen -> festsetzen

.Lrender:
        bl      render
        b       main_loop

.Lquit:
        mov     x0, #0                  // Terminal wiederherstellen
        mov     x1, #TCSETS
        adr     x2, term_orig
        mov     x8, #SYS_IOCTL
        svc     #0
        adr     x24, outbuf
        adr     x0, s_exit
        bl      put_str
        bl      flush
        mov     x0, #0
        mov     x8, #SYS_EXIT
        svc     #0

// ---------------------------------------------------------------------------
//  init_game: Spielfeld leeren, Werte zurücksetzen, ersten Stein erzeugen
// ---------------------------------------------------------------------------
init_game:
        stp     x29, x30, [sp, #-16]!
        adr     x0, board
        mov     w1, #0
1:      strb    wzr, [x0, x1]
        add     w1, w1, #1
        cmp     w1, #200
        b.lt    1b
        str     wzr, [x19, #20]         // score
        str     wzr, [x19, #24]         // lines
        str     wzr, [x19, #28]         // level
        str     wzr, [x19, #32]         // gameover
        bl      now_ms
        str     x0, [x19, #40]
        mov     w1, w0
        orr     w1, w1, #1              // Seed darf nicht 0 sein
        str     w1, [x19, #36]
        bl      rand7
        str     w0, [x19, #16]
        bl      spawn
        ldp     x29, x30, [sp], #16
        ret

// ---------------------------------------------------------------------------
//  now_ms: liefert monotone Zeit in Millisekunden in x0
// ---------------------------------------------------------------------------
now_ms:
        sub     sp, sp, #16
        mov     x0, #1                  // CLOCK_MONOTONIC
        mov     x1, sp
        mov     x8, #SYS_CLOCK
        svc     #0
        ldp     x1, x2, [sp]            // x1 = Sekunden, x2 = Nanosekunden
        add     sp, sp, #16
        mov     x3, #1000
        mul     x0, x1, x3
        movz    x4, #0x4240
        movk    x4, #0xF, lsl #16       // x4 = 1.000.000
        udiv    x2, x2, x4
        add     x0, x0, x2
        ret

// ---------------------------------------------------------------------------
//  rand7: Xorshift32, liefert Zufallszahl 0..6 in w0
// ---------------------------------------------------------------------------
rand7:
        ldr     w0, [x19, #36]
        eor     w0, w0, w0, lsl #13
        eor     w0, w0, w0, lsr #17
        eor     w0, w0, w0, lsl #5
        str     w0, [x19, #36]
        mov     w1, #7
        udiv    w2, w0, w1
        msub    w0, w2, w1, w0          // w0 = w0 mod 7
        ret

// ---------------------------------------------------------------------------
//  get_mask(w0 = Stein, w1 = Rotation) -> w0 = 16-Bit-Maske (4x4, Bit = r*4+c)
//  Dreht die Maske w1-mal um 90 Grad im Uhrzeigersinn:
//      neu[r][c] = alt[3-c][r]
// ---------------------------------------------------------------------------
get_mask:
        adr     x2, pieces
        ldrh    w0, [x2, x0, lsl #1]
1:      cbz     w1, 9f
        mov     w3, #0                  // neue Maske
        mov     w4, #0                  // r
2:      mov     w5, #0                  // c
3:      mov     w6, #3
        sub     w6, w6, w5              // 3-c
        lsl     w6, w6, #2
        add     w6, w6, w4              // (3-c)*4 + r
        lsr     w7, w0, w6
        tbz     w7, #0, 4f
        lsl     w8, w4, #2
        add     w8, w8, w5              // r*4 + c
        mov     w9, #1
        lsl     w9, w9, w8
        orr     w3, w3, w9
4:      add     w5, w5, #1
        cmp     w5, #4
        b.lt    3b
        add     w4, w4, #1
        cmp     w4, #4
        b.lt    2b
        mov     w0, w3
        sub     w1, w1, #1
        b       1b
9:      ret

// ---------------------------------------------------------------------------
//  collide(w0 = px, w1 = py, w2 = Stein, w3 = Rotation) -> w0 = 1 bei Kollision
// ---------------------------------------------------------------------------
collide:
        stp     x29, x30, [sp, #-16]!
        mov     w10, w0                 // px
        mov     w11, w1                 // py
        mov     w0, w2
        mov     w1, w3
        bl      get_mask
        mov     w12, w0                 // Maske
        adr     x13, board
        mov     w4, #0                  // Bit-Index
1:      lsr     w5, w12, w4
        tbz     w5, #0, 5f
        and     w6, w4, #3
        add     w6, w6, w10             // x
        lsr     w7, w4, #2
        add     w7, w7, w11             // y
        cmp     w6, #0
        b.lt    8f
        cmp     w6, #10
        b.ge    8f
        cmp     w7, #20
        b.ge    8f
        cmp     w7, #0
        b.lt    5f
        mov     w8, #10
        madd    w8, w7, w8, w6          // y*10 + x
        ldrb    w9, [x13, x8]
        cbnz    w9, 8f
5:      add     w4, w4, #1
        cmp     w4, #16
        b.lt    1b
        mov     w0, #0
        ldp     x29, x30, [sp], #16
        ret
8:      mov     w0, #1
        ldp     x29, x30, [sp], #16
        ret

// ---------------------------------------------------------------------------
//  stamp: schreibt den aktuellen Stein in den Puffer, auf den x15 zeigt
// ---------------------------------------------------------------------------
stamp:
        stp     x29, x30, [sp, #-16]!
        ldr     w0, [x19, #8]
        ldr     w1, [x19, #12]
        bl      get_mask
        mov     w12, w0
        ldr     w10, [x19, #0]
        ldr     w11, [x19, #4]
        ldr     w14, [x19, #8]
        add     w14, w14, #1            // Farbe = Stein + 1
        mov     w4, #0
1:      lsr     w5, w12, w4
        tbz     w5, #0, 2f
        and     w6, w4, #3
        add     w6, w6, w10
        lsr     w7, w4, #2
        add     w7, w7, w11
        cmp     w7, #0
        b.lt    2f
        cmp     w6, #0
        b.lt    2f
        cmp     w6, #10
        b.ge    2f
        cmp     w7, #20
        b.ge    2f
        mov     w8, #10
        madd    w8, w7, w8, w6
        strb    w14, [x15, x8]
2:      add     w4, w4, #1
        cmp     w4, #16
        b.lt    1b
        ldp     x29, x30, [sp], #16
        ret

// ---------------------------------------------------------------------------
//  try_move(w0 = dx, w1 = dy) -> w0 = 1 wenn bewegt
// ---------------------------------------------------------------------------
try_move:
        stp     x29, x30, [sp, #-32]!
        stp     x20, x21, [sp, #16]
        ldr     w2, [x19, #0]
        ldr     w3, [x19, #4]
        add     w20, w2, w0             // neues px
        add     w21, w3, w1             // neues py
        mov     w0, w20
        mov     w1, w21
        ldr     w2, [x19, #8]
        ldr     w3, [x19, #12]
        bl      collide
        cbnz    w0, 1f
        str     w20, [x19, #0]
        str     w21, [x19, #4]
        mov     w0, #1
        b       2f
1:      mov     w0, #0
2:      ldp     x20, x21, [sp, #16]
        ldp     x29, x30, [sp], #32
        ret

// ---------------------------------------------------------------------------
//  try_rotate: dreht um 90 Grad, mit einfachem Wall-Kick (0, +1, -1, +2, -2)
// ---------------------------------------------------------------------------
try_rotate:
        stp     x29, x30, [sp, #-48]!
        stp     x20, x21, [sp, #16]
        str     x22, [sp, #32]
        ldr     w20, [x19, #12]
        add     w20, w20, #1
        and     w20, w20, #3            // neue Rotation
        adr     x21, kicks
        mov     w22, #0
1:      ldrsb   w4, [x21, x22]
        ldr     w0, [x19, #0]
        add     w0, w0, w4
        ldr     w1, [x19, #4]
        ldr     w2, [x19, #8]
        mov     w3, w20
        bl      collide
        cbnz    w0, 2f
        ldrsb   w4, [x21, x22]          // passt: übernehmen
        ldr     w0, [x19, #0]
        add     w0, w0, w4
        str     w0, [x19, #0]
        str     w20, [x19, #12]
        b       3f
2:      add     w22, w22, #1
        cmp     w22, #5
        b.lt    1b
3:      ldr     x22, [sp, #32]
        ldp     x20, x21, [sp, #16]
        ldp     x29, x30, [sp], #48
        ret

// ---------------------------------------------------------------------------
//  hard_drop / do_lock / spawn
// ---------------------------------------------------------------------------
hard_drop:
        stp     x29, x30, [sp, #-16]!
1:      mov     w0, #0
        mov     w1, #1
        bl      try_move
        cbnz    w0, 1b
        bl      do_lock
        ldp     x29, x30, [sp], #16
        ret

do_lock:
        stp     x29, x30, [sp, #-16]!
        adr     x15, board
        bl      stamp                   // Stein ins Spielfeld einbrennen
        bl      clear_lines
        bl      spawn
        ldp     x29, x30, [sp], #16
        ret

spawn:
        stp     x29, x30, [sp, #-16]!
        ldr     w0, [x19, #16]          // next -> aktueller Stein
        str     w0, [x19, #8]
        bl      rand7
        str     w0, [x19, #16]
        mov     w0, #3
        str     w0, [x19, #0]           // px = 3
        str     wzr, [x19, #4]          // py = 0
        str     wzr, [x19, #12]         // rot = 0
        mov     w0, #3
        mov     w1, #0
        ldr     w2, [x19, #8]
        mov     w3, #0
        bl      collide
        str     w0, [x19, #32]          // Kollision beim Spawn = Game Over
        ldp     x29, x30, [sp], #16
        ret

// ---------------------------------------------------------------------------
//  clear_lines: volle Zeilen entfernen, Punkte / Level aktualisieren
// ---------------------------------------------------------------------------
clear_lines:
        adr     x13, board
        mov     w10, #0                 // Anzahl gelöschter Zeilen
        mov     w4, #19                 // y
1:      cmp     w4, #0
        b.lt    9f
        mov     w8, #10
        mul     w5, w4, w8              // Zeilen-Offset
        mov     w6, #0
2:      add     w7, w5, w6
        ldrb    w9, [x13, x7]
        cbz     w9, 4f                  // Lücke -> Zeile nicht voll
        add     w6, w6, #1
        cmp     w6, #10
        b.lt    2b
        add     w10, w10, #1            // Zeile ist voll
        mov     w6, w4                  // alle Zeilen darüber nach unten schieben
3:      cbz     w6, 5f
        mov     w8, #10
        mul     w7, w6, w8              // Ziel-Offset
        sub     w9, w6, #1
        mul     w9, w9, w8              // Quell-Offset
        mov     w11, #0
6:      add     w12, w9, w11
        ldrb    w14, [x13, x12]
        add     w12, w7, w11
        strb    w14, [x13, x12]
        add     w11, w11, #1
        cmp     w11, #10
        b.lt    6b
        sub     w6, w6, #1
        b       3b
5:      mov     w11, #0                 // oberste Zeile leeren
7:      strb    wzr, [x13, x11]
        add     w11, w11, #1
        cmp     w11, #10
        b.lt    7b
        b       1b                      // dieselbe Zeile nochmal prüfen
4:      sub     w4, w4, #1
        b       1b
9:      cbz     w10, 10f
        adr     x0, score_tbl
        ldr     w1, [x0, x10, lsl #2]   // Basispunkte für 1..4 Zeilen
        ldr     w2, [x19, #28]
        add     w2, w2, #1
        mul     w1, w1, w2              // mal (Level+1)
        ldr     w3, [x19, #20]
        add     w3, w3, w1
        str     w3, [x19, #20]
        ldr     w3, [x19, #24]
        add     w3, w3, w10
        str     w3, [x19, #24]
        mov     w4, #10
        udiv    w3, w3, w4              // Level = Zeilen / 10 (max. 15)
        mov     w5, #15
        cmp     w3, #15
        csel    w3, w3, w5, ls
        str     w3, [x19, #28]
10:     ret

// ---------------------------------------------------------------------------
//  Ausgabe-Helfer (schreiben in outbuf über x24)
// ---------------------------------------------------------------------------
put_str:                                // x0 = NUL-terminierter String
1:      ldrb    w1, [x0], #1
        cbz     w1, 2f
        strb    w1, [x24], #1
        b       1b
2:      ret

put_num:                                // w0 = Zahl, dezimal
        sub     sp, sp, #16
        mov     x2, sp
        add     x2, x2, #16             // Ende des Puffers
        mov     x3, x2
        mov     w4, #10
1:      udiv    w5, w0, w4
        msub    w6, w5, w4, w0
        add     w6, w6, #48
        sub     x3, x3, #1
        strb    w6, [x3]
        mov     w0, w5
        cbnz    w0, 1b
2:      cmp     x3, x2
        b.hs    3f
        ldrb    w6, [x3], #1
        strb    w6, [x24], #1
        b       2b
3:      add     sp, sp, #16
        ret

flush:                                  // outbuf .. x24 auf stdout schreiben
        adr     x1, outbuf
        sub     x2, x24, x1
        mov     x0, #1
        mov     x8, #SYS_WRITE
        svc     #0
        ret

// ---------------------------------------------------------------------------
//  render: kompletten Frame aufbauen und mit einem write() ausgeben
// ---------------------------------------------------------------------------
render:
        stp     x29, x30, [sp, #-32]!
        stp     x20, x21, [sp, #16]
        adr     x24, outbuf

        adr     x0, board               // Spielfeld nach "view" kopieren
        adr     x1, view
        mov     w2, #0
1:      ldrb    w3, [x0, x2]
        strb    w3, [x1, x2]
        add     w2, w2, #1
        cmp     w2, #200
        b.lt    1b
        adr     x15, view
        bl      stamp                   // aktuellen Stein darüberlegen

        adr     x0, s_home
        bl      put_str
        mov     w20, #0                 // y
.Lr_row:
        adr     x0, s_left
        bl      put_str
        mov     w21, #0                 // x
.Lr_col:
        mov     w1, #10
        madd    w1, w20, w1, w21
        adr     x2, view
        ldrb    w1, [x2, x1]
        adr     x0, cell_tbl
        add     x0, x0, x1, lsl #4
        bl      put_str
        add     w21, w21, #1
        cmp     w21, #10
        b.lt    .Lr_col
        adr     x0, s_right
        bl      put_str
        mov     w0, w20
        bl      panel                   // Seitenleiste (Score, Next, ...)
        adr     x0, s_eol
        bl      put_str
        add     w20, w20, #1
        cmp     w20, #20
        b.lt    .Lr_row

        adr     x0, s_bottom
        bl      put_str
        ldr     w0, [x19, #32]
        cbz     w0, .Lr_nogo
        adr     x0, s_over
        bl      put_str
.Lr_nogo:
        adr     x0, s_help
        bl      put_str
        bl      flush
        ldp     x20, x21, [sp, #16]
        ldp     x29, x30, [sp], #32
        ret

// ---------------------------------------------------------------------------
//  panel(w0 = Zeile y): Text rechts neben dem Spielfeld
// ---------------------------------------------------------------------------
panel:
        stp     x29, x30, [sp, #-32]!
        stp     x20, x21, [sp, #16]
        mov     w20, w0
        cmp     w20, #1
        b.eq    .Lp_score_l
        cmp     w20, #2
        b.eq    .Lp_score_v
        cmp     w20, #4
        b.eq    .Lp_lines_l
        cmp     w20, #5
        b.eq    .Lp_lines_v
        cmp     w20, #7
        b.eq    .Lp_level_l
        cmp     w20, #8
        b.eq    .Lp_level_v
        cmp     w20, #10
        b.eq    .Lp_next_l
        sub     w0, w20, #12
        cmp     w0, #4
        b.lo    .Lp_next_row
        b       .Lp_done
.Lp_score_l:
        adr     x0, s_score
        bl      put_str
        b       .Lp_done
.Lp_score_v:
        ldr     w0, [x19, #20]
        bl      put_num
        b       .Lp_done
.Lp_lines_l:
        adr     x0, s_lines
        bl      put_str
        b       .Lp_done
.Lp_lines_v:
        ldr     w0, [x19, #24]
        bl      put_num
        b       .Lp_done
.Lp_level_l:
        adr     x0, s_level
        bl      put_str
        b       .Lp_done
.Lp_level_v:
        ldr     w0, [x19, #28]
        add     w0, w0, #1
        bl      put_num
        b       .Lp_done
.Lp_next_l:
        adr     x0, s_next
        bl      put_str
        b       .Lp_done
.Lp_next_row:                           // w0 = Zeile 0..3 der Vorschau
        mov     w21, w0
        ldr     w0, [x19, #16]
        mov     w1, #0
        bl      get_mask
        mov     w2, w0                  // Maske
        mov     w3, #0                  // Spalte
        ldr     w4, [x19, #16]
        add     w4, w4, #1              // Farbe
.Lp_c:
        lsl     w5, w21, #2
        add     w5, w5, w3
        lsr     w6, w2, w5
        tbz     w6, #0, .Lp_blank
        adr     x0, cell_tbl
        add     x0, x0, x4, lsl #4
        b       .Lp_put
.Lp_blank:
        adr     x0, s_blank
.Lp_put:
        bl      put_str
        add     w3, w3, #1
        cmp     w3, #4
        b.lt    .Lp_c
.Lp_done:
        ldp     x20, x21, [sp, #16]
        ldp     x29, x30, [sp], #32
        ret

// ============================================================================
//  Daten
// ============================================================================
        .data
        .balign 4
// Steine als 4x4-Bitmasken (Bit = Zeile*4 + Spalte): I O T S Z J L
pieces:     .hword  0x00F0, 0x0660, 0x0072, 0x0036, 0x0063, 0x0071, 0x0074
kicks:      .byte   0, 1, -1, 2, -2
            .balign 4
score_tbl:  .word   0, 100, 300, 500, 800

s_init:     .asciz  "\033[2J\033[?25l"
s_exit:     .asciz  "\r\n\033[?25h\033[0m"
s_home:     .asciz  "\033[H\033[1m  ARM64 TETRIS\033[0m\033[K\r\n  +--------------------+\033[K\r\n"
s_left:     .asciz  "  |"
s_right:    .asciz  "|  "
s_eol:      .asciz  "\033[K\r\n"
s_bottom:   .asciz  "  +--------------------+\033[K\r\n"
s_score:    .asciz  "SCORE"
s_lines:    .asciz  "LINES"
s_level:    .asciz  "LEVEL"
s_next:     .asciz  "NEXT"
s_blank:    .asciz  "  "
s_over:     .asciz  "\033[1;31m  GAME OVER!\033[0m\033[K\r\n"
s_help:     .asciz  "  A/D links/rechts  W drehen  S runter  LEERTASTE drop  R neu  Q ende\033[K"

// Zellen-Darstellung (je 16 Byte): 0 = leer, 1..7 = Farben der Steine
            .balign 16
cell_tbl:   .asciz  "\033[90m .\033[0m"
            .balign 16
            .asciz  "\033[41m  \033[0m"
            .balign 16
            .asciz  "\033[42m  \033[0m"
            .balign 16
            .asciz  "\033[43m  \033[0m"
            .balign 16
            .asciz  "\033[44m  \033[0m"
            .balign 16
            .asciz  "\033[45m  \033[0m"
            .balign 16
            .asciz  "\033[46m  \033[0m"
            .balign 16
            .asciz  "\033[47m  \033[0m"

        .bss
        .balign 16
state:      .skip   64
board:      .skip   200                 // 10 x 20 Zellen
view:       .skip   200
term_orig:  .skip   64
term_new:   .skip   64
keybuf:     .skip   16
outbuf:     .skip   8192
