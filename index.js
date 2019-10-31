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
}

// 4-element Array of a String, String, String, 
//and Number corresponding to a first name, family name, title, and pay rate per hour
function createEmployeeRecord(array) {
  let record = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
  }
  return record;
}

function createEmployeeRecords(nestedArray) {
  let records = nestedArray.map(array => {
      return createEmployeeRecord(array);
  });
  return records;
}

function createTimeInEvent(dateStamp) {
    let [date, time] = dateStamp.split(' ');

    this.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(time, 10),
      date: date
    })
   return this;
}

function createTimeOutEvent(dateStamp) {
    let [date, time] = dateStamp.split(' ');

    this.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(time, 10),
      date: date
    })
   return this;
}

function hoursWorkedOnDate(dateStamp) {
  let timeIn = this.timeInEvents.find(clockIn => {
      return clockIn.date === dateStamp
  });

  let timeOut = this.timeOutEvents.find(clockOut => {
      return clockOut.date === dateStamp
  });

  return ((timeOut.hour - timeIn.hour) / 100);
}

function wagesEarnedOnDate(dateStamp) {
  let payOwed = hoursWorkedOnDate.call(this, dateStamp)
  return payOwed * this.payPerHour;
}


function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

function findEmployeeByFirstName(collection, firstNameString) {
  return collection.find(employee => {
      return employee.firstName === firstNameString
  });
}