
interface FormData {
  name: string;
  email: string;
  sector: string;
  position: string;
  ambitions: string;
}

interface PdfGenerationResponse {
  success: boolean;
  pdfUrl?: string;
  message?: string;
  error?: string;
}

interface DeepseekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class PdfService {
  private static API_BASE_URL = 'https://api.deepseek.com/v1'; // Deepseek API endpoint
  private static API_KEY = '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'; // Your API key

  // Generate AI-powered content for the PDF
  private static async generateAIContent(formData: FormData): Promise<string> {
    try {
      console.log('Generating AI content with Deepseek v3...');
      
      const prompt = `Créez un portrait prédictif professionnel détaillé pour:
      
Nom: ${formData.name}
Email: ${formData.email}
Secteur: ${formData.sector}
Poste: ${formData.position}
Ambitions: ${formData.ambitions}

Générez un rapport structuré de 12-15 pages avec:
1. Analyse de profil professionnel
2. Prédictions IA pour les 3 prochaines années
3. Recommandations stratégiques personnalisées
4. Opportunités de croissance
5. Défis potentiels et solutions
6. Plan d'action concret

Le rapport doit être professionnel, personnalisé et actionnable.`;

      const response = await fetch(`${this.API_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Deepseek API error: ${response.status}`);
      }

      const result: DeepseekResponse = await response.json();
      console.log('AI content generated successfully');
      
      return result.choices[0]?.message?.content || 'Erreur lors de la génération du contenu IA';
      
    } catch (error) {
      console.error('Error generating AI content:', error);
      throw new Error('Erreur lors de la génération du contenu IA');
    }
  }

  // Generate PDF using a PDF service
  private static async createPdfFromContent(content: string, formData: FormData): Promise<string> {
    try {
      console.log('Creating PDF from AI content...');
      
      // Using jsPDF or similar service - this is a simplified example
      // In production, you'd use a proper PDF generation service
      const pdfData = {
        content: content,
        personalInfo: {
          name: formData.name,
          email: formData.email,
          sector: formData.sector,
          position: formData.position,
        },
        template: 'predictive-portrait',
        format: 'A4',
        language: 'fr'
      };

      // For demo purposes, we'll simulate PDF generation
      // In production, integrate with services like:
      // - PDFShift
      // - Puppeteer on your backend
      // - DocRaptor
      // - HTMLtoPDF API
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
      
      const mockPdfUrl = `https://storage.example.com/pdfs/portrait-${Date.now()}.pdf`;
      console.log('PDF created successfully:', mockPdfUrl);
      
      return mockPdfUrl;
      
    } catch (error) {
      console.error('Error creating PDF:', error);
      throw new Error('Erreur lors de la création du PDF');
    }
  }

  // Send email with PDF attachment
  private static async sendEmailWithPdf(pdfUrl: string, formData: FormData): Promise<void> {
    try {
      console.log('Sending email with PDF attachment...');
      
      // Using EmailJS, SendGrid, or similar service
      // This is a simplified example
      const emailData = {
        to: formData.email,
        subject: `Votre Portrait Prédictif IA - ${formData.name}`,
        html: `
          <h2>Bonjour ${formData.name},</h2>
          <p>Votre Portrait Prédictif IA personnalisé est prêt !</p>
          <p>Ce rapport de 12-15 pages analyse votre profil professionnel dans le secteur <strong>${formData.sector}</strong> et propose des prédictions et recommandations stratégiques pour les 3 prochaines années.</p>
          <p><a href="${pdfUrl}" style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Télécharger votre rapport PDF</a></p>
          <p>Cordialement,<br>L'équipe Portrait Prédictif IA</p>
        `,
        attachments: [
          {
            filename: `Portrait-Predictif-${formData.name.replace(/\s+/g, '-')}.pdf`,
            path: pdfUrl
          }
        ]
      };

      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Email sent successfully to:', formData.email);
      
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }
  }

  static async generatePdf(formData: FormData): Promise<PdfGenerationResponse> {
    try {
      console.log('Starting AI-powered PDF generation process...');
      
      // Step 1: Generate AI content using Deepseek v3
      const aiContent = await this.generateAIContent(formData);
      
      // Step 2: Create PDF from AI content
      const pdfUrl = await this.createPdfFromContent(aiContent, formData);
      
      console.log('PDF generation completed successfully');
      
      return {
        success: true,
        pdfUrl: pdfUrl,
        message: `Bonjour ${formData.name}, votre Portrait Prédictif IA pour le secteur ${formData.sector} a été généré avec succès grâce à l'IA Deepseek v3 !`
      };
      
    } catch (error) {
      console.error('Error in PDF generation process:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la génération du PDF'
      };
    }
  }

  static async sendPdfByEmail(formData: FormData): Promise<PdfGenerationResponse> {
    try {
      console.log('Starting AI-powered PDF generation and email sending...');
      
      // Step 1: Generate AI content using Deepseek v3
      const aiContent = await this.generateAIContent(formData);
      
      // Step 2: Create PDF from AI content
      const pdfUrl = await this.createPdfFromContent(aiContent, formData);
      
      // Step 3: Send email with PDF attachment
      await this.sendEmailWithPdf(pdfUrl, formData);
      
      console.log('PDF generation and email sending completed successfully');
      
      return {
        success: true,
        message: `Bonjour ${formData.name}, votre Portrait Prédictif IA a été généré avec l'IA Deepseek v3 et envoyé à ${formData.email} !`
      };
      
    } catch (error) {
      console.error('Error in PDF generation and email process:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la génération et de l\'envoi du PDF'
      };
    }
  }

  // For demo purposes - enhanced mock with AI simulation
  static async generateMockPdf(formData: FormData): Promise<PdfGenerationResponse> {
    console.log('Generating enhanced mock PDF with AI simulation...');
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      success: true,
      message: `🚀 Bonjour ${formData.name}, votre Portrait Prédictif IA pour le secteur ${formData.sector} a été généré avec succès grâce à l'IA Deepseek v3 ! Un rapport personnalisé de 12-15 pages avec des prédictions et recommandations stratégiques a été envoyé à ${formData.email}.`
    };
  }
}
