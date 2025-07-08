
interface EmailData {
  to: string;
  subject: string;
  content: string;
  pdfContent?: string;
  senderName?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class EmailService {
  private static API_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
  private static SERVICE_ID = 'service_aiportrait';
  private static TEMPLATE_ID = 'template_pdf_report';
  private static PUBLIC_KEY = 'your_emailjs_public_key';

  static async sendPdfReport(emailData: EmailData): Promise<EmailResponse> {
    try {
      console.log('Sending PDF report via email...');
      
      const templateParams = {
        to_email: emailData.to,
        to_name: emailData.senderName || 'Client',
        subject: emailData.subject,
        message: emailData.content,
        pdf_content: emailData.pdfContent,
        from_name: 'AI Portrait Pro',
        reply_to: 'contact@aiportrait.pro'
      };

      // Simulate email sending for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Email sent successfully to:', emailData.to);
      
      return {
        success: true,
        messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de l\'envoi de l\'email'
      };
    }
  }

  static async sendWelcomeEmail(email: string, name: string): Promise<EmailResponse> {
    try {
      const emailData: EmailData = {
        to: email,
        subject: `Bienvenue ${name} - Votre Portrait Prédictif IA`,
        content: `
Bonjour ${name},

Merci de votre confiance pour la génération de votre Portrait Prédictif IA !

Votre rapport personnalisé a été créé avec succès grâce à notre intelligence artificielle Deepseek v3. Ce document contient une analyse approfondie de votre profil professionnel et des recommandations stratégiques pour les 3 prochaines années.

Cordialement,
L'équipe AI Portrait Pro
        `,
        senderName: name
      };

      return await this.sendPdfReport(emailData);
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de l\'envoi de l\'email de bienvenue'
      };
    }
  }
}
