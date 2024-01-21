const contactTemplate = (name) =>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Reply</title>
      <style>
        /* Add your styles for an attractive design */
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          color: #333;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #007bff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thank you for reaching out,${name}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Your message: Bulk Mailer Team</p>
        <p>Best Regards,<br>Bulk Mailer</p>
      </div>
    </body>
    </html>
    `
}

module.exports = {contactTemplate}