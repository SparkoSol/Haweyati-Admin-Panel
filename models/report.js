export class Report {
  year = undefined
  week = undefined
  date = undefined
  month = undefined
  dateTo = undefined
  payment = undefined
  customer = undefined
  driver = undefined
  supplier = undefined

  constructor(year, week, date, month, dateTo) {
    this.year = year
    this.week = week
    this.date = date
    this.month = month
    this.dateTo = dateTo
  }
}
