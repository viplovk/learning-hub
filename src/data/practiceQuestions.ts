import { PracticeQuestion } from '../types';

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'pq-01',
    subjectId: 'kcs301',
    topicId: 'ds-stack-appl',
    topicName: 'Stack & Applications (Infix to Postfix)',
    type: 'MCQ',
    question: 'Which of the following data structures is most suitable for evaluating arithmetic expressions and syntax parsing in compilers?',
    options: ['Queue', 'Stack', 'Array', 'Binary Tree'],
    correctOptionIndex: 1,
    explanation: 'A Stack follows the Last In First Out (LIFO) property, which naturally aligns with nested parentheses and operator precedence evaluations.',
    difficulty: 'EASY',
    marks: 2
  },
  {
    id: 'pq-02',
    subjectId: 'kcs301',
    topicId: 'ds-circular-queue',
    topicName: 'Circular Queue',
    type: 'MCQ',
    question: 'In a circular queue of capacity 6 elements, if rear = 4 and front = 0, what is the value of (rear + 1) % MAX, and is the queue full?',
    options: ['5, No it is not full', '0, Yes it is full', '4, No it is not full', '1, Yes it is full'],
    correctOptionIndex: 0,
    explanation: '(4 + 1) % 6 = 5. Since 5 != front (0), slot 5 is available and the queue is not yet full.',
    difficulty: 'MEDIUM',
    marks: 2
  },
  {
    id: 'pq-03',
    subjectId: 'kcs302',
    topicId: 'coa-booth-algo',
    topicName: "Booth's Algorithm",
    type: 'MCQ',
    question: "During an iteration of Booth's algorithm, if the pair (Q0, Q_n+1) is 10, which arithmetic operation is carried out?",
    options: ['A = A + M', 'A = A - M', 'Only Arithmetic Right Shift', 'A = A * M'],
    correctOptionIndex: 1,
    explanation: 'The transition 10 indicates the beginning of a run of 1s in the multiplier, requiring subtraction of the multiplicand M (A = A - M).',
    difficulty: 'MEDIUM',
    marks: 2
  },
  {
    id: 'pq-04',
    subjectId: 'kcs302',
    topicId: 'coa-cache-mapping',
    topicName: 'Cache Memory Mapping',
    type: 'MCQ',
    question: 'How many comparator circuits are needed in an 8-way set-associative cache to search for a tag simultaneously?',
    options: ['1', '8', '64', 'Equal to total cache lines'],
    correctOptionIndex: 1,
    explanation: 'In an 8-way set-associative cache, there are 8 lines per set. Therefore, exactly 8 comparators are needed to check tags across all 8 lines in the set in parallel.',
    difficulty: 'HARD',
    marks: 2
  },
  {
    id: 'pq-05',
    subjectId: 'bcc301',
    topicId: 'csec-cia-triad',
    topicName: 'CIA Triad & Threats Classification',
    type: 'MCQ',
    question: 'A malicious user intercepts and alters the amount field of a wire transfer before it reaches the recipient. Which security pillar is breached?',
    options: ['Availability', 'Confidentiality', 'Integrity', 'Non-repudiation'],
    correctOptionIndex: 2,
    explanation: 'Integrity guarantees that information is accurate and unaltered during transit or storage. Unauthorized tampering directly violates integrity.',
    difficulty: 'EASY',
    marks: 2
  },
  {
    id: 'pq-06',
    subjectId: 'bcc301',
    topicId: 'csec-it-act-2000',
    topicName: 'Indian IT Act 2000 & Key Penal Sections',
    type: 'MCQ',
    question: 'Under which section of the Indian Information Technology Act 2000 is Identity Theft specifically penalized?',
    options: ['Section 43', 'Section 65', 'Section 66C', 'Section 67'],
    correctOptionIndex: 2,
    explanation: 'Section 66C prescribes punishment for identity theft (fraudulent use of password, electronic signature, or unique identification feature) up to 3 years imprisonment and fine up to 1 lakh rupees.',
    difficulty: 'MEDIUM',
    marks: 2
  },
  {
    id: 'pq-07',
    subjectId: 'kas302',
    topicId: 'm4-lagrange-pde',
    topicName: "Lagrange's Linear PDE",
    type: 'MCQ',
    question: "In solving Lagrange's linear PDE Pp + Qq = R, what condition must chosen multipliers (l, m, n) satisfy?",
    options: ['lP + mQ + nR = 1', 'lP + mQ + nR = 0', 'l + m + n = 0', 'l*m*n = P*Q*R'],
    correctOptionIndex: 1,
    explanation: 'Multipliers must be selected such that lP + mQ + nR = 0, which makes l*dx + m*dy + n*dz = 0, directly yielding an integrable differential equation.',
    difficulty: 'MEDIUM',
    marks: 2
  }
];
