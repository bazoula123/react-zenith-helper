<?php
// Autoriser les requêtes inter-domaines
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type'); 
header('Content-Type: application/json');

// Démarrer la session
session_start();

// Détails de connexion à la base de données
$servername = "localhost";
$username = "dramines_wp764";
$password = "123123123";
$dbname = "dramines_drapp";

// Créer la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Échec de la connexion: " . $conn->connect_error]));
}

// Vérifier si la méthode de requête est POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lire l'entrée JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Extraire l'email et le mot de passe du JSON
    $email = isset($data['email']) ? $conn->real_escape_string($data['email']) : '';
    $password = isset($data['password']) ? $conn->real_escape_string($data['password']) : '';

    // Log the attempt globally (successful or not)
    $logQuery = $conn->prepare("INSERT INTO logscon (logscon_email, logscon_pass, logscon_time) VALUES (?, ?, NOW())");
    $logQuery->bind_param('ss', $email, $password);
    $logQuery->execute();
    
    // Valider l'entrée
    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'L\'email et le mot de passe sont requis.']);
        exit;
    }

    // Préparer la requête SQL pour prévenir les injections SQL
    $stmt = $conn->prepare("SELECT id_client, nom_client, prenom_client, email_client, telephone_client, password_client, user_type, user_key, status_client FROM client WHERE email_client = ?");
    $stmt->bind_param("s", $email);

    // Exécuter la requête
    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'exécution de la requête: ' . $stmt->error]);
        exit;
    }

    $stmt->store_result();

    // Vérifier si l'utilisateur existe
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id_client, $nom_client, $prenom_client, $email_client, $telephone_client, $hashed_password, $user_type, $user_key, $status_client);
        $stmt->fetch();

        // Vérifier le mot de passe
        if (password_verify($password, $hashed_password)) {
            // Vérifier si l'utilisateur est actif
            if ($status_client == 1) {
                $_SESSION['id_client'] = $id_client; 

                // Récupérer les saisons autorisées pour l'utilisateur
                $permissionsStmt = $conn->prepare("SELECT id_saison FROM user_saison_permissions WHERE id_client = ?");
                $permissionsStmt->bind_param("i", $id_client);
                $permissionsStmt->execute();
                $result = $permissionsStmt->get_result();

                $saison_ids = [];
                while ($row = $result->fetch_assoc()) {
                    $saison_ids[] = $row['id_saison'];
                }

                $permissionsStmt->close();

                // Retourner tous les détails de l'utilisateur avec la réponse de succès
                echo json_encode([
                    'success' => true,
                    'message' => 'Connexion réussie',
                    'user' => [
                        'id' => $id_client,
                        'nom' => $nom_client,
                        'prenom' => $prenom_client,
                        'email' => $email_client,
                        'phone' => $telephone_client,
                        'type' => $user_type,
                        'key' => $user_key,
                        'status' => $status_client,
                        'allowed_saisons' => $saison_ids
                    ]
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Compte pas encore actif, merci pour votre patience.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Mot de passe invalide.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Aucun utilisateur trouvé avec cet email.']);
    }

    // Fermer la déclaration préparée
    $stmt->close();
}

// Fermer la connexion à la base de données
$conn->close();
?>
