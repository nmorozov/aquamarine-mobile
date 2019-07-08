const messages = {
  'User not found': 'Номер договора не найден',
  'Bad Request': 'Ошибка сервера. Попробуйте позже',
  'Missing parameters. "username" and "password" are required': 'Введите имя пользователя и пароль',
  'Network request failed': 'Не удалось подключиться к серверу. Проверьте соединение и попробуйте снова.',
  langvar_not_found: 'Внимание! Необходимо задать языковую переменную для этой ошибки в файле responseMessagesTranslator',
};

export default message =>
  (Object.prototype.hasOwnProperty.call(messages, message)
    ? messages[message] : `${messages.langvar_not_found} ${message}`);
