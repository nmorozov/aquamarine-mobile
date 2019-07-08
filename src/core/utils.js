import dateFormat from 'dateformat';

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function formatDate(date, format) {
  dateFormat.i18n = {
    dayNames: [
      'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',
      'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',
    ],
    monthNames: [
      'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',
      'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',
    ],
    timeNames: [
      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM',
    ],
  };

  dateFormat.masks.dayMonthNameYear = 'dd mmmm yyyy';
  dateFormat.masks.ddmmyyyy = 'dd-mm-yyyy';
  dateFormat.masks.ddmmyyyyWithoutdashes = 'ddmmyyyy';
  dateFormat.masks.timeddmmyyyy = 'hh:MM dd.mm.yyyy';
  dateFormat.masks.ddmmyyyy = 'dd.mm.yyyy';

  return dateFormat(date, format);
}
