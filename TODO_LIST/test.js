$(() => {
  let inpNewTask = $('#inpNewTask')

  let tasks = []
  if (localStorage.list) {
    tasks = JSON.parse(localStorage.list)
  }

  function refreshList() {
    localStorage.list = JSON.stringify(tasks)
    $('#taskList').empty()
    for (let i in tasks) {
      let task = tasks[i]

      $('#taskList').append(
        $('<li>')
        .attr('class', "list-group-item")
        .append(
          $('<div>')
          .attr('class', task.done ? "row done" : "row")
          .append(
            $('<span>')
            .attr('class',task.done ? "col-1 py-1 d":"col-1 py-1 ")
            .text(task.name)
          )
          .append(
            $('<button>')
            .text(task.done ? "🙄NOT DONE" : "😎 DONE ")
            .attr('class',task.done ? "btn btn-danger col-2 mx-2" : "btn btn-info col-2 mx-2")
            .click(function () {
              task.done = !task.done
              refreshList()
            })
          )
          .append(
            $('<button>')
            .text("DELETE")
            .attr('class', "btn btn-danger col-2 mx-2")
            .click(function () {
              tasks.splice(i, 1)
              refreshList()
            })
          )
          .append(
            $('<button>')
            .text("☝️ UP")
            .attr('class', "btn btn-info col-2 mx-2")
            .click(function () {
              if(i!=0){
              let a=task
              tasks.splice(i, 1);
              tasks.splice(i-1,0,a);
              refreshList()
              }
            }) 
          )
          .append(
            $('<button>')
            .text("👇 DOWN")
            .attr('class', "btn btn-info col-2 mx-2")
            .click(function () {
              if(i<tasks.length-1){
              let a=task
              tasks.splice(i,1);
              let t=++i
              tasks.splice(t,0,a);
              refreshList()
              }
            })
          )  
        )
      )
    }
  }

  refreshList()

  function sortList() {
    tasks.sort(function (a, b) {
      return a.done - b.done
    })
    refreshList()
  }

  function clearList() {
    tasks = tasks.filter(function (t) {
      return !t.done
    })
    refreshList()
  }

  function addTask() {
    console.log(tasks)
    let taskName = inpNewTask.val()
    tasks.push({
      name: taskName,
      done: false
    })
    inpNewTask.val('')
    refreshList()
  }

  $('#btnAdd').click(function () {
    addTask()
  })

  inpNewTask.keyup(function (ev) {
    if (ev.keyCode == 13) {
      addTask()
    }
  })

  $('#btnSort').click(function () {
    sortList()
  })

  $('#btnClear').click(function () {
    clearList()
  })



})