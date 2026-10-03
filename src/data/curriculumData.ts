import { Subject } from '../types';
import { kcs301Subject } from './subjects/kcs301';
import { kcs302Subject } from './subjects/kcs302';
import { kas302Subject } from './subjects/kas302';
import { bcc301Subject } from './subjects/bcc301';
import { kcs303Subject } from './subjects/kcs303';
import { kas301Subject } from './subjects/kas301';

export const OFFICIAL_SUBJECTS: Subject[] = [
  kcs301Subject,
  kcs302Subject,
  kas302Subject,
  bcc301Subject,
  kcs303Subject,
  kas301Subject
];
