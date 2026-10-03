import { Course, FlashcardDeck, Quiz, Assignment, CommunityNote } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'cs201',
    code: 'CS201',
    title: 'Data Structures & Algorithms',
    instructor: 'Dr. Ramesh Sharma',
    department: 'Computer Science',
    semester: 'Semester IV',
    color: 'from-blue-600 to-indigo-600',
    iconName: 'Network',
    progress: 68,
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Advanced Trees & Balanced BSTs',
        duration: '3 hours',
        topics: [
          {
            id: 't1',
            title: 'AVL Trees & Self-Balancing Rotations',
            completed: true,
            content: 'An AVL tree is a self-balancing binary search tree where the difference between heights of left and right subtrees (the balance factor) cannot be more than one for all nodes. Rebalancing is done through four rotational cases: Left-Left (Single Right Rotation), Right-Right (Single Left Rotation), Left-Right (LR Rotation), and Right-Left (RL Rotation).',
            keyTakeaways: [
              'Balance Factor = height(left) - height(right) must be in {-1, 0, 1}',
              'Search, Insertion, and Deletion time complexity is strictly O(log n)',
              'AVL trees are more rigidly balanced than Red-Black trees, making lookups faster'
            ],
            codeSnippet: {
              language: 'typescript',
              code: `function getBalance(node: TreeNode | null): number {
  if (!node) return 0;
  return getHeight(node.left) - getHeight(node.right);
}

function rotateRight(y: TreeNode): TreeNode {
  const x = y.left!;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
  x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
  return x;
}`
            },
            resources: [
              { title: 'AVL Tree Rotation Cheatsheet', type: 'doc', url: '#', readTime: '5 min' },
              { title: 'Visualizer: Balanced Binary Trees', type: 'link', url: '#', readTime: '10 min' }
            ]
          },
          {
            id: 't2',
            title: 'Red-Black Trees & Color Invariants',
            completed: true,
            content: 'Red-black trees are balanced search trees that guarantee logarithmic performance using node coloring (Red or Black). The rules require the root to be black, no two consecutive red nodes on any path, and all simple paths from a node to descendant leaves contain the exact same number of black nodes.',
            keyTakeaways: [
              'Color property: Every node is either Red or Black',
              'Root is always Black, NULL leaves are considered Black',
              'Faster insertion and deletion than AVL due to fewer rotations'
            ],
            resources: [
              { title: 'Red-Black Properties Guide', type: 'pdf', url: '#', readTime: '8 min' }
            ]
          },
          {
            id: 't3',
            title: 'Trie Data Structure & Autocomplete',
            completed: false,
            content: 'A Trie (prefix tree) is an efficient tree-like data structure used to store an associative array where the keys are strings. Unlike BSTs, nodes do not store their associated key; instead, their position in the tree defines the key with which it is associated.',
            keyTakeaways: [
              'Prefix lookup in O(L) time where L is word length',
              'Widely used in spell checkers, search engines, IP routing tables'
            ],
            resources: [
              { title: 'Trie Implementation & Space Optimization', type: 'doc', url: '#', readTime: '12 min' }
            ]
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Dynamic Programming Mastery',
        duration: '4.5 hours',
        topics: [
          {
            id: 't4',
            title: '0/1 Knapsack & Subset Sum',
            completed: true,
            content: 'Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value. We can solve this with a 2D table dp[i][w] representing the max value using a subset of first i items with weight capacity w.',
            keyTakeaways: [
              'Optimal substructure and overlapping subproblems',
              'Time complexity O(N*W), space optimizable to O(W)'
            ],
            codeSnippet: {
              language: 'typescript',
              code: `function knapsack(W: number, wt: number[], val: number[], n: number): number {
  const dp: number[] = new Array(W + 1).fill(0);
  for (let i = 0; i < n; i++) {
    for (let w = W; w >= wt[i]; w--) {
      dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);
    }
  }
  return dp[W];
}`
            },
            resources: [
              { title: 'DP Patterns: Knapsack Variations', type: 'pdf', url: '#', readTime: '15 min' }
            ]
          },
          {
            id: 't5',
            title: 'Longest Common Subsequence (LCS)',
            completed: false,
            content: 'Finding the longest subsequence present in both strings in the same relative order, though not necessarily contiguous. Used in git diff, bioinformatics DNA sequencing, and speech recognition.',
            keyTakeaways: [
              'dp[i][j] = dp[i-1][j-1] + 1 if s1[i-1] == s2[j-1] else max(dp[i-1][j], dp[i][j-1])',
              'Backtracking reconstructs the actual subsequence'
            ],
            resources: [
              { title: 'LCS Matrix Walkthrough', type: 'doc', url: '#', readTime: '7 min' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cs305',
    code: 'CS305',
    title: 'Database Management Systems',
    instructor: 'Prof. Ananya Sen',
    department: 'Computer Science',
    semester: 'Semester IV',
    color: 'from-emerald-600 to-teal-600',
    iconName: 'Database',
    progress: 52,
    modules: [
      {
        id: 'dbm1',
        title: 'Module 1: Relational Schema & Normalization',
        duration: '3 hours',
        topics: [
          {
            id: 'dbt1',
            title: 'Functional Dependencies & Normal Forms (1NF to BCNF)',
            completed: true,
            content: 'Database normalization organizes columns and relations of a relational database to reduce data redundancy and improve data integrity. 1NF eliminates repeating groups; 2NF eliminates partial dependency on composite keys; 3NF eliminates transitive dependencies; BCNF enforces that for every X -> Y, X must be a super key.',
            keyTakeaways: [
              '1NF: Atomic values only, unique rows',
              '2NF: 1NF + No partial functional dependency on primary key',
              '3NF: 2NF + No transitive functional dependencies (A -> B, B -> C)',
              'BCNF: Every determinant is a candidate key'
            ],
            resources: [
              { title: 'Complete Normalization Cheat Sheet', type: 'pdf', url: '#', readTime: '10 min' }
            ]
          },
          {
            id: 'dbt2',
            title: 'ACID Properties & Transaction Isolation Levels',
            completed: true,
            content: 'ACID stands for Atomicity (all or nothing), Consistency (preserves invariants), Isolation (concurrent transactions execute safely), and Durability (committed changes persist). Isolation levels range from Read Uncommitted, Read Committed, Repeatable Read, to Serializable.',
            keyTakeaways: [
              'Dirty Read: Reading uncommitted changes from another transaction',
              'Non-repeatable Read: Re-reading same row returns different value',
              'Phantom Read: Re-executing range query yields newly inserted rows'
            ],
            resources: [
              { title: 'PostgreSQL Isolation Levels Explained', type: 'doc', url: '#', readTime: '6 min' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cs410',
    code: 'CS410',
    title: 'Full-Stack Web Development',
    instructor: 'Er. Viplov Kumar',
    department: 'Information Technology',
    semester: 'Semester V',
    color: 'from-amber-500 to-orange-600',
    iconName: 'Globe',
    progress: 85,
    modules: [
      {
        id: 'webm1',
        title: 'Module 1: Modern React 19 & Architecture',
        duration: '4 hours',
        topics: [
          {
            id: 'webt1',
            title: 'React Server Actions & Optimistic UI',
            completed: true,
            content: 'React Server Components enable rendering components on the server while streaming HTML. With Server Actions, client forms invoke server-side operations seamlessly. useOptimistic allows immediate UI updates before network completion for lightning-fast responsiveness.',
            keyTakeaways: [
              'Zero client bundle size for Server Components',
              'Direct database and microservice access on server',
              'Automatic state synchronization with optimistic rollbacks'
            ],
            resources: [
              { title: 'React 19 Hooks & Server Actions Deep Dive', type: 'video', url: '#', readTime: '20 min' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cs420',
    code: 'CS420',
    title: 'Computer Networks & Security',
    instructor: 'Dr. Vivek Verma',
    department: 'Computer Science',
    semester: 'Semester V',
    color: 'from-purple-600 to-pink-600',
    iconName: 'Shield',
    progress: 40,
    modules: [
      {
        id: 'netm1',
        title: 'Module 1: Transport Layer & TCP Handshake',
        duration: '2.5 hours',
        topics: [
          {
            id: 'nett1',
            title: 'TCP 3-Way Handshake & Congestion Control',
            completed: true,
            content: 'TCP establishes reliable connections through SYN -> SYN-ACK -> ACK. Flow control uses sliding window buffers, while congestion control employs Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery.',
            keyTakeaways: [
              'SYN, SYN+ACK, ACK connection establishment',
              'AIMD: Additive Increase / Multiplicative Decrease algorithm',
              'TCP Tahoe vs Reno vs BBR congestion control'
            ],
            resources: [
              { title: 'Wireshark Packet Analysis Notes', type: 'pdf', url: '#', readTime: '8 min' }
            ]
          }
        ]
      }
    ]
  }
];

export const INITIAL_FLASHCARD_DECKS: FlashcardDeck[] = [
  {
    id: 'deck-dsa',
    title: 'DSA Core Algorithms & Complexities',
    courseCode: 'CS201',
    category: 'Computer Science',
    cards: [
      {
        id: 'c1',
        question: 'What is the average and worst-case time complexity of QuickSort?',
        answer: 'Average: O(n log n)\nWorst-case: O(n²) when the chosen pivot is consistently the smallest or largest element (e.g. sorted array without randomized pivot).',
        hint: 'Think about bad pivot partitionings.',
        mastery: 'mastered'
      },
      {
        id: 'c2',
        question: 'How do you detect a cycle in a linked list in O(1) auxiliary space?',
        answer: "Floyd's Tortoise and Hare Cycle-Finding Algorithm. Maintain two pointers: a slow pointer advancing 1 node at a time, and a fast pointer advancing 2 nodes. If they meet, a cycle exists.",
        codeExample: 'let slow = head, fast = head;\nwhile (fast && fast.next) {\n  slow = slow.next;\n  fast = fast.next.next;\n  if (slow === fast) return true;\n}\nreturn false;',
        hint: 'Use two pointers moving at different speeds.',
        mastery: 'learning'
      },
      {
        id: 'c3',
        question: 'What is the difference between Dijkstra and Bellman-Ford algorithms?',
        answer: 'Dijkstra finds single-source shortest paths on graphs with non-negative edge weights in O((V + E) log V). Bellman-Ford works with negative weight edges and detects negative weight cycles in O(V * E).',
        hint: 'Can Dijkstra handle negative weight cycles?',
        mastery: 'new'
      },
      {
        id: 'c4',
        question: 'What is the time complexity of building a Binary Heap from an unordered array of N elements?',
        answer: 'O(N) using bottom-up sift-down (Floyd algorithm), NOT O(N log N). Because higher levels with more nodes do fewer operations.',
        hint: 'Notice that mathematical sum converges to 2N.',
        mastery: 'learning'
      }
    ]
  },
  {
    id: 'deck-dbms',
    title: 'DBMS & SQL High-Yield Concepts',
    courseCode: 'CS305',
    category: 'Databases',
    cards: [
      {
        id: 'c5',
        question: 'What constitutes BCNF (Boyce-Codd Normal Form)?',
        answer: 'A relation is in BCNF if and only if for every non-trivial functional dependency X -> Y, X is a superkey of the relation.',
        hint: 'It is a stricter version of 3NF.',
        mastery: 'mastered'
      },
      {
        id: 'c6',
        question: 'What is a B+ Tree and why is it preferred over B-Trees for database indices?',
        answer: 'In a B+ Tree, all data records are stored exclusively in the leaf nodes, which are linked together in a sequential linked list. Internal nodes only store routing keys. This allows fast range scans and higher branching factors per disk block.',
        hint: 'Consider range queries like WHERE age BETWEEN 20 AND 30.',
        mastery: 'learning'
      },
      {
        id: 'c7',
        question: 'Explain the difference between clustered and non-clustered index.',
        answer: 'A clustered index determines the physical order of data rows on disk (only one clustered index per table). A non-clustered index creates a separate structure containing indexed columns and pointers to the physical data rows.',
        hint: 'Like a dictionary vs the index at the back of a textbook.',
        mastery: 'learning'
      }
    ]
  },
  {
    id: 'deck-networks',
    title: 'Computer Networks & Protocols',
    courseCode: 'CS420',
    category: 'Networking',
    cards: [
      {
        id: 'c8',
        question: 'What happens during the TCP 4-Way Handshake for termination?',
        answer: '1. Client sends FIN\n2. Server sends ACK\n3. Server finishes remaining data, sends FIN\n4. Client sends ACK and enters TIME_WAIT state (typically 2 MSL).',
        hint: 'Both sides must close their respective simplex channels.',
        mastery: 'new'
      },
      {
        id: 'c9',
        question: 'What is the key difference between HTTP/1.1, HTTP/2, and HTTP/3?',
        answer: 'HTTP/1.1 uses persistent TCP with head-of-line blocking. HTTP/2 introduces binary framing and multiplexing over single TCP connection. HTTP/3 replaces TCP with QUIC over UDP to eliminate transport-layer head-of-line packet loss blocking.',
        hint: 'Transport protocols change from TCP to UDP.',
        mastery: 'mastered'
      }
    ]
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-dsa-1',
    title: 'Data Structures Checkpoint: Trees & Graphs',
    courseCode: 'CS201',
    difficulty: 'Intermediate',
    timeLimitMinutes: 10,
    questions: [
      {
        id: 'q1',
        question: 'What is the maximum number of nodes at level L in a binary tree (root at level 0)?',
        options: ['2^L', '2^(L+1) - 1', 'L^2', '2^(L-1)'],
        correctIndex: 0,
        explanation: 'At level 0, there is 2^0 = 1 node. At level 1, 2^1 = 2 nodes. In general, at level L, there are 2^L nodes.'
      },
      {
        id: 'q2',
        question: 'In an AVL Tree, when is a Left-Right (LR) double rotation performed?',
        options: [
          'When a node is inserted into the right subtree of the right child',
          'When a node is inserted into the left subtree of the left child',
          'When a node is inserted into the right subtree of the left child',
          'When the tree has equal numbers of black and red nodes'
        ],
        correctIndex: 2,
        explanation: 'An LR rotation is performed when a newly inserted node causes an imbalance because it was inserted into the right subtree of the left child (Balance Factor = +2, Child BF = -1).'
      },
      {
        id: 'q3',
        question: 'Which graph traversal algorithm uses a First-In, First-Out (FIFO) queue?',
        options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Topological Sort', 'Tarjan Algorithm'],
        correctIndex: 1,
        explanation: 'BFS explores vertices level by level using a FIFO Queue, whereas DFS uses a LIFO Stack (or recursion stack).'
      },
      {
        id: 'q4',
        question: 'What is the worst-case space complexity of storing an undirected graph with V vertices and E edges using an Adjacency Matrix?',
        options: ['O(V + E)', 'O(V^2)', 'O(E^2)', 'O(V * E)'],
        correctIndex: 1,
        explanation: 'An adjacency matrix is a 2D V x V matrix, consuming strictly O(V^2) space regardless of the number of edges.'
      }
    ]
  },
  {
    id: 'quiz-dbms-1',
    title: 'DBMS SQL & Transaction Isolation Challenge',
    courseCode: 'CS305',
    difficulty: 'Intermediate',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'dbq1',
        question: 'Which normal form eliminates transitive functional dependencies?',
        options: ['1NF', '2NF', '3NF', '4NF'],
        correctIndex: 2,
        explanation: '3NF requires that the relation is in 2NF and no non-prime attribute is transitively dependent on any candidate key.'
      },
      {
        id: 'dbq2',
        question: 'Which transaction anomaly is permitted under the READ COMMITTED isolation level?',
        options: ['Dirty Read', 'Non-Repeatable Read', 'Dirty Write', 'Cascading Rollback'],
        correctIndex: 1,
        explanation: 'READ COMMITTED prevents dirty reads by only reading committed data. However, if another transaction commits an update between two reads, the value changes (Non-Repeatable Read).'
      }
    ]
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    title: 'Lab 4: AVL Tree Balance Visualizer Implementation',
    courseCode: 'CS201',
    dueDate: '2026-10-08',
    status: 'in_progress',
    priority: 'high',
    notes: 'Implement insertion and left/right rotations. Test with 15 unbalanced sequences.'
  },
  {
    id: 'a2',
    title: 'Mini-Project: Student Academic Portal ERD & BCNF Normalization',
    courseCode: 'CS305',
    dueDate: '2026-10-12',
    status: 'todo',
    priority: 'high',
    notes: 'Submit full schema diagram and SQL DDL scripts with foreign key constraints.'
  },
  {
    id: 'a3',
    title: 'Packet Sniffing & TCP Congestion Report',
    courseCode: 'CS420',
    dueDate: '2026-10-15',
    status: 'todo',
    priority: 'medium',
    notes: 'Capture 3-way handshake in Wireshark and measure packet RTT latency.'
  },
  {
    id: 'a4',
    title: 'Weekly Problem Set 3: DP on Trees',
    courseCode: 'CS201',
    dueDate: '2026-10-04',
    status: 'completed',
    priority: 'medium',
    notes: 'Submitted on college portal. Score: 98/100.',
    score: '98%'
  }
];

export const INITIAL_COMMUNITY_NOTES: CommunityNote[] = [
  {
    id: 'n1',
    title: 'Master Cheat Sheet: Time & Space Complexities for All Standard Data Structures',
    author: 'Viplov Kumar',
    courseCode: 'CS201',
    topic: 'Data Structures',
    tags: ['DSA', 'CheatSheet', 'ExamReady', 'Placements'],
    upvotes: 42,
    hasUpvoted: false,
    date: 'Oct 1, 2026',
    content: `Essential table for midterms and placement tests:
- Array: Access O(1), Search O(n), Insertion/Deletion O(n)
- Singly Linked List: Access O(n), Search O(n), Insert/Delete at head O(1)
- Binary Search Tree: Avg O(log n), Worst O(n)
- AVL / Red-Black: Guaranteed O(log n) for Search, Insert, Delete
- Hash Table: Avg O(1), Worst O(n)
- Min/Max Heap: Peek O(1), Extract-Min/Max O(log n), Build-Heap O(n)`,
    snippet: `// Heapify bottom-up O(n)
for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
  siftDown(arr, n, i);
}`
  },
  {
    id: 'n2',
    title: 'SQL Query Optimization: When does Postgres ignore your index?',
    author: 'Priya Mehta',
    courseCode: 'CS305',
    topic: 'SQL Performance',
    tags: ['DBMS', 'PostgreSQL', 'Indexes'],
    upvotes: 29,
    hasUpvoted: false,
    date: 'Sep 29, 2026',
    content: `Key scenarios where PostgreSQL optimizer prefers a Sequential Scan over an Index Scan:
1. Wrapping indexed column inside a function: WHERE LOWER(email) = '...' (use expression index instead!)
2. Table is very small (fewer than a few hundred disk pages; seq scan is faster due to disk cache)
3. Low selectivity queries returning >20-30% of total rows
4. Leading wildcards in LIKE queries: WHERE name LIKE '%john' (B-Tree index cannot be used; use trigram GIN index)`,
    snippet: `CREATE INDEX idx_users_lower_email ON users (LOWER(email));
-- Now WHERE LOWER(email) = 'abc@test.com' uses Index Scan!`
  },
  {
    id: 'n3',
    title: 'Quick Guide: CIDR Subnetting & IP Address Calculations',
    author: 'Aman Dixit',
    courseCode: 'CS420',
    topic: 'Computer Networks',
    tags: ['Networking', 'Subnetting', 'ExamPrep'],
    upvotes: 18,
    hasUpvoted: false,
    date: 'Sep 27, 2026',
    content: `Calculating Usable Hosts & Subnet Masks for /N CIDR:
1. Number of host bits = 32 - N
2. Total IP addresses in subnet = 2^(32 - N)
3. Usable host addresses = 2^(32 - N) - 2 (subtract Network ID and Broadcast Address)
Example for /26:
Host bits = 32 - 26 = 6 bits.
Total IPs = 2^6 = 64. Usable hosts = 64 - 2 = 62.
Subnet mask: 255.255.255.192`
  }
];
