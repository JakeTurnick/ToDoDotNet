


export default function ToDoCard(toDo) {
    if (toDo == null) {
        return
    }
  return (
      <article>
          <h3>{toDo.Name}</h3>
          <p>{toDo.Description}</p>
          <input type="checkbox" value={toDo.IsCompleted} readOnly={true } />
          <p>{toDo.StartDate}</p>
          <p>{toDo.EndDate}</p>
      </article>
  );
}

