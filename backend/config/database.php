<?php
class Database
{
    // DB Params
    private $dbHost = 'localhost';
    private $dbName = 'jewels_store';
    private $dbUser = 'tester';
    private $dbPwd = 'Test@123#7eR';
    private $dbConn = null;

    // DB Connect
    public function connect()
    {
        try
        {
            $this->dbConn = new PDO("mysql:host={$this->dbHost};dbname={$this->dbName}", $this->dbUser, $this->dbPwd);
            $this->dbConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $ex)
        {
            echo "Connection Error: {$ex->getMessage()}";
        }

        return $this->dbConn;
    }

}

?>
