export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  intro: string;
  about: string;
  experience: string;
  whyNeoversity: string;
  goal: string;
  superpower: string;
  outsideCode: string;
  afterGraduation: string;
  image?: string;
  imageAlt?: string;
  accent: 'cyan' | 'purple' | 'lime';
}

// Демонстраційні профілі. Замініть або додайте об’єкти — компоненти змінювати не потрібно.
export const team: TeamMember[] = [
  {
    id: 'andrii',
    name: 'Андрій',
    role: 'Fullstack Engineer',
    location: 'Миколаїв → Флорида, США',
    intro: '5 років у розробці · Спорт і книги',
    accent: 'cyan',
    about:
      'Родом із Миколаєва. Зараз живу у Флориді. Люблю перетворювати ідеї на працюючі продукти.',
    experience: '5 років у розробці програмного забезпечення. Зараз працюю Fullstack Engineer.',
    whyNeoversity:
      'Хочу глибше зрозуміти AI, машинне навчання та комп’ютерні науки — і вийти за межі використання готових AI-інструментів.',
    goal: 'Створити готове до продакшену рішення на основі LLM, яке можна використати в реальному продукті.',
    superpower: 'Перетворювати нечіткі ідеї та вимоги на працююче програмне забезпечення.',
    outsideCode:
      'Спорт, бадмінтон і книги. Рух допомагає переключитися, а читання — побачити нові перспективи.',
    afterGraduation:
      'Створювати AI-системи для реальних продуктів і глибше працювати з прикладним AI / ML.',
  },
  {
    id: 'oleksii',
    name: 'Олексій',
    role: 'Backend Engineer',
    location: 'Київ → Варшава',
    intro: '6 років у розробці · Подорожі й велосипед',
    accent: 'purple',
    about:
      'Інженер-програміст із Києва, зараз живу у Варшаві. Цікавлюся розподіленими системами та AI.',
    experience: '6 років працюю переважно з бекенд-застосунками та API.',
    whyNeoversity:
      'Хочу зрозуміти основи машинного навчання та поєднати їх із практичною розробкою програмного забезпечення.',
    goal: 'Запустити сервіс із машинним навчанням, яким користуватимуться реальні люди.',
    superpower: 'Розкладати складні технічні задачі на невеликі, зрозумілі кроки.',
    outsideCode: 'Велосипед і подорожі. Люблю відкривати нові маршрути та міста.',
    afterGraduation:
      'Працювати над AI-інфраструктурою та інтелектуальними бекенд-системами в продакшені.',
  },
  {
    id: 'maria',
    name: 'Марія',
    role: 'Frontend Engineer',
    location: 'Львів → Берлін',
    intro: '4 роки у розробці · Фото й походи',
    accent: 'lime',
    about:
      'Фронтенд-розробниця зі Львова, зараз живу в Берліні. Люблю поєднувати технології та візуальний досвід.',
    experience: '4 роки створюю вебзастосунки з React та TypeScript.',
    whyNeoversity:
      'Хочу зрозуміти, що відбувається за AI-інтерфейсами, і навчитися створювати цілісні продукти на основі AI.',
    goal: 'Створити AI-застосунок: від першої ідеї до працюючого продукту.',
    superpower: 'Робити складні інтерфейси простими та інтуїтивними.',
    outsideCode: 'Фотографія та походи. Шукаю нові ракурси й натхнення на природі.',
    afterGraduation: 'Створювати сучасні AI-застосунки, у центрі яких — людина.',
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
    key: 'outsideCode',
    title: 'Поза кодом',
    question: 'Що надихає поза роботою?',
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
  sample: 'Демонстраційні профілі',
  visual: { ai: 'AI', human: '× ЛЮДИ', avatarLabel: 'ЛЮДИНА / AI', release: 'NEXT_RELEASE' },
  intro: {
    eyebrow: 'НОВА КОМАНДА. НАСТУПНА ВЕРСІЯ.',
    subtitle: 'Ми пишемо код. Тепер — пишемо нову главу.',
    initializing: 'Ініціалізація команди',
    bootLabel: 'ЗАПУСК TEAM_OS',
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
  },
  overview: {
    eyebrow: '01 / ЗНАЙОМСТВО',
    title: 'Знайомтесь. Це ми.',
    subtitle: 'Різний досвід. Спільний напрям — AI & Machine Learning.',
    cardAction: 'Відкрити профіль',
    select: 'Оберіть учасника або продовжуйте по черзі',
    people: 'у команді',
    demo: 'Зараз — приклади. Далі — наші історії.',
  },
  profile: {
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
    developers: 'розробники',
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
