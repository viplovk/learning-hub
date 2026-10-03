import { Flashcard } from '../types';

export const DEFAULT_FLASHCARDS: Flashcard[] = [
  // DATA STRUCTURES
  {
    id: 'fc-ds-01',
    subjectId: 'kcs301',
    unitId: 'kcs301-u1',
    topicId: 'ds-circular-queue',
    front: 'What is the exact Overflow condition for a Circular Queue of size MAX?',
    back: '((rear + 1) % MAX == front). This checks if advancing the rear pointer by one step wraps around to meet the front pointer.',
    type: 'FORMULA',
    hint: 'Think modulo arithmetic with MAX',
    box: 1,
    reviewCount: 0
  },
  {
    id: 'fc-ds-02',
    subjectId: 'kcs301',
    unitId: 'kcs301-u3',
    topicId: 'ds-avl-trees',
    front: 'What are the permissible Balance Factor values in an AVL Tree?',
    back: 'Strictly -1, 0, or +1. Balance Factor = Height(Left Subtree) - Height(Right Subtree). If |BF| > 1, the node is unbalanced and requires rotation.',
    type: 'DEFINITION',
    hint: 'Three consecutive integers centered at zero',
    box: 1,
    reviewCount: 0
  },
  {
    id: 'fc-ds-03',
    subjectId: 'kcs301',
    unitId: 'kcs301-u3',
    topicId: 'ds-avl-trees',
    front: 'Which rotation is performed for an LR imbalance in an AVL tree?',
    back: 'A double rotation: first a LEFT rotation on the left child, followed by a RIGHT rotation on the unbalanced root node.',
    type: 'ALGORITHM',
    hint: 'Left on child, Right on parent',
    box: 1,
    reviewCount: 0
  },
  {
    id: 'fc-ds-04',
    subjectId: 'kcs301',
    unitId: 'kcs301-u5',
    topicId: 'ds-sorting-quick-merge',
    front: 'Compare worst-case time complexity and auxiliary space of Quick Sort vs Merge Sort.',
    back: 'Quick Sort: Worst-case Time = O(N^2), Auxiliary Space = O(log N) stack.\nMerge Sort: Worst-case Time = O(N log N), Auxiliary Space = O(N) array.',
    type: 'DIFFERENCE',
    hint: 'One is O(N^2) in worst case, one needs O(N) extra space',
    box: 2,
    reviewCount: 1
  },
  {
    id: 'fc-ds-05',
    subjectId: 'kcs301',
    unitId: 'kcs301-u4',
    topicId: 'ds-dijkstra',
    front: 'Under what condition does Dijkstra algorithm fail?',
    back: 'When the graph contains negative edge weights (or negative weight cycles), because its greedy choice assumes finalized vertices can never have their shortest paths reduced later.',
    type: 'CONCEPT',
    hint: 'Look at edge weight sign',
    box: 1,
    reviewCount: 0
  },

  // COA
  {
    id: 'fc-coa-01',
    subjectId: 'kcs302',
    unitId: 'kcs302-u3',
    topicId: 'coa-booth-algo',
    front: "In Booth's algorithm, what microoperation is performed when (Q0, Q_n+1) is 10?",
    back: 'A = A - M (Accumulator minus Multiplicand), followed by an Arithmetic Right Shift (ASR) on [A, Q, Q_n+1].',
    type: 'ALGORITHM',
    hint: 'Subtract then shift',
    box: 1,
    reviewCount: 0
  },
  {
    id: 'fc-coa-02',
    subjectId: 'kcs302',
    unitId: 'kcs302-u3',
    topicId: 'coa-booth-algo',
    front: "In Booth's algorithm, what microoperation is performed when (Q0, Q_n+1) is 01?",
    back: 'A = A + M (Accumulator plus Multiplicand), followed by an Arithmetic Right Shift (ASR) on [A, Q, Q_n+1].',
    type: 'ALGORITHM',
    hint: 'Add then shift',
    box: 1,
    reviewCount: 0
  },
  {
    id: 'fc-coa-03',
    subjectId: 'kcs302',
    unitId: 'kcs302-u4',
    topicId: 'coa-cache-mapping',
    front: 'What is the difference between Write-Through and Write-Back cache policies?',
    back: 'Write-Through: Data is updated simultaneously in BOTH cache and main memory on every write (slower, but memory always consistent).\nWrite-Back: Data is updated ONLY in cache; main memory is updated only when the dirty cache line is evicted (faster, needs dirty bit).',
    type: 'DIFFERENCE',
    hint: 'Simultaneous write vs delayed write with dirty bit',
    box: 2,
    reviewCount: 1
  },
  {
    id: 'fc-coa-04',
    subjectId: 'kcs302',
    unitId: 'kcs302-u5',
    topicId: 'coa-dma-controller',
    front: 'What is Cycle Stealing in Direct Memory Access (DMA)?',
    back: 'The DMA controller takes over the system bus for just ONE single memory cycle (word transfer) between CPU machine cycles, then yields the bus back so the CPU is never completely frozen.',
    type: 'CONCEPT',
    hint: 'Steals one cycle at a time',
    box: 1,
    reviewCount: 0
  },
  {
    id: 'fc-coa-05',
    subjectId: 'kcs302',
    unitId: 'kcs302-u2',
    topicId: 'coa-addressing-modes',
    front: 'How is the Effective Address calculated in Relative Addressing Mode?',
    back: 'Effective Address (EA) = Program Counter (PC) + Address Field of Instruction. It is commonly used for branch instructions to allow position-independent code.',
    type: 'FORMULA',
    hint: 'PC + offset',
    box: 1,
    reviewCount: 0
  },

  // CYBER SECURITY
  {
    id: 'fc-csec-01',
    subjectId: 'bcc301',
    unitId: 'bcc301-u1',
    topicId: 'csec-cia-triad',
    front: 'What are the three pillars of the CIA Triad in Information Security?',
    back: '1. Confidentiality (shielding data from unauthorized disclosure)\n2. Integrity (preventing unauthorized modification)\n3. Availability (guaranteeing timely authorized access)',
    type: 'DEFINITION',
    hint: 'C, I, A',
    box: 3,
    reviewCount: 2
  },
  {
    id: 'fc-csec-02',
    subjectId: 'bcc301',
    unitId: 'bcc301-u1',
    topicId: 'csec-crypto-basics',
    front: 'Why is asymmetric cryptography 1000x slower than symmetric cryptography?',
    back: 'Asymmetric cryptography relies on computationally heavy mathematical operations like large prime modular exponentiation (RSA) or elliptic curve point multiplication, whereas symmetric algorithms (AES) use fast bitwise shifts, substitutions (S-box), and XOR permutations.',
    type: 'CONCEPT',
    hint: 'Complex math vs bitwise operations',
    box: 2,
    reviewCount: 1
  },
  {
    id: 'fc-csec-03',
    subjectId: 'bcc301',
    unitId: 'bcc301-u4',
    topicId: 'csec-it-act-2000',
    front: 'What is Section 66 of the Indian Information Technology Act 2000?',
    back: 'Deals with Computer Related Offenses (Hacking). Prescribes punishment of imprisonment up to 3 years, or fine up to Rs 5 lakh, or both for dishonestly or fraudulently tampering with computer systems.',
    type: 'EXAM_QUESTION',
    hint: 'Hacking penalty: 3 years / 5 lakh',
    box: 1,
    reviewCount: 0
  },

  // MATHEMATICS-IV
  {
    id: 'fc-m4-01',
    subjectId: 'kas302',
    unitId: 'kas302-u1',
    topicId: 'm4-lagrange-pde',
    front: "Write Lagrange's auxiliary equations for the first-order PDE Pp + Qq = R.",
    back: 'dx / P = dy / Q = dz / R. From these, two independent solutions u(x,y,z)=c1 and v(x,y,z)=c2 are found to yield phi(u, v) = 0.',
    type: 'FORMULA',
    hint: 'dx/P = dy/Q = dz/R',
    box: 2,
    reviewCount: 1
  },
  {
    id: 'fc-m4-02',
    subjectId: 'kas302',
    unitId: 'kas302-u4',
    topicId: 'm4-normal-dist',
    front: 'What is the formula for the Standard Normal Variate Z?',
    back: 'Z = (X - mu) / sigma, where mu is the mean and sigma is the standard deviation. The standardized normal distribution has mean = 0 and variance = 1.',
    type: 'FORMULA',
    hint: '(Value - Mean) / StdDev',
    box: 3,
    reviewCount: 2
  },

  // DISCRETE STRUCTURES (DSTL)
  {
    id: 'fc-dstl-01',
    subjectId: 'kcs303',
    unitId: 'kcs303-u1',
    topicId: 'dstl-hasse-diagram',
    front: 'What three properties define a Partial Order Relation (Poset)?',
    back: '1. Reflexive: (a, a) in R for all a in S\n2. Antisymmetric: If (a, b) in R and (b, a) in R, then a = b\n3. Transitive: If (a, b) in R and (b, c) in R, then (a, c) in R',
    type: 'DEFINITION',
    hint: 'Reflexive, Antisymmetric, Transitive',
    box: 2,
    reviewCount: 1
  }
];
