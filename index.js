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

function createEmployeeRecord(employeeArr) {
    return Object.assign({}, {firstName: employeeArr[0]}, {familyName: employeeArr[1]}, {title: employeeArr[2]}, {payPerHour: employeeArr[3]}, {timeInEvents: []}, {timeOutEvents: []})
}
 

function createEmployeeRecords(arr) {
    return arr.map(employee => {
        return createEmployeeRecord(employee)
    }) 
}
function createTimeInEvent(timestamp) {
    let [date, hour] = timestamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}
function createTimeOutEvent(timestamp) {
    let [date, hour] = timestamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

function hoursWorkedOnDate(timestamp) {
    let timeIn = this.timeInEvents.find(function (emp) {
        return emp.date === timestamp
    })
    let timeOut = this.timeOutEvents.find(function (emp) {
        return emp.date === timestamp
    })
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
}


function wagesEarnedOnDate(timestamp) {
    let pay = this.payPerHour
    let hoursWorked = hoursWorkedOnDate.call(this, timestamp)
    let wage = (pay * hoursWorked).toString()
    return parseFloat(wage)
}



function findEmployeeByFirstName(employees, name) {
    return employees.find(function (emp) {
        return emp.firstName === name
    })
}

function calculatePayroll(employees) {
    return employees.reduce(function (memo, emp) {
        return memo + allWagesFor.call(emp)
    }, 0)
}