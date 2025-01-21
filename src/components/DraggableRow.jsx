import { flexRender } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import RowDragHandleCell from "./RowDragHandleCell";

// Row Component
const DraggableRow = ({ row, handleIndent }) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };

  console.log(row);

  return (
    // connect row ref to dnd-kit, apply important styles
    <tr ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell, index) => (
        <td
          key={cell.id}
          style={{ width: cell.column.getSize() }}
          className={`${
            row.original.type === "parent" ? "font-bold" : null
          } w-full relative`}
        >
          {cell.column.id === "description" && row.id > 1 && (
            <div
              className={"absolute right-0 z-10 flex top-0 h-full bottom-0 "}
            >
              <div
                className={
                  "w-60 space-x-2 mr-1 icon-row flex items-center bg-blue-100"
                }
              >
                <div
                  className={
                    "toggler " +
                    "cursor-pointer " +
                    " flex rounded-lg text-primary-main h-6  px-1 items-center  cursor-pointer"
                  }
                  onClick={() => handleIndent(row.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="fill-black"
                  >
                    <path
                      d="M2.66667 14C2.47778 14 2.31944 13.9361 2.19167 13.8083C2.06389 13.6806 2 13.5222 2 13.3333C2 13.1444 2.06389 12.9861 2.19167 12.8583C2.31944 12.7306 2.47778 12.6667 2.66667 12.6667H13.3333C13.5222 12.6667 13.6806 12.7306 13.8083 12.8583C13.9361 12.9861 14 13.1444 14 13.3333C14 13.5222 13.9361 13.6806 13.8083 13.8083C13.6806 13.9361 13.5222 14 13.3333 14H2.66667ZM8 11.3333C7.81111 11.3333 7.65278 11.2694 7.525 11.1417C7.39722 11.0139 7.33333 10.8556 7.33333 10.6667C7.33333 10.4778 7.39722 10.3194 7.525 10.1917C7.65278 10.0639 7.81111 10 8 10H13.3333C13.5222 10 13.6806 10.0639 13.8083 10.1917C13.9361 10.3194 14 10.4778 14 10.6667C14 10.8556 13.9361 11.0139 13.8083 11.1417C13.6806 11.2694 13.5222 11.3333 13.3333 11.3333H8ZM8 8.66667C7.81111 8.66667 7.65278 8.60278 7.525 8.475C7.39722 8.34722 7.33333 8.18889 7.33333 8C7.33333 7.81111 7.39722 7.65278 7.525 7.525C7.65278 7.39722 7.81111 7.33333 8 7.33333H13.3333C13.5222 7.33333 13.6806 7.39722 13.8083 7.525C13.9361 7.65278 14 7.81111 14 8C14 8.18889 13.9361 8.34722 13.8083 8.475C13.6806 8.60278 13.5222 8.66667 13.3333 8.66667H8ZM8 6C7.81111 6 7.65278 5.93611 7.525 5.80833C7.39722 5.68056 7.33333 5.52222 7.33333 5.33333C7.33333 5.14444 7.39722 4.98611 7.525 4.85833C7.65278 4.73056 7.81111 4.66667 8 4.66667H13.3333C13.5222 4.66667 13.6806 4.73056 13.8083 4.85833C13.9361 4.98611 14 5.14444 14 5.33333C14 5.52222 13.9361 5.68056 13.8083 5.80833C13.6806 5.93611 13.5222 6 13.3333 6H8ZM2.66667 3.33333C2.47778 3.33333 2.31944 3.26944 2.19167 3.14167C2.06389 3.01389 2 2.85556 2 2.66667C2 2.47778 2.06389 2.31944 2.19167 2.19167C2.31944 2.06389 2.47778 2 2.66667 2H13.3333C13.5222 2 13.6806 2.06389 13.8083 2.19167C13.9361 2.31944 14 2.47778 14 2.66667C14 2.85556 13.9361 3.01389 13.8083 3.14167C13.6806 3.26944 13.5222 3.33333 13.3333 3.33333H2.66667ZM4.1 10.1L2.23333 8.23333C2.16667 8.16667 2.13333 8.08889 2.13333 8C2.13333 7.91111 2.16667 7.83333 2.23333 7.76667L4.1 5.9C4.21111 5.78889 4.33333 5.76111 4.46667 5.81667C4.6 5.87222 4.66667 5.97778 4.66667 6.13333V9.86667C4.66667 10.0222 4.6 10.1278 4.46667 10.1833C4.33333 10.2389 4.21111 10.2111 4.1 10.1Z"
                      fillOpacity="0.7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-row">
            {cell.column.id === "description" &&
              row.original.type === "indent" && (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 17H7L7 7"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

            {index === 1 ? (
              <RowDragHandleCell row={row} />
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </div>
        </td>
      ))}
    </tr>
  );
};

export default DraggableRow;
