import sgMail from '@sendgrid/mail'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

class EmailService {
  constructor() {
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@assignmentai.com'
    this.fromName = 'AssignmentAI'
  }

  async sendPasswordResetEmail(email, resetUrl) {
    const subject = 'Reset Your AssignmentAI Password'
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">AssignmentAI</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Password Reset Request</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We received a request to reset your password for your AssignmentAI account. 
            Click the button below to create a new password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      display: inline-block; 
                      font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you didn't request this password reset, you can safely ignore this email. 
            Your password will remain unchanged.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            <strong>Important:</strong> This link will expire in 1 hour for your security.
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #999; font-size: 14px; text-align: center;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #667eea;">${resetUrl}</a>
          </p>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 AssignmentAI. All rights reserved.
          </p>
        </div>
      </div>
    `

    const text = `
      AssignmentAI - Password Reset Request
      
      Hello!
      
      We received a request to reset your password for your AssignmentAI account. 
      Click the link below to create a new password:
      
      ${resetUrl}
      
      If you didn't request this password reset, you can safely ignore this email. 
      Your password will remain unchanged.
      
      Important: This link will expire in 1 hour for your security.
      
      © 2024 AssignmentAI. All rights reserved.
    `

    return this.sendEmail(email, subject, html, text)
  }

  async sendWelcomeEmail(email, name) {
    const subject = 'Welcome to AssignmentAI!'
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">AssignmentAI</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Welcome aboard!</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Welcome, ${name}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for joining AssignmentAI! We're excited to help you excel in your academic journey.
          </p>
          
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">What you can do now:</h3>
            <ul style="color: #666; line-height: 1.6;">
              <li>Upload assignments and get AI-powered assistance</li>
              <li>Access 3 free assignments per month</li>
              <li>Get instant feedback and improvements</li>
              <li>Download enhanced assignments in multiple formats</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://assignmentai.com'}/dashboard" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      display: inline-block; 
                      font-weight: bold;">
              Get Started
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If you have any questions, feel free to reach out to our support team.
          </p>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 AssignmentAI. All rights reserved.
          </p>
        </div>
      </div>
    `

    const text = `
      AssignmentAI - Welcome!
      
      Welcome, ${name}!
      
      Thank you for joining AssignmentAI! We're excited to help you excel in your academic journey.
      
      What you can do now:
      - Upload assignments and get AI-powered assistance
      - Access 3 free assignments per month
      - Get instant feedback and improvements
      - Download enhanced assignments in multiple formats
      
      Get started: ${process.env.NEXT_PUBLIC_APP_URL || 'https://assignmentai.com'}/dashboard
      
      If you have any questions, feel free to reach out to our support team.
      
      © 2024 AssignmentAI. All rights reserved.
    `

    return this.sendEmail(email, subject, html, text)
  }

  async sendSubscriptionEmail(email, name, planType) {
    const subject = `Welcome to AssignmentAI ${planType.charAt(0).toUpperCase() + planType.slice(1)}!`
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">AssignmentAI</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Subscription Activated</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Congratulations, ${name}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Your ${planType} subscription has been successfully activated! 
            You now have access to all premium features.
          </p>
          
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your new benefits:</h3>
            <ul style="color: #666; line-height: 1.6;">
              ${planType === 'premium' ? `
                <li>Unlimited assignments</li>
                <li>Priority AI processing</li>
                <li>Advanced analytics</li>
                <li>Custom formatting options</li>
              ` : `
                <li>Unlimited classes and assignments</li>
                <li>AI-powered plagiarism detection</li>
                <li>Automated grading with custom rubrics</li>
                <li>Advanced analytics and reporting</li>
              `}
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://assignmentai.com'}/dashboard" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      display: inline-block; 
                      font-weight: bold;">
              Access Dashboard
            </a>
          </div>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center; color: white;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 AssignmentAI. All rights reserved.
          </p>
        </div>
      </div>
    `

    return this.sendEmail(email, subject, html)
  }

  async sendEmail(to, subject, html, text = '') {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        console.warn('SendGrid API key not configured. Email not sent.')
        console.log('Email would be sent to:', to)
        console.log('Subject:', subject)
        console.log('HTML:', html)
        return { success: false, error: 'Email service not configured' }
      }

      const msg = {
        to,
        from: {
          email: this.fromEmail,
          name: this.fromName
        },
        subject,
        html,
        text: text || this.stripHtml(html)
      }

      const response = await sgMail.send(msg)
      console.log('Email sent successfully:', response[0].statusCode)
      return { success: true, messageId: response[0].headers['x-message-id'] }
    } catch (error) {
      console.error('Email sending failed:', error)
      return { success: false, error: error.message }
    }
  }

  stripHtml(html) {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  }
}

export default new EmailService() 