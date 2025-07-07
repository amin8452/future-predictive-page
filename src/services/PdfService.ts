
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

export class PdfService {
  private static API_BASE_URL = 'https://api.example.com'; // Replace with your actual API endpoint

  static async generatePdf(formData: FormData): Promise<PdfGenerationResponse> {
    try {
      console.log('Sending data to PDF generation API:', formData);
      
      const response = await fetch(`${this.API_BASE_URL}/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          personalInfo: {
            name: formData.name,
            email: formData.email,
            sector: formData.sector,
            position: formData.position,
            ambitions: formData.ambitions,
          },
          reportType: 'predictive-portrait',
          language: 'fr',
          format: 'premium'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('PDF generation response:', result);
      
      return {
        success: true,
        pdfUrl: result.downloadUrl,
        message: 'Votre Portrait Prédictif a été généré avec succès!'
      };
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la génération du PDF'
      };
    }
  }

  static async sendPdfByEmail(formData: FormData): Promise<PdfGenerationResponse> {
    try {
      console.log('Sending PDF via email to:', formData.email);
      
      const response = await fetch(`${this.API_BASE_URL}/send-pdf-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          recipient: formData.email,
          personalInfo: {
            name: formData.name,
            sector: formData.sector,
            position: formData.position,
            ambitions: formData.ambitions,
          },
          template: 'predictive-portrait-premium'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Email sending response:', result);
      
      return {
        success: true,
        message: 'Votre Portrait Prédictif a été envoyé par email!'
      };
      
    } catch (error) {
      console.error('Error sending PDF by email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de l\'envoi du PDF'
      };
    }
  }

  // For demo purposes - simulate PDF generation
  static async generateMockPdf(formData: FormData): Promise<PdfGenerationResponse> {
    console.log('Generating mock PDF for:', formData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      message: `Bonjour ${formData.name}, votre Portrait Prédictif IA pour le secteur ${formData.sector} a été généré avec succès! Un PDF de 12-15 pages a été envoyé à ${formData.email}.`
    };
  }
}
