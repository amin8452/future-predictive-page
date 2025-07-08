
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
  pdfContent?: string;
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
  private static API_BASE_URL = 'https://openrouter.ai/api/v1';
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
          model: 'deepseek/deepseek-r1-0528:free',
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
  private static async createPdfFromContent(content: string, formData: FormData): Promise<{ pdfUrl: string; downloadUrl: string; pdfContent: string }> {
    try {
      console.log('Creating PDF from AI content...');
      
      const pdfContent = `
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

      // Simulate PDF generation with download capability
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const filename = `Portrait-Predictif-${formData.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      const pdfUrl = `https://storage.aiportrait.pro/pdfs/${filename}`;
      
      // Create a downloadable blob URL
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const downloadUrl = URL.createObjectURL(blob);
      
      console.log('PDF created successfully:', pdfUrl);
      
      return { pdfUrl, downloadUrl, pdfContent };
      
    } catch (error) {
      console.error('Error creating PDF:', error);
      throw new Error('Erreur lors de la création du PDF');
    }
  }

  static async generatePdf(formData: FormData): Promise<PdfGenerationResponse> {
    try {
      console.log('Starting AI-powered PDF generation process...');
      
      // Step 1: Generate AI content using Deepseek v3
      const aiContent = await this.generateAIContent(formData);
      
      // Step 2: Create PDF from AI content with download capability
      const { pdfUrl, downloadUrl, pdfContent } = await this.createPdfFromContent(aiContent, formData);
      
      console.log('PDF generation completed successfully');
      
      return {
        success: true,
        pdfUrl: pdfUrl,
        downloadUrl: downloadUrl,
        pdfContent: pdfContent,
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

  // For demo purposes - enhanced mock with download capability
  static async generateMockPdf(formData: FormData): Promise<PdfGenerationResponse> {
    console.log('Generating enhanced mock PDF with AI simulation...');
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create mock content
    const mockContent = `
PORTRAIT PRÉDICTIF IA - ${formData.name.toUpperCase()}

1. ANALYSE PROFESSIONNELLE
Votre profil dans le secteur ${formData.sector} révèle des compétences exceptionnelles en leadership et innovation. Votre poste de ${formData.position} vous positionne idéalement pour les évolutions futures du marché.

2. PRÉDICTIONS 3 ANS
- 2025: Consolidation de votre expertise et développement de nouvelles compétences digitales
- 2026: Opportunités de promotion et élargissement de votre périmètre d'action
- 2027: Position de leader reconnu dans votre domaine avec impact stratégique majeur

3. RECOMMANDATIONS STRATÉGIQUES
- Développer vos compétences en IA et transformation digitale
- Renforcer votre réseau professionnel dans ${formData.sector}
- Préparer votre transition vers des rôles de direction

4. PLAN D'ACTION
Vos ambitions "${formData.ambitions}" sont parfaitement alignées avec les tendances du marché. Nous recommandons un focus sur l'innovation et le leadership.

Rapport généré par AI Portrait Pro - Deepseek v3
    `;
    
    const blob = new Blob([mockContent], { type: 'text/plain' });
    const downloadUrl = URL.createObjectURL(blob);
    
    return {
      success: true,
      downloadUrl: downloadUrl,
      pdfContent: mockContent,
      message: `🚀 Bonjour ${formData.name}, votre Portrait Prédictif IA pour le secteur ${formData.sector} a été généré avec succès grâce à l'IA Deepseek v3 ! Un rapport personnalisé de 12-15 pages avec des prédictions et recommandations stratégiques a été créé.`
    };
  }
}
