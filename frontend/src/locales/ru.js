export default {
  translation: {
    loginPage: {
      enter: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      noAcc: 'Нет аккаунта? ',
      registration: 'Регистрация',
      errors: {
        wrongLoginOrPass: 'Неверные имя пользователя или пароль',
      },
    },
    signupPage: {
      registration: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      signup: 'Зарегистрироваться',
      errors: {
        minMax: 'От 3 до 20 символов',
        min6: 'Не менее 6 символов',
        max20: 'Не более 20 символов',
        required: 'Обязательное поле',
        mustMatch: 'Пароли должны совпадать',
        alreadyExist: 'Пользователь уже существует',
      },
    },
    chatPage: {
      main: {
        channels: 'Каналы',
      },
      channels: {
        dropdown: {
          delete: 'Удалить',
          rename: 'Переименовать',
        },
      },
      messages: {
        messagesCount: 'Сообщений: ',
        sendMessagesForm: {
          placeholder: 'Введите сообщение...',
          send: 'Отправить',
        },
      },
    },
    modal: {
      add: {
        addChannel: 'Добавить канал',
        send: 'Отправить',
        forLabel: 'Имя канала',
        errors: {
          minMax: 'От 3 до 20 символов',
          required: 'Обязательное поле',
          uniqName: 'Имя должно быть уникальным',
        },
      },
      remove: {
        deleteChannel: 'Удалить канал',
        sure: 'Уверены?',
        delete: 'Удалить',
        cancel: 'Отмена',
      },
      rename: {
        renameChannel: 'Переименовать канал',
        cancel: 'Отмена',
        save: 'Сохранить',
        forLabel: 'Имя канала',
        errors: {
          minMax: 'От 3 до 20 символов',
          required: 'Обязательное поле',
          uniqName: 'Имя должно быть уникальным',
        },
      },
    },
    navBar: {
      logOut: 'Выйти',
    },
    errorPage: {
      notFound: 'Страница не найдена',
    },
    notifies: {
      networkError: 'Ошибка соединения',
      channelAdd: 'Канал добавлен',
      channelRemove: 'Канал удалён',
      channelRename: 'Канал переименован',
    },
  },
};
