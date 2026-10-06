export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  intro: string;
  technologies: string[];
  cardTechnologies?: string[];
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
  'Excel',
  'Power BI',
  'AI / LLM',
  'Product Management',
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
  'iOS SDK',
  'Objective-C',
  'C/C++',
  'LLM',
  'TensorFlow',
  'PyTorch',
  'GCP',
  'Spring',
  'Django',
  'FastAPI',
  'Linux Administration',
  'LLM Fine-tuning',
  'LoRA',
  'Self-hosted AI / Ollama',
];

// Відповіді учасників скорочено для презентації; джерело фото — надані командою знімки.
export const team: TeamMember[] = [
  {
    id: 'andrii',
    name: 'Андрій',
    role: 'Fullstack Developer',
    location: 'Миколаїв → Флорида, США',
    intro: '5 років у розробці · Фінтех і платіжні системи',
    technologies: ['React', 'Next.js', 'TypeScript', 'C#', '.NET', 'Azure'],
    cardTechnologies: ['TypeScript', 'C#'],
    image: 'photos/andrii-portrait.webp',
    imageAlt: 'Портрет Андрія Коптєва',
    imageStyle: 'cutout',
    accent: 'cyan',
    about:
      'Родом із Миколаєва, живу у Флориді. За першою освітою — магістр економіки підприємства. Зараз створюю фінтех-продукти.',
    experience:
      '5 років створюю вебпродукти: від інтерфейсів до API та інтеграцій. Зараз розробляю фінтех-проєкти та інтегрую платіжні системи.',
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
    image: 'photos/valentyna-portrait.webp',
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
    image: 'photos/serhii-portrait.webp',
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
    image: 'photos/halyna-portrait.webp',
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
  {
    id: 'valentyna-drozd',
    name: 'Валентина Дрозд',
    role: 'Експертка з екологічного відновлення, протимінної діяльності та ОПК',
    location: 'Київ, Україна',
    intro: 'Прикладна математика · Екологія та відновлення України',
    technologies: [
      'Artificial Intelligence',
      'Machine Learning',
      'LLM',
      'цифрові інструменти',
      'IMAS',
      'ISO / ДСТУ',
    ],
    image: 'photos/valentyna-drozd-portrait.webp',
    imageAlt: 'Портрет Валентини Дрозд',
    imageStyle: 'cutout',
    accent: 'purple',
    about:
      'За освітою — прикладний математик, також вивчала міжнародні економічні відносини. Працюю над екологічним відновленням України та протимінною діяльністю.',
    experience:
      'Досвід у держуправлінні, ОПК, аудиті й розмінуванні. Нині очолюю лабораторію екологічного забезпечення протимінної діяльності.',
    whyNeoversity:
      'Хочу системно опанувати AI/ML та застосовувати їх для екологічного відновлення, протимінної діяльності, аналізу даних і управління складними процесами.',
    goal: 'Розробити AI-рішення з аналізом даних, ML та LLM для підтримки рішень у сфері екологічного відновлення й протимінної діяльності України.',
    superpower:
      'Поєдную математичне мислення, стратегічний аналіз і практичний досвід. Структурую складні проблеми та перетворюю їх на рішення, стандарти й проєкти.',
    helpOthers:
      'Поділюся досвідом стратегічного управління, міжнародної співпраці, стандартизації та освітніх проєктів. Цікава командна робота на перетині AI, екології й безпеки.',
    afterGraduation:
      'Застосовувати AI/ML у відновленні України та протимінній діяльності, створювати цифрові системи підтримки прийняття рішень.',
    nextStep: 'AI для екологічного відновлення та протимінної діяльності',
  },
  {
    id: 'olena-hokun',
    name: 'Олена Гокун',
    role: 'Senior iOS Engineer / Team Lead',
    location: 'Львів',
    intro: 'В IT з 2007 року · iOS з 2008 року',
    technologies: ['iOS SDK', 'Swift', 'Objective-C', 'C/C++'],
    image: 'photos/olena-hokun-portrait.webp',
    imageAlt: 'Портрет Олени Гокун',
    imageStyle: 'cutout',
    accent: 'lime',
    about:
      'Народилася в Харкові, останні два роки живу у Львові. Студентка, програмістка, дружина й мама трьох дітей. Люблю тварин, орхідеї та акваріумістику.',
    experience: 'Працюю в IT з 2007 року, з 2008 займаюся розробкою під iOS.',
    whyNeoversity:
      'Вивчала ML у Stanford, deeplearning.ai та ХНУРЕ. Навчання перервало вторгнення. Тут хочу здобути освіту з комп’ютерних наук і поглибити AI/ML.',
    goal: 'Встигнути все вивчити й не поїхати дахом 🙂',
    superpower: 'Можу одним оком писати код, а другим — перевіряти англійську сина.',
    helpOthers: 'Люблю й добре вмію вчитися. Можу навчити цьому інших 🙂',
    afterGraduation: 'Лупати ту саму скелю, але, ймовірно, з іншого боку. Можливо, у MilTec.',
    nextStep: 'ШІ в поточній роботі або ML для MilTec',
  },
  {
    id: 'tetiana',
    name: 'Тетяна',
    role: 'Analyst',
    location: 'Київ',
    intro: 'Фінансовий аналіз · Дані та бізнес-рішення',
    technologies: ['Excel', 'Power BI', 'SQL'],
    image: 'photos/tetiana-portrait.webp',
    imageAlt: 'Портрет Тетяни',
    imageStyle: 'cutout',
    accent: 'cyan',
    about:
      'Аналітик із багаторічним досвідом у фінансовому та економічному аналізі, роботі з даними та бізнес-аналітиці.',
    experience:
      'Маю досвід у фінансовому й економічному аналізі, бюджетуванні, управлінській звітності, аналізі продажів та оцінці інвестиційних проєктів.',
    whyNeoversity:
      'Хочу перейти від класичного аналізу даних до глибшого розуміння AI/ML — не лише користуватися інструментами, а розуміти їхню роботу й створювати практичні рішення.',
    goal: "Поєднати свій досвід в економіці та аналітиці з новими знаннями в галузі комп'ютерних наук та AI/ML.",
    superpower: 'Аналітичне мислення.',
    helpOthers: 'Можу просто вислухати.',
    afterGraduation:
      'Хочу використовувати знання AI/ML у реальних бізнес-проєктах і розширити свою професійну роль.',
    nextStep: 'AI/ML в аналітиці даних',
  },
  {
    id: 'boris-gulyaev',
    name: 'Boris Gulyaev',
    role: 'Head of Product',
    location: 'Kyiv',
    intro: 'AI-продукти · Стратегія та SaaS',
    technologies: ['AI / LLM', 'Product Management', 'Analytics/Metrics', 'Cloud & SaaS'],
    image: 'photos/boris-gulyaev-portrait.webp',
    imageAlt: 'Портрет Бориса Гуляєва',
    imageStyle: 'cutout',
    accent: 'purple',
    about:
      'Створюю й масштабую AI-продукти на перетині продуктової стратегії, бізнесу й технологій.',
    experience:
      'Запускаю AI-функції в EdTech і SaaS та координую Enterprise AI програми з міжнародними командами.',
    whyNeoversity:
      'Хочу поглибити технічне розуміння Computer Science, AI та ML: краще розуміти архітектуру продуктів, принципи роботи моделей, дані й технологічні обмеження.',
    goal: 'Поєднати досвід у продуктовій стратегії з глибшими знаннями Computer Science та AI/ML, щоб створювати складніші AI-native продукти й системи.',
    superpower:
      'Системне мислення та здатність перетворювати складні технологічні й бізнес-задачі на зрозумілу стратегію та план дій.',
    helpOthers:
      'Можу допомогти з продуктовою стратегією, Product Management, запуском технологічних продуктів, Enterprise AI програмами та роботою з міжнародними командами.',
    afterGraduation:
      'Хочу застосовувати AI/ML для створення AI-native продуктів, трансформації бізнес-моделей та вирішення складних бізнес-задач.',
    nextStep: 'AI Product Strategy та Enterprise AI Architecture',
  },
  {
    id: 'vladyslav',
    name: 'Vladyslav',
    role: 'AI / ML Engineer & Systems Specialist',
    location: 'Кременчук → Таллінн, Естонія',
    intro: 'Linux, Docker і локальні LLM',
    technologies: [
      'Linux Administration',
      'Docker',
      'LLM Fine-tuning',
      'LoRA',
      'Self-hosted AI / Ollama',
      'Hardware & Server Infrastructure',
    ],
    cardTechnologies: ['Docker', 'LoRA'],
    image: 'photos/vladyslav-portrait.webp',
    imageAlt: 'Портрет Владислава в сонцезахисних окулярах',
    imageStyle: 'cutout',
    accent: 'purple',
    about:
      'Родом із Кременчука, живу в Таллінні. Освіта — IT у політехнічному коледжі. Цікавлюся серверами та AI.',
    experience:
      'Із раннього віку цікавлюся Linux і серверами. Працював із «залізом», Docker та розгортанням сервісів; донавчав компактні моделі через LoRA.',
    whyNeoversity:
      'Хочу глибше зрозуміти інфраструктуру й алгоритми компактних LLM та навчитися створювати й донавчати моделі, а не лише запускати готові рішення.',
    goal: 'Здобути фундаментальні знання й створити масштабний практичний проєкт на основі власних моделей.',
    superpower:
      'Швидко налаштовую й оптимізую Linux-середовища та Docker-контейнери для складних сервісів.',
    helpOthers:
      'Можу допомогти розгорнути й захостити проєкт або backend, налаштувати Linux-сервер, Docker та локальну AI-модель.',
    afterGraduation:
      'Працювати над створенням, донавчанням та оптимізацією спеціалізованих AI-моделей для конкретних задач.',
    nextStep: 'Fine-tuning моделей та AI-інфраструктура',
  },
];

export const profileSections = [
  {
    key: 'about',
    title: 'Про мене',
    question: 'Яка твоя історія?',
    icon: 'person',
    code: 'profile.about',
  },
  {
    key: 'experience',
    title: 'Досвід',
    question: 'Чим займаєшся професійно?',
    icon: 'code',
    code: 'experience.log',
  },
  {
    key: 'whyNeoversity',
    title: 'Чому Neoversity?',
    question: 'Що привело тебе до AI & ML?',
    icon: 'spark',
    code: 'learning.why()',
  },
  {
    key: 'goal',
    title: 'Моя ціль',
    question: 'Що хочеш створити за час навчання?',
    icon: 'target',
    code: 'goals.build()',
  },
  {
    key: 'superpower',
    title: 'Суперсила',
    question: 'Що вдається тобі найкраще?',
    icon: 'bolt',
    code: 'strength.core',
  },
  {
    key: 'helpOthers',
    title: 'Чим можу допомогти',
    question: 'Чим можеш бути корисним іншим студентам?',
    icon: 'heart',
    code: 'team.support()',
  },
  {
    key: 'afterGraduation',
    title: 'Після магістратури',
    question: 'Яким бачиш свій наступний крок?',
    icon: 'arrow',
    code: 'future.next()',
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
      final: {
        label: 'хто ми як команда',
        command: 'cat team/TEAM.md',
        note: 'Різні історії. Один простір для навчання.',
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
    final: {
      command: 'cat team/TEAM.md',
      response: 'П’ять запитань. Одна команда. Далі — спільна робота.',
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
      'Об’єднуємо команду',
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
    expandSection: 'Розгорнути розділ',
    closeSection: 'Закрити розділ',
    previousSection: 'Попередній розділ',
    nextSection: 'Наступний розділ',
    focusHint: '← → розділи · Esc закрити',
    journey: {
      label: 'Професійний шлях',
      before: 'ДО NEOVERSITY',
      now: 'ЗАРАЗ',
      studying: 'Neoversity · AI / ML',
      next: 'ДАЛІ',
    },
  },
  final: {
    eyebrow: 'TEAM.md / НАШ ВИСНОВОК',
    title: 'Хто ми як команда?',
    subtitle: 'Ми різні за досвідом, але зібралися в одну AI / ML-гілку.',
    people: 'у команді',
    hint: 'Оберіть тему · клавіші 1–5',
    answersLabel: 'Питання про команду',
    answerLabel: 'НАША ВІДПОВІДЬ',
    questions: [
      {
        label: 'Сильні сторони',
        title: 'Наш спільний стек',
        answer:
          'Ми поєднуємо досвід у розробці, аналітиці, продукті та інфраструктурі. Дивимося на задачі з різних боків — від інтерфейсу до сервера. Тепер додаємо AI / ML.',
        tags: ['Product', 'UI', 'API', 'Data', 'Infra'],
      },
      {
        label: 'Різноманітність досвіду',
        title: 'Від Swift до LoRA і Docker',
        answer:
          'Наш стек — React, .NET, Java, Go, Swift, SQL, Power BI, Linux, Docker і LoRA. Ми доповнюємо одне одного й разом бачимо більше можливостей.',
        tags: ['Frontend', 'Backend', 'Mobile', 'Infra', 'Models'],
      },
      {
        label: 'Спільні цілі',
        title: 'Розуміти й будувати',
        answer:
          'Ми хочемо глибоко зрозуміти AI / ML і поєднати ці знання з нашим досвідом. Наш наступний реліз — власні AI-рішення для реальних задач.',
        tags: ['Основи AI / ML', 'Експерименти', 'Практика'],
      },
      {
        label: 'Цінності в навчанні',
        title: 'Вчимося разом',
        answer:
          'Ми цінуємо обмін знаннями, підтримку й відкритий діалог. Хочемо вчитися одне в одного: досвід кожного — апгрейд для всієї команди.',
        tags: ['Обмін знаннями', 'Діалог', 'Ітерації'],
      },
      {
        label: 'Що робить нас особливими',
        title: 'Різні системи. Спільний апгрейд.',
        answer:
          'Ми різні за досвідом, але гілка тепер спільна — AI / ML. Будемо разом вчитися й створювати корисне. А merge досвіду робитимемо всією командою.',
        tags: ['Різні стеки', 'Спільне навчання', 'Практика'],
      },
    ],
    current: 'ЗАРАЗ',
    currentValue: 'Наш досвід і різні стеки',
    next: 'ДАЛІ',
    nextValue: 'AI / ML у реальних задачах',
    footer: 'Дякуємо! Наша наступна версія вже в розробці.',
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
    final: 'Про нас',
    slide: 'Слайд',
    backToTeam: 'До команди',
    skip: 'Перейти до змісту',
  },
};
