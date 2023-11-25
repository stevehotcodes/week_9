CREATE OR ALTER PROCEDURE getProductsByCategory(
    @category VARCHAR (200)
)
AS
BEGIN
    SELECT * FROM products WHERE category=@category
END