import React from "react";
import uuid from "react-uuid";

function AnonymizeSelector({table, column, type})
{
	const types = [
		{id: 1, name: "Account", type: "character varying"},
		{id: 2, name: "Number", type: "integer"},
		{id: 3, name: "Amount", type: "numeric"},
		{id: 4, name: "Avatar", type: "character varying"},
		{id: 5, name: "BuildingNumber", type: "character varying"},
		{id: 6, name: "City", type: "character varying"},
		{id: 7, name: "Country", type: "character varying"},
		{id: 8, name: "CreditCardNumber", type: "character varying"},
		{id: 9, name: "DateFuture", type: "date"},
		{id: 10, name: "DatePast", type: "date"},
		{id: 11, name: "Email", type: "character varying"},
		{id: 12, name: "FirstName", type: "character varying"},
		{id: 13, name: "FullAddress", type: "character varying"},
		{id: 14, name: "FullName", type: "character varying"},
		{id: 15, name: "Iban", type: "character varying"},
		{id: 16, name: "LastName", type: "character varying"},
		{id: 17, name: "Latitude", type: "character varying"},
		{id: 18, name: "Longitude", type: "character varying"},
		{id: 19, name: "Month", type: "integer"},
		{id: 20, name: "Month Number", type: "numeric"},
		{id: 21, name: "Password", type: "character varying"},
		{id: 22, name: "PhoneNumber", type: "character varying"},
		{id: 23, name: "Picture", type: "character varying"},
		{id: 24, name: "State", type: "character varying"},
		{id: 25, name: "StreetAddress", type: "character varying"},
		{id: 26, name: "StreetName", type: "character varying"},
		{id: 27, name: "UserName", type: "character varying"},
		{id: 28, name: "Zipcode", type: "character varying"}
	]

	function filterTypes()
	{
		let filteredTypes = [];

		for (let i of types)
		{
			if (type === i.type)
			{
				filteredTypes.push(i);
			}
		}
		return filteredTypes;
	}

	return (
		<select name={table + '.' + column} id={table + '.' + column}>
			<option key={uuid()} value="0"></option>
			{filterTypes().map(item =>
			{
				return <option key={uuid()} value={item.id}>{item.name}</option>
			})}
		</select>
	);
}

export default AnonymizeSelector;