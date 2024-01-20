const subscribeTemplate = () => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Subscription Confirmation</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
    
        h2 {
          color: #333;
        }
    
        p {
          color: #666;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          text-align: center;
          text-decoration: none;
          color: #fff !important;
          background-color: #007bff;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Thank You for Subscribing!</h2>
        <p>We appreciate you joining our newsletter. Stay tuned for updates on the latest news, features, and tips from Bulk Mailer.</p>
        
        <p>Feel free to contact us if you have any questions or concerns. We look forward to keeping you informed!</p>
    
        <p>Best Regards,<br>Your Bulk Mailer Team</p>
    
        <p>
          <a href="https://naveen-bulk-mail-tool-fsd.netlify.app/" class="button">Visit Our Website</a>
        </p>
      </div>
    </body>
    </html>
    `;
};


module.exports= {subscribeTemplate}