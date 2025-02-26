CREATE OR ALTER PROCEDURE InsertUpdateUser
    @id UNIQUEIDENTIFIER,
    @username VARCHAR(50),
    @email VARCHAR(100),
    @password VARCHAR(255),
    @role VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Users WHERE id = @id)
    BEGIN
        -- Update existing user
        UPDATE Users
        SET username = @username,
            email = @email,
            password = @password,
            role = @role
        WHERE id = @id;
    END
    ELSE
    BEGIN
        -- Insert new user
        INSERT INTO Users (id, username, email, password, role)
        VALUES (@id, @username, @email, @password, @role);
    END
END;