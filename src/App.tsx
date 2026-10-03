import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, MainNavTab } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import { DashboardView } from './components/views/DashboardView';
import { SemesterRoadmapView } from './components/views/SemesterRoadmapView';
import { SubjectsView } from './components/views/SubjectsView';
import { LearnTopicView } from './components/views/LearnTopicView';
import { PracticeView } from './components/views/PracticeView';
import { RevisionView } from './components/views/RevisionView';
import { NotesView } from './components/views/NotesView';
import { QuestionBankView } from './components/views/QuestionBankView';
import { AITutorView } from './components/views/AITutorView';
import { ExamsView } from './components/views/ExamsView';
import { LabsVivaView } from './components/views/LabsVivaView';
import { FormulaBankView } from './components/views/FormulaBankView';
import { StudyMaterialsView } from './components/views/StudyMaterialsView';

import { OFFICIAL_SUBJECTS } from './data/curriculumData';
import {
  getStoredProfile,
  saveStoredProfile,
  getAllProfiles,
  getStoredFlashcards,
  saveStoredFlashcards,
  getStoredNotes,
  saveStoredNotes,
  getStoredMaterials,
  saveStoredMaterials,
  getBookmarks,
  toggleBookmark
} from './utils/storage';
import { Subject, TopicConcept, Flashcard, AcademicNote, StudyMaterialDoc } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<MainNavTab>('DASHBOARD');
  const [currentProfile, setCurrentProfile] = useState(getStoredProfile());
  const [availableProfiles] = useState(getAllProfiles());
  const [flashcards, setFlashcards] = useState(getStoredFlashcards());
  const [notes, setNotes] = useState(getStoredNotes());
  const [materials, setMaterials] = useState(getStoredMaterials());
  const [bookmarks, setBookmarks] = useState<string[]>(getBookmarks());

  // Selected subject & topic
  const [selectedSubject, setSelectedSubject] = useState<Subject>(OFFICIAL_SUBJECTS[0]);
  const [selectedTopic, setSelectedTopic] = useState<TopicConcept>(
    OFFICIAL_SUBJECTS[0].units[0].topics[0]
  );

  // Command palette state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Keyboard shortcut for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleSwitchProfile = (p: typeof currentProfile) => {
    setCurrentProfile(p);
    saveStoredProfile(p);
  };

  const handleUpdateFlashcard = (updatedCard: Flashcard) => {
    const updatedList = flashcards.map((c) => (c.id === updatedCard.id ? updatedCard : c));
    setFlashcards(updatedList);
    saveStoredFlashcards(updatedList);
  };

  const handleSaveNotes = (updatedNotes: AcademicNote[]) => {
    setNotes(updatedNotes);
    saveStoredNotes(updatedNotes);
  };

  const handleAddMaterial = (doc: StudyMaterialDoc) => {
    const updated = [doc, ...materials];
    setMaterials(updated);
    saveStoredMaterials(updated);
  };

  const handleToggleBookmark = (topicId: string) => {
    const updated = toggleBookmark(topicId);
    setBookmarks(updated);
  };

  const handleSelectTopicFromAnywhere = (topic: TopicConcept) => {
    setSelectedTopic(topic);
    const parentSub = OFFICIAL_SUBJECTS.find((s) => s.id === topic.subjectId);
    if (parentSub) {
      setSelectedSubject(parentSub);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col font-sans">
      {/* Clean Academic Navigation Bar */}
      <Navbar
        currentProfile={currentProfile}
        onSwitchProfile={handleSwitchProfile}
        availableProfiles={availableProfiles}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Body with Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* Workspace Central View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-53px)] bg-[#0c0c0e]">
          {activeTab === 'DASHBOARD' && (
            <DashboardView
              subjects={OFFICIAL_SUBJECTS}
              onNavigateTab={setActiveTab}
              onSelectSubject={(s) => {
                setSelectedSubject(s);
                setActiveTab('SUBJECTS');
              }}
              onSelectTopic={(t) => {
                handleSelectTopicFromAnywhere(t);
                setActiveTab('LEARN');
              }}
            />
          )}

          {activeTab === 'SEMESTER' && (
            <SemesterRoadmapView
              subjects={OFFICIAL_SUBJECTS}
              onSelectTopic={(t) => {
                handleSelectTopicFromAnywhere(t);
                setActiveTab('LEARN');
              }}
              onNavigateLearn={() => setActiveTab('LEARN')}
            />
          )}

          {activeTab === 'SUBJECTS' && (
            <SubjectsView
              subjects={OFFICIAL_SUBJECTS}
              selectedSubject={selectedSubject}
              onSelectSubject={setSelectedSubject}
              onSelectTopic={(t) => {
                handleSelectTopicFromAnywhere(t);
                setActiveTab('LEARN');
              }}
              onNavigateLearn={() => setActiveTab('LEARN')}
              onNavigatePractice={() => setActiveTab('PRACTICE')}
              onNavigateRevision={() => setActiveTab('REVISION')}
            />
          )}

          {activeTab === 'LEARN' && (
            <LearnTopicView
              topic={selectedTopic}
              subject={selectedSubject}
              onNavigatePractice={() => setActiveTab('PRACTICE')}
              onNavigateRevision={() => setActiveTab('REVISION')}
              onNavigateTutor={() => setActiveTab('AI_TUTOR')}
              isBookmarked={bookmarks.includes(selectedTopic.id)}
              onToggleBookmark={() => handleToggleBookmark(selectedTopic.id)}
            />
          )}

          {activeTab === 'PRACTICE' && (
            <PracticeView />
          )}

          {activeTab === 'REVISION' && (
            <RevisionView
              flashcards={flashcards}
              onUpdateFlashcard={handleUpdateFlashcard}
            />
          )}

          {activeTab === 'NOTES' && (
            <NotesView
              notes={notes}
              onSaveNotes={handleSaveNotes}
              currentUser={currentProfile.name}
            />
          )}

          {activeTab === 'QUESTION_BANK' && <QuestionBankView />}

          {activeTab === 'AI_TUTOR' && <AITutorView />}

          {activeTab === 'EXAMS' && <ExamsView />}

          {activeTab === 'LABS' && <LabsVivaView />}

          {activeTab === 'FORMULAS' && <FormulaBankView />}

          {activeTab === 'MATERIALS' && (
            <StudyMaterialsView
              materials={materials}
              onAddMaterial={handleAddMaterial}
            />
          )}
        </main>
      </div>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsCommandPaletteOpen(false);
        }}
        onSelectTopic={(t) => {
          handleSelectTopicFromAnywhere(t);
          setActiveTab('LEARN');
          setIsCommandPaletteOpen(false);
        }}
      />
    </div>
  );
}

export default App;
