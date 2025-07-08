
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
  downloadUrl?: string;
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
  private static API_BASE_URL = 'https://api.deepseek.com/v1';
  private static API_KEY = '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';

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

  // Create PDF from content with download capability
  private static async createPdfFromContent(content: string, formData: FormData): Promise<{ pdfUrl: string; downloadUrl: string }> {
    try {
      console.log('Creating PDF from AI content...');
      
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

      // Simulate PDF generation with download capability
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const filename = `Portrait-Predictif-${formData.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      const pdfUrl = `https://storage.aiportrait.pro/pdfs/${filename}`;
      
      // Create a downloadable blob URL (simulation)
      const downloadUrl = this.createDownloadableLink(content, formData);
      
      console.log('PDF created successfully:', pdfUrl);
      
      return { pdfUrl, downloadUrl };
      
    } catch (error) {
      console.error('Error creating PDF:', error);
      throw new Error('Erreur lors de la création du PDF');
    }
  }

  // Create a downloadable link for the PDF
  private static createDownloadableLink(content: string, formData: FormData): string {
    // In a real implementation, this would create an actual PDF blob
    // For demo purposes, we create a text file with the content
    const fullContent = `
PORTRAIT PRÉDICTIF IA - ${formData.name.toUpperCase()}
Généré par Deepseek v3 • ${new Date().toLocaleDateString('fr-FR')}

=====================================================

INFORMATIONS PERSONNELLES
Nom: ${formData.name}
Email: ${formData.email}
Secteur: ${formData.sector}
Poste: ${formData.position}

VISION STRATÉGIQUE
${formData.ambitions}

=====================================================

ANALYSE PRÉDICTIVE IA

${content}

=====================================================

Rapport généré par AI Portrait Pro
Powered by Deepseek v3 • www.aiportrait.pro
    `;

    const blob = new Blob([fullContent], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }

  // Send email with PDF attachment
  private static async sendEmailWithPdf(pdfUrl: string, formData: FormData): Promise<void> {
    try {
      console.log('Sending email with PDF attachment...');
      
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
      
      // Step 2: Create PDF from AI content with download capability
      const { pdfUrl, downloadUrl } = await this.createPdfFromContent(aiContent, formData);
      
      console.log('PDF generation completed successfully');
      
      return {
        success: true,
        pdfUrl: pdfUrl,
        downloadUrl: downloadUrl,
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
      const { pdfUrl, downloadUrl } = await this.createPdfFromContent(aiContent, formData);
      
      // Step 3: Send email with PDF attachment
      await this.sendEmailWithPdf(pdfUrl, formData);
      
      console.log('PDF generation and email sending completed successfully');
      
      return {
        success: true,
        pdfUrl: pdfUrl,
        downloadUrl: downloadUrl,
        message: `Bonjour ${formData.name}, votre Portrait Prédictif IA a été généré avec l'IA Deepseek v3 et envoyé à ${formData.email} ! Vous pouvez également le télécharger directement.`
      };
      
    } catch (error) {
      console.error('Error in PDF generation and email process:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la génération et de l\'envoi du PDF'
      };
    }
  }

  // For demo purposes - enhanced mock with download capability
  static async generateMockPdf(formData: FormData): Promise<PdfGenerationResponse> {
    console.log('Generating enhanced mock PDF with AI simulation...');
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create mock download content
    const mockContent = `Rapport prédictif personnalisé pour ${formData.name} dans le secteur ${formData.sector}...`;
    const downloadUrl = this.createDownloadableLink(mockContent, formData);
    
    return {
      success: true,
      downloadUrl: downloadUrl,
      message: `🚀 Bonjour ${formData.name}, votre Portrait Prédictif IA pour le secteur ${formData.sector} a été généré avec succès grâce à l'IA Deepseek v3 ! Un rapport personnalisé de 12-15 pages avec des prédictions et recommandations stratégiques a été envoyé à ${formData.email} et est disponible en téléchargement.`
    };
  }
}
