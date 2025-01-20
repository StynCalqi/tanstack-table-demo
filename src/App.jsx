import { useState, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./App.css";

import RowDragHandleCell from "./components/RowDragHandleCell";
import DraggableRow from "./components/DraggableRow";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import defaultData from "./data/defaultData";
import EditableHeader from "./components/EditableHeader";
import defaultColumn from "./components/DefaultColumn";

function App() {
  const columnHelper = createColumnHelper();

  const action = useMemo(
    () => ({
      id: "drag-handle",
      header: () => "Move",
      cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
      size: 60,
    }),
    []
  );

  const [columns, setColumns] = useState([
    columnHelper.accessor((row) => row.id, action),
    columnHelper.accessor((row) => row.number, {
      id: "number",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor((row) => row.description, {
      id: "description",
      header: ({ column }) => (
        <EditableHeader
          text={column.columnDef.meta.label}
          onChange={(newText) => updateColumnHeader(column.id, newText)}
        />
      ),
      meta: { label: "Description" },
    }),
    columnHelper.accessor((row) => row.quantity, {
      id: "quantity",
      header: ({ column }) => (
        <EditableHeader
          text={column.id}
          onChange={(newText) => updateColumnHeader(column.id, newText)}
        />
      ),
    }),
    columnHelper.accessor((row) => row.factor, {
      id: "factor",
      header: ({ column }) => (
        <EditableHeader
          text={column.id}
          onChange={(newText) => updateColumnHeader(column.id, newText)}
        />
      ),
    }),
    columnHelper.accessor((row) => row.l, {
      id: "l",
      header: ({ column }) => (
        <EditableHeader
          text={column.id}
          onChange={(newText) => updateColumnHeader(column.id, newText)}
        />
      ),
    }),
    columnHelper.accessor((row) => row.total, {
      id: "total",
      header: ({ column }) => (
        <EditableHeader
          text={column.id}
          onChange={(newText) => updateColumnHeader(column.id, newText)}
        />
      ),
    }),
  ]);

  const [data, setData] = useState(() => [...defaultData]);
  const dataIds = useMemo(() => data?.map(({ id }) => id), [data]);

  const updateColumnHeader = (id, newLabel) => {
    setColumns((prev) => {
      return prev.map((col) => {
        return col.id === id
          ? { ...col, meta: { label: newLabel }, id: newLabel.toLowerCase() }
          : col;
      });
    });
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  // reorder rows after drag & drop
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = data.findIndex((item) => item.id === active.id);
        const newIndex = data.findIndex((item) => item.id === over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="p-2">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            <SortableContext
              items={dataIds}
              strategy={verticalListSortingStrategy}
            >
              {table.getRowModel().rows.map((row) => (
                <DraggableRow key={row.id} row={row} />
              ))}
            </SortableContext>
          </tbody>
        </table>
        <div className="h-4" />
      </div>
    </DndContext>
  );
}

export default App;
