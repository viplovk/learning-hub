import { StudentProfile, TopicUserProgress, Flashcard, AcademicNote, StudyMaterialDoc } from '../types';
import { DEFAULT_FLASHCARDS } from '../data/flashcards';
import { DEFAULT_NOTES } from '../data/defaultNotes';
import { INITIAL_STUDY_MATERIALS } from '../data/studyMaterials';

const STORAGE_KEYS = {
  CURRENT_PROFILE: 'iec_current_profile',
  PROFILES: 'iec_profiles_list',
  TOPIC_PROGRESS: 'iec_topic_progress',
  FLASHCARDS: 'iec_flashcards',
  NOTES: 'iec_notes',
  MATERIALS: 'iec_study_materials',
  BOOKMARKS: 'iec_bookmarks',
  PRACTICE_HISTORY: 'iec_practice_history'
};

export const DEFAULT_PROFILES: StudentProfile[] = [
  {
    id: 'viplov-main',
    name: 'Viplov',
    rollNumber: '2300970100088',
    section: 'Section C',
    college: 'IEC College of Engineering & Technology',
    targetGpa: '9.2+',
    avatarSeed: 'viplov'
  },
  {
    id: 'classmate-guest',
    name: 'Section C Classmate',
    rollNumber: '2300970100045',
    section: 'Section C',
    college: 'IEC College of Engineering & Technology',
    targetGpa: '9.0+',
    avatarSeed: 'classmate'
  }
];

export function getStoredProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_PROFILES[0];
}

export function saveStoredProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error(e);
  }
}

export function getAllProfiles(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_PROFILES;
}

export function getTopicProgressMap(): Record<string, TopicUserProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TOPIC_PROGRESS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  // Initial default progress reflecting a motivated 3rd semester student
  return {
    'ds-stack-appl': {
      topicId: 'ds-stack-appl',
      state: 'MASTERED',
      feynmanCompleted: true,
      activeRecallAccuracy: 95,
      practiceAttempts: 4,
      practiceCorrect: 4,
      lastStudiedDate: '2026-10-02',
      notesCount: 2
    },
    'ds-circular-queue': {
      topicId: 'ds-circular-queue',
      state: 'STRONG',
      feynmanCompleted: true,
      activeRecallAccuracy: 88,
      practiceAttempts: 3,
      practiceCorrect: 3,
      lastStudiedDate: '2026-10-01',
      notesCount: 1
    },
    'ds-avl-trees': {
      topicId: 'ds-avl-trees',
      state: 'LEARNING',
      feynmanCompleted: false,
      activeRecallAccuracy: 70,
      practiceAttempts: 2,
      practiceCorrect: 1,
      lastStudiedDate: '2026-10-02',
      notesCount: 1
    },
    'coa-booth-algo': {
      topicId: 'coa-booth-algo',
      state: 'STRONG',
      feynmanCompleted: true,
      activeRecallAccuracy: 90,
      practiceAttempts: 5,
      practiceCorrect: 4,
      lastStudiedDate: '2026-10-01',
      notesCount: 2
    },
    'csec-cia-triad': {
      topicId: 'csec-cia-triad',
      state: 'MASTERED',
      feynmanCompleted: true,
      activeRecallAccuracy: 100,
      practiceAttempts: 3,
      practiceCorrect: 3,
      lastStudiedDate: '2026-09-30',
      notesCount: 1
    },
    'csec-it-act-2000': {
      topicId: 'csec-it-act-2000',
      state: 'UNDERSTOOD',
      feynmanCompleted: false,
      activeRecallAccuracy: 80,
      practiceAttempts: 2,
      practiceCorrect: 2,
      lastStudiedDate: '2026-09-29',
      notesCount: 1
    }
  };
}

export function saveTopicProgress(progress: TopicUserProgress): void {
  try {
    const current = getTopicProgressMap();
    current[progress.topicId] = progress;
    localStorage.setItem(STORAGE_KEYS.TOPIC_PROGRESS, JSON.stringify(current));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredFlashcards(): Flashcard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FLASHCARDS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_FLASHCARDS;
}

export function saveStoredFlashcards(cards: Flashcard[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(cards));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredNotes(): AcademicNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_NOTES;
}

export function saveStoredNotes(notes: AcademicNote[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredMaterials(): StudyMaterialDoc[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MATERIALS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_STUDY_MATERIALS;
}

export function saveStoredMaterials(materials: StudyMaterialDoc[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials));
  } catch (e) {
    console.error(e);
  }
}

export function getBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return ['ds-stack-appl', 'coa-booth-algo', 'csec-cia-triad'];
}

export function toggleBookmark(topicId: string): string[] {
  const current = getBookmarks();
  const index = current.indexOf(topicId);
  let updated: string[];
  if (index >= 0) {
    updated = current.filter((id) => id !== topicId);
  } else {
    updated = [...current, topicId];
  }
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
}
