import { Subject } from '../../types';

export const kcs303Subject: Subject = {
  id: 'kcs303',
  code: 'KCS-303',
  name: 'Discrete Structures & Theory of Logic',
  shortName: 'DSTL',
  semester: 3,
  credits: 4,
  type: 'CORE_THEORY',
  hasLab: true,
  labCode: 'KCS-353',
  description: 'Set theory, relations, algebraic structures, groups, lattices, Boolean algebra, propositional logic, and recurrence relations.',
  color: '#b91c1c',
  referenceBooks: [
    'Discrete Mathematics and Its Applications by Kenneth H. Rosen',
    'Discrete Mathematical Structures by Kolman, Busby and Ross',
    'Elements of Discrete Mathematics by C.L. Liu'
  ],
  units: [
    {
      id: 'kcs303-u1',
      unitNumber: 1,
      title: 'Set Theory, Relations & Functions',
      description: 'Sets, subsets, operations, relations, equivalence relations, partial orderings, Hasse diagrams, functions, and mathematical induction.',
      subjectId: 'kcs303',
      pyqCount: 22,
      topics: [
        {
          id: 'dstl-hasse-diagram',
          name: 'Posets & Hasse Diagrams',
          unitId: 'kcs303-u1',
          subjectId: 'kcs303',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 45,
          prerequisites: ['Partial Order Relation (Reflexive, Antisymmetric, Transitive)'],
          nextTopics: ['Lattices & Boolean Algebra'],
          quickExplanation: 'A Partially Ordered Set (Poset) is a set equipped with a reflexive, antisymmetric, and transitive relation. A Hasse Diagram is a simplified visual representation that removes self-loops and transitive edges.',
          deepExplanation: 'Rules to construct Hasse diagram: 1. Delete all reflexive loops (a, a), 2. Delete all transitive edges (if a->b and b->c, delete a->c), 3. Draw upward edges without arrowheads. Concepts: Maximal, Minimal, Greatest (LUB), Least (GLB) elements.',
          whyItMatters: 'Type hierarchies in programming languages and dependency scheduling graphs are posets.',
          coreConceptsList: [
            'Poset definition: Reflexive, Antisymmetric, Transitive',
            'Hasse diagram construction rules',
            'Maximal vs Greatest element distinctions',
            'Minimal vs Least element distinctions'
          ],
          visualDiagram: `Divisibility D(12) = {1, 2, 3, 4, 6, 12}:
           12
         /    \\
        4      6
       / \\    / \\
      |    2    3
       \\  /    /
         1`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Draw Hasse diagram for D(12) divisors under divisibility.',
            stepByStepSolution: [
              'Divisors: {1, 2, 3, 4, 6, 12}',
              'Level 0: 1',
              'Level 1: 2, 3',
              'Level 2: 4 (from 2), 6 (from 2 and 3)',
              'Level 3: 12 (from 4 and 6)',
              'Least element: 1, Greatest element: 12'
            ],
            explanation: 'In divisibility posets, 1 is always the bottom and the number itself is the top.'
          },
          commonMistakes: ['Drawing arrowheads on Hasse diagrams (direction is strictly upward by convention).'],
          examPerspective: {
            twoMarks: 'Define Partial Order Relation with an example.',
            fiveMarks: 'Draw Hasse diagram for power set P({a, b, c}) under subset inclusion.',
            tenMarks: 'For D(36), draw Hasse diagram and identify upper bounds, lower bounds, LUB, GLB for {4, 6}.',
            highYieldKeywords: ['Poset', 'Hasse Diagram', 'Maximal', 'Minimal', 'LUB', 'GLB']
          },
          activeRecallPrompt: {
            question: 'Can a poset have multiple maximal elements and multiple greatest elements?',
            idealAnswer: 'It can have multiple maximal elements, but at most ONE greatest element.',
            keyPoints: ['Multiple maximal allowed', 'At most one greatest element']
          },
          feynmanPrompt: 'Explain Hasse diagrams like a family tree where you do not need arrows pointing to grandparents.',
          examWeightage: { twoMarkFreq: 8, fiveMarkFreq: 6, tenMarkFreq: 7, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs303-u2',
      unitNumber: 2,
      title: 'Algebraic Structures & Group Theory',
      description: 'Algebraic systems, Semigroups, Monoids, Groups, Abelian Groups, Subgroups, Cosets, Lagrange Theorem, Cyclic Groups, Rings, and Fields.',
      subjectId: 'kcs303',
      pyqCount: 26,
      topics: [
        {
          id: 'dstl-lagrange-groups',
          name: "Groups, Subgroups & Lagrange's Theorem",
          unitId: 'kcs303-u2',
          subjectId: 'kcs303',
          difficulty: 'HARD',
          importance: 'CRITICAL',
          estimatedMinutes: 55,
          prerequisites: ['Binary Operations', 'Set Properties'],
          nextTopics: ['Rings and Fields'],
          quickExplanation: "A Group (G, *) satisfies Closure, Associativity, Identity existence, and Inverse existence. Lagrange's Theorem states that the order of any subgroup H divides the order of finite group G: |G| / |H| = [G : H].",
          deepExplanation: "Hierarchy: Groupoid (Closure) -> Semigroup (+ Associativity) -> Monoid (+ Identity) -> Group (+ Inverses) -> Abelian Group (+ Commutativity). Lagrange's Theorem: Let H be a subgroup of finite group G. Then |G| = |H| * k, where k is the index of H (number of distinct left cosets). Consequence: Every group of prime order is cyclic and simple.",
          whyItMatters: 'Public key cryptography (RSA, Elliptic Curve Cryptography) relies directly on cyclic groups and modular arithmetic.',
          coreConceptsList: [
            'Group axioms: Closure, Associativity, Identity, Invertibility',
            'Abelian condition: a * b = b * a',
            "Lagrange's Theorem: Order of subgroup divides order of group (|H| divides |G|)",
            'Cosets: aH = {a * h : h in H}'
          ],
          visualDiagram: `Algebraic Hierarchy:
[Groupoid: Closure]
       v
[Semigroup: + Associative]
       v
[Monoid: + Identity]
       v
[Group: + Inverses]
       v
[Abelian Group: + Commutative]`,
          visualDiagramType: 'flowchart',
          workedExample: {
            problem: "Prove Lagrange's Theorem for finite groups.",
            stepByStepSolution: [
              '1. Let H = {h1, h2, ... hm} be a subgroup of order m.',
              '2. Form left cosets: aH = {a*h1, a*h2, ... a*hm}. Each coset has exactly m elements.',
              '3. Two left cosets are either identical or disjoint.',
              '4. The union of all distinct left cosets equals G.',
              '5. If there are k distinct cosets, then |G| = k * m = k * |H|.',
              '6. Hence |H| divides |G|.'
            ],
            explanation: 'Cosets form a partition of group G into equal-sized disjoint blocks.'
          },
          commonMistakes: ['Applying Lagrange theorem to infinite groups (only holds for finite groups).'],
          examPerspective: {
            twoMarks: "State Lagrange's theorem on subgroups.",
            fiveMarks: 'Prove that every group of prime order is cyclic.',
            tenMarks: "State and prove Lagrange's theorem. Explain its corollaries with respect to order of elements.",
            highYieldKeywords: ['Group Axioms', "Lagrange's Theorem", 'Order of Group', 'Subgroup', 'Coset']
          },
          activeRecallPrompt: {
            question: "What does Lagrange's theorem state regarding the order of a subgroup H of a finite group G?",
            idealAnswer: 'The order of the subgroup H divides the order of the group G (|H| divides |G|).',
            keyPoints: ['|H| divides |G|', 'Finite groups only']
          },
          feynmanPrompt: 'Explain cosets like dividing a pizza into equal slices where the size of each slice divides the whole pizza.',
          examWeightage: { twoMarkFreq: 8, fiveMarkFreq: 7, tenMarkFreq: 8, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs303-u3',
      unitNumber: 3,
      title: 'Lattices & Boolean Algebra',
      description: 'Lattices as posets, Lattices as algebraic systems, Sublattices, Direct product, Bounded, Distributive, and Complemented Lattices, Boolean Algebra, and Karnaugh Maps.',
      subjectId: 'kcs303',
      pyqCount: 22,
      topics: [
        {
          id: 'dstl-lattices-boolean',
          name: 'Lattices, Distributive Lattices & Boolean Algebra',
          unitId: 'kcs303-u3',
          subjectId: 'kcs303',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 50,
          prerequisites: ['Posets and Hasse Diagrams'],
          nextTopics: ['Propositional Logic'],
          quickExplanation: 'A Lattice is a poset in which every two elements have a unique Least Upper Bound (join, a v b) and a unique Greatest Lower Bound (meet, a ^ b). A Boolean Algebra is a complemented distributive lattice.',
          deepExplanation: 'Properties: Idempotent, Commutative, Associative, Absorption laws: a v (a ^ b) = a, and a ^ (a v b) = a. A lattice is Distributive if meet distributes over join and vice-versa. A bounded lattice is Complemented if every element a has an element b such that a v b = 1 and a ^ b = 0. A Boolean algebra is isomorphic to the power set of a set.',
          whyItMatters: 'Digital logic circuit design, computer architecture gates, and database query optimization rely on Boolean algebra.',
          coreConceptsList: [
            'Lattice: Unique LUB (Join v) and unique GLB (Meet ^) for every pair',
            'Absorption law: a v (a ^ b) = a',
            'Distributive lattice condition (cannot contain pentagon N5 or diamond M3 as sublattice)',
            'Boolean Algebra: Complemented + Distributive bounded lattice'
          ],
          visualDiagram: `Join (LUB): a v b  (Lowest common ceiling)
Meet (GLB): a ^ b  (Highest common floor)
Absorption: a v (a ^ b) = a`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Prove Absorption Law in a lattice: a v (a ^ b) = a.',
            stepByStepSolution: [
              '1. By definition of meet, (a ^ b) <= a.',
              '2. By reflexivity, a <= a.',
              '3. Therefore, a is an upper bound of {a, a ^ b}.',
              '4. Since a v (a ^ b) is the LEAST upper bound, a v (a ^ b) <= a.',
              '5. Also, by definition of join, a <= a v (a ^ b).',
              '6. By antisymmetry of <=, a v (a ^ b) = a.'
            ],
            explanation: 'Antisymmetry confirms equality between upper bound and least upper bound.'
          },
          commonMistakes: ['Confusing Join (v) with Meet (^).'],
          examPerspective: {
            twoMarks: 'Define a distributive lattice.',
            fiveMarks: 'Show that the diamond lattice M3 is not distributive.',
            tenMarks: 'Define Boolean Algebra. State and prove De Morgan laws for a Boolean algebra.',
            highYieldKeywords: ['Lattice', 'Join and Meet', 'Absorption Law', 'Distributive', 'Complemented', 'Boolean Algebra']
          },
          activeRecallPrompt: {
            question: 'What two properties turn a bounded lattice into a Boolean algebra?',
            idealAnswer: 'It must be both Distributive and Complemented.',
            keyPoints: ['Distributive', 'Complemented']
          },
          feynmanPrompt: 'Explain a lattice like finding the nearest common ancestor and nearest common child.',
          examWeightage: { twoMarkFreq: 7, fiveMarkFreq: 6, tenMarkFreq: 7, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs303-u4',
      unitNumber: 4,
      title: 'Propositional & Predicate Logic',
      description: 'Propositions, Truth tables, Tautologies, Contradictions, Logical equivalence, Normal forms (DNF, CNF), Rules of inference, Predicates, Quantifiers, and Valid arguments.',
      subjectId: 'kcs303',
      pyqCount: 24,
      topics: [
        {
          id: 'dstl-prop-logic',
          name: 'Propositional Logic, Tautology & Rules of Inference (Modus Ponens)',
          unitId: 'kcs303-u4',
          subjectId: 'kcs303',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 45,
          prerequisites: ['Basic Boolean Logic'],
          nextTopics: ['Combinatorics'],
          quickExplanation: 'Propositional logic deals with declarative statements that are either true or false. A Tautology is a formula that is true under all possible truth value assignments.',
          deepExplanation: 'Connectives: Negation (~), Conjunction (^), Disjunction (v), Conditional (p -> q, equivalent to ~p v q), Biconditional (p <-> q). Rules of Inference: Modus Ponens (p, p->q therefore q), Modus Tollens (~q, p->q therefore ~p), Hypothetical Syllogism. Predicate Logic adds Universal (for all x) and Existential (there exists x) quantifiers.',
          whyItMatters: 'Automated theorem provers, AI expert systems, and compiler verification rely on logic.',
          coreConceptsList: [
            'Truth table construction for compound propositions',
            'Tautology, Contradiction, and Contingency',
            'Modus Ponens: [p ^ (p -> q)] -> q is a tautology',
            'Disjunctive Normal Form (DNF) and Conjunctive Normal Form (CNF)'
          ],
          visualDiagram: `Modus Ponens Inference Rule:
  Premise 1: p
  Premise 2: p -> q
  -----------------
  Conclusion: q`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Prove that (p -> q) <-> (~p v q) is a tautology using a truth table.',
            stepByStepSolution: [
              'Row 1 (T, T): p->q = T; ~p = F; ~p v q = T; Equivalence = T',
              'Row 2 (T, F): p->q = F; ~p = F; ~p v q = F; Equivalence = T',
              'Row 3 (F, T): p->q = T; ~p = T; ~p v q = T; Equivalence = T',
              'Row 4 (F, F): p->q = T; ~p = T; ~p v q = T; Equivalence = T',
              'All entries in the final column are True. Hence it is a Tautology.'
            ],
            explanation: 'A truth table showing all T in final column establishes a mathematical tautology.'
          },
          commonMistakes: ['Confusing p -> q with q -> p (Converse error).'],
          examPerspective: {
            twoMarks: 'Define Tautology and Contradiction with examples.',
            fiveMarks: 'Determine whether [p ^ (p -> q)] -> q is a valid argument.',
            tenMarks: 'Convert a given compound statement into Principal Disjunctive and Conjunctive Normal Forms (PDNF/PCNF).',
            highYieldKeywords: ['Tautology', 'Modus Ponens', 'Rules of Inference', 'Predicate Logic', 'PDNF', 'PCNF']
          },
          activeRecallPrompt: {
            question: 'What is the logical equivalent of the conditional statement p -> q using only negation and disjunction?',
            idealAnswer: '~p v q (Not p or q).',
            keyPoints: ['~p v q']
          },
          feynmanPrompt: 'Explain Modus Ponens like: if it is raining the ground is wet; it is raining; therefore the ground is definitely wet.',
          examWeightage: { twoMarkFreq: 8, fiveMarkFreq: 6, tenMarkFreq: 7, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs303-u5',
      unitNumber: 5,
      title: 'Combinatorics & Recurrence Relations',
      description: 'Pigeonhole principle, Permutations and Combinations, Inclusion-Exclusion principle, Generating functions, and Linear recurrence relations with constant coefficients.',
      subjectId: 'kcs303',
      pyqCount: 22,
      topics: [
        {
          id: 'dstl-recurrence-relations',
          name: 'Linear Recurrence Relations with Constant Coefficients & Pigeonhole Principle',
          unitId: 'kcs303-u5',
          subjectId: 'kcs303',
          difficulty: 'HARD',
          importance: 'CRITICAL',
          estimatedMinutes: 55,
          prerequisites: ['Quadratic Equations', 'Sequences & Series'],
          nextTopics: ['Algorithm Asymptotics'],
          quickExplanation: 'A recurrence relation expresses a term a_n in terms of preceding terms. Homogeneous linear recurrence relations with constant coefficients are solved via their characteristic equation.',
          deepExplanation: 'General form: c0*a_n + c1*a_{n-1} + c2*a_{n-2} = f(n). Characteristic equation: c0*r^2 + c1*r + c2 = 0. Distinct real roots r1, r2 yield homogeneous solution a_n = C1*(r1)^n + C2*(r2)^n. Repeated roots r yield a_n = (C1 + C2*n)*(r)^n. Particular solution a_n^{(p)} is found if f(n) != 0. The Pigeonhole Principle states that if k+1 items are put into k boxes, at least one box contains >= 2 items.',
          whyItMatters: 'Analyzes divide-and-conquer algorithm runtimes (like Merge Sort, Fibonacci numbers, and dynamic programming).',
          coreConceptsList: [
            'Characteristic equation formulation',
            'Distinct real roots vs repeated roots solutions',
            'Homogeneous solution + Particular integral = General solution',
            'Pigeonhole Principle & Generalized Pigeonhole Principle: ceil(N / k)'
          ],
          visualDiagram: `Pigeonhole Principle:
Items (Pigeons) > Boxes (Holes)
n = 5 pigeons, k = 4 holes -> At least one hole has >= 2 pigeons!`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Solve recurrence: a_n - 7*a_{n-1} + 10*a_{n-2} = 0 with a0 = 1, a1 = 8.',
            stepByStepSolution: [
              'Characteristic equation: r^2 - 7r + 10 = 0',
              '(r - 2)(r - 5) = 0 -> Roots r1 = 2, r2 = 5',
              'General solution: a_n = C1*(2^n) + C2*(5^n)',
              'Apply initial condition a0 = 1: C1 + C2 = 1 -> C2 = 1 - C1',
              'Apply a1 = 8: 2*C1 + 5*C2 = 8 -> 2*C1 + 5*(1 - C1) = 8 -> -3*C1 = 3 -> C1 = -1',
              'C2 = 1 - (-1) = 2',
              'Final Solution: a_n = - (2^n) + 2 * (5^n)'
            ],
            explanation: 'Initial conditions resolve arbitrary constants C1 and C2.'
          },
          commonMistakes: ['Forgetting the term n in repeated root solutions: (C1 + C2*n)*r^n.'],
          examPerspective: {
            twoMarks: 'State the Pigeonhole Principle.',
            fiveMarks: 'Show that if any 5 numbers from 1 to 8 are chosen, two must sum to 9.',
            tenMarks: 'Solve a second-order linear non-homogeneous recurrence relation finding both complementary function and particular solution.',
            highYieldKeywords: ['Recurrence Relation', 'Characteristic Equation', 'Pigeonhole Principle', 'Homogeneous']
          },
          activeRecallPrompt: {
            question: 'What is the solution form for a repeated root r with multiplicity 2 in a recurrence relation?',
            idealAnswer: 'a_n = (C1 + C2 * n) * (r)^n.',
            keyPoints: ['(C1 + C2 * n) * r^n']
          },
          feynmanPrompt: 'Explain the pigeonhole principle like having 13 socks of 12 colors, guaranteeing at least one matching pair.',
          examWeightage: { twoMarkFreq: 7, fiveMarkFreq: 6, tenMarkFreq: 7, frequentlyAsked: true }
        }
      ]
    }
  ]
};
