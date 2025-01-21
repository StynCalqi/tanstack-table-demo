import { useSortable } from "@dnd-kit/sortable";

const RowDragHandleCell = ({ row }) => {
  const { attributes, listeners } = useSortable({
    id: row.original.id,
  });
  return (
    // Alternatively, you could set these attributes on the rows themselves
    <button {...attributes} {...listeners}>
      🟰
    </button>
  );
};

export default RowDragHandleCell;
