import React, {useState} from "react";
import Table from "../../models/Table";
import Relation from "../../models/Relation";

function FetchTablesAndRelations() {
    const [username, setUsername] = useState("postgres");
    const [password, setPassword] = useState("postgrespw");
    const [host, setHost] = useState("localhost");
    const [port, setPort] = useState("32768");
    const [database, setDatabase] = useState("postgres");

    const [message, setMessage] = useState("");

    const [tables, setTables] = useState([]);
    const [relations, setRelations] = useState([]);
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:5287/Database", {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    host: host,
                    port: port,
                    database: database,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200 && resJson.result === 0) {
                // setUsername("");
                // setPassword("");
                // setHost("");
                // setPort("");
                // setDatabase("");
                setTables(resJson.databaseInfo.tables);
                setRelations(resJson.databaseInfo.relations);
                setMessage("Login Successfully. " + resJson.result);
            } else {
                setTables([])
                setMessage("Some error occurred. " + resJson.result);
            }
        } catch (err) {
            console.log("Backend connection error:" + err);
        }
    };

    function getRelationsForTable(tableName) {
        return relations.filter(item => item.parentTable === tableName || item.childTable === tableName);
    }

    return (
        <div className="fetch-tables">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    value={host}
                    placeholder="Host"
                    onChange={(e) => setHost(e.target.value)}
                />
                <input
                    type="text"
                    value={port}
                    placeholder="Port"
                    onChange={(e) => setPort(e.target.value)}
                />
                <input
                    type="text"
                    value={database}
                    placeholder="Database"
                    onChange={(e) => setDatabase(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
            <div className="message">{message ? <p>{message}</p> : null}</div>
            {tables.map((item => {
                    return <Table key={item.name}
                                  id={item.name}
                                  columns={item.columns}
                                  relations={getRelationsForTable(item.name)}/>;
                }
            ))}
            {relations.map((item => <Relation key={item.connectionName}
                                              childTable={item.childTable}
                                              childColumn={item.childColumn}
                                              parentTable={item.parentTable}
                                              parentColumn={item.parentColumn}
                                              connectionName={item.connectionName}
            />))}
        </div>
    );
}

export default FetchTablesAndRelations;