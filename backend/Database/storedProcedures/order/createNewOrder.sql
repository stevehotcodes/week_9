CREATE  OR ALTER PROCEDURE createNewOrder(
    @id VARCHAR(200),
    @userID VARCHAR(200)
)
AS
BEGIN
    INSERT INTO orders (id,userID)
    VALUES (@id,@userID)
END