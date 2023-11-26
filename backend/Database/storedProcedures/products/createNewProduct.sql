CREATE OR ALTER PROCEDURE createNewProduct(
    @id VARCHAR (200),
    @productName VARCHAR(200),
    @productDescription VARCHAR(8000) ,
    @price DECIMAL (10,2),
    @productImageURL VARCHAR (2000),
    @category VARCHAR(200),
    @productStock INT
  

)
AS
BEGIN   
    INSERT INTO products(id,productName,productDescription,price,productImageURL,category,productStock)
    VALUES (@id,@productName,@productDescription,@price,@productImageURL,@category,@productStock)
END
