import TasksCard from "./components/TasksCard"

function TasksList() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TasksCard/>
        <div className="w-10 h-10 bg-cardWarning">
          hello
        </div>
    </div>
  )
}

export default TasksList