import { useSortable } from "@dnd-kit/sortable";

const RowDragHandleCell = ({ row }) => {
  const { attributes, listeners } = useSortable({
    id: row.original.id,
  });
  return (
    // Alternatively, you could set these attributes on the rows themselves
    <button {...attributes} {...listeners} className="bg-white py-1 px-2">
      🟰
    </button>
  );
};

export default RowDragHandleCell;
