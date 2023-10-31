// Функция извлекает из строки время, приводит к минутам с начала суток
const parseTimeinMinutes = (string) => parseInt(string.split(':')[0], 10) * 60 + parseInt(string.split(':')[1], 10);


// Функция определяет, не выходит ли встреча за рамки рабочего дня
const isWithinWorkingDay = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartinMinutes = parseTimeinMinutes(workStart);
  const workEndinMinutes = parseTimeinMinutes(workEnd);
  const meetingStartinMinutes = parseTimeinMinutes(meetingStart);
  const meetingEndinMinutes = meetingStartinMinutes + meetingDuration;

  return meetingStartinMinutes >= workStartinMinutes && meetingEndinMinutes <= workEndinMinutes;
};

export {isWithinWorkingDay};
// Проверка
// console.log(isWithinWorkingDay('08:00', '17:30', '14:00', 90));
// console.log(isWithinWorkingDay('8:0', '10:0', '8:0', 120));
// console.log(isWithinWorkingDay('08:00', '14:30', '14:00', 90));
// console.log(isWithinWorkingDay('14:00', '17:30', '08:0', 90));
// console.log(isWithinWorkingDay('8:00', '17:30', '08:00', 900));
