
CREATE OR ALTER PROCEDURE userRegistration(
    @customer_id VARCHAR(100),
    @firstname VARCHAR(200),
    @lastname VARCHAR(300),
    @email VARCHAR(200),
    @password VARCHAR(200)
)
AS
BEGIN
    INSERT INTO users(customer_id, firstname,lastname, email, password)
    VALUES(@customer_id, @firstname, @lastname, @email, @password)
END
