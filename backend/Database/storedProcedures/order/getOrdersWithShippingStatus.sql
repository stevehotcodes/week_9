CREATE OR ALTER  PROCEDURE getOrdersWithShippingStatus(
    @id VARCHAR(200)
)
AS
BEGIN
    SELECT o.id AS id,o.orderStatus AS status, o.orderDate ,s.productID, s.quantity,o.userID,p.productName,s.price,p.productImageURL,u.email AS customerEmail,u.firstname AS customerFirstname,u.lastname AS customerLastname
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
    WHERE o.id=@id
END