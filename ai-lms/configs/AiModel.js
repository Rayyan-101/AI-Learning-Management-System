const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
}=require('@google/generative-ai');

const apiKey=process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI=new GoogleGenerativeAI(apiKey);

const model=genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

const generationConfig={
  responseMimeType:'application/json'
}

export const courseOutline=model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: `Generate a study material for Python for Exam. Output should be in JSON format with course_title, difficulty, summary, chapters (each with title, summary, and list of topics).`}
      ],
    },
    {
      role:"model",
      parts:[
        {
          text:`\`\`\`json
{
  "course_title": "Python for Beginners: A Foundational Guide",
  "difficulty": "Easy",
  "summary": "This course provides a comprehensive introduction to Python...",
  "chapters": [
    {
      "chapter_title": "Chapter 1: Introduction to Python and Programming",
      "summary": "This chapter introduces the fundamentals...",
      "topics": [
        "What is Programming?",
        "How Computers Work",
        ...
      ]
    },
    ...
  ]
}
\`\`\``,
        }
      ],
    },
  ],
})

export const GenerateNotesAiModel=model.startChat({
  generationConfig,
  history:[
    {
      role:'user',
      parts:[
        {text:'Generate exam material detail content for each chapter, Mkae sure to include all topic point in the content, make sure to give content in HTML format(Do not add HTMLKL,Head,Body,title tag), The chapters: {"chapter_title": "Chapter 1: Introduction to Python and Programming", "summary": "This chapter introduces the fundamentals...","topics": ["What is Programming?","How Computers Work",...] },...'}
      ],
    },
    {
      role:'model',
      parts:[
               {
          text: `Okay, I will generate detailed exam material content for each chapter in HTML format, ensuring all topic points are included. I will avoid using \`<html>\`, \`<head>\`, \`<body>\`, and \`<title>\` tags. I will start by asking some general questions on how to generate the content effectively.

Okay, I have gathered information on generating exam materials, creating HTML content, and best practices for exam design. Now, I will proceed to generate the content for your chapter.

Here's the HTML content for Chapter 1:

\`\`\`html
<h2>Chapter 1: Introduction to Python and Programming</h2>
<p><b>Summary:</b> This chapter introduces the fundamentals of programming with Python, covering basic concepts, how computers work, and setting up a development environment.</p>

<h3>Topics:</h3>
<ul>
  <li><b>What is Programming?</b>
    <p>Explanation of what programming is, its purpose, and why it is important.</p>
    <ul>
      <li>Definition of programming</li>
      <li>Purpose of programming: solving problems, automating tasks</li>
      <li>Importance of programming in today's world</li>
    </ul>
  </li>

  <li><b>How Computers Work</b>
    <p>Explanation of the basic components of a computer and how they execute instructions.</p>
    <ul>
      <li>Basic computer architecture: CPU, Memory, Input/Output devices</li>
      <li>How instructions are executed</li>
      <li>The role of operating systems</li>
    </ul>
  </li>

  <li><b>Introduction to Python</b>
    <p>Overview of Python as a programming language, its features, and advantages.</p>
    <ul>
      <li>What is Python?</li>
      <li>Features of Python: readability, versatility, large community</li>
      <li>Advantages of using Python</li>
    </ul>
  </li>

  <li><b>Setting up a Development Environment</b>
    <p>Steps to install Python and set up a basic environment for coding.</p>
    <ul>
      <li>Downloading and installing Python</li>
      <li>Choosing a code editor (e.g., VSCode, Sublime Text)</li>
      <li>Introduction to the command line interface</li>
    </ul>
  </li>

  <li><b>Basic Syntax and Data Types</b>
    <p>Introduction to Python syntax, variables, and common data types.</p>
    <ul>
      <li>Variables and data types (integers, floats, strings, booleans)</li>
      <li>Basic input and output</li>
      <li>Operators and expressions</li>
    </ul>
  </li>
</ul>

<h3>Example Questions:</h3>
<ol>
  <li>What is the primary purpose of programming?</li>
  <li>Explain the role of the CPU in a computer.</li>
  <li>List three features that make Python a popular programming language.</li>
  <li>Describe the steps involved in setting up a Python development environment.</li>
  <li>What are the common data types in Python? Give examples.</li>
</ol>
\`\`\`

I have generated the HTML content for Chapter 1, including a summary, detailed topic breakdowns, and example questions.  I will follow this format for the subsequent chapters.
`,
        },
      ]
    }
  ]
});

export const GenerateStudyTypeContentAiModel=model.startChat({
  generationConfig,
  history:[
    {
      role:'user',
      parts:[
        {text: `Generate flashcard on topic: Flutter Fundamentals, User Interface(UI) Development, Basic App Navigation in JSON format with front back content, Maximum 15`}
      ],
    },
    {
      role:'model',
      parts:[
        {text:`Okay, here are 15 flashcards in JSON format covering Flutter Fundamentals, UI Development, and Basic App Navigation:

\`\`\`json
[
  {
    "front": "What is Flutter?",
    "back": "Flutter is an open-source UI software development kit created by Google, used to develop cross-platform applications for Android, iOS, Linux, macOS, Windows, and the web from a single codebase."
  },
  {
    "front": "What programming language is Flutter based on?",
    "back": "Dart"
  },
  {
    "front": "What is a Widget in Flutter?",
    "back": "A Widget is the basic building block of a Flutter app's UI. Everything is a widget! Widgets describe what their view should look like given their current configuration and state."
  },
  {
    "front": "Name two main types of Widgets.",
    "back": "StatelessWidget and StatefulWidget"
  },
  {
    "front": "What is a StatelessWidget?",
    "back": "A widget that does not require mutable state. It describes the UI based on the configuration information they receive. Examples: Text, Icon, RaisedButton."
  },
  {
    "front": "What is a StatefulWidget?",
    "back": "A widget that has mutable state that can change dynamically. It can redraw its UI multiple times during its lifetime.  Examples: Checkbox, Slider, Form."
  },
  {
    "front": "What is the purpose of the \`build()\` method in a Flutter Widget?",
    "back": "The \`build()\` method describes how to display the widget in terms of other, lower-level widgets. It returns the widget's visual representation."
  },
  {
    "front": "What is the Widget tree?",
    "back": "A hierarchical structure of widgets that makes up the UI of a Flutter app. The framework uses this tree to manage and render the UI."
  },
  {
    "front": "What is Hot Reload?",
    "back": "A feature in Flutter that allows you to quickly see the changes you've made to your code without restarting the app. This helps with faster development and experimentation."
  },
  {
    "front": "Explain the purpose of \`pubspec.yaml\` file.",
    "back": "This file contains metadata about the Flutter project, including dependencies (packages), assets (images, fonts), and other configurations."
  },
  {
    "front": "How do you add a dependency/package to a Flutter project?",
    "back": "Add the package name and version to the \`pubspec.yaml\` file under the \`dependencies\` section, and then run \`flutter pub get\` in the terminal."
  },
  {
    "front": "What is the purpose of the \`Navigator\` widget?",
    "back": "The \`Navigator\` manages a stack of \`Route\` objects (usually \`PageRoute\` instances) and provides methods for pushing and popping routes, enabling navigation between different screens/pages in the app."
  },
  {
    "front": "How do you navigate to a new screen in Flutter?",
    "back": "Using \`Navigator.push()\`. For example: \`Navigator.push(context, MaterialPageRoute(builder: (context) => NewScreen()));\`"
  },
  {
    "front": "How do you go back to the previous screen in Flutter?",
    "back": "Using \`Navigator.pop(context);\`"
  },
  {
    "front": "What is a Route?",
    "back": "In Flutter, a Route represents a screen or a page in your application. It's an abstraction for managing the app's navigation stack."
  }
]
\`\`\``,
      }
      ]
    }
  ]
});

export const GenerateQuizAiModel= model.startChat({
  generationConfig,
  history:[
    {
      role:'user',
      parts: [
       { text: `generate quiz on topic: Flutter fundamentals, User Interface(UI) development, basic app navigation with question and options along with
 answer in JSON format`,}
      ],
    },
    {
      role:'model',
      parts:[
        {text: `Okay, here's a quiz on Flutter fundamentals, UI development, and basic app navigation, formatted in JSON:

\`\`\`json
{
  "quizTitle": "Flutter Fundamentals & UI Development",
  "questions": [
    {
      "questionText": "Which programming language is primarily used for Flutter development?",
      "options": [
        "Java",
        "Kotlin",
        "Dart",
        "Swift"
      ],
      "correctAnswer": "Dart"
    },
    {
      "questionText": "What is a Widget in Flutter?",
      "options": [
        "A visual component in the UI",
        "A data structure",
        "A background service",
        "A routing function"
      ],
      "correctAnswer": "A visual component in the UI"
    },
    {
      "questionText": "What are the two main types of Widgets in Flutter?",
      "options": [
        "Functional and Class-based",
        "Stateful and Stateless",
        "Rendered and Unrendered",
        "Visible and Invisible"
      ],
      "correctAnswer": "Stateful and Stateless"
    },
    {
      "questionText": "Which widget is used to create a scrollable list of items in Flutter?",
      "options": [
        "Column",
        "Row",
        "ListView",
        "Stack"
      ],
      "correctAnswer": "ListView"
    },
    {
      "questionText": "What does 'Hot Reload' do in Flutter?",
      "options": [
        "Restarts the entire app",
        "Quickly rebuilds the app to reflect code changes without losing the app state",
        "Deletes all the app data",
        "Publishes the app to the app store"
      ],
      "correctAnswer": "Quickly rebuilds the app to reflect code changes without losing the app state"
    },
    {
      "questionText": "Which widget is commonly used for arranging children in a horizontal line?",
      "options": [
        "Column",
        "Row",
        "Stack",
        "Container"
      ],
      "correctAnswer": "Row"
    },
    {
      "questionText": "What is the purpose of the MaterialApp widget in Flutter?",
      "options": [
        "It defines the app's structure and theme",
        "It handles network requests",
        "It manages local storage",
        "It creates animations"
      ],
      "correctAnswer": "It defines the app's structure and theme" [11]
    },
    {
      "questionText": "How do you navigate to a new screen in Flutter?",
      "options": [
        "Using the Navigator widget",
        "Using the Router class",
        "Using the Scaffolding class",
        "Using the Intent class"
      ],
      "correctAnswer": "Using the Navigator widget" [7]
    },
    {
      "questionText": "What is the purpose of the 'setState()' method?",
      "options": [
        "To update the UI with new data",
        "To define the initial state of a widget",
        "To dispose of a widget",
        "To create a new widget"
      ],
      "correctAnswer": "To update the UI with new data" [3, 5, 9]
    },
    {
      "questionText": "Which file contains the dependencies and project metadata in a Flutter project?",
      "options": [
        "main.dart",
        "pubspec.yaml",
        "README.md",
        "androidmanifest.xml"
      ],
      "correctAnswer": "pubspec.yaml" [9]
    }
  ]
}
\`\`\``,},
      ]
    }
  ]
});