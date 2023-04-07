import React, {useState} from "react";
import Table from "../../models/Table";
import Relation from "../../models/Relation";
import uuid from "react-uuid";

function FetchTablesAndRelations()
{
	const [username, setUsername] = useState("postgres");
	const [password, setPassword] = useState("postgrespw");
	const [host, setHost] = useState("localhost");
	const [port, setPort] = useState("32768");
	const [database, setDatabase] = useState("postgres");

	const [message, setMessage] = useState("");

	const [tables, setTables] = useState([]);
	const [relations, setRelations] = useState([]);
	let handleSubmit = async (e) =>
	{
		e.preventDefault();
		try
		{
			let response = await fetch("http://localhost:5287/Database", {
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
			let resJson = await response.json();
			if (response.status === 200 && resJson.result === 0)
			{
				// setUsername("");
				// setPassword("");
				// setHost("");
				// setPort("");
				// setDatabase("");
				setTables(resJson.databaseInfo.tables);
				setRelations(resJson.databaseInfo.relations);
				setMessage("Login Successfully. " + resJson.result);
			}
			else
			{
				setTables([])
				setMessage("Some error occurred. " + resJson.result);
			}
		}
		catch (err)
		{
			setMessage("Backend connection error:" + err);
		}
	};

	let handleExport = async (e) =>
	{
		let mappedData = mapFormData(e.target);
		e.preventDefault();
		try
		{

			let response = await fetch("http://localhost:5287/Export", {
				method: "POST",
				headers: {
					'Accept': 'application/json, text/plain',
					'Content-Type': 'application/json;charset=UTF-8'
				},
				body: JSON.stringify({
					DatabaseConnectionInfo: {
						username: username,
						password: password,
						host: host,
						port: port,
						database: database,
					},
					ExportDataViewModels: mappedData
				}),
			});
			let resJson = await response.json();
			if (response.status === 200 && resJson.result === 0)
			{
				setMessage("Export request successful." + resJson.result);
			}
			else
			{
				setMessage("Some error with Export request." + resJson.result);
			}
		}
		catch (err)
		{
			setMessage("Backend connection error:" + err);
		}
	}

	function mapFormData(formData)
	{
		let data = [];

		for (let item of formData)
		{
			//TODO: Splitting on . might give issues if a table has a . in the name
			let splitName = item.name.split('.', 2)
			data.push({
				TableName: splitName[0],
				ColumnName: splitName[1],
				DataType: Number(item.value)
			})
		}

		return data;
	}

	function getRelationsForTable(tableName)
	{
		return relations.filter(item => item.primaryKeyTable === tableName || item.foreignKeyTable === tableName);
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
				<button type="submit">Submit</button>
			</form>
			<div className="message">{message
									  ? <p>{message}</p>
									  : null}</div>

			<form onSubmit={handleExport}>
				{tables.map((item =>
					{
						return <Table key={item.name}
									  tableName={item.name}
									  columns={item.columns}
									  relations={getRelationsForTable(item.name)}
						/>;
					}
				))}
				<button type="submit">Export</button>
			</form>
			{
				relations.map((item => <Relation key={uuid()}
												 foreignKeyTable={item.foreignKeyTable}
												 foreignKeyColumn={item.foreignKeyColumn}
												 foreignKeyConstraintName={item.foreignKeyConstraintName}
												 primaryKeyTable={item.primaryKeyTable}
												 primaryKeyColumn={item.primaryKeyColumn}
												 primaryKeyConstraintName={item.primaryKeyConstraintName}
				/>))}
		</div>
	);
}

export default FetchTablesAndRelations;