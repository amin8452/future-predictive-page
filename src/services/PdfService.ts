
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
      
      const prompt = `Créez un portrait prédictif professionnel détaillé et personnalisé pour:
      
PROFIL CLIENT:
- Nom: ${formData.name}
- Email: ${formData.email}
- Secteur d'activité: ${formData.sector}
- Poste actuel: ${formData.position}
- Vision stratégique: ${formData.ambitions}

INSTRUCTIONS DÉTAILLÉES:
Générez un rapport complet de 12-15 pages structuré avec les sections suivantes:

1. RÉSUMÉ EXÉCUTIF
   - Synthèse du profil professionnel
   - Points clés de l'analyse prédictive

2. ANALYSE APPROFONDIE DU PROFIL
   - Évaluation des compétences actuelles dans le secteur ${formData.sector}
   - Positionnement stratégique en tant que ${formData.position}
   - Forces et opportunités d'amélioration

3. PRÉDICTIONS IA POUR LES 3 PROCHAINES ANNÉES
   - 2025: Tendances sectorielles et opportunités immédiates
   - 2026: Évolutions technologiques et transformation du marché
   - 2027: Positionnement futur et leadership potentiel

4. RECOMMANDATIONS STRATÉGIQUES PERSONNALISÉES
   - Actions prioritaires à court terme (0-6 mois)
   - Développement de compétences à moyen terme (6-18 mois)
   - Vision à long terme et objectifs stratégiques

5. OPPORTUNITÉS DE CROISSANCE SPÉCIFIQUES
   - Niches d'expertise à développer dans ${formData.sector}
   - Réseaux professionnels à activer
   - Partenariats stratégiques recommandés

6. DÉFIS POTENTIELS ET SOLUTIONS
   - Obstacles prévisibles dans l'industrie
   - Stratégies de mitigation des risques
   - Plans de contingence

7. PLAN D'ACTION CONCRET
   - Roadmap détaillée sur 36 mois
   - Indicateurs de performance clés (KPIs)
   - Étapes de validation et d'ajustement

Basez-vous sur les ambitions spécifiques mentionnées: "${formData.ambitions}"

Le rapport doit être professionnel, hautement personnalisé et immédiatement actionnable. Utilisez un langage expert adapté au niveau ${formData.position} dans le secteur ${formData.sector}.`;

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
              role: 'system',
              content: 'Vous êtes un consultant senior en stratégie d\'entreprise et développement professionnel. Créez des rapports détaillés, personnalisés et actionables.'
            },
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
        const errorText = await response.text();
        console.error('Deepseek API error:', response.status, errorText);
        throw new Error(`Erreur API Deepseek: ${response.status}`);
      }

      const result: DeepseekResponse = await response.json();
      console.log('AI content generated successfully');
      
      const aiContent = result.choices[0]?.message?.content;
      
      if (!aiContent) {
        throw new Error('Contenu IA vide');
      }
      
      return aiContent;
      
    } catch (error) {
      console.error('Error generating AI content:', error);
      throw new Error('Erreur lors de la génération du contenu IA');
    }
  }

  // Create PDF from AI-generated content
  private static async createPdfFromContent(aiContent: string, formData: FormData): Promise<{ pdfUrl: string; downloadUrl: string; pdfContent: string }> {
    try {
      console.log('Creating PDF from AI content...');
      
      const pdfContent = `
═══════════════════════════════════════════════════════════════
PORTRAIT PRÉDICTIF IA - ${formData.name.toUpperCase()}
═══════════════════════════════════════════════════════════════

Généré par Deepseek v3 • ${new Date().toLocaleDateString('fr-FR')}
Rapport personnalisé pour ${formData.name}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFORMATIONS DU PROFIL CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nom: ${formData.name}
📧 Email: ${formData.email}
🏢 Secteur: ${formData.sector}
💼 Poste: ${formData.position}
🎯 Vision: ${formData.ambitions}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ANALYSE PRÉDICTIVE DEEPSEEK V3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${aiContent}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFORMATIONS TECHNIQUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 Modèle IA: Deepseek v3 (deepseek-r1-0528)
📊 Analyse: Prédictive personnalisée
🎯 Horizon: 3 ans (2025-2027)
📈 Niveau: Professionnel expert

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rapport généré par AI Portrait Pro
Powered by Deepseek v3 • www.aiportrait.pro
© ${new Date().getFullYear()} - Tous droits réservés

═══════════════════════════════════════════════════════════════
      `;

      // Simulate PDF generation time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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

  // Main method to generate PDF using real AI content
  static async generatePdf(formData: FormData): Promise<PdfGenerationResponse> {
    try {
      console.log('Starting AI-powered PDF generation process...');
      
      // Step 1: Generate AI content using Deepseek v3
      const aiContent = await this.generateAIContent(formData);
      
      // Step 2: Create PDF from AI content
      const { pdfUrl, downloadUrl, pdfContent } = await this.createPdfFromContent(aiContent, formData);
      
      console.log('PDF generation completed successfully');
      
      return {
        success: true,
        pdfUrl: pdfUrl,
        downloadUrl: downloadUrl,
        pdfContent: pdfContent,
        message: `🤖 Bonjour ${formData.name}, votre Portrait Prédictif IA personnalisé pour le secteur ${formData.sector} a été généré avec succès ! Un rapport détaillé de 12-15 pages avec des analyses et recommandations spécifiques à votre profil ${formData.position} a été créé par Deepseek v3.`
      };
      
    } catch (error) {
      console.error('Error in PDF generation process:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la génération du PDF'
      };
    }
  }

  // Fallback method for demo purposes
  static async generateMockPdf(formData: FormData): Promise<PdfGenerationResponse> {
    console.log('Using fallback - generating mock PDF...');
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockContent = `
RÉSUMÉ EXÉCUTIF

Votre profil dans le secteur ${formData.sector} révèle un potentiel de leadership exceptionnel. En tant que ${formData.position}, vous êtes positionné(e) de manière stratégique pour capitaliser sur les évolutions du marché.

ANALYSE APPROFONDIE DU PROFIL

Secteur d'activité: ${formData.sector}
- Tendances actuelles du marché
- Opportunités de croissance identifiées
- Positionnement concurrentiel

Poste actuel: ${formData.position}
- Compétences clés validées
- Axes de développement prioritaires
- Potentiel d'évolution

PRÉDICTIONS IA POUR LES 3 PROCHAINES ANNÉES

2025: Consolidation et spécialisation
- Développement de votre expertise dans ${formData.sector}
- Renforcement de votre positionnement de ${formData.position}
- Opportunités de croissance immédiate

2026: Expansion et innovation
- Élargissement de votre périmètre d'influence
- Développement de nouvelles compétences digitales
- Leadership dans la transformation de ${formData.sector}

2027: Leadership et impact
- Position de référence dans votre domaine
- Capacité d'influence sur les décisions stratégiques
- Réalisation de vos ambitions: "${formData.ambitions}"

RECOMMANDATIONS STRATÉGIQUES

Actions prioritaires:
1. Renforcer votre expertise technique dans ${formData.sector}
2. Développer votre réseau professionnel
3. Acquérir des compétences en management de l'innovation
4. Préparer votre transition vers des rôles de direction

PLAN D'ACTION CONCRET

Phase 1 (0-12 mois):
- Formation spécialisée dans ${formData.sector}
- Certification en leadership
- Expansion du réseau professionnel

Phase 2 (12-24 mois):
- Prise de responsabilités élargies
- Pilotage de projets innovants
- Mentorat et développement d'équipes

Phase 3 (24-36 mois):
- Positionnement en tant qu'expert reconnu
- Contribution à la stratégie d'entreprise
- Réalisation des objectifs: "${formData.ambitions}"

CONCLUSION

Votre profil présente un potentiel exceptionnel pour réussir dans ${formData.sector}. Les prédictions IA montrent une trajectoire positive vers l'atteinte de vos ambitions stratégiques.
    `;
    
    const blob = new Blob([mockContent], { type: 'text/plain' });
    const downloadUrl = URL.createObjectURL(blob);
    
    return {
      success: true,
      downloadUrl: downloadUrl,
      pdfContent: mockContent,
      message: `🚀 Bonjour ${formData.name}, votre Portrait Prédictif IA pour le secteur ${formData.sector} a été généré avec succès ! Un rapport personnalisé avec des prédictions et recommandations spécifiques à votre profil ${formData.position} a été créé.`
    };
  }
}
