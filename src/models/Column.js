import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey} from "@fortawesome/free-solid-svg-icons";

function Column({ name, type }) {
    return (
        <tr className="column">
            <td className="column-icon"><FontAwesomeIcon icon={faKey} className="key"/></td>
            <td className="column-name">{name}</td>
            <td className="column-type">{type}</td>
        </tr>
    );
}
export default Column;