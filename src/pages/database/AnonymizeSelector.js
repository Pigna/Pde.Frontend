import React from "react";
import uuid from "react-uuid";

function AnonymizeSelector({table, column, type})
{
	const types = [
		{id: 0, name: "Account", type: "character varying"},
		{id: 1, name: "Amount", type: "integer"},
		{id: 2, name: "Amount", type: "numeric"},
		{id: 3, name: "Avatar", type: "character varying"},
		{id: 4, name: "BuildingNumber", type: "character varying"},
		{id: 5, name: "City", type: "character varying"},
		{id: 6, name: "Country", type: "character varying"},
		{id: 7, name: "CreditCardNumber", type: "character varying"},
		{id: 8, name: "DateFuture", type: "date"},
		{id: 9, name: "DatePast", type: "date"},
		{id: 10, name: "Email", type: "character varying"},
		{id: 11, name: "FirstName", type: "character varying"},
		{id: 12, name: "FullAddress", type: "character varying"},
		{id: 13, name: "FullName", type: "character varying"},
		{id: 14, name: "Iban", type: "character varying"},
		{id: 15, name: "LastName", type: "character varying"},
		{id: 16, name: "Latitude", type: "character varying"},
		{id: 17, name: "Longitude", type: "character varying"},
		{id: 18, name: "Month", type: "integer"},
		{id: 19, name: "Month", type: "numeric"},
		{id: 20, name: "Password", type: "character varying"},
		{id: 21, name: "PhoneNumber", type: "character varying"},
		{id: 22, name: "Picture", type: "character varying"},
		{id: 23, name: "State", type: "character varying"},
		{id: 24, name: "StreetAddress", type: "character varying"},
		{id: 25, name: "StreetName", type: "character varying"},
		{id: 26, name: "UserName", type: "character varying"},
		{id: 27, name: "Zipcode", type: "character varying"}
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
			<option></option>
			{filterTypes().map(item =>
			{
				return <option key={uuid()} value={item.id}>{item.name}</option>
			})}
		</select>
	);
}

export default AnonymizeSelector;