export interface FormulaItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  topicName: string;
  title: string;
  formula: string;
  variables: { name: string; meaning: string }[];
  notes: string;
}

export interface DefinitionItem {
  id: string;
  subjectCode: string;
  term: string;
  definition: string;
  context: string;
  example?: string;
}

export const FORMULA_BANK: FormulaItem[] = [
  {
    id: 'f-01',
    subjectCode: 'KCS-301',
    subjectName: 'Data Structures',
    topicName: 'Circular Queue',
    title: 'Circular Queue Overflow Condition',
    formula: '(rear + 1) % MAX == front',
    variables: [
      { name: 'rear', meaning: 'Index of the last inserted element' },
      { name: 'front', meaning: 'Index of the first element to be removed' },
      { name: 'MAX', meaning: 'Total capacity of the queue array' }
    ],
    notes: 'Wraps around the array to prevent false overflow.'
  },
  {
    id: 'f-02',
    subjectCode: 'KCS-301',
    subjectName: 'Data Structures',
    topicName: 'AVL Tree',
    title: 'AVL Tree Balance Factor',
    formula: 'BF = Height(Left Subtree) - Height(Right Subtree)',
    variables: [
      { name: 'BF', meaning: 'Balance factor (must strictly be in {-1, 0, +1})' },
      { name: 'Height', meaning: 'Number of edges on longest path to a leaf' }
    ],
    notes: 'If |BF| > 1, tree is unbalanced and requires LL, RR, LR, or RL rotation.'
  },
  {
    id: 'f-03',
    subjectCode: 'KCS-302',
    subjectName: 'Computer Organization & Architecture',
    topicName: 'Cache Memory',
    title: 'Set-Associative Cache Index Calculation',
    formula: 'Number of Sets = (Total Cache Lines) / (Associativity k)',
    variables: [
      { name: 'k', meaning: 'Lines per set (e.g. 2, 4, 8)' },
      { name: 'Index Bits', meaning: 'log2(Number of Sets)' }
    ],
    notes: 'Physical Address format is [Tag | Set Index | Word Offset].'
  },
  {
    id: 'f-04',
    subjectCode: 'KAS-302',
    subjectName: 'Mathematics-IV',
    topicName: 'Lagrange PDE',
    title: "Lagrange's Auxiliary Equations",
    formula: 'dx / P = dy / Q = dz / R',
    variables: [
      { name: 'P, Q, R', meaning: 'Coefficients of p, q, and independent term in Pp + Qq = R' },
      { name: 'p, q', meaning: 'p = dz/dx, q = dz/dy' }
    ],
    notes: 'Solved using either grouping or method of multipliers (l, m, n) such that lP + mQ + nR = 0.'
  },
  {
    id: 'f-05',
    subjectCode: 'KAS-302',
    subjectName: 'Mathematics-IV',
    topicName: 'Normal Distribution',
    title: 'Standard Normal Variate (Z-Score)',
    formula: 'Z = (X - mu) / sigma',
    variables: [
      { name: 'X', meaning: 'Observed random variable value' },
      { name: 'mu', meaning: 'Population mean' },
      { name: 'sigma', meaning: 'Standard deviation' }
    ],
    notes: 'Normalizes arbitrary normal distribution into N(0, 1) with standard error area lookup.'
  }
];

export const DEFINITION_BANK: DefinitionItem[] = [
  {
    id: 'd-01',
    subjectCode: 'KCS-301',
    term: 'LIFO (Last In First Out)',
    definition: 'A data storage discipline where the most recently added item is the first one removed.',
    context: 'Stacks, function call frames, undo/redo buffers.',
    example: 'A stack of dinner plates.'
  },
  {
    id: 'd-02',
    subjectCode: 'KCS-301',
    term: 'In-Place Algorithm',
    definition: 'An algorithm that transforms input using no auxiliary memory, or a tiny constant amount of extra memory (O(1) additional space).',
    context: 'Quick Sort partitioning, Linked list reversal.',
    example: 'Reversing a linked list with three pointers.'
  },
  {
    id: 'd-03',
    subjectCode: 'KCS-302',
    term: 'Effective Address (EA)',
    definition: 'The final physical memory address of the operand computed by the processor according to the instruction addressing mode.',
    context: 'Direct, Indirect, Relative, Indexed addressing modes.'
  },
  {
    id: 'd-04',
    subjectCode: 'BCC-301',
    term: 'Non-Repudiation',
    definition: 'The assurance that an individual or entity cannot deny the authenticity of their signature on a document or the sending of a message.',
    context: 'Digital signatures under Section 2(p) of the Indian IT Act 2000.'
  },
  {
    id: 'd-05',
    subjectCode: 'KCS-303',
    term: 'Poset (Partially Ordered Set)',
    definition: 'A set S combined with a binary relation <= that satisfies reflexivity, antisymmetry, and transitivity.',
    context: 'Hasse diagrams, divisibility lattices, class hierarchies.'
  }
];
