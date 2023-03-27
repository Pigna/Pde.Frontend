function Relation({childTable, childColumn, parentTable, parentColumn, connectionName}) {
    return (
        <div className="table">
            <div className="relation-connection">{connectionName}</div>
            <div className="relation-child-table">{childTable}</div>
            <div className="relation-child-column">{childColumn}</div>
            <div className="relation-parent-table">{parentTable}</div>
            <div className="relation-parent-column">{parentColumn}</div>
        </div>
    );
}
export default Relation;