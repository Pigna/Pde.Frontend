import Column from "./Column";

function Table({ id, columns }) {
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
        </table>
    );
}
export default Table;