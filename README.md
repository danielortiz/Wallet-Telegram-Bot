This is a telegram bot to track expenses.

## Available commands
- `/add` - adds an expense
	- requires at least the cost and the description of the expanse
	- accepts cost, description, tags (prefixed by #), place (prefixed by @)
	- returns the ticket code
	- Usage:
		- `/add 10 movie tickets`
		- `/add 5,50 Big Mac @ McDonalds #food #lunch`
		- `/add 25.3 New coat #wearing`
- `/remove` - removes an expense
	- requires the ticket code
	- Usage:
		- `/remove 154`
- `/credit` - adds a credit
	-  works just like `/add` in every way, but it adds credit instead of deducting an expense
- `/receipt` - returns the chosen ticket details
	-  requires the ticket code
	-  Usage:
		-  `/receipt 154`
- `/statement` - returns the statement with all expenses and credits
- `/balance` - returns the current balance


## Future features:

- Get statement by tags
- Accept geolocalization
- Limit statement by selected period