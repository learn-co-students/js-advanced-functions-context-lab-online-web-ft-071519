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

const createEmployeeRecord = function (arrayOfEmployeeInfo) {
    const employee = {
        firstName: arrayOfEmployeeInfo[0],
        familyName: arrayOfEmployeeInfo[1],
        title: arrayOfEmployeeInfo[2],
        payPerHour: arrayOfEmployeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

const createEmployeeRecords = function (arrayOfEmployeesInfo) {
    return arrayOfEmployeesInfo.map(function (employeeInfo) {
        return createEmployeeRecord(employeeInfo)
    })
}

const createTimeInEvent = function (dateTimeString) {

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTimeString.split(" ")[1]),
        date: dateTimeString.split(" ")[0]
    });

    return this
}

const createTimeOutEvent = function (dateTimeString) {

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTimeString.split(" ")[1]),
        date: dateTimeString.split(" ")[0]
    });

    return this
}

const hoursWorkedOnDate = function (date) {
    // Arrow version.
    let timeOutDate = this.timeOutEvents.find((e) => {
        return e.date === date
    })
    /* // Regular version.
    this.timeOutEvents.find(function(e){
        return e.date === date
    })
    */

    let timeInDate = this.timeInEvents.find((e) => {
        return e.date === date
    })

    return (timeOutDate.hour - timeInDate.hour) / 100
}

// Do not understand the .call in this function.
const wagesEarnedOnDate = function (date) {
    // console.log(this)
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

const findEmployeeByFirstName = function (employeesArray, firstName) {

    return employeesArray.find(function (emp) {
        return emp.firstName === firstName
    })
}

// Do not understand the .call in this function.
const calculatePayroll = function (employeesArray) {
    return employeesArray.reduce(function (totalPayroll, employee) {
        return totalPayroll + allWagesFor.call(employee)
    }, 0)
}
