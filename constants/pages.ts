const Pages = {
  Home: { header: 'Главная', title: 'Главная', route: '/' },

  SignUp: { header: 'Регистрация', title: 'Регистрация', route: '/join' },
  SignIn: { header: 'Вход', title: 'Вход', route: '/login' },
  Recover: { header: 'Восстановление пароля', title: 'Восстановление пароля', route: '/recover' },

  About: { header: 'О Молодежной Бизнес Лиге', title: 'О МБЛ', route: '/about' },
  Companies: { header: 'Компании', title: 'Компании', route: '/companies' },
  Cources: { header: 'Программы', title: 'Программы', route: '/cources' },
  Events: { header: 'Мероприятия', title: 'Мероприятия', route: '/events' },
  Members: { header: 'Участники лиги', title: 'Участники', route: '/members' },
  News: { header: 'Новости', title: 'Новости', route: '/news' },
  Projects: { header: 'Проекты', title: 'Проекты', route: '/projects' },
  Terms: { header: 'Политика конфиденциальности', title: 'Политика конфиденциальности', route: '/terms' },
  Search: { header: 'Поиск', title: 'Поиск по сайту', route: '/search' },

  Profile: { header: 'Личный кабинет', title: 'Профиль', route: '/profile' },
  ProfileEdit: { header: 'Редактирование профиля', title: 'Редактирование профиля', route: '/profile/edit' },
  MyEvents: { header: 'Мои мероприятия', title: 'Мои мероприятия', route: '/profile/events' },
  MyCources: { header: 'Мои программы', title: 'Мои программы', route: '/profile/cources' },
  MyProjects: { header: 'Мои проекты', title: 'Мои проекты', route: '/profile/projects' },

  CreateEvent: { header: 'Создание мероприятия', title: 'Новое мероприятие', route: '/profile/events/create' },
  CreateCource: { header: 'Создание программы', title: 'Новая программа', route: '/profile/cources/create' },
  CreateProject: { header: 'Создание проекта', title: 'Новый проект', route: '/profile/projects/create' },
  CreateCompany: { header: 'Создание компании', title: 'Привязать юр. лицо', route: '/profile/companies/create' },
}

export default Pages