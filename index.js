/* Your Code Here */

function createEmployeeRecord(array){
    let result = {}
    result.firstName = array[0]
    result.familyName = array[1]
    result.title = array[2]
    result.payPerHour = array[3]
    result.timeInEvents = []
    result.timeOutEvents =[]
    
      return result
    }
    
    function createEmployeeRecords(array){
     let result = []
     array.forEach(function(e) {
        result.push(createEmployeeRecord(e));
      });
    
      return result
    }
    
    let createTimeInEvent = function(dateStamp){
        let [date, hour] = dateStamp.split(' ')
    
        this.timeInEvents.push({
            type: "TimeIn",
            hour: parseInt(hour, 10),
            date,
        })
    
        return this
    }
    
    let createTimeOutEvent = function(dateStamp){
        let [date, hour] = dateStamp.split(' ')
    
        this.timeOutEvents.push({
            type: "TimeOut",
            hour: parseInt(hour, 10),
            date,
        })
    
        return this
    }
    let hoursWorkedOnDate =  function ( dateday){
      let inobject = this.timeInEvents.find(function(e){
            return e.date === dateday
        })
    
       let   outobject = this.timeOutEvents.find(function(e){
            return e.date === dateday
        })
    
        return (outobject.hour - inobject.hour)/100
    }
    
    let wagesEarnedOnDate = function(dateSought){
        let rawWage = hoursWorkedOnDate.call(this, dateSought)
            * this.payPerHour
        return parseFloat(rawWage.toString())
    }
    
    // function allWagesFor(employee){
    //   let sum = 0
    //   employee.timeInEvents.forEach(function(e) {
    //   sum = sum+ wagesEarnedOnDate(employee, e.date)
    //   });
    //   return sum
    // }
    
    
    function findEmployeeByFirstName(arrayemployees,firstName){
      let result = arrayemployees.find(function(employee){
            return employee.firstName === firstName
        })
        return result
    }
    let calculatePayroll = function(arrayOfEmployeeRecords){
        return arrayOfEmployeeRecords.reduce(function(memo, rec){
            return memo + allWagesFor.call(rec)
        }, 0)
    }

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