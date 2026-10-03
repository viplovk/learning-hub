import { StudyMaterialDoc } from '../types';

export const INITIAL_STUDY_MATERIALS: StudyMaterialDoc[] = [
  {
    id: 'mat-01',
    name: 'AKTU Official B.Tech CSE 2nd Year Syllabus 2023-24',
    fileName: 'B.Tech_2nd_Yr_CSE_v3.pdf',
    subjectId: 'kcs301',
    fileSize: '1.4 MB',
    type: 'PDF',
    uploadDate: '2026-09-15',
    extractedConcepts: [
      'Data Structures Course Outcomes',
      'Computer Organization Units 1-5',
      'Discrete Structures Modules',
      'Lab syllabus for KCS-351, 352, 353'
    ],
    mappedTopicIds: ['ds-stack-appl', 'ds-circular-queue', 'ds-avl-trees', 'ds-dijkstra', 'coa-booth-algo', 'coa-cache-mapping']
  },
  {
    id: 'mat-02',
    name: 'Cyber Security Unit 1-4 Teacher Lecture Slides & Case Studies',
    fileName: 'Cyber_Security_IEC_SecC_Unit1_4.pdf',
    subjectId: 'bcc301',
    unitNumber: 1,
    fileSize: '4.8 MB',
    type: 'PPT',
    uploadDate: '2026-09-22',
    extractedConcepts: [
      'CIA Triad & Threat Modeling',
      'Malware Taxonomies (Ransomware, Worms)',
      'Indian IT Act 2000 Section 66-67 Details',
      'Digital Signatures & Certifying Authorities'
    ],
    mappedTopicIds: ['csec-cia-triad', 'csec-crypto-basics', 'csec-it-act-2000']
  },
  {
    id: 'mat-03',
    name: 'COA Handwritten Class Notes by Viplov (Section C)',
    fileName: 'COA_Viplov_Notes_Unit1_3.pdf',
    subjectId: 'kcs302',
    unitNumber: 3,
    fileSize: '8.2 MB',
    type: 'HANDWRITTEN',
    uploadDate: '2026-09-29',
    extractedConcepts: [
      'Common Bus MUX Formulas',
      "Booth's Algorithm Tabular Dry Run",
      'Cache Mapping Tag Bit Numerical Tricks'
    ],
    mappedTopicIds: ['coa-common-bus', 'coa-addressing-modes', 'coa-booth-algo', 'coa-cache-mapping']
  },
  {
    id: 'mat-04',
    name: 'AKTU Previous Year Solved Papers (2020-2024 Archive)',
    fileName: 'AKTU_CSE_3rd_Sem_PYQ_Solved_2020_2024.pdf',
    subjectId: 'kcs301',
    fileSize: '12.5 MB',
    type: 'QUESTION_BANK',
    uploadDate: '2026-09-25',
    extractedConcepts: [
      'High Frequency 10-Mark Questions',
      '2-Mark Mandatory Section A Solved',
      'Marking scheme rubrics'
    ],
    mappedTopicIds: ['ds-stack-appl', 'ds-avl-trees', 'coa-booth-algo', 'm4-lagrange-pde', 'csec-cia-triad']
  }
];
