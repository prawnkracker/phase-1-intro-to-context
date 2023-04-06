// Your code here
function createEmployeeRecord(array){
    let testEmployee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return testEmployee;
}

function createEmployeeRecords(arrayOfArray){
    let employeeRecords = arrayOfArray.map(createEmployeeRecord)
    return employeeRecords
}

function createTimeInEvent(employeeRecord, date){
    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        date: date.slice(0,10),
        hour: parseInt(date.slice(-4))
    })

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, date){
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        date: date.slice(0,10),
        hour: parseInt(date.slice(-4))
    })

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)

    return parseInt(timeOutEvent.hour - timeInEvent.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date){
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)

    return parseInt(timeOutEvent.hour - timeInEvent.hour)/100*employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    const dates = employeeRecord.timeInEvents.map(event => event.date)
    // for (const date of dates){
    //     payOwed += wagesEarnedOnDate(employeeRecord, date)
    // }
    const payOwed = dates.reduce((accumulator, date) => { return wagesEarnedOnDate(employeeRecord, date) + accumulator}, 0)
    return payOwed
}

function calculatePayroll(employeeRecords){
    const payOwed = employeeRecords.reduce((accumulator, employeeRecord) => {
        return allWagesFor(employeeRecord) + accumulator
        }, 0)

        return payOwed;
}