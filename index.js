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

const createEmployeeRecord = function([firstName, familyName, title, payPerHour]) {
    let employee = {};
    employee.firstName = firstName;
    employee.familyName = familyName;
    employee.title = title;
    employee.payPerHour = payPerHour;
    employee.timeInEvents = []
    employee.timeOutEvents = []
    return employee
}

const createEmployeeRecords = function(arrays) {
    return arrays.map(createEmployeeRecord)
}

const createTimeInEvent = function(dateStamp) {
    let timeIn = {};
    timeIn.type = "TimeIn";
    timeIn.hour = parseInt(dateStamp.split(" ")[1], 10);
    timeIn.date = dateStamp.split(" ")[0];
    this.timeInEvents.push(timeIn);
    return this
}

const createTimeOutEvent = function(dateStamp) {
    let timeOut = {};
    timeOut.type = "TimeOut";
    timeOut.hour = parseInt(dateStamp.split(" ")[1], 10);
    timeOut.date = dateStamp.split(" ")[0];
    this.timeOutEvents.push(timeOut);
    return this
}

const hoursWorkedOnDate = function(dateStamp) {
    let timeOut = this.timeOutEvents.find(function(event) {return event.date === dateStamp})
    let timeIn = this.timeInEvents.find(function(event) {return event.date === dateStamp})
    return this.hoursWorked = (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = function(dateStamp) {
    return (hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour)
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    function nameMatch(employee) {
        return employee.firstName === firstName
    }
    return srcArray.find(nameMatch)
}

const calculatePayroll = function(srcArray) {
    let total = 0
    srcArray.forEach(employee => {
        total += allWagesFor.call(employee)
    });
    return total
}