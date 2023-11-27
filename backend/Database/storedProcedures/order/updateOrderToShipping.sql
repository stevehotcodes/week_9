CREATE OR ALTER PROCEDURE updateOrdertoShipping(
@id VARCHAR(200)
)
AS
BEGIN
 
UPDATE orders SET orderStatus= 'shipping' WHERE id=@id AND orderStatus= 'processing'
END