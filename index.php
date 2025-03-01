
<!DOCTYPE html>
<html lang="ar">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.2/font/bootstrap-icons.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        /* Define the Alexandria-Regular font */
        @font-face {
            font-family: 'Alexandria-Regular';
            src: url('Alexandria-Regular.ttf') format('truetype');
        }

        body {
            font-family: 'Alexandria-Regular', sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
            direction: rtl;
        }

        .banner-image {
            width: 100%;
            height: auto;
            background-image: url('bglogin.png');
            background-size: cover;
            background-position: center;
            color: #fff;
            text-align: center;
            min-height: 200px;
        }

        .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .card {
            width: 100%;
            max-width: 400px;
            margin: auto;
        }

        @media (min-width: 768px) {
            .banner-image {
                height: 500px;
            }
        }

        @media (max-width: 768px) {
            .banner-text {
                font-size: 1.5rem;
            }
        }
        
        .footer {
            background-color: #fff;
            border-top: 1px solid #ddd;
            position: relative;
            bottom: 0;
            width: 100%;
        }
        .footer .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .footer .logo {
            height: 50px;
        }
    </style>
</head>

<body>
    <div class="banner-image"></div>
    <br>
    <br>
    <div class="card p-4 shadow">
        <h4 class="mb-3 text-center">Entrez votre mot de passe</h4>
        <div class="form-group">
            <input type="password" id="password" class="form-control" placeholder="" required>
        </div>
        <button onclick="validatePassword()" class="btn btn-primary w-100 mt-3">Entrez</button>
    </div>

    <script>
    // Self-executing function for security
    (function() {
        // Clear any existing user data on entry page
        localStorage.removeItem('user');
        
        // Validate password function
        window.validatePassword = function() {
            const password = document.getElementById("password").value;
            const correctPassword = "DrAmine1124";
            
            if (password === correctPassword) {
                // Set a 'user' item in localStorage when the password is correct
                localStorage.setItem("user", JSON.stringify({ passwordCode: "DrAmine1124" }));
                
                // Redirect to the banners page
                window.location.href = "https://draminesaid.com/videos/saisonsnew.html";
            } else {
                alert("Incorrect password. Please try again.");
            }
        };
        
        // Security measures
        document.addEventListener('contextmenu', (event) => event.preventDefault());
        document.addEventListener('keydown', (event) => {
            if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
                event.preventDefault();
            }
        });
    })();
    </script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
