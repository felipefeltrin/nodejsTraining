DROP TABLE IF EXISTS NodeJSTraining.TransactionProducts;

CREATE TABLE NodeJSTraining.TransactionProducts (
	ID INT NOT NULL AUTO_INCREMENT,
	TransactionID INT NOT NULL,
	ProductID INT NOT NULL,
	ProductQuantity INT NOT NULL,
	PRIMARY KEY (ID),
	FOREIGN KEY (TransactionID) REFERENCES NodeJSTraining.Transactions(ID),
	FOREIGN KEY (ProductID) REFERENCES NodeJSTraining.Products(ID)
);