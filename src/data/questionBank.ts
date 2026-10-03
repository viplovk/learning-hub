import { QuestionBankItem } from '../types';

export const QUESTION_BANK: QuestionBankItem[] = [
  // DATA STRUCTURES (KCS-301)
  {
    id: 'qb-ds-01',
    subjectId: 'kcs301',
    unitNumber: 1,
    topicId: 'ds-stack-appl',
    topicName: 'Stack & Applications (Infix to Postfix)',
    question: 'Convert the following infix expression to postfix notation showing stack status at each step: (A + B * C) / (D - E ^ F * G)',
    marks: 10,
    year: '2023-24',
    frequency: 6,
    difficulty: 'HARD',
    type: 'ALGORITHM',
    isPYQ: true,
    modelAnswer: `Step-by-step conversion of Infix: (A + B * C) / (D - E ^ F * G)

1. Precedence table: ^ (highest, R-to-L) > *, / (L-to-R) > +, - (L-to-R).
2. Scan tokens:
   - '(' -> Push to stack: [(]
   - 'A' -> Output: A
   - '+' -> Push to stack: [(, +]
   - 'B' -> Output: A B
   - '*' -> Push to stack (* > +): [(, +, *]
   - 'C' -> Output: A B C
   - ')' -> Pop until '(': Pop *, Pop + -> Output: A B C * +; Pop and discard '('
   - '/' -> Push to stack: [/]
   - '(' -> Push to stack: [/, (]
   - 'D' -> Output: A B C * + D
   - '-' -> Push: [/, (, -]
   - 'E' -> Output: A B C * + D E
   - '^' -> Push: [/, (, -, ^]
   - 'F' -> Output: A B C * + D E F
   - '*' -> Pop ^ (higher precedence than *), push * -> Output: A B C * + D E F ^; Stack: [/, (, -, *]
   - 'G' -> Output: A B C * + D E F ^ G
   - ')' -> Pop until '(': Pop *, Pop - -> Output: A B C * + D E F ^ G * -; Discard '('
3. End of string: Pop remaining operators:
   - Pop '/' -> Final Output: A B C * + D E F ^ G * - /

Result: A B C * + D E F ^ G * - /`,
    markingScheme: [
      '2 marks: Correct precedence and associativity table stated',
      '5 marks: Accurate intermediate stack status tabular representation',
      '3 marks: Correct final postfix string'
    ]
  },
  {
    id: 'qb-ds-02',
    subjectId: 'kcs301',
    unitNumber: 1,
    topicId: 'ds-circular-queue',
    topicName: 'Circular Queue',
    question: 'State the overflow and underflow conditions for a circular queue implemented using an array of size MAX.',
    marks: 2,
    year: '2022-23',
    frequency: 9,
    difficulty: 'EASY',
    type: 'SHORT',
    isPYQ: true,
    modelAnswer: `Overflow condition:
((rear + 1) % MAX == front)
or equivalently: (front == 0 && rear == MAX - 1) || (front == rear + 1)

Underflow condition:
(front == -1) && (rear == -1)`,
    markingScheme: [
      '1 mark: Correct overflow modulo formula',
      '1 mark: Correct underflow reset condition'
    ]
  },
  {
    id: 'qb-ds-03',
    subjectId: 'kcs301',
    unitNumber: 3,
    topicId: 'ds-avl-trees',
    topicName: 'AVL Trees & Balancing Rotations',
    question: 'Define AVL tree. Insert following numbers into an initially empty AVL tree: 14, 17, 11, 7, 53, 4, 13 and specify required rotations.',
    marks: 10,
    year: '2023-24',
    frequency: 8,
    difficulty: 'HARD',
    type: 'LONG',
    isPYQ: true,
    modelAnswer: `Definition: An AVL tree is a height-balanced Binary Search Tree in which the balance factor of every node is strictly -1, 0, or +1. Balance Factor = Height(Left Subtree) - Height(Right Subtree).

Insertions:
1. Insert 14: Root, BF=0.
2. Insert 17: Right child of 14. BF(14) = -1.
3. Insert 11: Left child of 14. Tree balanced: BF(14)=0, BF(11)=0, BF(17)=0.
4. Insert 7: Left child of 11. BF(14)=+1, BF(11)=+1.
5. Insert 53: Right child of 17. BF(14)=0.
6. Insert 4: Left of 7. Path from unbalanced node 11 is 11 -> 7 -> 4 (LL case, BF(11)=+2).
   Perform LL (Right) Rotation at 11:
   Node 7 becomes left child of 14 with children 4 and 11.
7. Insert 13: Right child of 11. Balance factors checked:
   Root 14: Left height = 3 (7->11->13), Right height = 2 (17->53). BF(14) = 3 - 2 = +1.
   Tree is balanced!`,
    markingScheme: [
      '2 marks: Precise AVL definition and BF formula',
      '6 marks: Step-by-step tree drawings after each insertion',
      '2 marks: Proper identification and execution of LL rotation'
    ]
  },
  {
    id: 'qb-ds-04',
    subjectId: 'kcs301',
    unitNumber: 4,
    topicId: 'ds-dijkstra',
    topicName: "Dijkstra's Shortest Path",
    question: "Why does Dijkstra's algorithm fail when a graph contains negative weight edges?",
    marks: 5,
    year: '2022-23',
    frequency: 7,
    difficulty: 'MEDIUM',
    type: 'SHORT',
    isPYQ: true,
    modelAnswer: `Dijkstra's algorithm is based on a Greedy choice property: once a vertex u with the smallest distance is selected and marked as visited/finalized, Dijkstra assumes that no shorter path to u can ever be found later.

However, if an edge with a negative weight exists elsewhere in the graph:
1. A path that is currently longer could later pass through a large negative edge, resulting in an overall smaller total path cost.
2. Because Dijkstra never re-checks or un-finalizes previously finalized vertices, it will fail to update this path.
3. In case of negative weight cycles, total path cost approaches negative infinity.

To solve shortest paths with negative weights, the Bellman-Ford algorithm must be used (time complexity O(V*E)).`,
    markingScheme: [
      '2 marks: Greedy assumption explanation (finalized vertices never re-evaluated)',
      '2 marks: Counter-example illustration of negative edge reducing past distance',
      '1 mark: Naming Bellman-Ford as the correct alternative'
    ]
  },

  // COMPUTER ORGANIZATION & ARCHITECTURE (KCS-302)
  {
    id: 'qb-coa-01',
    subjectId: 'kcs302',
    unitNumber: 3,
    topicId: 'coa-booth-algo',
    topicName: "Booth's Algorithm",
    question: "Multiply (-7) by (+3) using Booth's multiplication algorithm in 5-bit signed 2's complement representation. Show full register contents at each step.",
    marks: 10,
    year: '2023-24',
    frequency: 10,
    difficulty: 'HARD',
    type: 'ALGORITHM',
    isPYQ: true,
    modelAnswer: `Inputs in 5-bit 2's complement:
Multiplicand M = -7 -> +7 = 00111 -> 2's comp = 11001
-M = +7 = 00111
Multiplier Q = +3 = 00011
Initial: A = 00000, Q = 00011, Q_n+1 = 0, Count = 5

Iteration 1:
- (Q0, Q_n+1) = (1, 0) -> A = A - M = A + (-M) = 00000 + 00111 = 00111
- ASR [A, Q, Q_n+1]: A = 00011, Q = 10001, Q_n+1 = 1, Count = 4

Iteration 2:
- (Q0, Q_n+1) = (1, 1) -> No addition.
- ASR: A = 00001, Q = 11000, Q_n+1 = 1, Count = 3

Iteration 3:
- (Q0, Q_n+1) = (0, 1) -> A = A + M = 00001 + 11001 = 11010
- ASR: A = 11101, Q = 01100, Q_n+1 = 0, Count = 2

Iteration 4:
- (Q0, Q_n+1) = (0, 0) -> No addition.
- ASR: A = 11110, Q = 10110, Q_n+1 = 0, Count = 1

Iteration 5:
- (Q0, Q_n+1) = (0, 0) -> No addition.
- ASR: A = 11111, Q = 01011, Q_n+1 = 0, Count = 0. STOP.

Final Result [A, Q]: 1111101011
Verification: MSB is 1 (negative). 2's complement of 1111101011 = 0000010101 = 21 in decimal.
Result = -21. (-7 * 3 = -21). Exactly correct!`,
    markingScheme: [
      '2 marks: Correct 5-bit representation of M, -M, Q and initialization',
      '6 marks: Exact cycle-by-cycle tabular trace with ASR',
      '2 marks: Correct decimal verification and sign check'
    ]
  },
  {
    id: 'qb-coa-02',
    subjectId: 'kcs302',
    unitNumber: 4,
    topicId: 'coa-cache-mapping',
    topicName: 'Cache Memory Mapping',
    question: 'A computer system has 16KB 4-way set-associative cache with 64-byte block size. Main memory size is 256MB. Determine the size of Tag, Set Index, and Word Offset fields.',
    marks: 5,
    year: '2022-23',
    frequency: 8,
    difficulty: 'MEDIUM',
    type: 'NUMERICAL',
    isPYQ: true,
    modelAnswer: `Given:
Main Memory = 256MB = 2^8 * 2^20 bytes = 2^28 bytes -> Physical Address = 28 bits.
Block Size = 64 bytes = 2^6 bytes -> Word/Byte Offset = 6 bits.
Cache Size = 16KB = 16 * 1024 = 16384 bytes = 2^14 bytes.

Calculations:
1. Total cache lines = Cache Size / Block Size = 16384 / 64 = 256 lines.
2. Number of sets = Total lines / Associativity = 256 / 4 = 64 sets = 2^6 sets.
3. Set Index bits = 6 bits.
4. Word Offset bits = 6 bits.
5. Tag bits = Total Address bits - (Set Index bits + Word Offset bits)
             = 28 - (6 + 6) = 28 - 12 = 16 bits.

Format: [Tag: 16 bits | Set Index: 6 bits | Word Offset: 6 bits]`,
    markingScheme: [
      '1 mark: Total physical address calculation (28 bits)',
      '1 mark: Word offset calculation (6 bits)',
      '2 marks: Number of sets and Set Index calculation (6 bits)',
      '1 mark: Final Tag bits (16 bits) and format diagram'
    ]
  },

  // CYBER SECURITY (BCC-301)
  {
    id: 'qb-csec-01',
    subjectId: 'bcc301',
    unitNumber: 1,
    topicId: 'csec-cia-triad',
    topicName: 'CIA Triad & Threats Classification',
    question: 'Explain the CIA Triad in Cyber Security with real-life examples and defense mechanisms for each.',
    marks: 10,
    year: '2023-24',
    frequency: 10,
    difficulty: 'MEDIUM',
    type: 'LONG',
    isPYQ: true,
    modelAnswer: `The CIA Triad constitutes the foundational pillars of information security:

1. CONFIDENTIALITY:
- Meaning: Ensuring information is accessible only to those authorized to have access.
- Real-life breach: Data exfiltration of credit card numbers or medical records.
- Defensive Controls: Symmetric & Asymmetric encryption (AES-256, RSA), Role-Based Access Control (RBAC), Multi-Factor Authentication (MFA), Data masking.

2. INTEGRITY:
- Meaning: Maintaining the consistency, accuracy, and trustworthiness of data over its entire lifecycle without unauthorized alteration.
- Real-life breach: Man-in-the-Middle altering bank account recipient digits during money transfer.
- Defensive Controls: Cryptographic hash functions (SHA-256), Digital Signatures, Message Authentication Codes (MAC), Version control, Audit logging.

3. AVAILABILITY:
- Meaning: Ensuring authorized users have uninterrupted access to information and resources when required.
- Real-life breach: Distributed Denial of Service (DDoS) flood taking down an online examination or railway booking portal.
- Defensive Controls: Redundant server clusters, Load balancing, Off-site backups, Disaster recovery sites, DDoS mitigation services (Cloudflare/Akamai).`,
    markingScheme: [
      '3 marks: Detailed explanation of Confidentiality with controls and breach example',
      '3 marks: Detailed explanation of Integrity with controls and breach example',
      '3 marks: Detailed explanation of Availability with controls and breach example',
      '1 mark: Clear neat CIA Triad triangular architecture diagram'
    ]
  },
  {
    id: 'qb-csec-02',
    subjectId: 'bcc301',
    unitNumber: 4,
    topicId: 'csec-it-act-2000',
    topicName: 'Indian IT Act 2000 & Key Penal Sections',
    question: 'Discuss the penalties and provisions of Section 66 (Hacking) and Section 66C (Identity Theft) under the Indian IT Act 2000.',
    marks: 5,
    year: '2022-23',
    frequency: 8,
    difficulty: 'MEDIUM',
    type: 'SHORT',
    isPYQ: true,
    modelAnswer: `Provisions under Indian Information Technology Act 2000:

1. SECTION 66: Computer Related Offenses (Hacking):
- Provision: If any person dishonestly or fraudulently commits any act referred to in Section 43 (such as accessing computer without permission, damaging data, introducing malware).
- Penalty: Imprisonment for a term which may extend up to three years, or with fine which may extend up to five lakh rupees, or with both.

2. SECTION 66C: Identity Theft:
- Provision: Whoever fraudulently or dishonestly makes use of the electronic signature, password, or any other unique identification feature of any other person.
- Penalty: Imprisonment of either description for a term which may extend up to three years, and shall also be liable to fine which may extend to one lakh rupees.`,
    markingScheme: [
      '2.5 marks: Section 66 offense description and exact imprisonment/fine',
      '2.5 marks: Section 66C offense description and exact imprisonment/fine'
    ]
  },

  // MATHEMATICS-IV (KAS-302)
  {
    id: 'qb-m4-01',
    subjectId: 'kas302',
    unitNumber: 1,
    topicId: 'm4-lagrange-pde',
    topicName: "Lagrange's Linear PDE",
    question: "Solve the partial differential equation: (y^2 + z^2)p - xy q + xz = 0.",
    marks: 10,
    year: '2023-24',
    frequency: 7,
    difficulty: 'HARD',
    type: 'LONG',
    isPYQ: true,
    modelAnswer: `Given PDE: (y^2 + z^2)p - xy q = -xz
Standard form Pp + Qq = R:
P = y^2 + z^2, Q = -xy, R = -xz.

Auxiliary equations:
dx / (y^2 + z^2) = dy / (-xy) = dz / (-xz)

Integral 1:
Take last two fractions: dy / (-xy) = dz / (-xz)
-> dy / y = dz / z (dividing both by -x)
-> ln(y) = ln(z) + ln(c1)
-> y / z = c1  or  y = c1 * z  [Solution 1: u = y/z]

Integral 2:
Use multipliers (x, y, z):
Denominator = x(y^2 + z^2) + y(-xy) + z(-xz) = x y^2 + x z^2 - x y^2 - x z^2 = 0.
Since denominator = 0, numerator must equal 0:
x dx + y dy + z dz = 0
Integrating:
x^2/2 + y^2/2 + z^2/2 = c2/2
-> x^2 + y^2 + z^2 = c2  [Solution 2: v = x^2 + y^2 + z^2]

General Solution:
phi(y/z, x^2 + y^2 + z^2) = 0  or  x^2 + y^2 + z^2 = f(y/z).`,
    markingScheme: [
      '2 marks: Correct formulation of auxiliary equations',
      '3 marks: Finding first integral u = y/z via grouping',
      '3 marks: Finding second integral v = x^2 + y^2 + z^2 via multipliers (x, y, z)',
      '2 marks: Stating correct general solution in phi(u, v) = 0 form'
    ]
  }
];
