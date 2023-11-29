CREATE OR ALTER PROCEDURE getOrdersByUser(
    @userID VARCHAR (200)
)
AS
BEGIN
    SELECT o.id AS id,o.orderStatus AS status, o.orderDate ,s.productID, s.quantity,o.userID,p.productName,s.price,p.productImageURL,u.id
    FROM orders AS o
    LEFT JOIN
    sales AS s
    ON o.id=s.orderID
    LEFT JOIN
    products AS p
    ON p.id=s.productID
    LEFT JOIN
    users AS u
    ON u.id=o.userID
    WHERE o.userID=u.id
END