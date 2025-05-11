DROP TABLE IF EXISTS NodeJSTraining.TransactionProducts;

CREATE TABLE NodeJSTraining.TransactionProducts (
	ID INT NOT NULL,
	TransactionID INT NOT NULL,
	ProductID INT NOT NULL,
	PRIMARY KEY (ID),
	FOREIGN KEY (TransactionID) REFERENCES NodeJSTraining.Transactions(ID),
	FOREIGN KEY (ProductID) REFERENCES NodeJSTraining.Products(ID)
);