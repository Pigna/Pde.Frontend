import Column from "./Column";

function Table({ id, columns, relations }) {
    return (
        <table className="table">
            <thead className="table-name">
                <tr>
                    <th>{id}</th>
                </tr>
            </thead>
            <tbody className="table-columns">
                {columns.map((item => <Column key={item.name} name={item.name} type={item.dataType}/>))}
            </tbody>
            <tfoot>
            <tr>
                <td>
                    {relations.map(item => <div>{item.connectionName}</div>)}
                </td>
            </tr>
            </tfoot>
        </table>
    );
}
export default Table;