export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  intro: string;
  technologies: string[];
  about: string;
  experience: string;
  whyNeoversity: string;
  goal: string;
  superpower: string;
  helpOthers: string;
  afterGraduation: string;
  nextStep?: string;
  image?: string;
  imageAlt?: string;
  imageStyle?: 'photo' | 'cutout';
  accent: 'cyan' | 'purple' | 'lime';
}

// Місця без отриманих відповідей не є профілями й не додають порожніх слайдів.
export const teamSize = 11;

export function getTeamRoster(members: TeamMember[] = team) {
  const total = Math.max(teamSize, members.length);
  return {
    total,
    pending: Array.from({ length: total - members.length }, (_, index) => ({
      id: `pending-${members.length + index + 1}`,
      number: members.length + index + 1,
    })),
  };
}

// Display eligibility, not a claim about the team: only technologies present in profiles appear.
export const featuredTechnologyNames = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'C#',
  '.NET',
  'Azure',
  'Java',
  'SQL',
  'PHP',
  'Go',
  'AWS',
  'Python',
  'Rust',
  'C++',
  'Node.js',
  'Vue',
  'Angular',
  'Docker',
  'Kubernetes',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'Kotlin',
  'Swift',
  'TensorFlow',
  'PyTorch',
  'GCP',
  'Spring',
  'Django',
  'FastAPI',
];

// Відповіді учасників скорочено для презентації; джерело фото — надані командою знімки.
export const team: TeamMember[] = [
  {
    id: 'andrii',
    name: 'Андрій',
    role: 'Fullstack Developer',
    location: 'Миколаїв → Сарасота, США',
    intro: '4+ роки у розробці · Фінтех і платіжні системи',
    technologies: ['React', 'Next.js', 'TypeScript', 'C#', '.NET', 'Azure'],
    image: 'photos/andrii-portrait.png',
    imageAlt: 'Портрет Андрія Коптєва',
    imageStyle: 'cutout',
    accent: 'cyan',
    about:
      'Родом із Миколаєва, живу в Сарасоті, Флорида. За першою освітою — магістр економіки підприємства. Зараз створюю фінтех-продукти.',
    experience:
      '4+ роки створюю вебпродукти: від інтерфейсів до API та інтеграцій. Зараз розробляю фінтех-проєкти та інтегрую платіжні системи.',
    whyNeoversity:
      'Хочу глибше зрозуміти AI, машинне навчання та комп’ютерні науки — і вийти за межі використання готових AI-інструментів.',
    goal: 'Створити готове до продакшену рішення на основі LLM, яке можна використати в реальному продукті.',
    superpower:
      'Поєдную розуміння бізнесу з розробкою. Допомагаю перетворити складні вимоги на зрозуміле рішення.',
    helpOthers:
      'Люблю командну роботу: ділитися знаннями, підтримувати інших і разом шукати рішення. Можу допомогти з кодом та конструктивним зворотним зв’язком.',
    afterGraduation:
      'Запустити власний AI-стартап: поєднати досвід розробки та бізнесу зі знаннями AI / ML у корисному продукті.',
    nextStep: 'Власний AI-стартап',
  },
  {
    id: 'valentyna',
    name: 'Валентина',
    role: 'Enterprise Developer',
    location: 'Одеса → Лісабон, Португалія',
    intro: '5 років у розробці · Англійська й «Мафія»',
    technologies: ['Java', 'OutSystems', 'SQL', 'JavaScript', 'REST API'],
    image: 'photos/valentyna-portrait.png',
    imageAlt: 'Портрет Валентини',
    imageStyle: 'cutout',
    accent: 'purple',
    about:
      'Родом з Одеси, живу в Лісабоні. За освітою економіст. Викладаю англійську, вчу португальську та організовую «Мафію» для україномовної спільноти.',
    experience:
      '5 років в enterprise-розробці. Починала з Java, потім зробила помилку — перейшла на low-code. Мрію завершити цю затяжну главу.',
    whyNeoversity:
      'Хочу перейти до AI/ML-інженерії та отримати системну базу, яка допоможе в кар’єрі.',
    goal: 'Впевнено опанувати Python і машинне навчання, зібрати портфоліо AI-проєктів і знайти однодумців.',
    superpower:
      'Поєдную технічне мислення з умінням пояснювати складне простими словами. Вмію об’єднати людей і створити комфортну атмосферу.',
    helpOthers:
      'Можу організувати командну «Мафію», допомогти з англійською й підтримати розмову про котиків-собачок.',
    afterGraduation:
      'Працювати AI/ML-інженеркою віддалено в міжнародній компанії, поєднуючи enterprise-досвід із ML. Кава й фрукти вдома чи в кафе смакують краще, ніж в офісі.',
    nextStep: 'AI/ML-інженерія на ремоуті',
  },
  {
    id: 'serhii',
    name: 'Сергій',
    role: 'Software Engineer (back-end) / Team Lead',
    location: 'Краків, Польща',
    intro: '8 років у backend · 10 років у Кракові',
    technologies: [
      'PHP',
      'Go',
      'MySQL',
      'Architecture',
      'AI Spec-Driven Development',
      'Microservices',
    ],
    image: 'photos/serhii-portrait.png',
    imageAlt: 'Портрет Сергія',
    imageStyle: 'cutout',
    accent: 'lime',
    about:
      'За освітою нафтовик. Готувався до Сибіру, −50°C і 12-годинних змін, а потрапив в IT: теплий офіс, яблучка по четвергах, кава й плітки. Уже 10 років живу в Кракові.',
    experience: '8 років у back-end розробці. Працював переважно в продуктових компаніях.',
    whyNeoversity:
      'Чим глибше в ліс, тим краще розумію: фундамент має тріщини 🙂 Час їх поправити.',
    goal: 'Хочу вчитися серед однодумців, отримати солідну основу з AI/ML і, можливо, згодом перейти в ML.',
    superpower: 'Краще за AI підбираю мемчики в тему.',
    helpOthers:
      'Відкритий до нових ідей, беру ініціативу й допомагаю закривати прогалини в комунікації команди.',
    afterGraduation: 'Запустити власний стартап.',
    nextStep: 'Власний стартап',
  },
  {
    id: 'halyna',
    name: 'Галина',
    role: 'Java Tech Leader / Architect, Scrum Master',
    location: 'Львів',
    intro: '18 років в IT · Подорожі й книги',
    technologies: ['Java', 'Microservices', 'Event-driven architecture', 'AWS', 'NoSQL', 'SQL'],
    image: 'photos/halyna-portrait.png',
    imageAlt: 'Портрет Галини',
    imageStyle: 'cutout',
    accent: 'cyan',
    about:
      'Родом із Черкаської області. Навчалася й жила в Харкові, зараз живу у Львові. Обожнюю подорожувати та читати.',
    experience:
      '18 років в IT. Працюю в аутсорс-компанії, останні роки розробляла продукти в телекомі.',
    whyNeoversity:
      'Пройшла курс AI Agentic Engineering, і мені дуже сподобалося. Коли побачила новини про магістратуру, не вагалася.',
    goal: 'Отримати системні знання у сфері AI/ML.',
    superpower: 'Націленість на результат.',
    helpOthers:
      'Готова підтримати команду порадою, коли це потрібно, і вислухати, якщо виникають труднощі.',
    afterGraduation: 'Застосувати системні знання з AI/ML на практиці.',
    nextStep: 'Нова позиція або зміна роботи',
  },
];

export const profileSections = [
  {
    key: 'about',
    title: 'Про мене',
    question: 'Яка твоя історія?',
    icon: 'person',
  },
  {
    key: 'experience',
    title: 'Досвід',
    question: 'Чим займаєшся професійно?',
    icon: 'code',
  },
  {
    key: 'whyNeoversity',
    title: 'Чому Neoversity?',
    question: 'Що привело тебе до AI & ML?',
    icon: 'spark',
  },
  {
    key: 'goal',
    title: 'Моя ціль',
    question: 'Що хочеш створити за час навчання?',
    icon: 'target',
  },
  {
    key: 'superpower',
    title: 'Суперсила',
    question: 'Що вдається тобі найкраще?',
    icon: 'bolt',
  },
  {
    key: 'helpOthers',
    title: 'Чим можу допомогти',
    question: 'Чим можеш бути корисним іншим студентам?',
    icon: 'heart',
  },
  {
    key: 'afterGraduation',
    title: 'Після магістратури',
    question: 'Яким бачиш свій наступний крок?',
    icon: 'arrow',
  },
] as const;

export const content = {
  brand: 'TEAM_OS',
  institution: 'NEOVERSITY',
  program: 'AI & MACHINE LEARNING',
  edition: 'ЗНАЙОМСТВО З КОМАНДОЮ',
  sideNotes: {
    label: 'Нотатки за межами слайда',
    branchLabel: '// наша гілка',
    loopLabel: '// learning loop',
    compactLoop: 'learn → experiment → build → repeat',
    loop: ['learn', 'experiment', 'build'],
    ideaCommand: 'npm run idea',
    ideaAction: 'Ще одна думка про навчання',
    thoughts: [
      'Помилки — теж навчальні дані.',
      'Хороший prompt починається з хорошого запитання.',
      'Спочатку зрозуміти. Потім автоматизувати.',
      'Ctrl + Z для страху. Ctrl + S для досвіду.',
    ],
    screens: {
      intro: {
        label: 'початок',
        command: 'git switch -c ai-ml',
        note: 'Залежність: цікавість. Оновлюємо постійно.',
      },
      team: {
        label: 'команда',
        command: 'cat team/README.md',
        note: 'Різні історії зустрілись в одній гілці.',
      },
      member: {
        label: 'людина за кодом',
        command: 'git switch team/',
        note: 'За кожним профілем — своя історія.',
      },
      'team-summary': {
        label: 'спільний напрям',
        command: 'git merge curiosity',
        note: 'Командна робота починається з розмови.',
      },
      final: {
        label: 'далі — більше',
        command: 'git tag next-chapter',
        note: 'TODO: побудувати щось справді корисне.',
      },
    },
  },
  dev: {
    intro: {
      command: 'git switch -c ai-ml',
      response: 'Нова гілка нашої історії. Досвід беремо із собою.',
    },
    team: {
      command: 'ls ./team',
      response: 'Обери профіль. Далі — знайомство без pull request.',
      previewCommand: 'git switch team/',
      previewResponse: 'Код — у репозиторії. Історія — наживо.',
    },
    profileCommand: 'whoami',
    profileBranch: 'git switch team/',
    summary: {
      command: 'git merge curiosity practice',
      response: 'Конфлікти? Обговоримо разом. Так і працює команда.',
    },
    final: {
      command: 'git commit -m "це лише початок"',
      response: 'Навчання триває. Найцікавіші зміни ще попереду.',
    },
    coffeeCommand: 'npm run coffee',
    coffeeLabel: 'Запустити кавову перерву',
    coffeeResponse: 'Каву заварено ☕ Тепер можна й нейромережу навчити.',
  },
  sample: 'Реальні історії нашої команди',
  visual: { ai: 'AI', human: '× ЛЮДИ', avatarLabel: 'ЛЮДИНА / AI', release: 'NEXT_RELEASE' },
  intro: {
    eyebrow: 'НОВА КОМАНДА. НАСТУПНА ВЕРСІЯ.',
    subtitle: 'Розробка — наш досвід. AI — наш наступний крок.',
    initializing: 'Ініціалізація команди',
    bootLabel: 'ЗАПУСК TEAM_OS',
    bootCommand: 'team.init()',
    bootModules: ['ЛЮДИ', 'ДОСВІД', 'ЦІЛІ', 'КОМАНДА'],
    bootDurationMs: 4000,
    bootHint: 'Можна почати одразу',
    loading: [
      'Завантажуємо людей',
      'Підключаємо досвід',
      'Синхронізуємо цілі',
      'Об’єднуємо розробників',
    ],
    enter: 'Познайомитися',
    tag: 'ЛЮДИ ЗА КОДОМ',
    technologiesLabel: 'СТЕК НАШОЇ КОМАНДИ',
  },
  overview: {
    eyebrow: '01 / ЗНАЙОМСТВО',
    title: 'Знайомтесь. Це ми.',
    subtitle: 'Різний досвід. Спільний напрям — AI & Machine Learning.',
    cardAction: 'Відкрити профіль',
    select: 'Оберіть учасника або продовжуйте по черзі',
    people: 'у команді',
    rosterLabel: 'Склад команди',
    scrollHint: 'Прокрутіть, щоб побачити всю команду',
    pending: 'скоро знайомство',
    pendingTitle: 'Ще трохи — і всі тут.',
    pendingCommand: 'await team.join()',
    pendingLabel: 'Місце для учасника',
    pendingHint: 'Чекаємо на фото та історії',
    note: 'людей. Одна нова гілка — AI / ML.',
  },
  profile: {
    technologiesLabel: 'Основні технології',
    label: 'ПРОФІЛЬ УЧАСНИКА',
    start: 'Моя історія',
    overview: 'Уся команда',
    greeting: 'Знайомтесь,',
    questionCount: 'запитань, щоб дізнатися більше',
    codeFile: 'profile.json',
    upgrade: 'AI / ML',
    status: 'навчаюся',
    sectionLabel: 'РОЗДІЛ',
    read: 'ДІЗНАТИСЯ БІЛЬШЕ',
  },
  summary: {
    eyebrow: 'КОМАНДА / СПІЛЬНИЙ НАПРЯМ',
    title: 'Різні історії. Спільний напрям.',
    people: 'учасників',
    countCaption: 'Одна команда. Багато перспектив.',
    different: 'РІЗНИЙ БЕКГРАУНД',
    differences: ['Міста та історії', 'Технології та досвід', 'Захоплення та погляди'],
    shared: 'СПІЛЬНЕ ВСЕРЕДИНІ',
    common: [
      'Допитливість',
      'Практичний підхід',
      'Інтерес до AI',
      'Бажання створювати реальні продукти',
    ],
    current: 'ПОТОЧНА ВЕРСІЯ',
    currentValue: 'Розробники ПЗ',
    upgrading: 'НАСТУПНА ВЕРСІЯ',
    nextValue: 'AI-інженери',
  },
  final: {
    eyebrow: 'ЦЕ ЛИШЕ ПОЧАТОК',
    title: 'Далі — більше.',
    subtitle: 'Нові знання. Нові експерименти. Реальні продукти.',
    current: 'Поточна версія',
    currentValue: 'Розробники',
    installing: 'Встановлюємо',
    installingValue: 'AI / ML',
    next: 'Наступний реліз',
    nextValue: 'Магістерський ступінь',
    progress: 'Навчання триває',
    footer: 'Вчитися глибоко. Експериментувати. Створювати справжнє.',
    restart: 'Почати спочатку',
  },
  nav: {
    previous: 'Назад',
    next: 'Далі',
    keyboard: 'для навігації',
    fullscreen: 'На весь екран',
    exitFullscreen: 'Вийти з повного екрана',
    fullscreenError: 'Повноекранний режим недоступний у цьому браузері.',
    intro: 'Вступ',
    team: 'Команда',
    summary: 'Про нас',
    final: 'Далі',
    slide: 'Слайд',
    backToTeam: 'До команди',
    skip: 'Перейти до змісту',
  },
};
