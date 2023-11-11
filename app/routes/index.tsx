import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Task {
  id: string;
  imageName: string;
  subject: string;
  description: string;
}

type TaskList = Task[];

const baseData: TaskList = [
  {
    id: "1",
    imageName: "wucheplaner_computer.png",
    subject: "Computer",
    description: "Klick auf Word",
  },
  {
    id: "2",
    imageName: "wucheplaner_deutsch.png",
    subject: "Deutsch",
    description: "deutsch unterricht",
  },
  {
    id: "3",
    imageName: "wucheplaner_englisch.png",
    subject: "Englisch",
    description: "anglaise",
  },
];
interface DraggableLocation {
  droppableId: string;
  index: number;
}

interface Combine {
  draggableId: string;
  droppableId: string;
}

interface DragResult {
  reason: "DROP" | "CANCEL";
  destination?: DraggableLocation;
  source: DraggableLocation;
  combine?: Combine;
  mode: "FLUID" | "SNAP";
  draggableId: string;
}
export default function Index() {
  const [tasks, setTasks] = useState(baseData);
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const newItems = [...tasks];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setTasks(newItems);
  };
  return (
    <main className="relative min-h-screen bg-white">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: any, snapshot: any) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((item: Task, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided: any, snapshot: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="mb-3 w-full bg-blue-50">
                        <img src={item.imageName} className="inline w-20" />
                        {item.subject}
                        <br />
                        {item.description}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
