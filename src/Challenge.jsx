import React, { useState, useEffect } from 'react';
import { Code, Trophy, Target, Clock, Lightbulb, CheckCircle2, ExternalLink, Github, BookOpen } from 'lucide-react';

const CodeChallengePusher = () => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');

  
  const challenges = {
    beginner: [
      { 
        title: "LeetCode with a Twist", 
        description: "Solve today's LeetCode problem, then implement it in a language you've never used before", 
        time: "45 min", 
        type: "Problem Solving",
        resources: ["LeetCode Daily", "Language docs"]
      },
      { 
        title: "Mini Project Sprint", 
        description: "Build a simple calculator app using a framework you've heard about but never tried", 
        time: "2 hours", 
        type: "Project",
        resources: ["Framework docs", "Tutorial videos"]
      },
      { 
        title: "GeeksforGeeks + Visualization", 
        description: "Solve GeeksforGeeks problem of the day, then create a visual representation of the algorithm", 
        time: "60 min", 
        type: "Algorithm + Visual",
        resources: ["GeeksforGeeks", "Visualization tools"]
      },
      { 
        title: "API Explorer", 
        description: "Find a public API you've never used and build a simple frontend to display its data", 
        time: "90 min", 
        type: "Integration",
        resources: ["Public APIs list", "Frontend framework"]
      }
    ],
    medium: [
      { 
        title: "Cross-Platform Challenge", 
        description: "Solve the same algorithm problem in 3 different programming paradigms (OOP, functional, procedural)", 
        time: "75 min", 
        type: "Multi-Paradigm",
        resources: ["Algorithm platform", "Language references"]
      },
      { 
        title: "Tech Stack Roulette", 
        description: "Use a random generator to pick 3 technologies, then build something that uses all of them", 
        time: "3 hours", 
        type: "Full-Stack",
        resources: ["Tech stack generator", "Documentation"]
      },
      { 
        title: "Optimization Obsession", 
        description: "Take a working solution and optimize it for 3 different metrics: speed, memory, readability", 
        time: "90 min", 
        type: "Performance",
        resources: ["Profiling tools", "Benchmarking"]
      },
      { 
        title: "Legacy Code Revival", 
        description: "Find an old GitHub project (2+ years) and modernize it with current best practices", 
        time: "2 hours", 
        type: "Refactoring",
        resources: ["GitHub search", "Modern practices guide"]
      },
      { 
        title: "Database Deep Dive", 
        description: "Learn a new type of database (if you know SQL, try NoSQL; if NoSQL, try graph DB) and build a small app", 
        time: "2.5 hours", 
        type: "Database",
        resources: ["Database tutorials", "Sample datasets"]
      }
    ],
    advanced: [
      { 
        title: "Distributed Algorithm", 
        description: "Implement a distributed algorithm (consensus, leader election) across multiple processes", 
        time: "4 hours", 
        type: "Distributed Systems",
        resources: ["Distributed systems papers", "Simulation tools"]
      },
      { 
        title: "Custom Language Feature", 
        description: "Create a mini programming language feature (DSL, interpreter, or transpiler)", 
        time: "5 hours", 
        type: "Language Design",
        resources: ["Compiler construction", "Parser generators"]
      },
      { 
        title: "Performance Engineering", 
        description: "Profile a complex algorithm, identify bottlenecks, and achieve 10x performance improvement", 
        time: "3 hours", 
        type: "Optimization",
        resources: ["Profiling tools", "Performance guides"]
      },
      { 
        title: "Architecture Challenge", 
        description: "Design and implement a system that scales to handle 1M concurrent users (simulate load)", 
        time: "6 hours", 
        type: "System Design",
        resources: ["Load testing tools", "Architecture patterns"]
      },
      { 
        title: "AI Integration", 
        description: "Solve a coding problem using AI/ML, then implement the same solution traditionally and compare", 
        time: "4 hours", 
        type: "AI/ML",
        resources: ["ML libraries", "Algorithm references"]
      }
    ]
  };

  const techStacks = [
    "React + Node.js + MongoDB", "Vue + Python + PostgreSQL", "Angular + Java + Redis",
    "Svelte + Go + SQLite", "Flutter + Firebase", "Django + React + PostgreSQL",
    "Next.js + Prisma + MySQL", "Express + GraphQL + Neo4j"
  ];

  const languages = [
    "Rust", "Go", "Kotlin", "Swift", "Dart", "Elixir", "Clojure", "Haskell", 
    "F#", "Scala", "Julia", "Zig", "Crystal", "Nim"
  ];

  const generateChallenge = () => {
    const challengePool = challenges[difficulty];
    let randomChallenge = challengePool[Math.floor(Math.random() * challengePool.length)];
    
    // Add dynamic elements
    if (randomChallenge.title.includes("random")) {
      randomChallenge = {
        ...randomChallenge,
        dynamicElements: {
          techStack: techStacks[Math.floor(Math.random() * techStacks.length)],
          language: languages[Math.floor(Math.random() * languages.length)]
        }
      };
    }
    
    setCurrentChallenge(randomChallenge);
  };

  const completeChallenge = () => {
    if (currentChallenge) {
      setCompletedChallenges(prev => [...prev, { ...currentChallenge, completedAt: new Date() }]);
      setStreak(prev => prev + 1);
      setCurrentChallenge(null);
    }
  };

  const skipChallenge = () => {
    generateChallenge();
  };

  const resetProgress = () => {
    setCompletedChallenges([]);
    setStreak(0);
    setCurrentChallenge(null);
  };

  useEffect(() => {
    generateChallenge();
  }, [difficulty]);

  const getDifficultyColor = (level) => {
    switch(level) {
      case 'beginner': return 'from-green-500 to-green-600';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'advanced': return 'from-red-500 to-red-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const getTypeIcon = (type) => {
    if (type.includes('Problem')) return <Target size={16} />;
    if (type.includes('Project')) return <Github size={16} />;
    if (type.includes('Algorithm')) return <Code size={16} />;
    return <Lightbulb size={16} />;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Code Challenge Boundary Pusher
          </h1>
          <p className="text-gray-600">Push your coding limits with LeetCode, projects, and new technologies</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center">
            <Trophy className="mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-sm opacity-90">Day Streak</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white text-center">
            <Target className="mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold">{completedChallenges.length}</div>
            <div className="text-sm opacity-90">Completed</div>
          </div>
          <div className={`bg-gradient-to-r ${getDifficultyColor(difficulty)} rounded-xl p-4 text-white text-center`}>
            <Code className="mx-auto mb-2" size={24} />
            <div className="text-lg font-bold capitalize">{difficulty}</div>
            <div className="text-sm opacity-90">Level</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white text-center">
            <BookOpen className="mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold">{new Set(completedChallenges.map(c => c.type)).size}</div>
            <div className="text-sm opacity-90">Tech Areas</div>
          </div>
        </div>

        {/* Difficulty Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Challenge Difficulty</h3>
          <div className="flex gap-2">
            {Object.keys(challenges).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-6 py-3 rounded-lg capitalize font-medium transition-all ${
                  difficulty === level
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Current Challenge */}
        {currentChallenge && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Today's Challenge</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span className="font-medium">{currentChallenge.time}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  {getTypeIcon(currentChallenge.type)}
                  <span className="font-medium text-sm">{currentChallenge.type}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                {currentChallenge.title}
              </h3>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                {currentChallenge.description}
              </p>
              
              {currentChallenge.dynamicElements && (
                <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Random Elements:</h4>
                  {currentChallenge.dynamicElements.techStack && (
                    <p className="text-yellow-700"><strong>Tech Stack:</strong> {currentChallenge.dynamicElements.techStack}</p>
                  )}
                  {currentChallenge.dynamicElements.language && (
                    <p className="text-yellow-700"><strong>Language:</strong> {currentChallenge.dynamicElements.language}</p>
                  )}
                </div>
              )}

              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Helpful Resources:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentChallenge.resources.map((resource, index) => (
                    <span key={index} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      <ExternalLink size={12} />
                      {resource}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={completeChallenge}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all font-medium shadow-md hover:shadow-lg"
              >
                <CheckCircle2 size={18} />
                Mark Complete
              </button>
              <button
                onClick={skipChallenge}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
              >
                <Target size={18} />
                New Challenge
              </button>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <a href="https://leetcode.com/problemset/all/" target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-3 bg-orange-100 hover:bg-orange-200 p-4 rounded-lg transition-colors">
            <Code className="text-orange-600" size={24} />
            <div>
              <div className="font-semibold text-orange-800">LeetCode</div>
              <div className="text-sm text-orange-600">Daily Problems</div>
            </div>
          </a>
          <a href="https://www.geeksforgeeks.org/problem-of-the-day" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 bg-green-100 hover:bg-green-200 p-4 rounded-lg transition-colors">
            <Target className="text-green-600" size={24} />
            <div>
              <div className="font-semibold text-green-800">GeeksforGeeks</div>
              <div className="text-sm text-green-600">Problem of Day</div>
            </div>
          </a>
          <a href="https://github.com/public-apis/public-apis" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 bg-purple-100 hover:bg-purple-200 p-4 rounded-lg transition-colors">
            <ExternalLink className="text-purple-600" size={24} />
            <div>
              <div className="font-semibold text-purple-800">Public APIs</div>
              <div className="text-sm text-purple-600">Free APIs List</div>
            </div>
          </a>
          <a href="https://github.com/DeepanshuSehrawat" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 bg-blue-100 hover:bg-blue-200 p-4 rounded-lg transition-colors">
            <Github className="text-blue-600" size={24} />
            <div>
              <div className="font-semibold text-blue-800">GitHub</div>
              <div className="text-sm text-blue-600">Trending Repos</div>
            </div>
          </a>
        </div>

        {/* Progress Section */}
        {completedChallenges.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Coding Journey</h3>
              <button
                onClick={resetProgress}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Reset Progress
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {completedChallenges.slice(-6).map((challenge, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(challenge.type)}
                    <h4 className="font-medium text-green-800 text-sm">{challenge.title}</h4>
                  </div>
                  <p className="text-green-600 text-xs">{challenge.type} • {challenge.time}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {challenge.completedAt?.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-3">Challenge Strategy</h3>
          <div className="text-slate-700 text-sm space-y-2">
            <p>• <strong>Document everything:</strong> Keep notes on new concepts, debugging process, and insights</p>
            <p>• <strong>Share your solutions:</strong> Post to GitHub, write blog posts, or explain to others</p>
            <p>• <strong>Time-box challenges:</strong> Don't get stuck - move to easier difficulty if needed</p>
            <p>• <strong>Focus on learning:</strong> The goal is to expand your technical boundaries, not perfection</p>
            <p>• <strong>Build a portfolio:</strong> Turn completed challenges into showcase projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeChallengePusher;