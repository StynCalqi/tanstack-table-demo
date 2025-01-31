import { useState, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import defaultColumn from "./DefaultColumn";
import DraggableRow from "./DraggableRow";
import EditableHeader from "./EditableHeader";
import Checkbox from "./Checkbox";
import EditableCell from "./EditableCell";

const DraggableTable = ({ data, selectedDecimal, setData }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({
    length2: false,
  });
  const dataIds = useMemo(() => data?.map(({ id }) => id), [data]);

  const columnHelper = createColumnHelper();

  const checkboxColumn = {
    id: "checkbox",
    header: ({ table }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(), // Doesn't allow customization (select children checkboxes if a parent is active)
        }}
      />
    ),
    size: 50,
  };

  const [columns, setColumns] = useState([
    checkboxColumn,
    columnHelper.accessor((row) => row.draggable, {
      id: "draggable",
      header: "Drag",
      size: 50,
    }),
    columnHelper.accessor((row) => row.number, {
      id: "number",
      cell: (info) => info.renderValue(),
      size: 70,
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
      size: 500,
    }),
    columnHelper.accessor((row) => row.quantity, {
      id: "quantity",
      header: ({ column }) => (
        <EditableHeader
          text={column.id}
          onChange={(newText) => updateColumnHeader(column.id, newText)}
        />
      ),
      cell: (props) => (
        <EditableCell selectedDecimal={selectedDecimal} {...props} />
      ),
      size: 100,
    }),
    columnHelper.accessor((row) => row.factor, {
      id: "factor",
      header: ({ column }) => (
        <EditableHeader
          text={column.id}
          onChange={(newText) => updateColumnHeader(column.id, newText)}
        />
      ),
      size: 100,
    }),
    columnHelper.accessor((row) => row.length1, {
      id: "length1",
      header: ({ column }) => (
        <EditableHeader
          text={column.id}
          onChange={(newText) => updateColumnHeader(column.id, newText)}
        />
      ),
      size: 100,
    }),
    columnHelper.accessor((row) => row.length2, {
      id: "length2",
      header: ({ column }) => (
        <EditableHeader
          text={column.id}
          onChange={(newText) => updateColumnHeader(column.id, newText)}
        />
      ),
      size: 100,
    }),
    columnHelper.accessor((row) => row.total, {
      id: "total",
      header: ({ column }) => (
        <EditableHeader
          text={column.id}
          onChange={(newText) => updateColumnHeader(column.id, newText)}
        />
      ),
      size: 100,
    }),
  ]);

  const updateColumnHeader = (id, newLabel) => {
    setColumns((prev) => {
      return prev.map((col) => {
        return col.id === id
          ? { ...col, meta: { label: newLabel }, id: newLabel.toLowerCase() }
          : col;
      });
    });
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = ({ active, over }) => {
    if (!active || !over || active.id === over.id) return;

    const selectedRowIds = Object.keys(rowSelection)
      .filter((id) => rowSelection[id])
      .map((id) => parseInt(id, 10));

    if (selectedRowIds.length > 0) {
      const selectedRows = data.filter((item) =>
        selectedRowIds.includes(item.id)
      );
      const otherRows = data.filter(
        (item) => !selectedRowIds.includes(item.id)
      );

      const targetIndex = otherRows.findIndex((item) => item.id === over.id);
      const firstDraggedRowIndex = data.findIndex(
        (item) => item.id === selectedRowIds[0]
      );
      const targetRowIndex = data.findIndex((item) => item.id === over.id);
      const isDraggingDown = targetRowIndex > firstDraggedRowIndex;

      const newData = isDraggingDown
        ? [
            ...otherRows.slice(0, targetIndex + 1),
            ...selectedRows,
            ...otherRows.slice(targetIndex + 1),
          ]
        : [
            ...otherRows.slice(0, targetIndex),
            ...selectedRows,
            ...otherRows.slice(targetIndex),
          ];

      setData(newData);
    } else {
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setData(arrayMove([...data], oldIndex, newIndex));
      }
    }
  };

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    state: { rowSelection, columnVisibility },
    onRowSelectionChange: setRowSelection,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const selectedRows = table
    .getRowModel()
    .rows.filter((item) => rowSelection[item.id]);

  const handleIndent = (rowId) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === rowId - 1 && item.type !== "indent") {
          return { ...item, type: "parent" };
        }
        if (item.id === rowId) {
          return { ...item, type: "indent" };
        }
        return item;
      });
    });
  };

  const addLengthColumn = () => {
    setColumnVisibility((prev) => {
      return { ...prev, length2: true };
    });
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
        <button
          className="bg-blue-500 text-white mb-4"
          onClick={addLengthColumn}
        >
          Add length column
        </button>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="sticky top-1 bg-blue-100 z-10"
              >
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
            {table.getRowModel().rows.map((row) => (
              <DraggableRow
                key={row.id}
                row={row}
                handleIndent={handleIndent}
              />
            ))}
          </tbody>
        </table>
      </SortableContext>

      <DragOverlay>
        {isDragging && selectedRows.length > 0
          ? selectedRows.map((row) => (
              <DraggableRow key={row.original.id} row={row} />
            ))
          : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DraggableTable;
