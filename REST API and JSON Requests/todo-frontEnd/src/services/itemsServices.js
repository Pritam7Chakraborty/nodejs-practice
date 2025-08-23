export const addItemToServer = async (task, date) => {
  const response = await fetch("http://localhost:3001/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date }),
  });
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

export const getItemsFromServer = async () => {
  const response = await fetch("http://localhost:3001/api/todo");
  const items = await response.json();
  return items.map(mapServerItemToLocalItem);
};

export const markItemCompletedOnServer = async (id) => {
  const response = await fetch(
    "http://localhost:3001/api/todo/${id}/completed",
    {
      method: "PUT",
    }
  );
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

export const deleteItemFromServer = async (id) => {
  const response = await fetch(`http://localhost:3001/api/todo/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // If the delete was successful (e.g., status 204), just return the id.
    return id;
  } else {
    // Handle potential errors
    throw new Error("Failed to delete item.");
  }
};

const mapServerItemToLocalItem = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    completed: serverItem.completed,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};
