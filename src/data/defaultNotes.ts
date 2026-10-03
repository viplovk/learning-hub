import { AcademicNote } from '../types';

export const DEFAULT_NOTES: AcademicNote[] = [
  {
    id: 'note-01',
    title: 'Complete Cheatsheet: Infix to Postfix & Evaluation',
    subjectId: 'kcs301',
    unitNumber: 1,
    topicId: 'ds-stack-appl',
    isShared: true,
    author: 'Viplov (Section C Rep)',
    tags: ['Exam-Favorite', '10-Marker', 'Stack'],
    lastUpdated: '2026-10-02',
    content: `# Infix to Postfix Conversion Master Cheatsheet

### 1. Operator Precedence Table
| Operator | Precedence | Associativity |
|---|---|---|
| ^ (Power) | 3 (Highest) | Right to Left |
| * , / | 2 | Left to Right |
| + , - | 1 (Lowest) | Left to Right |

### 2. Golden Rule for AKTU Examination
- Operands go straight to output postfix string.
- If scanned operator has HIGHER precedence than stack top -> PUSH immediately.
- If scanned operator has EQUAL or LOWER precedence -> POP stack top to output, repeat check, then push.
- Parentheses: '(' is pushed with lowest priority inside stack. ')' triggers popping everything until matching '(' is found and discarded.

### 3. Evaluation of Postfix Expression
- Scan from left to right.
- If operand: PUSH to operand stack.
- If operator: POP two operands (val2 = pop(), val1 = pop()), compute (val1 OP val2), and PUSH result.
- Final answer is the sole value remaining on the stack.`
  },
  {
    id: 'note-02',
    title: "Booth's Algorithm Step-by-Step Rulebook",
    subjectId: 'kcs302',
    unitNumber: 3,
    topicId: 'coa-booth-algo',
    isShared: true,
    author: 'Viplov',
    tags: ['COA', 'Booth', 'High-Yield'],
    lastUpdated: '2026-10-01',
    content: `# Booth's Multiplication Algorithm

### Register Setup
- **A**: Accumulator (Initialized to all 0s, size = n bits)
- **M**: Multiplicand (n bits)
- **-M**: 2's complement of Multiplicand
- **Q**: Multiplier (n bits)
- **Q_{n+1}**: Single flip-flop (Initialized to 0)
- **Count**: n (Number of bits in multiplier)

### Decision Logic per Cycle
1. Inspect pair **(Q_0, Q_{n+1})**:
   - \`10\` -> **A = A - M**, then **ASR [A, Q, Q_{n+1}]**
   - \`01\` -> **A = A + M**, then **ASR [A, Q, Q_{n+1}]**
   - \`00\` -> Only **ASR [A, Q, Q_{n+1}]**
   - \`11\` -> Only **ASR [A, Q, Q_{n+1}]**
2. Decrement **Count**.
3. Repeat until **Count = 0**.

### Result
The final product is the concatenation **[A, Q]** representing a 2n-bit signed number in 2's complement form.`
  },
  {
    id: 'note-03',
    title: 'Indian IT Act 2000: Important Penal Sections for 5-Mark Questions',
    subjectId: 'bcc301',
    unitNumber: 4,
    topicId: 'csec-it-act-2000',
    isShared: true,
    author: 'Viplov',
    tags: ['Cyber-Law', 'AKTU-Sections', 'Summary'],
    lastUpdated: '2026-09-28',
    content: `# Indian IT Act 2000 & 2008 Amendments Summary

| Section | Offense | Penalty |
|---|---|---|
| **Section 43** | Unauthorized access, data extraction, downloading, introducing virus (Civil) | Compensation up to Rs. 1 Crore to affected victim |
| **Section 65** | Tampering with computer source documents / code | Imprisonment up to 3 years or fine up to Rs. 2 Lakh |
| **Section 66** | Computer related offenses / Hacking with dishonest intent | Imprisonment up to 3 years or fine up to Rs. 5 Lakh or both |
| **Section 66C** | Identity theft (fraudulent use of password, electronic signature) | Imprisonment up to 3 years and fine up to Rs. 1 Lakh |
| **Section 66D** | Cheating by personation using computer resource (Phishing) | Imprisonment up to 3 years and fine up to Rs. 1 Lakh |
| **Section 66E** | Privacy violation (publishing images of private areas) | Imprisonment up to 3 years or fine up to Rs. 2 Lakh or both |
| **Section 67** | Publishing sexually explicit content in electronic form | 1st conviction: up to 5 yrs + 10 lakh; 2nd: up to 7 yrs`
  }
];
