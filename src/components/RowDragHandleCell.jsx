import { useSortable } from "@dnd-kit/sortable";

const RowDragHandleCell = ({ rowId }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });
  return (
    // Alternatively, you could set these attributes on the rows themselves
    <button {...attributes} {...listeners}>
      🟰
    </button>
  );
};

export default RowDragHandleCell;
