<?php
// Autoriser les requêtes inter-domaines
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type'); 
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Démarrer la session
session_start();

$conn = new mysqli('localhost', 'dramines_wp764', '123123123', 'dramines_drapp');

// Vérification de la connexion
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Échec de la connexion à la base de données : ' . $conn->connect_error]);
    exit;
}

// Inclure PHPMailer classes
// require 'vendor/autoload.php'; // Remove this line as PHPMailer is no longer used

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    // Lecture de l'entrée JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Validation des données reçues
    $nom = isset($data['nom']) ? $conn->real_escape_string($data['nom']) : '';
    $prenom = isset($data['prenom']) ? $conn->real_escape_string($data['prenom']) : '';
    $email = isset($data['email']) ? $conn->real_escape_string($data['email']) : '';
    $telephone = isset($data['telephone']) ? $conn->real_escape_string($data['telephone']) : '';
    $password = isset($data['password']) ? $conn->real_escape_string($data['password']) : '';
    $password_confirm = isset($data['password_confirmation']) ? $conn->real_escape_string($data['password_confirmation']) : '';
    $pmethod_client = isset($data['pmethod_client']) ? $conn->real_escape_string($data['pmethod_client']) : '';

    // Vérification des champs obligatoires
    if (empty($nom) || empty($prenom) || empty($email) || empty($telephone) || empty($password) || empty($password_confirm)) {
        echo json_encode(['success' => false, 'message' => 'Tous les champs sont obligatoires.']);
        exit;
    }

    // Vérification si l'email existe déjà
    $email_check_query = "SELECT * FROM client WHERE email_client = '$email' LIMIT 1";
    $result = $conn->query($email_check_query);

    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => "L'email existe déjà."]);
        exit;
    } elseif ($password !== $password_confirm) {
        echo json_encode(['success' => false, 'message' => "Les mots de passe ne correspondent pas."]);
        exit;
    } else {
        // Hachage du mot de passe et création de l'utilisateur
        $password_hashed = password_hash($password, PASSWORD_BCRYPT);
        $user_key = '38457';  // Exemple, à générer dynamiquement
        $status_client = '1';
        
        $sql = "INSERT INTO client (nom_client, prenom_client, email_client, telephone_client, password_client, user_key, status_client, pmethod_client) 
                VALUES ('$nom', '$prenom', '$email', '$telephone', '$password_hashed', '$user_key', '$status_client', '$pmethod_client')";
        
    if ($conn->query($sql) === TRUE) {
    // Prepare the email body
   $subject = 'Bienvenue sur notre plateforme';
$body = '
<html>
<head>
    <title>Bienvenue  sur notre plateforme</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        h1 {
            color: #7f93c1;
        }
        .footer {
            font-size: 0.8em;
            text-align: center;
            margin-top: 20px;
        }
        .connect-button {
            background-color: #7f93c1;
            color: #fff;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
        }
        .connect-button:hover {
            background-color: #000;
        }
         .connect-button:visited {
            color: #fff; 
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bienvenue sur notre plateforme</h1>
        <p>Bonjour ' . htmlspecialchars($prenom) . ',</p>
        <p>Votre inscription a été réussie !</p>
        <p>Voici les détails pour votre authentification: </p>
        <p><strong>Login : </strong>' . htmlspecialchars($email) . '</p>
        <p><strong>Mot de passe : </strong>' . htmlspecialchars($password) . '</p>
        <p>Cliquez sur <a href="https://draminesaid.com/videos/cologin.html" style="color: #7f93c1; text-decoration: underline;">ce lien</a> pour vous authentifier.</p>
        <p>Merci pour votre confiance !</p>
        <div class="footer">
            <p>Cordialement,<br>Dr Amine Said</p>
        </div>
    </div>
</body>
</html>';



            // En-têtes de l'email
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= "From: contact@draminesaid.com" . "\r\n";
            $headers .= "Reply-To: contact@draminesaid.com" . "\r\n";

            // Envoi de l'email
            if (mail($email, $subject, $body, $headers)) {
                echo json_encode(['success' => true, 'message' => "Inscription réussie !", 'user_key' => $user_key]);
            } else {
                echo json_encode(['success' => true, 'message' => "Inscription réussie, mais l'email n'a pas pu être envoyé."]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => "Erreur lors de l'ajout de l'utilisateur : " . $conn->error]);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode de requête invalide.']);
}

$conn->close();
?>
