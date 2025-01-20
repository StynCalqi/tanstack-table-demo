/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

const EditableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
        table.options.meta.updateData(row.index, column.id, value);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
        />
    );
};


export default EditableCell