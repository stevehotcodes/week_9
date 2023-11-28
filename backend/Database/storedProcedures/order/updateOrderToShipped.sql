CREATE OR ALTER PROCEDURE updateOrdertoShipped
(
@id VARCHAR(200)
)
AS
BEGIN
 
UPDATE orders SET orderStatus= 'shipped' WHERE id=@id AND orderStatus='shipping'
END