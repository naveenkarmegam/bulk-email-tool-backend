const activationTemplate = (token) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activate Your Account</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #007bff;
    }

    p {
      color: #666;
    }

    .button {
      display: inline-block;
      padding: 15px 25px;
      font-size: 18px;
      text-align: center;
      text-decoration: none;
      color: #fff !important;
      background-color: #007bff;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Welcome to Our Platform!</h2>
    <p>Thank you for registering with us. To activate your account and start enjoying our services, please click the activation link below:</p>

    <p>
      <a href="https://bulk-email-tool-681r.onrender.com/api/auth/activate-account/${token}" class="button">Activate Your Account</a>
    </p>
    
    <p>If the above button doesn't work, you can also copy and paste the following URL into your browser:</p>
    <p>https://bulk-email-tool-681r.onrender.com/api/auth/activate-account/${token}</p>

    <p>Please note that this activation link will expire in 24 hours for security reasons.</p>
    
    <p>Thank you for choosing us!</p>
    
    <p>Best Regards,<br>Bulk Mailer Team</p>
    </div>
</body>
</html>
`;
};

module.exports = activationTemplate;
