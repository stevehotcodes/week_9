CREATE OR ALTER PROCEDURE getCart(
    @userID VARCHAR(200)
)
AS
BEGIN
    SELECT c.id ,c.productID,c.quantity,c.userID,p.productName,p.price,p.productImageURL 
    FROM cart AS c
    LEFT JOIN
    products AS p
    ON c.productID=p.id
    WHERE userID=@userID
END