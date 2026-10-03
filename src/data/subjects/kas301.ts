import { Subject } from '../../types';

export const kas301Subject: Subject = {
  id: 'kas301',
  code: 'KAS-301',
  name: 'Technical Communication',
  shortName: 'TC',
  semester: 3,
  credits: 2,
  type: 'CORE_THEORY',
  hasLab: false,
  description: 'Fundamentals of communication, 7 Cs, technical reports, technical proposals, research papers, oral presentation, and professional ethics.',
  color: '#b91c1c',
  referenceBooks: [
    'Technical Communication: Principles and Practice by Meenakshi Raman & Sangeeta Sharma',
    'Effective Technical Communication by M. Ashraf Rizvi',
    'Business Correspondence and Report Writing by R.C. Sharma & Krishna Mohan'
  ],
  units: [
    {
      id: 'kas301-u1',
      unitNumber: 1,
      title: 'Fundamentals of Technical Communication',
      description: 'Communication cycle, general vs technical communication, barriers to communication, and the 7 Cs of effective communication.',
      subjectId: 'kas301',
      pyqCount: 18,
      topics: [
        {
          id: 'tc-7cs',
          name: 'The 7 Cs of Effective Technical Communication & Barriers',
          unitId: 'kas301-u1',
          subjectId: 'kas301',
          difficulty: 'EASY',
          importance: 'HIGH',
          estimatedMinutes: 35,
          prerequisites: ['Basic English Grammar'],
          nextTopics: ['Technical Report Formats'],
          quickExplanation: 'The 7 Cs are the gold standard principles for professional engineering communication: Completeness, Conciseness, Consideration, Clarity, Concreteness, Courtesy, and Correctness.',
          deepExplanation: 'Technical communication is factual, objective, and precise. The 7 Cs eliminate ambiguity: Completeness (all facts), Conciseness (minimal words), Consideration ("You" attitude), Clarity (simple words), Concreteness (specific numbers over vague adjectives), Courtesy (respectful tone), Correctness (factual and grammatical precision). Barriers: Physical, Psychological, Semantic (language/jargon), and Organizational.',
          whyItMatters: 'API documentation, software architecture specifications, and pull request reviews succeed or fail based on technical clarity.',
          coreConceptsList: [
            '7 Cs: Completeness, Conciseness, Consideration, Clarity, Concreteness, Courtesy, Correctness',
            'Technical vs General Communication differences',
            'Semantic Barriers (jargon, double meanings)',
            '"You-Attitude" principle in professional correspondence'
          ],
          workedExample: {
            problem: 'Rewrite concretely: "The server response was very slow yesterday because of lots of traffic."',
            stepByStepSolution: [
              'Vague terms: "very slow", "yesterday", "lots of traffic".',
              'Concrete Rewrite: "On 02 October 2026 between 14:00 and 16:30 IST, API latency increased to 3,450 ms (nominal: 120 ms) due to an inbound volume of 45,000 requests/sec, exceeding capacity by 180%."'
            ],
            explanation: 'Concrete communication replaces ambiguous words with verifiable metrics and timestamps.'
          },
          commonMistakes: ['Confusing Conciseness with brevity that omits essential facts.'],
          examPerspective: {
            twoMarks: 'List the 7 Cs of technical communication.',
            fiveMarks: 'Distinguish between General Communication and Technical Communication with four parameters.',
            tenMarks: 'Explain the barriers to effective communication with examples and strategies to overcome them.',
            highYieldKeywords: ['7 Cs', 'You-Attitude', 'Semantic Barriers', 'Clarity', 'Conciseness']
          },
          activeRecallPrompt: {
            question: 'What is a Semantic Barrier in communication?',
            idealAnswer: 'A semantic barrier is a misunderstanding caused by words having multiple meanings, complex jargon, poorly chosen symbols, or linguistic ambiguity.',
            keyPoints: ['Language ambiguity', 'Jargon misunderstanding']
          },
          feynmanPrompt: 'Explain why telling an air traffic controller "be careful" is useless compared to "climb to 10,000 feet immediately" using the 7 Cs.',
          examWeightage: { twoMarkFreq: 8, fiveMarkFreq: 7, tenMarkFreq: 6, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kas301-u2',
      unitNumber: 2,
      title: 'Forms of Technical Writing',
      description: 'Technical reports, types of reports (Informational, Analytical, Periodic, Feasibility), Structure of a formal report, Project proposals, and Research papers (Abstract, Methodology, Results).',
      subjectId: 'kas301',
      pyqCount: 20,
      topics: [
        {
          id: 'tc-reports-proposals',
          name: 'Technical Reports Structure & Project Proposals',
          unitId: 'kas301-u2',
          subjectId: 'kas301',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 45,
          prerequisites: ['7 Cs of Communication'],
          nextTopics: ['Technical Style & Tone'],
          quickExplanation: 'A Technical Report is a formal, organized document presenting factual information and recommendations for decision-makers. Standard structure includes Front Matter, Main Body, and Back Matter.',
          deepExplanation: 'Front Matter: Title Page, Abstract / Executive Summary, Table of Contents, List of Figures. Main Body: Introduction, Literature Review, Methodology, Data Analysis & Findings, Conclusions, Recommendations. Back Matter: References (IEEE / APA format), Appendices. A Project Proposal adds cost estimation, milestones, and deliverable timelines.',
          whyItMatters: 'Software engineering design docs (RFCs) and project bidding proposals follow this exact formal structure.',
          coreConceptsList: [
            'Front Matter, Main Body, and Back Matter components',
            'Executive Summary writing (problem, solution, ROI in 1 page)',
            'Feasibility Report vs Progress Report',
            'Technical Proposal elements (Statement of Work, Budget, Milestones)'
          ],
          visualDiagram: `Formal Report Architecture:
[Front Matter] -> Title Page, Abstract, Table of Contents
       v
[Main Body]    -> Intro, Methodology, Findings, Recommendations
       v
[Back Matter]  -> References (IEEE), Appendices`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Outline the standard structure of a formal engineering project report.',
            stepByStepSolution: [
              '1. Title Page: Project title, author, institution, submission date.',
              '2. Executive Summary: Summary of problem, key methodology, findings, recommendation.',
              '3. Introduction: Background, scope, objectives, problem statement.',
              '4. Technical Body: Architecture, algorithms, implementation details, testing results.',
              '5. Conclusions & Recommendations: Final deductions and concrete next actions.',
              '6. References & Appendices: Citations in IEEE format and raw code/schematics.'
            ],
            explanation: 'Follows standard AKTU technical report formatting criteria.'
          },
          commonMistakes: ['Writing the Executive Summary as an introduction rather than a complete standalone summary.'],
          examPerspective: {
            twoMarks: 'What is an Executive Summary in a technical report?',
            fiveMarks: 'Differentiate between an Informational Report and an Analytical Report.',
            tenMarks: 'Explain the detailed structure and elements of a formal technical report with neat layout diagram.',
            highYieldKeywords: ['Technical Report', 'Executive Summary', 'Feasibility Report', 'IEEE Citation', 'Front Matter']
          },
          activeRecallPrompt: {
            question: 'What are the three broad divisions of a formal technical report?',
            idealAnswer: '1. Front Matter, 2. Main Body, 3. Back Matter.',
            keyPoints: ['Front Matter', 'Main Body', 'Back Matter']
          },
          feynmanPrompt: 'Explain an executive summary like a movie trailer that reveals the whole plot in 60 seconds.',
          examWeightage: { twoMarkFreq: 7, fiveMarkFreq: 6, tenMarkFreq: 8, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kas301-u3',
      unitNumber: 3,
      title: 'Technical Style, Brevity & Clarity',
      description: 'Sentence structure in technical writing, avoiding ambiguity and redundancies, active vs passive voice in engineering documents, paragraph cohesion, and objective tone.',
      subjectId: 'kas301',
      pyqCount: 16,
      topics: [
        {
          id: 'tc-style-tone',
          name: 'Technical Style: Active vs Passive Voice, Brevity & Objectivity',
          unitId: 'kas301-u3',
          subjectId: 'kas301',
          difficulty: 'EASY',
          importance: 'HIGH',
          estimatedMinutes: 35,
          prerequisites: ['Basic Grammar'],
          nextTopics: ['Oral Presentations'],
          quickExplanation: 'Technical style prioritizes clarity, conciseness, and objectivity over literary embellishment. Passive voice emphasizes the object/process rather than the actor, while active voice clarifies responsibility.',
          deepExplanation: 'Rules: 1. Brevity (eliminate redundancies like "at this point in time" -> "now", "red in color" -> "red"), 2. Passive voice in lab procedures ("10 ml of solution was added") vs Active voice in instructions ("Install the patch"), 3. Objectivity (avoid emotional assertions like "This revolutionary software" -> "This software achieves a 15% reduction in latency").',
          whyItMatters: 'Clean technical writing prevents catastrophic ambiguities in engineering specifications and user manuals.',
          coreConceptsList: [
            'Eliminating wordiness and tautologies',
            'Appropriate use of passive voice for scientific neutrality',
            'Parallelism in bullet points and procedure steps',
            'Objective data-driven statements vs subjective opinions'
          ],
          workedExample: {
            problem: 'Trim wordy technical sentence: "It is necessary that the operator must proceed to calibrate the device on a daily basis."',
            stepByStepSolution: [
              'Identify redundancies: "It is necessary that", "must proceed to", "on a daily basis".',
              'Concise Revision: "The operator must calibrate the device daily."'
            ],
            explanation: 'Reduced 16 words to 6 words while preserving 100% of the meaning.'
          },
          commonMistakes: ['Overusing passive voice to the point of creating confusing dangling modifiers.'],
          examPerspective: {
            twoMarks: 'When is passive voice preferred over active voice in technical writing?',
            fiveMarks: 'Explain the importance of brevity and objectivity in engineering documentation.',
            tenMarks: 'Identify common stylistic errors in technical writing and rewrite five wordy passages into concise technical prose.',
            highYieldKeywords: ['Brevity', 'Objectivity', 'Passive Voice', 'Tautology', 'Clarity']
          },
          activeRecallPrompt: {
            question: 'Why is passive voice traditionally used in scientific and laboratory reports?',
            idealAnswer: 'To emphasize the experiment or process itself rather than the person performing it, maintaining scientific objectivity.',
            keyPoints: ['Process emphasis', 'Neutral objectivity']
          },
          feynmanPrompt: 'Explain technical writing like cutting all the fluff out of a telegram because every extra word costs money.',
          examWeightage: { twoMarkFreq: 6, fiveMarkFreq: 5, tenMarkFreq: 5, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kas301-u4',
      unitNumber: 4,
      title: 'Presentation & Speaking Skills',
      description: 'Elements of effective oral presentation, audience analysis, visual aids, body language (Kinesics), vocal characteristics (Paralinguistics), and Group Discussion techniques.',
      subjectId: 'kas301',
      pyqCount: 18,
      topics: [
        {
          id: 'tc-presentations-gd',
          name: 'Oral Presentations, Kinesics, Proxemics & Group Discussions',
          unitId: 'kas301-u4',
          subjectId: 'kas301',
          difficulty: 'EASY',
          importance: 'HIGH',
          estimatedMinutes: 40,
          prerequisites: ['Communication Fundamentals'],
          nextTopics: ['Professional Ethics'],
          quickExplanation: 'Oral presentation effectiveness is governed by non-verbal communication: Kinesics (body language, posture, eye contact), Proxemics (space language), and Paralinguistics (voice modulation, pitch, tone).',
          deepExplanation: 'Albert Mehrabian 7-38-55 rule: communication impact is derived from 7% words, 38% vocal tone, and 55% body language. Group Discussions (GD) evaluate teamwork, active listening, leadership, and knowledge articulation under pressure. Techniques: Initiate constructively, synthesize opposing points, and conclude summarizing consensus.',
          whyItMatters: 'Placement campus interviews, client pitches, and technical demos depend directly on these delivery skills.',
          coreConceptsList: [
            'Kinesics: Eye contact, facial expressions, hand gestures',
            'Paralinguistics: Pitch, tempo, volume, pauses',
            'Proxemics: Intimate, personal, social, public distance zones',
            'Group Discussion roles: Initiator, Moderator, Summarizer'
          ],
          visualDiagram: `Non-Verbal Communication Pillars:
[KINESICS: Body Language & Eye Contact]
[PARALINGUISTICS: Voice Tone, Pitch & Pause]
[PROXEMICS: Physical Space & Distance]`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'What are the 4 spatial zones defined in Proxemics by Edward T. Hall?',
            stepByStepSolution: [
              '1. Intimate Distance: 0 to 1.5 feet (close personal relationships).',
              '2. Personal Distance: 1.5 to 4 feet (conversations among friends/colleagues).',
              '3. Social Distance: 4 to 12 feet (formal business meetings, interviews).',
              '4. Public Distance: 12 feet and beyond (public speeches, lectures).'
            ],
            explanation: 'Engineers maintain social distance in professional interviews and team meetings.'
          },
          commonMistakes: ['Confusing Kinesics (body language) with Proxemics (physical space).'],
          examPerspective: {
            twoMarks: 'Define Kinesics and Proxemics.',
            fiveMarks: 'Explain the role of voice modulation and pauses in an effective technical presentation.',
            tenMarks: 'Discuss strategies for excelling in a Group Discussion (GD) during engineering campus placement.',
            highYieldKeywords: ['Kinesics', 'Proxemics', 'Paralinguistics', 'Group Discussion', 'Eye Contact']
          },
          activeRecallPrompt: {
            question: 'What is the Social Distance zone defined in Proxemics?',
            idealAnswer: '4 to 12 feet, commonly used for formal business meetings and professional interviews.',
            keyPoints: ['4 to 12 feet', 'Formal business setting']
          },
          feynmanPrompt: 'Explain body language in a presentation like how a dog immediately knows if someone is confident or afraid without understanding words.',
          examWeightage: { twoMarkFreq: 8, fiveMarkFreq: 6, tenMarkFreq: 6, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'kas301-u5',
      unitNumber: 5,
      title: 'Professional Ethics & Netiquette',
      description: 'Engineering professional ethics, intellectual property rights, plagiarism and copyright infringement, cross-cultural communication, and digital communication etiquette (Netiquette).',
      subjectId: 'kas301',
      pyqCount: 16,
      topics: [
        {
          id: 'tc-ethics-netiquette',
          name: 'Professional Engineering Ethics, Plagiarism & Netiquette',
          unitId: 'kas301-u5',
          subjectId: 'kas301',
          difficulty: 'EASY',
          importance: 'HIGH',
          estimatedMinutes: 35,
          prerequisites: ['Basic Professional Understanding'],
          nextTopics: ['Career Communication'],
          quickExplanation: 'Professional ethics encompasses the moral principles governing an engineer conduct. Plagiarism is the unauthorized representation of another work as one own. Netiquette defines courteous electronic correspondence.',
          deepExplanation: 'Ethical standards in software engineering: honesty in reporting system flaws, protecting user privacy, avoiding conflict of interest. Plagiarism types: Direct, Mosaic/Patchwork, and Self-plagiarism (avoided by proper IEEE/APA citations). Netiquette guidelines: professional email subject lines, concise bodies, avoiding ALL CAPS (perceived as shouting), and confidentiality disclaimers.',
          whyItMatters: 'Academic integrity and legal compliance in software engineering protect against copyright lawsuits and career disqualification.',
          coreConceptsList: [
            'Plagiarism definition and citation ethics (IEEE style)',
            'Engineering Codes of Ethics (ACM / IEEE Code of Ethics)',
            'Netiquette: Professional email writing conventions',
            'Cross-cultural communication barriers and cultural sensitivity'
          ],
          workedExample: {
            problem: 'Write a professional email to a college professor requesting an extension on a Data Structures assignment.',
            stepByStepSolution: [
              'Subject: Request for Assignment Extension: KCS-301 - Viplov (CSE Sec C, Roll: 2300970100088)',
              'Salutation: Respected Prof. [Name],',
              'Body: State reason objectively, propose a concrete new submission date, attach progress made so far.',
              'Closing: Thank you for your consideration. Sincerely, Viplov, B.Tech CSE 2nd Yr Section C.'
            ],
            explanation: 'Professional email exhibits the 7 Cs: Clear subject line, courteous tone, and verifiable student details.'
          },
          commonMistakes: ['Assuming paraphrasing without citation is not plagiarism (paraphrasing still requires citation).'],
          examPerspective: {
            twoMarks: 'Define Plagiarism. How can it be prevented?',
            fiveMarks: 'Discuss the essential rules of email etiquette (Netiquette) in a corporate environment.',
            tenMarks: 'Explain the IEEE/ACM Code of Ethics for software engineers with real-world case studies.',
            highYieldKeywords: ['Ethics', 'Plagiarism', 'Netiquette', 'IEEE Citation', 'Copyright']
          },
          activeRecallPrompt: {
            question: 'What is Mosaic Plagiarism?',
            idealAnswer: 'Copying phrases from another source, interspersing them with original words, without using quotation marks or providing proper citation.',
            keyPoints: ['Patchwork copying', 'Lack of quotation marks and citation']
          },
          feynmanPrompt: 'Explain plagiarism like borrowing your neighbor tool, painting it green, and telling everyone you built it yourself.',
          examWeightage: { twoMarkFreq: 7, fiveMarkFreq: 5, tenMarkFreq: 5, frequentlyAsked: true }
        }
      ]
    }
  ]
};
