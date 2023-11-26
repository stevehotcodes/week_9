CREATE OR ALTER  PROCEDURE getAnOrderById(
    @id VARCHAR(200)
)
AS
BEGIN
    SELECT o.id AS id,o.orderStatus AS status, o.orderDate ,s.productID, s.quantity,o.userID,p.productName,s.price,p.productImageURL
    FROM orders AS o
    LEFT JOIN
    sales AS s
    ON o.id=s.orderID
    LEFT JOIN
    products AS p
    ON p.id=s.productID
    WHERE o.id=@id
END