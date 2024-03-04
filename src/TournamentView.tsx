import { useState } from 'react'
import TournamentQuestionView from './TournamentQuestionView'

const questions = [
  {
    question:
      'Which of the following (Text, View, Button, Table) is NOT a core component in React Native?',
    category: 'Core Components',
    answers: ['View', 'Text', 'Button', 'Table'],
    correctAnswerIndex: 3,
  },
  {
    question: 'What command initializes a new React Native project?',
    category: 'Project structure',
    answers: [
      'npm start',
      'react-native init',
      'create-react-native-app',
      'npm init react-native',
    ],
    correctAnswerIndex: 1,
  },
  {
    question: 'Which component is used to create a touchable opacity effect?',
    category: 'Core components',
    answers: [
      'Touchable',
      'TouchableOpacity',
      'TouchEffect',
      'TouchableFeedback',
    ],
    correctAnswerIndex: 1,
  },
  {
    question: 'Which component is used for scrolling lists of dynamic height?',
    category: 'Core components',
    answers: ['ScrollView', 'FlatList', 'DynamicView', 'ListScroll'],
    correctAnswerIndex: 1,
  },
  {
    question: 'How can you import static image in React Native?',
    category: 'Core components',
    answers: [
      "<img alt='xd' src={require('./my-image.png')} />",
      "<Image source={url('./my-image.png')} />",
      "<Image src={'./my-image.png'} />",
      "<Image source={require('./my-image.png')} />",
    ],
    correctAnswerIndex: 3,
  },
  {
    question: 'How can you import static image in React Native?',
    category: 'Core components',
    answers: [
      "<img src={require('./my-image.png')} />",
      "<Image source={url('./my-image.png')} />",
      "<Image src={'./my-image.png'} />",
      "<Image source={require('./my-image.png')} />",
    ],
    correctAnswerIndex: 3,
  },
  {
    question: 'What is the purpose of the `Linking` library in React Native?',
    category: 'React Native functionality',
    answers: [
      'Linking native modules',
      'Deep linking within the app',
      'Linking to external URLs',
      'Both deep linking and linking to external URLs',
    ],
    correctAnswerIndex: 3,
  },
  {
    question:
      'Which of the following is a way to store data locally in a React Native app?',
    category: 'React Native functionality',
    answers: ['AsyncStorage', 'SessionStorage', 'LocalDB', 'ReactStorage'],
    correctAnswerIndex: 0,
  },
  {
    question: 'Which of the following is NOT a hook in React Native?',
    category: 'React Native functionality',
    answers: ['useState', 'useNative', 'useEffect', 'useContext'],
    correctAnswerIndex: 1,
  },
  {
    question: 'What is the main purpose of the `StyleSheet` in React Native?',
    category: 'React Native styling',
    answers: [
      'To define CSS styles',
      'To create dynamic styles',
      'To optimize performance of styles',
      'To import styles from external sources',
    ],
    correctAnswerIndex: 2,
  },
  {
    question:
      'Which is the default port number for the React Native metro development server?',
    category: 'React Native toolset',
    answers: ['3000', '8080', '8081', '8000'],
    correctAnswerIndex: 2,
  },
  {
    question:
      'What command do you use to run your React Native app on an Android emulator?',
    category: 'React Native toolset',
    answers: [
      'react-native run',
      'npm start android',
      'react-native run-android',
      'npm android-start',
    ],
    correctAnswerIndex: 2,
  },
  {
    question: 'What does the `expo` tool provide for React Native developers?',
    category: 'React Native toolset',
    answers: [
      'A set of native modules',
      'A build tool for React',
      'A faster JavaScript engine',
      'An easier way to test and deploy apps',
    ],
    correctAnswerIndex: 3,
  },
  {
    question: 'What is the purpose of the `Flexbox` layout in React Native?',
    category: 'React Native styling',
    answers: [
      'To provide a grid system',
      'To design responsive layouts',
      'To allow 3D transformations',
      'To allow smooth animations',
    ],
    correctAnswerIndex: 1,
  },
  {
    question:
      'Which of these is NOT a lifecycle method in a React class component?',
    category: 'React components',
    answers: [
      'shouldComponentUpdate',
      'componentDidUnmount',
      'componentWillReceiveProps',
      'render',
    ],
    correctAnswerIndex: 1,
  },
  {
    question:
      'Which hook allows you to perform side effects in function components?',
    category: 'React hooks',
    answers: ['useReducer', 'useMemo', 'useEffect', 'useState'],
    correctAnswerIndex: 2,
  },
  {
    question:
      'If you want to animate a component, which library might you consider using?',
    category: 'React Native libraries',
    answers: [
      'ReactNativeAnimation',
      'Animated.js',
      'react-native-lottie',
      'react-native-reanimated',
    ],
    correctAnswerIndex: 3,
  },
  {
    question: 'What is the purpose of the `PixelRatio` API in React Native?',
    category: 'React Native APIs',
    answers: [
      'To adjust layout based on screen size',
      "To get the device's pixel density",
      'To define pixel perfect designs',
      'To convert between different measurement units',
    ],
    correctAnswerIndex: 1,
  },
  {
    question:
      'Which of the following is a hook that returns the current theme?',
    category: 'React Native styling',
    answers: ['useColorScheme', 'useTheme', 'useStyle', 'usePalette'],
    correctAnswerIndex: 0,
  },
  {
    question: 'What is Fast Refresh in React Native?',
    category: 'React Native toolset',
    answers: [
      'A way to make the app run faster',
      'A tool to optimize images',
      'A feature that allows quick reloading without losing state',
      'A library to improve animation performance',
    ],
    correctAnswerIndex: 2,
  },
  {
    question: 'How do you detect the current platform in React Native code?',
    category: 'React Native APIs',
    answers: [
      'Device.platform',
      'Platform.OS',
      'ReactNative.platform',
      'System.OS',
    ],
    correctAnswerIndex: 1,
  },
  {
    question: 'Which of the following is used for type checking in React?',
    category: 'React toolset',
    answers: ['TypeScript', 'PropTypes', 'Flow', 'Both TypesScript and Flow'],
    correctAnswerIndex: 3,
  },
  {
    question:
      "Which of the following is NOT a part of React Native's architecture?",
    category: 'React Native core',
    answers: ['Virtual DOM', 'Bridge', 'Native Modules', 'JavaScript Core'],
    correctAnswerIndex: 0,
  },
  {
    question:
      'Which tool allows you to run React Native code in a web browser?',
    category: 'React Native toolsets',
    answers: ['ReactJS', 'React Native Web', 'React Web', 'Expo Web'],
    correctAnswerIndex: 1,
  },
  {
    question:
      'What is the main benefit of using Hermes in a React Native application?',
    category: 'React Native core',
    answers: [
      'Improved styling capabilities',
      'Faster start-up times',
      'Better integration with native code',
      'Enhanced security features',
    ],
    correctAnswerIndex: 1,
  },
  {
    question: 'What is the main purpose of the `SafeAreaView` in React Native?',
    category: 'React Native',
    answers: [
      'To make animations safe',
      'To avoid notches and sensor clusters on modern devices',
      'To protect data storage',
      'To create a responsive design',
    ],
    correctAnswerIndex: 1,
  },
  {
    question:
      'Which method (on class component) can be used to force a component to re-render?',
    category: 'React Native',
    answers: [
      'this.reRender()',
      'this.forceUpdate()',
      'this.updateComponent()',
      'this.refresh()',
    ],
    correctAnswerIndex: 1,
  },
  {
    question: 'How would you change the state in a class-based component?',
    category: 'React Native',
    answers: [
      "this.state = { key: 'value' }",
      "this.setState({ key: 'value' })",
      "this.changeState({ key: 'value' })",
      "this.update({ key: 'value' })",
    ],
    correctAnswerIndex: 1,
  },
  {
    question: 'Which prop type is used to ensure a prop provides a function?',
    category: 'React Native',
    answers: [
      'PropTypes.func',
      'PropTypes.function',
      'PropTypes.method',
      'PropTypes.callback',
    ],
    correctAnswerIndex: 0,
  },
  {
    question:
      'Which of the following is used to create a modal in React Native?',
    category: 'React Native',
    answers: ['<ModalView>', '<PopUp>', '<Overlay>', '<Modal>'],
    correctAnswerIndex: 3,
  },
  {
    question: 'In a Flexbox layout, what does `alignItems` control?',
    category: 'React Native',
    answers: [
      'Vertical alignment',
      'Horizontal alignment',
      'Spacing between items',
      'Direction of items',
    ],
    correctAnswerIndex: 0,
  },
  {
    question:
      'Which of the following is NOT a valid value for `flexDirection`?',
    category: 'React Native',
    answers: ['row', 'column', 'vertical', 'row-reverse'],
    correctAnswerIndex: 2,
  },
  {
    question: 'How can you add custom fonts to a React Native project?',
    category: 'React Native',
    answers: [
      'Using CSS imports',
      'Using the `Font` API',
      'Linking assets and recompiling',
      'Fetching them online at runtime',
    ],
    correctAnswerIndex: 2,
  },
  {
    question:
      'Which React Native API is used to detect the orientation of the device?',
    category: 'React Native',
    answers: ['OrientationAPI', 'DeviceInfo', 'ScreenInfo', 'Dimensions'],
    correctAnswerIndex: 3,
  },
  {
    question:
      'What component wraps user interface (UI) components for screen reader accessibility?',
    category: 'React Native',
    answers: [
      '<Accessible>',
      '<A11y>',
      '<ScreenReader>',
      '<AccessibilityInfo>',
    ],
    correctAnswerIndex: 3,
  },
  {
    question:
      'Which API is used to fetch data in React Native? (only hermes runtime - no npm packages)',
    category: 'React Native',
    answers: ['XMLHttpRequest', 'axios', 'fetch', 'jQuery.ajax'],
    correctAnswerIndex: 2,
  },
  {
    question:
      "Which of the following is a performance tool to visualize and diagnose your app's performance bottlenecks?",
    category: 'React Native',
    answers: ['React DevTools', 'Hermes Inspector', 'Profiler', 'Systrace'],
    correctAnswerIndex: 3,
  },
  {
    question: 'What is the purpose of the `useCallback` hook?',
    category: 'React Native',
    answers: [
      'To memorize a callback function',
      'To fetch data using callbacks',
      'To manage component state',
      'To handle component lifecycle methods',
    ],
    correctAnswerIndex: 0,
  },
  {
    question:
      'Which of the following is NOT a common prop for most React Native components?',
    category: 'React Native',
    answers: ['style', 'onRender', 'onPress', 'children'],
    correctAnswerIndex: 1,
  },
  {
    question:
      'Which hook is used to manage component state in functional components?',
    category: 'React Native',
    answers: ['useEffect', 'useState', 'useReducer', 'useProps'],
    correctAnswerIndex: 1,
  },
  {
    question: 'What is the primary purpose of the `VirtualizedList` component?',
    category: 'React Native',
    answers: [
      'To create a list with animation effects',
      'To create a scrollable list of a few items',
      'To efficiently render a large, scrollable list of items',
      'To simulate a list in virtual reality',
    ],
    correctAnswerIndex: 2,
  },
  {
    question: 'Which of the following methods is NOT a React lifecycle method?',
    category: 'React Native',
    answers: [
      'componentWillUpdate',
      'componentDidCatch',
      'componentRendered',
      'shouldComponentUpdate',
    ],
    correctAnswerIndex: 2,
  },
  {
    question: 'How can you add spacing between items in a Flexbox layout?',
    category: 'React Native',
    answers: ['space-between', 'marginSpacing', 'flexSpace', 'justifyContent'],
    correctAnswerIndex: 0,
  },
  {
    question: 'Which of the following is NOT a method on the `Animated` API?',
    category: 'React Native',
    answers: ['spring', 'decay', 'slide', 'timing'],
    correctAnswerIndex: 2,
  },
  {
    question: 'Thank You for participating, the results are as following:',
    category: 'React Native core',
    answers: ['N/A', 'N/A', 'N/A', 'N/A'],
    correctAnswerIndex: 0,
  },
]

export default function TournamentView() {
  const [renderState, setRenderState] = useState(0)

  const [currentQuestion, setCurrentQuestion] = useState(0)

  const participants = [
    'butters',
    'kaniajestop/Michal',
    'Pysiek987/Kacperek',
    'artuzjesz',
    'Filipo',
    'karl_the_abuser/kub2137',
    'BambiLama69',
  ]

  const [pointTable, setPointTable] = useState<{ [user: string]: number }>({
    fulftexPP: -4,
  })

  const [question, setQuestion] = useState<string>(questions[0].question)

  //const [category, setCategory] = useState<string>(questions[0].category);

  const [answers, setAnswers] = useState<string[]>(questions[0].answers)
  const [correctAnswer, setCorrectAnswer] = useState<string>(
    questions[0].answers[questions[0].correctAnswerIndex]
  )
  const onResult = (user: string, points: number) => {
    setPointTable((prev) => {
      if (prev[user] === undefined) {
        prev[user] = 0
      }
      prev[user] += points
      return prev
    })
    setRenderState(2)
  }

  const totalQuestions = questions.length

  const handleStart = () => {
    setRenderState(1)
  }
  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => {
      const newIdx = prev + 1

      setAnswers(questions[newIdx].answers)
      //setCategory(questions[newIdx].category);
      setRenderState(1)
      setCorrectAnswer(
        questions[newIdx].answers[questions[newIdx].correctAnswerIndex]
      )
      setQuestion(questions[newIdx].question)
      return newIdx
    })
  }
  return (
    <div style={{ width: '1920px', height: '1080px' }}>
      <img src={'knurniej.png'} width={'1920px'} height={'1080px'} />
      <div
        style={{
          width: '1200px',
          height: '500px',
          position: 'absolute',
          left: '666px',
          top: '365px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        {renderState === 0 ? (
          <>
            <h1 onClick={handleStart}>START 21:30</h1>
            <br />
            <br />
            <h2>
              MAIN PRIZE - REACT NATIVE EU CONFERENCE TICKET (800 EURO VALUE)
            </h2>
            <h3>SOME SMALL GIFTS FOR OTHER PARTICIPANTS</h3>
            <br />
            <br />
            <h3>GOOD LUCK AND HAVE FUN</h3>
          </>
        ) : null}
        {renderState === 1 ? (
          <TournamentQuestionView
            onResult={onResult}
            answers={answers}
            correctAnswer={correctAnswer}
            question={question}
            participants={participants}
            questionIndex={currentQuestion}
            questionTotal={totalQuestions}
            pointTable={pointTable}
          ></TournamentQuestionView>
        ) : null}
        {renderState === 2 ? (
          <>
            <h1 onClick={handleNextQuestion}>{'GET READY ...'}</h1>
          </>
        ) : null}
      </div>
    </div>
  )
}
