import { Subject } from '../../types';

export const bcc301Subject: Subject = {
  id: 'bcc301',
  code: 'BCC-301',
  name: 'Cyber Security',
  shortName: 'CSec',
  semester: 3,
  credits: 2,
  type: 'COMMON_COURSE',
  hasLab: false,
  description: 'Information security architecture, CIA triad, cryptography, web and email security, Indian IT Act 2000, and digital forensics.',
  color: '#ef4444',
  referenceBooks: [
    'Cyber Security: Understanding Cyber Crimes by Nina Godbole & Sunit Belapure',
    'Information Security & Cyber Laws by Sarika Gupta',
    'Cryptography and Network Security by William Stallings'
  ],
  units: [
    {
      id: 'bcc301-u1',
      unitNumber: 1,
      title: 'Information Systems & Cyber Threats',
      description: 'Introduction to information systems, CIA Triad (Confidentiality, Integrity, Availability), Cyber threats, malware classification (Viruses, Worms, Trojans), and attack vectors.',
      subjectId: 'bcc301',
      pyqCount: 22,
      topics: [
        {
          id: 'csec-cia-triad',
          name: 'CIA Triad & Threats Classification',
          unitId: 'bcc301-u1',
          subjectId: 'bcc301',
          difficulty: 'EASY',
          importance: 'CRITICAL',
          estimatedMinutes: 35,
          prerequisites: ['Basic Networking Concepts'],
          nextTopics: ['Symmetric vs Asymmetric Cryptography'],
          quickExplanation: 'The CIA Triad is the foundational model of information security comprising Confidentiality (data secrecy), Integrity (preventing unauthorized alteration), and Availability (uninterrupted access).',
          deepExplanation: 'Confidentiality is enforced via AES encryption and access control. Integrity is enforced via cryptographic hashes (SHA-256) and digital signatures. Availability is guaranteed via redundancy, load balancing, and DDoS mitigation.',
          whyItMatters: 'Every modern compliance standard (ISO 27001) and security policy is framed around the CIA triad.',
          coreConceptsList: [
            'Confidentiality: Encryption, ACLs, MFA',
            'Integrity: Hashing, Message Authentication Codes (MAC)',
            'Availability: Redundancy, Backups, Fault tolerance'
          ],
          visualDiagram: `          [CONFIDENTIALITY]
              /       \\
             /  C I A  \\
            /   TRIAD   \\
[INTEGRITY] ------------ [AVAILABILITY]`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Classify attacks: (1) Ransomware, (2) Tampering bank balance, (3) Leaking customer data.',
            stepByStepSolution: [
              '1. Ransomware -> Primarily violates AVAILABILITY (data locked from users).',
              '2. Tampering balance -> Violates INTEGRITY (unauthorized data alteration).',
              '3. Leaking customer data -> Violates CONFIDENTIALITY (unauthorized disclosure).'
            ],
            explanation: 'Each attack maps to a specific pillar of the security model.'
          },
          commonMistakes: ['Confusing Confidentiality with Integrity.'],
          examPerspective: {
            twoMarks: 'What is the CIA triad in cyber security? Name the components.',
            fiveMarks: 'Differentiate between Virus, Worm, and Trojan Horse with propagation methods.',
            tenMarks: 'Explain the CIA Triad with real-world attack scenarios and defensive mechanisms.',
            highYieldKeywords: ['Confidentiality', 'Integrity', 'Availability', 'CIA Triad', 'DDoS', 'Encryption']
          },
          activeRecallPrompt: {
            question: 'Which CIA pillar is breached when a DDoS attack knocks down a website?',
            idealAnswer: 'Availability. Legitimate users are denied access to the service.',
            keyPoints: ['Availability pillar', 'Denial of access']
          },
          feynmanPrompt: 'Explain CIA triad like a secret bank locker with a lock (C), wax seal (I), and guaranteed opening hours (A).',
          examWeightage: { twoMarkFreq: 9, fiveMarkFreq: 7, tenMarkFreq: 6, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'bcc301-u2',
      unitNumber: 2,
      title: 'Application & E-Commerce Security',
      description: 'Application security risks, secure coding practices, E-commerce security, Electronic Payment Systems (Credit cards, Digital wallets, UPI), and ISO/IEC 27001 standard.',
      subjectId: 'bcc301',
      pyqCount: 18,
      topics: [
        {
          id: 'csec-ecomm-security',
          name: 'E-Commerce Security & Payment Gateways',
          unitId: 'bcc301-u2',
          subjectId: 'bcc301',
          difficulty: 'MEDIUM',
          importance: 'HIGH',
          estimatedMinutes: 40,
          prerequisites: ['CIA Triad', 'HTTP/HTTPS basics'],
          nextTopics: ['Web Security & SSL'],
          quickExplanation: 'E-commerce security protects online commercial transactions from fraud, data theft, and interception using protocols like SET (Secure Electronic Transaction) and PCI-DSS compliance.',
          deepExplanation: 'Online payments involve four parties: Merchant, Cardholder, Issuing Bank, and Acquiring Bank. Vulnerabilities include SQL Injection on checkout forms, Cross-Site Scripting (XSS), and Session Hijacking. Payment gateways use point-to-point tokenization so card numbers are never stored in plain text.',
          whyItMatters: 'Global financial systems and UPI networks process billions of secure transactions per day.',
          coreConceptsList: [
            'E-commerce security requirements: Privacy, Integrity, Authentication, Non-repudiation',
            'Tokenization vs Encryption in credit card processing',
            'PCI-DSS (Payment Card Industry Data Security Standard) requirements',
            'Common e-commerce threats: Card skimming, Man-in-the-browser'
          ],
          visualDiagram: `[Customer Browser] --(HTTPS / TLS)--> [Payment Gateway] --(Tokenized)--> [Card Network]
         |                                                                      |
    [Merchant Web App] -------------------------------------------------> [Acquiring Bank]`,
          visualDiagramType: 'architecture',
          workedExample: {
            problem: 'Explain how Tokenization protects credit card data during online transactions.',
            stepByStepSolution: [
              '1. Customer enters 16-digit Primary Account Number (PAN).',
              '2. Payment Gateway replaces PAN with a randomized surrogate token.',
              '3. Merchant server stores only the token, never the actual card number.',
              '4. If merchant database is breached, stolen tokens are useless outside the payment gateway vault.'
            ],
            explanation: 'Tokenization eliminates merchant risk by minimizing stored sensitive financial data.'
          },
          commonMistakes: ['Thinking tokenization is a mathematical encryption algorithm (it is a lookup vault).'],
          examPerspective: {
            twoMarks: 'Define SET (Secure Electronic Transaction) protocol.',
            fiveMarks: 'Explain the security requirements of electronic payment systems.',
            tenMarks: 'Discuss e-commerce security threats and countermeasures in modern payment architectures.',
            highYieldKeywords: ['E-Commerce Security', 'Payment Gateway', 'PCI-DSS', 'Tokenization', 'SET']
          },
          activeRecallPrompt: {
            question: 'What is the main benefit of tokenization over storing encrypted card data on merchant servers?',
            idealAnswer: 'If breached, tokens cannot be decrypted mathematically by attackers because the true card numbers only exist in the payment processor vault.',
            keyPoints: ['No mathematical decryption possible', 'Card number never touches merchant DB']
          },
          feynmanPrompt: 'Explain tokenization like casino chips: plastic chips hold value inside the casino, but are worthless to a thief on the street.',
          examWeightage: { twoMarkFreq: 6, fiveMarkFreq: 5, tenMarkFreq: 5, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'bcc301-u3',
      unitNumber: 3,
      title: 'Security Policies, Web & Email Security',
      description: 'Security policies, firewalls, intrusion detection systems (IDS/IPS), World Wide Web security, SSL/TLS handshake protocol, Email security (PGP, S/MIME), and database security.',
      subjectId: 'bcc301',
      pyqCount: 20,
      topics: [
        {
          id: 'csec-ssl-tls',
          name: 'SSL/TLS Handshake Protocol & Email Security (PGP)',
          unitId: 'bcc301-u3',
          subjectId: 'bcc301',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 45,
          prerequisites: ['Symmetric vs Asymmetric Encryption', 'Certificates'],
          nextTopics: ['Cyber Law & IT Act 2000'],
          quickExplanation: 'The SSL/TLS handshake establishes a secure, encrypted HTTPS session between client and server using asymmetric cryptography for authentication and key exchange, then symmetric encryption for fast communication.',
          deepExplanation: 'Steps: 1. ClientHello (supported cipher suites), 2. ServerHello (chosen cipher + Digital Certificate containing server public key), 3. Client validates certificate with CA, 4. Client generates Pre-Master Secret encrypted with server public key, 5. Both derive symmetric session keys, 6. Encrypted data transfer begins. For email, PGP (Pretty Good Privacy) provides end-to-end authentication and confidentiality.',
          whyItMatters: 'Every HTTPS connection, online banking portal, and secure email client depends on TLS and PGP.',
          coreConceptsList: [
            'TLS Handshake sequence (Hello -> Certificate -> Pre-Master Secret -> Session Keys)',
            'Digital Certificates & Certificate Authorities (CA)',
            'Hybrid Cryptosystem (Asymmetric exchange + Symmetric stream)',
            'PGP: Web of Trust vs S/MIME Hierarchical CA'
          ],
          visualDiagram: `Client                                            Server
  | ----- ClientHello (Ciphers) -----------------> |
  | <---- ServerHello + Certificate (Public Key) - |
  | ----- [Pre-Master Secret] (Encrypted w/ PK) -> |
  | <==== [Encrypted Data Session w/ AES] =======> |`,
          visualDiagramType: 'flowchart',
          workedExample: {
            problem: 'Trace the steps of the TLS handshake when visiting an online banking portal.',
            stepByStepSolution: [
              '1. Browser sends ClientHello with supported cryptographic algorithms.',
              '2. Server replies with ServerHello, selecting cipher suite and presenting X.509 digital certificate.',
              '3. Browser verifies digital certificate with trusted root CA (e.g. DigiCert).',
              '4. Browser generates random pre-master secret, encrypts it with server public key, and sends to server.',
              '5. Server decrypts pre-master secret with its private key.',
              '6. Both generate identical symmetric session key; subsequent traffic is encrypted via AES-256.'
            ],
            explanation: 'Combines the security of asymmetric encryption with the high throughput of symmetric encryption.'
          },
          commonMistakes: ['Thinking entire HTTPS communication is encrypted asymmetrically (only key exchange is asymmetric).'],
          examPerspective: {
            twoMarks: 'What is the role of a Certificate Authority (CA) in SSL/TLS?',
            fiveMarks: 'Explain the working of PGP (Pretty Good Privacy) for email security.',
            tenMarks: 'Draw and explain the step-by-step SSL/TLS handshake with neat message exchange diagram.',
            highYieldKeywords: ['SSL/TLS', 'Handshake', 'Digital Certificate', 'Session Key', 'PGP', 'CA']
          },
          activeRecallPrompt: {
            question: 'Why does TLS switch to symmetric encryption after completing the handshake?',
            idealAnswer: 'Because symmetric encryption (AES) is about 1,000 times faster and consumes significantly less CPU power than asymmetric encryption.',
            keyPoints: ['Performance and speed', 'Symmetric is 1000x faster']
          },
          feynmanPrompt: 'Explain TLS handshake like meeting someone, verifying their ID card, sharing a secret handshake code in an envelope, then whispering using the code.',
          examWeightage: { twoMarkFreq: 7, fiveMarkFreq: 6, tenMarkFreq: 7, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'bcc301-u4',
      unitNumber: 4,
      title: 'Cyber Laws & Indian IT Act 2000',
      description: 'Need for cyber law, Indian Information Technology Act 2000, 2008 Amendment, electronic governance, certifying authorities, digital signatures, offenses, and penalties.',
      subjectId: 'bcc301',
      pyqCount: 24,
      topics: [
        {
          id: 'csec-it-act-2000',
          name: 'Indian IT Act 2000 & Key Penal Sections (Sec 43, 65, 66, 66C, 66D, 67)',
          unitId: 'bcc301-u4',
          subjectId: 'bcc301',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 45,
          prerequisites: ['Basic Legal and Cyber Crime Terminology'],
          nextTopics: ['Digital Forensics'],
          quickExplanation: 'The Information Technology Act 2000 is the primary law in India dealing with cybercrime and electronic commerce, providing legal validity to electronic records and prescribing penalties.',
          deepExplanation: 'Important sections tested in AKTU: Section 43 (civil compensation for unauthorized data copying/damage), Section 65 (tampering with computer source documents), Section 66 (hacking, up to 3 years imprisonment or Rs 5 lakh fine), Section 66C (identity theft), Section 66D (phishing/cheating by impersonation), Section 67 (publishing obscene material).',
          whyItMatters: 'Every software engineer building systems in India must comply with the IT Act, CERT-In guidelines, and data protection rules.',
          coreConceptsList: [
            'Section 43: Civil liability for computer damage',
            'Section 65: Tampering with source code',
            'Section 66: Hacking and computer offenses (3 yrs / 5 lakh)',
            'Section 66C & 66D: Identity theft and phishing'
          ],
          workedExample: {
            problem: 'Which section applies to unauthorized database modification and identity theft?',
            stepByStepSolution: [
              'Section 66: Hacking and computer related offenses with dishonest intent.',
              'Section 66C: Identity theft using stolen passwords or electronic signatures.'
            ],
            explanation: 'AKTU examinations require naming exact section numbers and penalties.'
          },
          commonMistakes: ['Confusing Section 43 (civil compensation) with Section 66 (criminal imprisonment).'],
          examPerspective: {
            twoMarks: 'State the punishment for hacking under Section 66 of IT Act 2000.',
            fiveMarks: 'Discuss major objectives and salient features of Indian IT Act 2000.',
            tenMarks: 'Explain offenses and penalties under Sections 43, 65, 66, 66C, 66D, and 67.',
            highYieldKeywords: ['IT Act 2000', 'Section 66', 'Hacking', 'Section 66C', 'Identity Theft', 'Digital Signature']
          },
          activeRecallPrompt: {
            question: 'What is the maximum penalty under Section 66 of the Indian IT Act 2000?',
            idealAnswer: 'Imprisonment up to 3 years, or fine up to Rs 5 lakh, or both.',
            keyPoints: ['3 years imprisonment', '5 lakh fine']
          },
          feynmanPrompt: 'Explain why computer theft needs special IT Act sections rather than traditional IPC burglary laws.',
          examWeightage: { twoMarkFreq: 8, fiveMarkFreq: 8, tenMarkFreq: 7, frequentlyAsked: true }
        }
      ]
    },
    {
      id: 'bcc301-u5',
      unitNumber: 5,
      title: 'Cyber Crime Investigation & Digital Forensics',
      description: 'Cyber crime taxonomy, digital evidence handling, digital forensics investigation process, Chain of Custody, disk imaging, and forensic tools.',
      subjectId: 'bcc301',
      pyqCount: 18,
      topics: [
        {
          id: 'csec-forensics-custody',
          name: 'Digital Forensics Life Cycle & Chain of Custody',
          unitId: 'bcc301-u5',
          subjectId: 'bcc301',
          difficulty: 'MEDIUM',
          importance: 'CRITICAL',
          estimatedMinutes: 45,
          prerequisites: ['Operating Systems & Storage Basics'],
          nextTopics: ['Incident Response'],
          quickExplanation: 'Digital Forensics is the identification, preservation, extraction, and documentation of computer evidence admissible in court. Chain of Custody is the chronological documentation showing who held the evidence.',
          deepExplanation: 'Forensic Lifecycle: 1. Identification (locating potential evidence), 2. Preservation (write-blockers, bit-stream disk imaging with hash verification MD5/SHA-256), 3. Analysis (recovering deleted files, examining logs), 4. Reporting (comprehensive court testimony). Golden Rule: Never conduct analysis on original media; always create and verify a bit-stream forensic image.',
          whyItMatters: 'Cyber crime court convictions fail if chain of custody is broken or hash sums do not match.',
          coreConceptsList: [
            'Digital Evidence characteristics: Latent, volatile, easily altered',
            'Chain of Custody documentation: Who, what, when, where, why',
            'Bit-stream disk imaging (dd, EnCase, FTK Imager)',
            'Write-blockers (hardware and software protection)'
          ],
          visualDiagram: `Digital Forensics Process:
[Identification] -> [Preservation & Hashing] -> [Analysis on Clone] -> [Court Presentation]
                             |
                   [Chain of Custody Log]`,
          visualDiagramType: 'flowchart',
          workedExample: {
            problem: 'Why must a digital forensic investigator compute the cryptographic hash of a hard drive immediately upon acquisition?',
            stepByStepSolution: [
              '1. Hash (e.g. SHA-256) creates a unique digital fingerprint of the drive contents.',
              '2. Proves that evidence was not altered, fabricated, or contaminated by investigators.',
              '3. In court, investigator computes hash again; matching hash confirms mathematical integrity.'
            ],
            explanation: 'Hash verification guarantees evidence integrity under Section 65B of Indian Evidence Act.'
          },
          commonMistakes: ['Analyzing or booting the original suspect hard drive directly (modifies timestamps and corrupts evidence).'],
          examPerspective: {
            twoMarks: 'Define Chain of Custody in digital forensics.',
            fiveMarks: 'Explain the four stages of digital forensics investigation with diagrams.',
            tenMarks: 'Discuss how digital evidence is collected, preserved, and analyzed to be legally admissible in court.',
            highYieldKeywords: ['Digital Forensics', 'Chain of Custody', 'Bit-stream Image', 'Write-blocker', 'Hashing']
          },
          activeRecallPrompt: {
            question: 'What is the Golden Rule of digital forensic examination regarding original media?',
            idealAnswer: 'Never examine or analyze the original media directly; always create a bit-stream forensic image and work on the verified copy.',
            keyPoints: ['Never touch original media', 'Work on verified forensic clone']
          },
          feynmanPrompt: 'Explain Chain of Custody like an unbroken paper trail of signatures on a sealed evidence bag from crime scene to courtroom.',
          examWeightage: { twoMarkFreq: 7, fiveMarkFreq: 6, tenMarkFreq: 6, frequentlyAsked: true }
        }
      ]
    }
  ]
};
