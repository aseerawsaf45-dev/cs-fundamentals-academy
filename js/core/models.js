/* ==========================================================================
   DOMAIN MODELS
   Thin classes that wrap the raw plain-object data (from modules-data.js
   and topics-module1.js) with behavior. Nothing here touches the DOM or
   localStorage — these are pure data/behavior classes.
   ========================================================================== */

class Example {
  constructor(raw) {
    this.difficulty = raw.difficulty;
    this.title = raw.title;
    this.explanation = raw.explanation;
    this.code = raw.code;
    this.language = raw.language;
    this.output = raw.output;
  }

  static DIFFICULTY_LABELS = {
    'very-easy': 'Very Easy',
    easy: 'Easy',
    medium: 'Medium',
    'medium-plus': 'Medium+',
    hard: 'Hard',
    'real-world': 'Real World',
  };

  get difficultyLabel() {
    return Example.DIFFICULTY_LABELS[this.difficulty] || this.difficulty;
  }

  get difficultyBadgeClass() {
    return 'badge-' + this.difficulty;
  }
}

class Exercise {
  constructor(raw, index) {
    this.index = index;
    this.level = raw.level;
    this.title = raw.title;
    this.problem = raw.problem;
    this.hints = raw.hints;
    this.solution = raw.solution;
  }
}

class InterviewQuestion {
  constructor(raw) {
    this.q = raw.q;
    this.a = raw.a;
  }
}

class RealWorldCase {
  constructor(raw) {
    this.company = raw.company;
    this.text = raw.text;
  }
}

class QuizQuestion {
  constructor(raw, index) {
    this.index = index;
    this.type = raw.type || 'mcq'; // 'mcq' | 'true-false' | 'code-output' | 'drag-drop'
    this.q = raw.q;
    this.options = raw.options;
    this.correct = raw.correct !== undefined ? raw.correct : raw.answer; // number | number[]
  }

  isCorrectChoice(optionIndex) {
    return optionIndex === this.correct;
  }

  isCorrectOrder(orderedIndices) {
    return JSON.stringify(orderedIndices) === JSON.stringify(this.correct);
  }
}

class Topic {
  constructor(raw) {
    this.id = raw.id;
    this.module = raw.module;
    this.title = raw.title;
    this.tagline = raw.tagline;
    this.readMinutes = raw.readMinutes;
    this.intro = raw.intro;
    this.visual = raw.visual;

    this.examples = raw.examples.map(e => new Example(e));
    this.exercises = raw.exercises.map((e, i) => new Exercise(e, i));
    this.interview = raw.interview.map(q => new InterviewQuestion(q));
    this.realWorld = raw.realWorld.map(rw => new RealWorldCase(rw));
    this.quiz = raw.quiz.map((q, i) => new QuizQuestion(q, i));
  }

  get exampleCount() { return this.examples.length; }
  get exerciseCount() { return this.exercises.length; }
  get quizLength() { return this.quiz.length; }
}

class Module {
  constructor(raw) {
    this.num = raw.num;
    this.id = raw.id;
    this.icon = raw.icon;
    this.name = raw.name;
    this.description = raw.description;
    this.topicIds = raw.topics; // array of topic id strings
  }

  get topicCount() { return this.topicIds.length; }

  hasTopic(topicId) {
    return this.topicIds.includes(topicId);
  }
}

/* ---------------------------------------------------------------------
   CATALOG — owns the full set of Modules + Topics, built from the raw
   data arrays the data files attach to window. Provides lookup helpers
   that used to be scattered free functions in modules-data.js / main.js.
--------------------------------------------------------------------- */
class Catalog {
  constructor(rawModules, rawTopics, topicTitles) {
    this.modules = rawModules.map(m => new Module(m));
    this.topics = rawTopics.map(t => new Topic(t));
    this.topicTitles = topicTitles || {};
  }

  getTopic(topicId) {
    return this.topics.find(t => t.id === topicId) || null;
  }

  isTopicBuilt(topicId) {
    return this.topics.some(t => t.id === topicId);
  }

  getModuleForTopic(topicId) {
    return this.modules.find(m => m.hasTopic(topicId)) || null;
  }

  getModule(moduleNum) {
    return this.modules.find(m => m.num === moduleNum) || null;
  }

  topicTitle(topicId) {
    return this.topicTitles[topicId] || topicId;
  }

  topicsForModule(moduleNum) {
    return this.topics.filter(t => t.module === moduleNum);
  }
}
