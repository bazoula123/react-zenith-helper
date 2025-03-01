<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check PHP version
echo "<h3>PHP Version:</h3>";
echo phpversion() . "<br><br>";

// Check if POST and GET requests are working
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "<h3>POST Request Received:</h3>";
    echo json_encode($_POST);

    // Attempt to insert a log if test_insert is present
    if (isset($_POST['test_insert'])) {
        $test_log = $_POST['test_insert'];
        $test_user = "Test user";
        $test_type = "Test type";
        $test_date = date("Y-m-d H:i:s");

        // Database connection
        $conn = new mysqli('localhost', 'dramines_drapp', '123123123', 'dramines_drapp');
        if ($conn->connect_error) {
            die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
        }

        // Prepare and execute INSERT
        $stmt = $conn->prepare("INSERT INTO logs (text_log, date_log, user_log, type_log) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $test_log, $test_date, $test_user, $test_type);

        if ($stmt->execute()) {
            echo "<h3>Log inserted successfully!</h3>";
        } else {
            echo "<h3>Error inserting log: " . $stmt->error . "</h3>";
        }
        $stmt->close();
        $conn->close();
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo "<h3>GET Request Received:</h3>";
    echo json_encode($_GET);
} else {
    echo "<h3>No valid request method provided.</h3>";
}
?>
