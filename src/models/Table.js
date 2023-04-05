import Column from "./Column";

function Table({tableName, columns, relations})
{
	// function getRelation(columnName) {
	//     return relations.find(item => item.parentColumn === columnName || item.childColumn === columnName)
	// }
	return (
		<table className="table">
			<thead className="table-name">
			<tr>
				<th>{tableName}</th>
			</tr>
			</thead>
			<tbody className="table-columns">
			{columns.map(item => <Column key={tableName + "." + item.name}
										 table={tableName}
										 columnName={item.name}
										 type={item.dataType}
										 default={item.default}
										 isNullable={item.isNullable}
										 constraints={item.constraints}
			/>)}
			</tbody>
		</table>
	);
}

export default Table;