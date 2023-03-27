import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey} from "@fortawesome/free-solid-svg-icons";

function Column({ name, type, relation}) {

    function getKey(relation) {
        if(!relation)
            return null;
        if(relation.parentColumn === name)
            return <FontAwesomeIcon icon={faKey} className="key-primary"/>
        else if (relation.childColumn === name)
            return <FontAwesomeIcon icon={faKey} className="key-foreign"/>
    }
    return (
        <tr className="column">
            <td className="column-icon">{getKey(relation)}</td>
            <td className="column-name">{name}</td>
            <td className="column-type">{type}</td>
        </tr>
    );
}
export default Column;