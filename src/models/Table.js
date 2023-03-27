import Column from "./Column";

function Table({ id, columns, relations }) {
    function getRelation(columnName) {
        return relations.find(item => item.parentColumn === columnName || item.childColumn === columnName)
    }
    return (
        <table className="table">
            <thead className="table-name">
                <tr>
                    <th>{id}</th>
                </tr>
            </thead>
            <tbody className="table-columns">
                {columns.map(item => <Column key={item.name} name={item.name} type={item.dataType} relation={getRelation(item.name)}/>)}
            </tbody>
        </table>
    );
}
export default Table;