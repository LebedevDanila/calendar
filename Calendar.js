class Calendar {
  constructor() {
    /* Получение текущего года и месяца */
    this.yearCurrent = new Date().getFullYear();
    this.monthCurrent = new Date().getMonth();

    this.init();
  }
  init = () => {
    /* Прослушивание событий на переключение на предыдущий или следующий месяц */
    document.querySelector('.prev-btn').addEventListener('click', this.switchPrevMonth);
    document.querySelector('.next-btn').addEventListener('click', this.switchNextMonth);

    /* Вывод текущего года и месяца */
    this.renderDays(this.yearCurrent, this.monthCurrent);
  }
  renderDays = (year, month) => {
    const containerDays = document.querySelector('.calendar__days');

    /* Получение информации о месяце */
    let { nameMonth, countDays, firstWeekday } = this.getInfoMonth(year, month);

    /* Очистка верстки старых дней */
    containerDays.innerHTML = '';

    /* Вывод верстки дней */
    if(firstWeekday == 0) {
      console.log(firstWeekday);
      firstWeekday = 7;
    }
    /* Вывод пустых первых дней неделей, не попадующих в месяц */
    for(let i = 1; i < firstWeekday; i++) {
        containerDays.innerHTML += `
          <div class="calendar__day empty"></div>
        `;
    }
    /* Вывод дней месяца */
    for(let i = 1; i <= countDays; i++) {
      // Вывод текущего дня
      if(this.getToday(i)) {
        containerDays.innerHTML += `
          <div class="calendar__day today">${i}</div>
        `;
        continue;
      }
      containerDays.innerHTML += `
        <div class="calendar__day">${i}</div>
      `;
    }

    /* Вывод месяца */
    document.querySelector('.calendar__month').innerHTML = nameMonth;
    /* Вывод года */
    document.querySelector('.calendar__year').innerHTML = this.yearCurrent;
  }
  getInfoMonth(year, month) {
    const monthsName = [
      "January", "February", "March", "April", 
      "May", "June", "July", "August", 
      "September", "October", "November", "December"
    ];

    return {
      nameMonth: monthsName[month],
      countDays: new Date(year, month+1, 0).getDate(),
      firstWeekday: new Date(year, month, 1).getDay(),
    }
  }
  getToday = (i) => {
    if(i == new Date().getDate() 
    && this.monthCurrent == new Date().getMonth() 
    && this.yearCurrent == new Date().getFullYear()) {
      return true;
    }

    return false;
  }
  switchPrevMonth = () => {
    this.monthCurrent--;

    if(this.monthCurrent < 0) {
      this.monthCurrent = 11;
      this.yearCurrent--;
    }

    this.renderDays(this.yearCurrent, this.monthCurrent);
  }
  switchNextMonth = () => {
    this.monthCurrent++;

    if(this.monthCurrent > 11) {
      this.monthCurrent = 0;
      this.yearCurrent++;
    }

    this.renderDays(this.yearCurrent, this.monthCurrent);
  }
}
const calendar = new Calendar();