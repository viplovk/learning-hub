import { Subject } from '../../types';

export const kcs301Subject: Subject = {
  id: 'kcs301',
  code: 'KCS-301',
  name: 'Data Structures',
  shortName: 'DS',
  semester: 3,
  credits: 4,
  type: 'CORE_THEORY',
  hasLab: true,
  labCode: 'KCS-351',
  description: 'Linear and non-linear data structures, asymptotic notation, stacks, queues, linked lists, trees, graphs, sorting, and hashing.',
  color: '#dc2626',
  referenceBooks: [
    'Data Structures using C by Aaron M. Tenenbaum',
    'Fundamentals of Data Structures in C by Horowitz & Sahni',
    'Data Structures and Algorithms by Michael T. Goodrich'
  ],
  units: [
    {
      id: 'kcs301-u1',
      unitNumber: 1,
      title: 'Arrays, Stacks, Queues & Recursion',
      description: 'Linear data structures, memory layout, Stack operations (LIFO), Infix to Postfix conversion, Queues (Circular, Deque, Priority Queue), and Recursion mechanism.',
      subjectId: 'kcs301',
      pyqCount: 28,
      topics: [
        {
          id: 'ds-stack-appl',
          name: 'Stack & Infix to Postfix Conversion',
          unitId: 'kcs301-u1',
          subjectId: 'kcs301',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 45,
          prerequisites: ['Arrays', 'Stack LIFO Principle'],
          nextTopics: ['Queues', 'Recursion Call Stack'],
          quickExplanation: 'A Stack is a LIFO (Last In First Out) linear data structure. A core university exam application is converting human-readable Infix expressions (A+B) into machine-evaluable Postfix expressions (AB+) using operator precedence and associativity.',
          deepExplanation: 'The Shunting Yard algorithm parses tokens one by one: operands are immediately output to the postfix string, opening parentheses are pushed to the operator stack, and operators are pushed after popping any operators from the stack that have higher or equal precedence. When a closing parenthesis is encountered, operators are popped to the output until the matching open parenthesis is removed.',
          whyItMatters: 'Compilers, interpreters, and pocket calculators (RPN) rely on postfix notation because it eliminates the need for parentheses and complex lookahead during expression evaluation.',
          coreConceptsList: [
            'LIFO memory discipline with PUSH, POP, PEEK in O(1)',
            'Operator precedence table: ^ (highest, R-to-L) > *, / > +, -',
            'Associativity rules and parenthesis handling',
            'Evaluation of postfix expression using a single operand stack'
          ],
          visualDiagram: `INFIX TOKEN: (A + B * C) / D
[Input Stream] ----> [Scanner]
                         |
           +-------------+-------------+
           |                           |
       [Operand]                   [Operator]
           |                           |
           v                           v
     [Output Postfix]           [Operator Stack]
     "A B C * + D /"            |   *   |
                                |   +   |
                                +-------+`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Convert Infix: A + (B * C - (D / E ^ F) * G) * H to Postfix.',
            stepByStepSolution: [
              'Token A: Output -> "A"',
              'Token +: Push to operator stack -> [+]',
              'Token (: Push to stack -> [+, (]',
              'Token B: Output -> "A B"',
              'Token *: Push to stack -> [+, (, *]',
              'Token C: Output -> "A B C"',
              'Token -: Pop * (higher precedence), push - -> Output: "A B C *", stack: [+, (, -]',
              'Token (: Push -> [+, (, -, (]',
              'Token D: Output -> "A B C * D"',
              'Token /: Push -> [+, (, -, (, /]',
              'Token E: Output -> "A B C * D E"',
              'Token ^: Push (higher than /) -> [+, (, -, (, /, ^]',
              'Token F: Output -> "A B C * D E F"',
              'Token ): Pop until (: Pop ^, pop / -> Output: "A B C * D E F ^ /", pop (',
              'Token *: Push * -> stack: [+, (, -, *]',
              'Token G: Output -> "A B C * D E F ^ / G"',
              'Token ): Pop until (: Pop *, pop - -> Output: "A B C * D E F ^ / G * -", pop (',
              'Token *: Stack has [+], * has higher precedence -> push * -> [+, *]',
              'Token H: Output -> "A B C * D E F ^ / G * - H"',
              'End of input: Pop remaining operators (* then +) -> Output: "A B C * D E F ^ / G * - H * +"'
            ],
            explanation: 'Operator precedence governs whether the incoming operator can sit on top of the stack operator.'
          },
          commonMistakes: [
            'Confusing right-to-left associativity of exponentiation (^) with standard left-to-right operators.',
            'Forgetting to pop and discard parentheses from the stack instead of writing them to output.'
          ],
          examPerspective: {
            twoMarks: 'Define Stack. Write time complexity of PUSH and POP operations with overflow/underflow conditions.',
            fiveMarks: 'Explain the algorithm to convert an Infix expression to Postfix expression using an example with parentheses and exponentiation.',
            tenMarks: 'Write a complete C function to convert Infix to Postfix expression and evaluate the resulting postfix expression using a stack with trace table.',
            highYieldKeywords: ['LIFO', 'Operator Precedence', 'Associativity', 'Shunting Yard', 'Stack Overflow', 'Underflow']
          },
          activeRecallPrompt: {
            question: 'Why do we need to pop operators with EQUAL precedence from the stack when scanning a left-to-right associative operator?',
            idealAnswer: 'Because left-to-right associativity dictates that the operator appearing first on the left must be evaluated first. Therefore, the earlier operator residing on the stack must be popped to the output before the newer operator can be pushed.',
            keyPoints: [
              'Left-to-right evaluation order must be preserved',
              'Earlier operator must appear first in postfix output',
              'Preventing right-to-left misgrouping for identical precedence'
            ]
          },
          feynmanPrompt: 'Explain how a stack converts A+B*C into Postfix to a first-year student without using complex jargon.',
          examWeightage: { twoMarkFreq: 6, fiveMarkFreq: 4, tenMarkFreq: 5, frequentlyAsked: true }
        },
        {
          id: 'ds-circular-queue',
          name: 'Circular Queue & Modulo Arithmetic',
          unitId: 'kcs301-u1',
          subjectId: 'kcs301',
          difficulty: 'MEDIUM',
          importance: 'HIGH',
          estimatedMinutes: 40,
          prerequisites: ['Linear Queue', 'Array Indexing'],
          nextTopics: ['Linked List Representation of Queue'],
          quickExplanation: 'A Circular Queue solves the memory wastage of a linear array queue by wrapping the rear and front pointers around to index 0 using modulo arithmetic: (rear + 1) % MAX.',
          deepExplanation: 'In a conventional linear queue implemented via an array, dequeuing elements advances the front pointer. Even if positions at the beginning become empty, if rear reaches MAX-1, no new elements can be enqueued (false overflow). Circular queue logically connects the last position back to the first position. Overflow condition is: ((rear + 1) % MAX == front). Underflow condition is: (front == -1).',
          whyItMatters: 'Operating system process scheduling (Round Robin), hardware buffers, audio streaming rings, and network packet routers rely heavily on circular buffers.',
          coreConceptsList: [
            'Linear Queue false overflow drawback',
            'Modulo arithmetic for circular index increment',
            'Accurate Overflow and Underflow detection formulas',
            'Priority Queue: Array vs Heap based ordering'
          ],
          visualDiagram: `       [0]  <--- front
     /     \\
   [4]     [1]
    |       |     Circular Queue with MAX = 5
   [3]     [2]  <--- rear
      \\   /
Formula: rear = (rear + 1) % MAX`,
          visualDiagramType: 'memory_layout',
          workedExample: {
            problem: 'Show overflow and underflow conditions for size MAX.',
            stepByStepSolution: [
              'Overflow: (rear + 1) % MAX == front',
              'Underflow: front == -1'
            ],
            explanation: 'Modulo ensures pointer wraps from MAX-1 back to 0.'
          },
          commonMistakes: [
            'Checking overflow as (rear == MAX - 1) instead of ((rear + 1) % MAX == front).',
            'Forgetting to reset front = -1, rear = -1 when deleting the very last remaining element.'
          ],
          examPerspective: {
            twoMarks: 'State the overflow and underflow conditions for a circular queue implemented using an array of size N.',
            fiveMarks: 'Write C functions for insert and delete operations in a Circular Queue.',
            tenMarks: 'Explain why circular queue is preferred over simple linear queue. Give full algorithm/code with dry run analysis.',
            highYieldKeywords: ['Circular Buffer', 'Modulo Operator', 'False Overflow', 'FIFO', 'Priority Queue']
          },
          activeRecallPrompt: {
            question: 'What happens to front and rear when the last element of a circular queue is removed?',
            idealAnswer: 'Both front and rear are reset to -1 to represent an empty queue.',
            keyPoints: ['front == rear check', 'reset to -1']
          },
          feynmanPrompt: 'Explain the circular queue like a 12-hour clock face.',
          examWeightage: { twoMarkFreq: 5, fiveMarkFreq: 4, tenMarkFreq: 3, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs301-u2',
      unitNumber: 2,
      title: 'Linked Lists & Applications',
      description: 'Singly Linked List, Doubly Linked List, Circular Linked List, Polynomial addition using linked lists, and generalized lists.',
      subjectId: 'kcs301',
      pyqCount: 22,
      topics: [
        {
          id: 'ds-linked-list-ops',
          name: 'Singly & Doubly Linked List Operations',
          unitId: 'kcs301-u2',
          subjectId: 'kcs301',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 50,
          prerequisites: ['Pointers in C', 'Dynamic Memory Allocation'],
          nextTopics: ['Polynomial Addition', 'Binary Trees'],
          quickExplanation: 'A Linked List is a linear collection of data elements (nodes) whose order is not given by their physical placement in memory. Instead, each node points to the next node using a pointer.',
          deepExplanation: 'Unlike arrays, linked lists allow O(1) insertion and deletion at any known pointer without shifting downstream elements. A Doubly Linked List (DLL) has two pointers per node (prev and next), enabling bi-directional traversal and O(1) node deletion given the node reference.',
          whyItMatters: 'Memory management in OS, browser history (back/forward), and playlist queues use linked lists.',
          coreConceptsList: [
            'Self-referential struct node',
            'In-place iterative reversal using 3 pointers',
            'Doubly linked list: prev and next bidirectional traversal',
            'Circular linked list: tail->next pointing to head'
          ],
          visualDiagram: `Singly:  [Head] -> [Data|*Next] -> [Data|*Next] -> [Data|NULL]
Doubly:  [Head] <-> [NULL|Data|*Next] <-> [*Prev|Data|*Next] <-> [*Prev|Data|NULL]`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Reverse a singly linked list in-place.',
            stepByStepSolution: [
              'Initialize prev = NULL, current = head, next = NULL',
              'While current != NULL: next = current->next; current->next = prev; prev = current; current = next',
              'head = prev'
            ],
            explanation: 'Reverses pointer directions without extra node allocations.'
          },
          commonMistakes: [
            'Losing the next pointer before redirecting current->next.',
            'Memory leak by not freeing deleted nodes in C.'
          ],
          examPerspective: {
            twoMarks: 'Compare arrays and linked lists in terms of memory and insertion time.',
            fiveMarks: 'Write a C function to reverse a singly linked list iteratively.',
            tenMarks: 'Explain polynomial representation and addition using linked lists with code.',
            highYieldKeywords: ['Pointers', 'In-place Reversal', 'Polynomial Addition', 'Self-referential']
          },
          activeRecallPrompt: {
            question: 'Why do we need 3 pointers (prev, current, next) to reverse a linked list?',
            idealAnswer: 'Reversing current->next breaks the forward link, so next must save the remaining nodes before rewiring.',
            keyPoints: ['Preserving forward link', 'Target assignment']
          },
          feynmanPrompt: 'Explain reversing a linked list like turning around a line of dancers holding hands.',
          examWeightage: { twoMarkFreq: 4, fiveMarkFreq: 5, tenMarkFreq: 4, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs301-u3',
      unitNumber: 3,
      title: 'Trees & Binary Search Trees',
      description: 'Binary Trees, Tree Traversals (Inorder, Preorder, Postorder), BST, AVL Trees (Rotations: LL, RR, LR, RL), B-Trees and Threaded Binary Trees.',
      subjectId: 'kcs301',
      pyqCount: 34,
      topics: [
        {
          id: 'ds-avl-trees',
          name: 'AVL Trees & Balancing Rotations (LL, RR, LR, RL)',
          unitId: 'kcs301-u3',
          subjectId: 'kcs301',
          difficulty: 'HARD',
          importance: 'CRITICAL',
          estimatedMinutes: 60,
          prerequisites: ['Binary Search Tree Property', 'Tree Height & Depth'],
          nextTopics: ['B-Trees', 'B+ Trees'],
          quickExplanation: 'An AVL tree is a self-balancing Binary Search Tree where the Balance Factor (BF = Height of Left Subtree - Height of Right Subtree) of every node is strictly -1, 0, or +1. If an insertion or deletion causes |BF| > 1, rotations restore balance.',
          deepExplanation: 'Standard BSTs can degenerate into a linked list with O(N) worst-case search time for sorted input. AVL trees guarantee O(log N) lookup, insertion, and deletion using single rotations (LL, RR) or double rotations (LR, RL).',
          whyItMatters: 'Relational database indexing and high-throughput symbol tables require guaranteed logarithmic search times.',
          coreConceptsList: [
            'Balance Factor formula: BF = H(Left) - H(Right)',
            'Permissible BF values: {-1, 0, +1}',
            'Single Rotations: LL (Right), RR (Left)',
            'Double Rotations: LR (Left then Right), RL (Right then Left)'
          ],
          visualDiagram: `LL Imbalance:      (z) BF = +2          (y) BF = 0
                  /                    /   \\
                (y) BF = +1   -->    (x)   (z)
                /
              (x)`,
          visualDiagramType: 'flowchart',
          workedExample: {
            problem: 'Insert 10, 20, 30 into empty AVL tree.',
            stepByStepSolution: [
              'Insert 10: Root, BF=0',
              'Insert 20: Right of 10. BF(10) = -1',
              'Insert 30: Right of 20. RR imbalance at 10 (BF = -2). Perform RR (Left) rotation. 20 becomes root, 10 left child, 30 right child.'
            ],
            explanation: 'RR rotation restores balance factor to 0.'
          },
          commonMistakes: [
            'Calculating balance factor as H(Right) - H(Left) inconsistently.',
            'Executing double rotation steps in wrong sequence.'
          ],
          examPerspective: {
            twoMarks: 'Define AVL tree and balance factor.',
            fiveMarks: 'Explain LL, RR, LR, RL rotations with diagrams.',
            tenMarks: 'Construct an AVL tree from a sequence of 10 keys showing rotations after each insertion.',
            highYieldKeywords: ['Self-balancing', 'Balance Factor', 'Rotations', 'Logarithmic Search']
          },
          activeRecallPrompt: {
            question: 'When is an LR rotation triggered in an AVL tree?',
            idealAnswer: 'When an insertion occurs in the right subtree of the left child of an unbalanced node (BF = +2).',
            keyPoints: ['Left child right subtree', 'Double rotation']
          },
          feynmanPrompt: 'Explain AVL balancing like shifting weights on a seesaw.',
          examWeightage: { twoMarkFreq: 8, fiveMarkFreq: 6, tenMarkFreq: 8, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs301-u4',
      unitNumber: 4,
      title: 'Graphs & Shortest Paths',
      description: 'Graph representation (Adjacency Matrix, Adjacency List), Traversals (BFS, DFS), Minimum Spanning Tree (Prim and Kruskal algorithms), Shortest path (Dijkstra algorithm).',
      subjectId: 'kcs301',
      pyqCount: 26,
      topics: [
        {
          id: 'ds-dijkstra',
          name: "Dijkstra's Shortest Path Algorithm",
          unitId: 'kcs301-u4',
          subjectId: 'kcs301',
          difficulty: 'HARD',
          importance: 'CRITICAL',
          estimatedMinutes: 55,
          prerequisites: ['Graph Representations', 'Priority Queue / Min-Heap'],
          nextTopics: ['Bellman-Ford Algorithm'],
          quickExplanation: "Dijkstra's algorithm finds the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.",
          deepExplanation: 'Uses a greedy approach: maintain dist[] initialized to infinity (dist[src] = 0). At each step, pick unvisited vertex with minimum dist, and relax outgoing edges: dist[u] + w(u, v) < dist[v]. Time complexity is O((V+E) log V) with min-heap.',
          whyItMatters: 'Routing protocols (OSPF) and map navigation algorithms rely on Dijkstra.',
          coreConceptsList: [
            'Greedy choice property',
            'Edge relaxation condition: dist[u] + w < dist[v]',
            'Fails with negative edge weights',
            'Time complexity with Min-Heap'
          ],
          visualDiagram: `(Src: A=0) ---4---> (B: inf -> 4)
    |                 |
    2                 3
    v                 v
 (C: inf -> 2) ---1-> (D: inf -> 3)`,
          visualDiagramType: 'flowchart',
          workedExample: {
            problem: 'Trace Dijkstra from Source 0 on 4 vertices.',
            stepByStepSolution: [
              'Init: dist[0]=0, others=inf',
              'Relax edges from 0: dist[1]=4, dist[2]=1',
              'Pick node 2 (dist=1): relax to 1 (1+2=3 < 4), dist[1]=3',
              'Pick node 1 (dist=3): relax to 3 (3+1=4), dist[3]=4'
            ],
            explanation: 'Greedy choice finalizes closest vertex.'
          },
          commonMistakes: [
            'Applying Dijkstra to graphs with negative edges.',
            'Forgetting to mark nodes as visited after relaxation.'
          ],
          examPerspective: {
            twoMarks: 'Why does Dijkstra fail with negative edge weights?',
            fiveMarks: 'Write the greedy algorithm for Dijkstra shortest path.',
            tenMarks: 'Solve a given weighted graph using Dijkstra showing tabular iterations.',
            highYieldKeywords: ['Single Source Shortest Path', 'Relaxation', 'Greedy', 'Non-negative']
          },
          activeRecallPrompt: {
            question: 'What is the edge relaxation condition in Dijkstra?',
            idealAnswer: 'If dist[u] + weight(u, v) < dist[v], then dist[v] = dist[u] + weight(u, v).',
            keyPoints: ['dist comparison', 'distance update']
          },
          feynmanPrompt: 'Explain Dijkstra like water ripples expanding from a dropped pebble.',
          examWeightage: { twoMarkFreq: 7, fiveMarkFreq: 5, tenMarkFreq: 6, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs301-u5',
      unitNumber: 5,
      title: 'Sorting, Searching & Hashing',
      description: 'Searching (Linear, Binary), Sorting (Bubble, Insertion, Quick, Merge, Heap), Hashing techniques, Hash tables, Collision resolution (Chaining, Linear Probing, Quadratic Probing, Double Hashing).',
      subjectId: 'kcs301',
      pyqCount: 30,
      topics: [
        {
          id: 'ds-sorting-quick-merge',
          name: 'Quick Sort vs Merge Sort & Asymptotic Analysis',
          unitId: 'kcs301-u5',
          subjectId: 'kcs301',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 50,
          prerequisites: ['Divide and Conquer', 'Recursion Tree'],
          nextTopics: ['Heap Sort', 'Hashing'],
          quickExplanation: 'Merge Sort divides the array into halves, sorts them, and merges them in O(N log N) worst-case time with O(N) space. Quick Sort partitions around a pivot in O(N log N) average time, O(1) extra space, but O(N^2) worst-case time.',
          deepExplanation: 'Merge Sort is stable and in-place only with linked lists. Quick Sort is in-place and faster in practice due to cache locality, but degrades to O(N^2) if already sorted and naive pivot is chosen.',
          whyItMatters: 'Java/Python use Timsort (Merge sort hybrid) for stability, while C++ std::sort uses Introsort (Quick sort hybrid).',
          coreConceptsList: [
            'Divide and Conquer paradigm',
            'Partitioning scheme around pivot',
            'Stability definition and differences',
            'Space: Merge Sort O(N) vs Quick Sort O(log N) stack'
          ],
          visualDiagram: `MERGE SORT: [8, 4, 5, 2] -> [8, 4] & [5, 2] -> [4, 8] & [2, 5] -> [2, 4, 5, 8]
QUICK SORT: [7, 2, 1, 6, 8, 5, 3] Pivot: 3 -> [<3: 2, 1] [3] [>3: 7, 6, 8, 5]`,
          visualDiagramType: 'flowchart',
          workedExample: {
            problem: 'Trace Quick Sort partition on [44, 33, 11, 55, 77, 90, 40] with pivot 44.',
            stepByStepSolution: [
              'Left scan finds 55 (>44), right scan finds 40 (<44). Swap: [44, 33, 11, 40, 77, 90, 55]',
              'Pointers cross. Swap pivot 44 with 40: [40, 33, 11] [44] [77, 90, 55]',
              'Pivot 44 is in its final position.'
            ],
            explanation: 'All elements left are < 44, all right are > 44.'
          },
          commonMistakes: [
            'Thinking Merge Sort is in-place for arrays.',
            'Forgetting worst case O(N^2) for Quick Sort.'
          ],
          examPerspective: {
            twoMarks: 'What is a stable sorting algorithm? Give an example.',
            fiveMarks: 'Compare Quick Sort and Merge Sort across time, space, and stability.',
            tenMarks: 'Write Quick Sort algorithm with trace and recurrence analysis.',
            highYieldKeywords: ['Divide & Conquer', 'Partitioning', 'Pivot', 'Stability', 'O(N log N)']
          },
          activeRecallPrompt: {
            question: 'When does Quick Sort exhibit O(N^2) worst-case time?',
            idealAnswer: 'When the partition is repeatedly unbalanced (0 and N-1 elements), such as on already sorted input with first or last element as pivot.',
            keyPoints: ['Unbalanced partition', 'Sorted input with naive pivot']
          },
          feynmanPrompt: 'Explain Quick Sort like sorting a stack of exams by picking one passing grade as a divider.',
          examWeightage: { twoMarkFreq: 9, fiveMarkFreq: 7, tenMarkFreq: 8, frequentlyAsked: true }
        }
      ]
    }
  ]
};
