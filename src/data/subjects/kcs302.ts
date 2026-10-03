import { Subject } from '../../types';

export const kcs302Subject: Subject = {
  id: 'kcs302',
  code: 'KCS-302',
  name: 'Computer Organization & Architecture',
  shortName: 'COA',
  semester: 3,
  credits: 4,
  type: 'CORE_THEORY',
  hasLab: true,
  labCode: 'KCS-352',
  description: 'Hardware architecture, functional units, bus systems, arithmetic circuits, Booth algorithm, memory hierarchy, cache mapping, pipelining, and I/O DMA mechanisms.',
  color: '#b91c1c',
  referenceBooks: [
    'Computer System Architecture by M. Mano',
    'Computer Organization and Embedded Systems by Carl Hamacher',
    'Computer Architecture: A Quantitative Approach by Hennessy & Patterson'
  ],
  units: [
    {
      id: 'kcs302-u1',
      unitNumber: 1,
      title: 'Register Transfer & Microoperations',
      description: 'Register transfer language, bus and memory transfers, arithmetic microoperations, logic microoperations, shift microoperations, and ALU design.',
      subjectId: 'kcs302',
      pyqCount: 20,
      topics: [
        {
          id: 'coa-common-bus',
          name: 'Common Bus System Design (MUX vs Tri-State Buffers)',
          unitId: 'kcs302-u1',
          subjectId: 'kcs302',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 45,
          prerequisites: ['Basic Digital Logic', 'Multiplexers', 'Registers'],
          nextTopics: ['Instruction Formats', 'CPU Timing & Control'],
          quickExplanation: 'A Common Bus System provides a shared transmission highway for multiple registers, preventing point-to-point wiring between every register pair. Constructed using Multiplexers or Three-State Bus Buffers.',
          deepExplanation: 'If a computer has k registers of n bits each, connecting every register directly requires k*(k-1) wire paths. A common bus uses n multiplexers (each of size k x 1) with selection lines S_0, S_1... to select one register at a time to place its bits onto the n-line bus. Alternatively, tri-state buffers use high-impedance state (Hi-Z) to disconnect unused registers.',
          whyItMatters: 'Every modern microprocessor bus architecture (PCIe, ARM AMBA) dictates memory throughput and bandwidth.',
          coreConceptsList: [
            'Number of MUXes required = register word size n',
            'Size of each MUX = number of registers k (k x 1)',
            'Selection lines = log2(k)',
            'Tri-state logic states: 0, 1, and High-Impedance (Hi-Z)'
          ],
          visualDiagram: `Registers: AR, PC, DR, AC (4 registers of 4 bits each)
Number of MUXes: 4 MUXes (for bit 0, 1, 2, 3), Size: 4 x 1
Selection inputs: S1, S0`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: '8 registers of 16 bits each. Find number and size of MUXes.',
            stepByStepSolution: [
              'Word size n = 16 bits -> 16 Multiplexers required',
              'Number of registers k = 8 -> Size = 8 x 1 MUX',
              'Selection lines = log2(8) = 3 lines (S2, S1, S0)'
            ],
            explanation: 'Number of MUXes is determined by word width, size by register count.'
          },
          commonMistakes: ['Confusing number of MUXes with register count.'],
          examPerspective: {
            twoMarks: 'How many MUXes of what size for 16 registers of 32 bits each?',
            fiveMarks: 'Explain common bus construction using three-state buffers and decoder.',
            tenMarks: 'Draw block diagram of bus system for four 4-bit registers with function table.',
            highYieldKeywords: ['RTL', 'Multiplexer Bus', 'Tri-State', 'Hi-Z', 'Selection Lines']
          },
          activeRecallPrompt: {
            question: 'What hardware parameter determines the number of multiplexers in a common bus?',
            idealAnswer: 'The word size n (number of bits in each register).',
            keyPoints: ['Word size = number of MUXes']
          },
          feynmanPrompt: 'Explain a common bus like a single-lane bridge with a traffic light for registers.',
          examWeightage: { twoMarkFreq: 6, fiveMarkFreq: 5, tenMarkFreq: 6, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs302-u2',
      unitNumber: 2,
      title: 'CPU Design, Addressing Modes & Pipelining',
      description: 'Instruction codes, computer registers, instruction cycle, addressing modes, RISC vs CISC, and arithmetic/instruction pipelining.',
      subjectId: 'kcs302',
      pyqCount: 26,
      topics: [
        {
          id: 'coa-addressing-modes',
          name: 'Addressing Modes with Numerical Calculations',
          unitId: 'kcs302-u2',
          subjectId: 'kcs302',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 50,
          prerequisites: ['Instruction Formats', 'Effective Address Concept'],
          nextTopics: ['Pipelining Hazards'],
          quickExplanation: 'Addressing Modes specify the rule for interpreting or modifying the address field before the operand is referenced. The calculated address is the Effective Address (EA).',
          deepExplanation: 'Major modes tested in AKTU: Immediate (operand in instruction), Direct (EA = Address), Indirect (EA = M[Address]), Register (EA = R), Register Indirect (EA = [R]), Relative (EA = PC + Address), Indexed (EA = XR + Address).',
          whyItMatters: 'Compilers choose addressing modes to optimize array accesses, pointers, and function parameter passing.',
          coreConceptsList: [
            'Effective Address (EA) calculation formulas',
            'Relative addressing for position-independent code',
            'Indexed addressing for array indexing',
            'Memory reference cycle overhead for indirect modes'
          ],
          visualDiagram: `Direct:    [OPCODE | 500] -> Memory[500] = OPERAND
Indirect:  [OPCODE | 500] -> Memory[500] = 800 -> Memory[800] = OPERAND`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'PC=200, XR=100. Address field=500. Find EA for Direct, Relative, Indexed.',
            stepByStepSolution: [
              'Direct: EA = 500',
              'Relative: EA = PC + 500 = 200 + 500 = 700',
              'Indexed: EA = XR + 500 = 100 + 500 = 600'
            ],
            explanation: 'Each mode applies its specific offset formula to find physical memory target.'
          },
          commonMistakes: ['Confusing Effective Address with the Operand itself.'],
          examPerspective: {
            twoMarks: 'Define Effective Address. Differentiate Direct vs Indirect mode.',
            fiveMarks: 'Explain Relative and Indexed addressing modes with formulas.',
            tenMarks: 'Solve full addressing mode table for memory and register values.',
            highYieldKeywords: ['Effective Address', 'Immediate', 'Direct', 'Indirect', 'Relative', 'Indexed']
          },
          activeRecallPrompt: {
            question: 'How many memory access cycles are needed to fetch the operand in Indirect mode?',
            idealAnswer: 'Two memory access cycles: one to fetch the EA, second to fetch the operand.',
            keyPoints: ['Two reads for Indirect']
          },
          feynmanPrompt: 'Explain indirect addressing like following a treasure map clue that tells you which box holds the key.',
          examWeightage: { twoMarkFreq: 8, fiveMarkFreq: 6, tenMarkFreq: 7, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs302-u3',
      unitNumber: 3,
      title: 'Computer Arithmetic & Booth Algorithm',
      description: "Addition and subtraction with signed-2's complement, Booth's multiplication algorithm, array multiplier, restoring and non-restoring division, and IEEE 754 floating point format.",
      subjectId: 'kcs302',
      pyqCount: 32,
      topics: [
        {
          id: 'coa-booth-algo',
          name: "Booth's Multiplication Algorithm for Signed 2's Complement",
          unitId: 'kcs302-u3',
          subjectId: 'kcs302',
          difficulty: 'HARD',
          importance: 'CRITICAL',
          estimatedMinutes: 60,
          prerequisites: ["Signed 2's Complement Arithmetic", 'Arithmetic Right Shift (ASR)'],
          nextTopics: ['Restoring Division', 'IEEE 754 Format'],
          quickExplanation: "Booth's algorithm multiplies two signed binary numbers in 2's complement notation by treating strings of 1's as (2^n - 2^m), using flip-flop Q_n+1 and arithmetic right shifts.",
          deepExplanation: "Inspects (Q0, Q_n+1): if '10', subtract multiplicand M (A = A - M) then ASR. If '01', add M (A = A + M) then ASR. If '00' or '11', only perform ASR on [A, Q, Q_n+1]. Repeat for n cycles. The product is in [A, Q].",
          whyItMatters: 'Accelerates hardware multiplication when multipliers contain consecutive 1s.',
          coreConceptsList: [
            'Registers: A (initially 0), M (Multiplicand), Q (Multiplier), Q_n+1 (0)',
            'Condition 10: A = A - M, then ASR',
            'Condition 01: A = A + M, then ASR',
            'Condition 00 & 11: Only ASR (Arithmetic Shift Right preserves sign bit)'
          ],
          visualDiagram: `(Q0, Q_n+1):
  10 -> A = A - M, then ASR
  01 -> A = A + M, then ASR
  00 or 11 -> Only ASR`,
          visualDiagramType: 'flowchart',
          workedExample: {
            problem: 'Multiply (+7) by (-3) using Booth Algorithm in 5 bits.',
            stepByStepSolution: [
              'M = +7 = 00111, -M = 11001, Q = -3 = 11101, Q_n+1 = 0, Count = 5',
              'Cycle 1: (1, 0) -> A = A - M = 11001. ASR: A=11100, Q=11110, Q_n+1=1',
              'Cycle 2: (0, 1) -> A = A + M = 00011. ASR: A=00001, Q=11111, Q_n+1=0',
              'Cycle 3: (1, 0) -> A = A - M = 11010. ASR: A=11101, Q=01111, Q_n+1=1',
              'Cycle 4: (1, 1) -> Only ASR: A=11110, Q=10111, Q_n+1=1',
              'Cycle 5: (1, 1) -> Only ASR: A=11111, Q=01011, Q_n+1=1',
              'Result [A, Q] = 1111101011 (Decimal -21)'
            ],
            explanation: 'Verified: 7 * (-3) = -21.'
          },
          commonMistakes: ['Using logical shift right instead of Arithmetic Right Shift.'],
          examPerspective: {
            twoMarks: "Advantage of Booth's algorithm over shift-and-add?",
            fiveMarks: "Draw the flowchart of Booth's multiplication algorithm.",
            tenMarks: 'Multiply (-9) by (-6) showing full register trace in tabular format.',
            highYieldKeywords: ["Booth's Algorithm", "2's Complement", "ASR", "Sign bit"]
          },
          activeRecallPrompt: {
            question: "What microoperation is executed when (Q0, Q_n+1) is 10 in Booth's algorithm?",
            idealAnswer: 'A = A - M followed by Arithmetic Right Shift (ASR).',
            keyPoints: ['Subtraction A - M', 'Arithmetic Right Shift']
          },
          feynmanPrompt: 'Explain Booth algorithm using multiplication by 99 as (100 - 1).',
          examWeightage: { twoMarkFreq: 9, fiveMarkFreq: 8, tenMarkFreq: 9, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs302-u4',
      unitNumber: 4,
      title: 'Memory Organization & Cache Mapping',
      description: 'Memory hierarchy, Main memory, Auxiliary memory, Associative memory, Cache memory (Direct, Associative, Set-Associative mapping), Cache write policies, and Virtual memory.',
      subjectId: 'kcs302',
      pyqCount: 28,
      topics: [
        {
          id: 'coa-cache-mapping',
          name: 'Cache Memory Mapping (Direct, Associative, Set-Associative)',
          unitId: 'kcs302-u4',
          subjectId: 'kcs302',
          difficulty: 'HARD',
          importance: 'CRITICAL',
          estimatedMinutes: 60,
          prerequisites: ['Memory Hierarchy', 'Binary Addressing'],
          nextTopics: ['Virtual Memory & Page Tables'],
          quickExplanation: 'Cache mapping determines how main memory blocks are placed into cache slots. The three techniques are Direct Mapping, Fully Associative, and Set-Associative mapping.',
          deepExplanation: 'In Direct Mapping, block maps to block_no % num_lines: address is [Tag | Line Index | Word Offset]. In k-Way Set-Associative, cache is divided into sets of k lines: address is [Tag | Set Index | Word Offset]. Write policies: Write-Through vs Write-Back.',
          whyItMatters: 'Memory latency dominates modern processor performance; cache design bridges CPU and RAM speed.',
          coreConceptsList: [
            'Direct: Line = Block % Total Lines',
            'Set-Associative: Set = Block % Number of Sets',
            'Address field calculations (Tag, Index, Offset bits)',
            'Write-Through vs Write-Back policies'
          ],
          visualDiagram: `Direct Address:         [Tag | Line Index | Word Offset]
Set-Associative Address: [Tag | Set Index  | Word Offset]`,
          visualDiagramType: 'memory_layout',
          workedExample: {
            problem: '4KB cache, 64-byte lines, 1MB memory. Find Tag, Index, Offset for Direct & 4-Way Set-Associative.',
            stepByStepSolution: [
              '1MB = 2^20 bytes -> Address = 20 bits. Line = 64 bytes = 2^6 -> Offset = 6 bits.',
              'Direct: Cache lines = 4096 / 64 = 64 = 2^6 -> Index = 6 bits. Tag = 20 - (6+6) = 8 bits.',
              '4-Way: Sets = 64 / 4 = 16 = 2^4 -> Set Index = 4 bits. Tag = 20 - (4+6) = 10 bits.'
            ],
            explanation: 'Set associative combines speed of direct with hit rate of associative.'
          },
          commonMistakes: ['Calculating offset based on cache size instead of line size.'],
          examPerspective: {
            twoMarks: 'Differentiate Write-Through and Write-Back policies.',
            fiveMarks: 'Explain Direct and Set-Associative mapping with address formats.',
            tenMarks: 'Solve cache numerical for tag, set index, and offset bits with hit ratio.',
            highYieldKeywords: ['Cache Line', 'Set-Associative', 'Tag', 'Write-Through', 'Write-Back']
          },
          activeRecallPrompt: {
            question: 'How is the number of sets calculated in k-way set-associative cache?',
            idealAnswer: 'Number of Sets = Total Cache Lines / Associativity k.',
            keyPoints: ['Total lines divided by k']
          },
          feynmanPrompt: 'Explain cache mapping like organizing books on shelves by exact number vs grouped categories.',
          examWeightage: { twoMarkFreq: 7, fiveMarkFreq: 6, tenMarkFreq: 8, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kcs302-u5',
      unitNumber: 5,
      title: 'Input-Output Organization & DMA',
      description: 'Peripheral devices, I/O interface, Asynchronous data transfer (Strobe and Handshaking), Modes of transfer, Priority Interrupt, Direct Memory Access (DMA controller).',
      subjectId: 'kcs302',
      pyqCount: 22,
      topics: [
        {
          id: 'coa-dma-controller',
          name: 'Direct Memory Access (DMA) & Transfer Modes',
          unitId: 'kcs302-u5',
          subjectId: 'kcs302',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 45,
          prerequisites: ['Bus Control Lines', 'Interrupt Mechanism'],
          nextTopics: ['I/O Processors'],
          quickExplanation: 'Direct Memory Access (DMA) allows high-speed I/O devices to transfer data directly to/from memory without CPU involvement, freeing the CPU for computation.',
          deepExplanation: 'The DMA Controller (DMAC) takes over buses via Bus Request (BR) and Bus Grant (BG) handshakes. Modes: Burst Transfer (entire block transferred while CPU halted), Cycle Stealing (DMA steals one memory cycle at a time between CPU cycles).',
          whyItMatters: 'NVMe SSDs, GPUs, and network cards require DMA to sustain gigabyte-per-second throughput.',
          coreConceptsList: [
            'DMA Controller registers: Address Register, Word Count Register, Control Register',
            'Bus arbitration: Bus Request (BR) and Bus Grant (BG)',
            'Transfer modes: Burst Transfer vs Cycle Stealing'
          ],
          visualDiagram: `[CPU] <--- BR / BG ---> [DMA Controller] <--- DMA Req/Ack ---> [Disk/NIC]
                              |
                        [Memory (RAM)]`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Contrast Cycle Stealing with Burst Mode DMA.',
            stepByStepSolution: [
              'Cycle Stealing: DMAC steals one cycle per transfer. CPU is not frozen for long periods.',
              'Burst Mode: DMAC holds continuous bus control until entire block is transferred. CPU is halted.'
            ],
            explanation: 'Cycle stealing keeps CPU responsive during slow transfers.'
          },
          commonMistakes: ['Thinking CPU executes normally during burst DMA.'],
          examPerspective: {
            twoMarks: 'What is cycle stealing in DMA?',
            fiveMarks: 'Draw block diagram of DMA controller and explain registers.',
            tenMarks: 'Explain sequence of operations in DMA transfer with timing signals.',
            highYieldKeywords: ['DMA Controller', 'Bus Request', 'Bus Grant', 'Cycle Stealing', 'Burst Mode']
          },
          activeRecallPrompt: {
            question: 'What registers are present inside a standard DMA controller?',
            idealAnswer: 'Address Register, Word Count Register, and Control/Status Register.',
            keyPoints: ['Address Register', 'Word Count Register', 'Control Register']
          },
          feynmanPrompt: 'Explain DMA like hiring movers so the homeowner does not have to carry every box.',
          examWeightage: { twoMarkFreq: 6, fiveMarkFreq: 5, tenMarkFreq: 5, frequentlyAsked: true }
        }
      ]
    }
  ]
};
