CREATE OR ALTER PROCEDURE updateUser(
    @id VARCHAR(200),
    @firstname VARCHAR(200),
    @lastname VARCHAR(200),
    @email VARCHAR(200),
    @password VARCHAR(8000)
   
)
AS
BEGIN 
    UPDATE users
    SET firstname=@firstname,lastname=@lastname,email=@email,password=@password
    WHERE id=@id
END