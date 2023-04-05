import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faKey, faU} from "@fortawesome/free-solid-svg-icons";
import AnonymizeSelector from "../pages/database/AnonymizeSelector";
import uuid from "react-uuid";

function Column({table, columnName, type, defaultValue, isNullable, constraints})
{
	function getConstraintIcon(constraint)
	{
		if (!constraints)
			return null;
		switch (constraint.type)
		{
			case 0:
				return <FontAwesomeIcon key={constraint.name} icon={faKey} className="icon-key-primary"
										title={constraint.name}
				/>
			case 1:
				return <FontAwesomeIcon key={constraint.name} icon={faKey} className="icon-key-foreign"
										title={constraint.name}
				/>
			case 2:
				return <FontAwesomeIcon key={constraint.name} icon={faU} className="icon-unique"
										title={constraint.name}
				/>
			case 3:
				return <FontAwesomeIcon key={constraint.name} icon={faCheck} className="icon-check"
										title={constraint.name}
				/>
			default:
				return null;
		}
	}

	return (
		<tr className="column">
			<td className="column-icon">{constraints.sort(function (a, b)
			{
				return a.type - b.type
			}).map(item =>
			{
				return getConstraintIcon(item)
			})}</td>
			<td className="column-name">{columnName}</td>
			<td className="column-type">{type}</td>
			<td className="column-anonymize">{!constraints.length
											  ? (<AnonymizeSelector key={uuid()} table={table} column={columnName}
																	type={type}
				></AnonymizeSelector>)
											  : null}</td>
			<td className="column-type">{isNullable
										 ? "NULL"
										 : ""}</td>
		</tr>
	);
}

export default Column;