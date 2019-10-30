/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};

const createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = function (array) {
    return array.map(record => createEmployeeRecord(record))
};

const createTimeInEvent = function(dateStamp) {
    const dateArray = dateStamp.split(' ');
    const event = {
        type: 'TimeIn',
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    };
    // this is the record. The call would look like record.createTimeInEvent(datestamp)
    this.timeInEvents.push(event);
    return this
};

const createTimeOutEvent = function(dateStamp) {
    const dateArray = dateStamp.split(' ');
    const event = {
        type: 'TimeOut',
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    };
    // this is the record. The call would look like record.createTimeOutEvent(datestamp)
    this.timeOutEvents.push(event);
    return this
};

const hoursWorkedOnDate = function(date) {
  const timeIn = this.timeInEvents.find(e => e.date === date);
  const timeOut = this.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
};

const wagesEarnedOnDate = function(date) {
  const hours = hoursWorkedOnDate.call(this, date);
  const rate = this.payPerHour;
  return hours * rate
};

const calculatePayroll = function(records) {
    const payroll = records.map(r => allWagesFor.call(r));
    return payroll.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0
    );
};

const findEmployeeByFirstName = function(records, firstName) {
    return records.find(r => r.firstName === firstName);
};