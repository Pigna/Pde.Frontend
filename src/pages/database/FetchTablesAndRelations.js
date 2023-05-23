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
	const [connected, setConnected] = useState(false);

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
				setConnected(true);
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
		console.log(e.target)
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
					ExportDataViewModels: mappedData,
					TableRelationsViewModel: relations
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

	function handleDisconnect()
	{
		setMessage("");
		setConnected(false);
	}

	function mapFormData(formData)
	{
		let data = [];

		for (let item of formData)
		{
			//TODO: Splitting on . might give issues if a table has a . in the name
			if (item.name)
			{
				let splitName = item.name.split('.', 2)
				data.push({
					TableName: splitName[0],
					ColumnName: splitName[1],
					DataType: Number(item.value)
				})
			}
		}

		return data;
	}

	function getRelationsForTable(tableName)
	{
		return relations.filter(item => item.primaryKeyTable === tableName || item.foreignKeyTable === tableName);
	}

	function loginForm()
	{
		return <div id="db-login">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						value={username}
						placeholder="admin"
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						value={password}
						placeholder="Secret123"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="host">Host</label>
					<input
						id="host"
						name="host"
						type="text"
						value={host}
						placeholder="localhost"
						onChange={(e) => setHost(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="port">Port</label>
					<input
						id="port"
						name="port"
						type="text"
						value={port}
						placeholder="3000"
						onChange={(e) => setPort(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="database">Database</label>
					<input
						id="database"
						name="database"
						type="text"
						value={database}
						placeholder="db"
						onChange={(e) => setDatabase(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
			{
				message
				? <div className="message">
					<p>{message}</p>
				  </div>
				: null
			}

		</div>
	}

	function disconnect()
	{
		return <button onClick={handleDisconnect}>Disconnect</button>
	}

	function exportForm()
	{
		return <form onSubmit={handleExport}>
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
	}

	return (
		<div className="fetch-tables">
			{!connected
			 ? loginForm()
			 : disconnect()}
			{connected
			 ? exportForm()
			 : null}
			{
				relations.map((item => <Relation key={uuid()}
												 foreignKeyTable={item.foreignKeyTable}
												 foreignKeyColumn={item.foreignKeyColumn}
												 foreignKeyConstraintName={item.foreignKeyConstraintName}
												 primaryKeyTable={item.primaryKeyTable}
												 primaryKeyColumn={item.primaryKeyColumn}
												 primaryKeyConstraintName={item.primaryKeyConstraintName}
				/>))
			}
		</div>
	);
}

export default FetchTablesAndRelations;