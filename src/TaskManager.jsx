import { useState } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: "",
    deadline: "",
    status: "Offen",
    notes: "",
  });

  const addTask = () => {
    if (!newTask.title || !newTask.assignedTo || !newTask.deadline) return;
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", assignedTo: "", deadline: "", status: "Offen", notes: "" });
  };

  const updateStatus = (id, status) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
  };

  return (
    <div>
      <h2>Neue Aufgabe</h2>
      <input placeholder="Titel" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
      <input placeholder="Zuständig" value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })} />
      <input type="date" value={newTask.deadline} onChange={e => setNewTask({ ...newTask, deadline: e.target.value })} />
      <textarea placeholder="Notizen" value={newTask.notes} onChange={e => setNewTask({ ...newTask, notes: e.target.value })} />
      <button onClick={addTask}>Hinzufügen</button>

      <div>
        {tasks.map(task => (
          <div key={task.id} className="card">
            <h3>{task.title}</h3>
            <p><strong>Zuständig:</strong> {task.assignedTo}</p>
            <p><strong>Deadline:</strong> {task.deadline}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p>{task.notes}</p>
            <select value={task.status} onChange={e => updateStatus(task.id, e.target.value)}>
              <option value="Offen">Offen</option>
              <option value="In Arbeit">In Arbeit</option>
              <option value="Erledigt">Erledigt</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
