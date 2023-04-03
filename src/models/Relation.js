function Relation({foreignKeyTable, foreignKeyColumn, foreignKeyConstraintName, primaryKeyTable, primaryKeyColumn, primaryKeyConstraintName}) {
    return (
        <div className="table">
            <div className="relation-child-table">{foreignKeyTable}</div>
            <div className="relation-child-column">{foreignKeyColumn}</div>
            <div className="relation-connection">{foreignKeyConstraintName}</div>
            <div className="relation-parent-table">{primaryKeyTable}</div>
            <div className="relation-parent-column">{primaryKeyColumn}</div>
            <div className="relation-connection">{primaryKeyConstraintName}</div>
        </div>
    );
}
export default Relation;