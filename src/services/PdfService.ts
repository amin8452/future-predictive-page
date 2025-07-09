
import jsPDF from 'jspdf';

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
  pdfBlob?: Blob;
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

  private static async generateAIContent(formData: FormData): Promise<string> {
    try {
      console.log('🤖 Génération du contenu IA avec Deepseek v3...');
      
      const prompt = `En tant qu'expert en stratégie d'entreprise, créez un portrait prédictif professionnel DÉTAILLÉ et PERSONNALISÉ pour :

📋 PROFIL CLIENT :
• Nom : ${formData.name}
• Secteur : ${formData.sector}
• Poste : ${formData.position}
• Vision : ${formData.ambitions}

📊 STRUCTURE REQUISE (rapport de 8-10 pages) :

1. RÉSUMÉ EXÉCUTIF (1 page)
   • Synthèse du profil et potentiel
   • 3 prédictions clés pour 2025-2027

2. ANALYSE SECTEUR ${formData.sector.toUpperCase()} (2 pages)
   • Tendances actuelles et futures
   • Opportunités spécifiques
   • Défis sectoriels

3. PROFIL ${formData.position.toUpperCase()} (2 pages)
   • Compétences actuelles évaluées
   • Forces et axes d'amélioration
   • Positionnement concurrentiel

4. PRÉDICTIONS 2025-2027 (2 pages)
   • 2025 : Opportunités immédiates
   • 2026 : Évolutions technologiques
   • 2027 : Leadership et impact

5. PLAN D'ACTION STRATÉGIQUE (2 pages)
   • 6 mois : Actions prioritaires
   • 18 mois : Développement compétences
   • 36 mois : Objectifs long terme

6. RECOMMANDATIONS PERSONNALISÉES (1 page)
   • Basées sur "${formData.ambitions}"
   • KPIs de suivi
   • Prochaines étapes

IMPORTANT : Utilisez des données concrètes, des chiffres du marché, et personnalisez chaque section selon le profil ${formData.name} dans ${formData.sector}.`;

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
              content: 'Vous êtes un consultant senior expert en stratégie d\'entreprise. Rédigez des rapports professionnels détaillés avec des données concrètes et des recommandations actionables.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 3000,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur API Deepseek:', response.status, errorText);
        throw new Error(`Erreur API Deepseek: ${response.status}`);
      }

      const result: DeepseekResponse = await response.json();
      const aiContent = result.choices[0]?.message?.content;
      
      if (!aiContent) {
        throw new Error('Contenu IA vide');
      }
      
      console.log('✅ Contenu IA généré avec succès');
      return aiContent;
      
    } catch (error) {
      console.error('❌ Erreur génération contenu IA:', error);
      throw new Error('Impossible de générer le contenu IA');
    }
  }

  private static createPdfFromContent(aiContent: string, formData: FormData): Blob {
    try {
      console.log('📄 Création du PDF professionnel...');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const lineHeight = 7;
      let yPosition = 30;

      // Header avec style moderne
      pdf.setFillColor(6, 182, 212); // cyan-500
      pdf.rect(0, 0, pageWidth, 25, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PORTRAIT PRÉDICTIF IA', margin, 15);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Généré pour ${formData.name}`, margin, 22);

      // Informations client avec style
      yPosition = 40;
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('INFORMATIONS CLIENT', margin, yPosition);
      
      yPosition += 10;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`👤 Nom: ${formData.name}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`🏢 Secteur: ${formData.sector}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`💼 Poste: ${formData.position}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`🎯 Vision: ${formData.ambitions}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`📅 Généré le: ${new Date().toLocaleDateString('fr-FR')}`, margin, yPosition);

      // Séparateur
      yPosition += 15;
      pdf.setDrawColor(6, 182, 212);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);

      // Contenu IA formaté
      yPosition += 15;
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(6, 182, 212);
      pdf.text('ANALYSE PRÉDICTIVE DEEPSEEK V3', margin, yPosition);

      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);

      // Formatage du contenu avec retours à la ligne
      const lines = pdf.splitTextToSize(aiContent, pageWidth - 2 * margin);
      
      for (let i = 0; i < lines.length; i++) {
        if (yPosition > 280) { // Nouvelle page si nécessaire
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(lines[i], margin, yPosition);
        yPosition += lineHeight;
      }

      // Footer professionnel
      pdf.addPage();
      yPosition = 50;
      
      pdf.setFillColor(15, 23, 42); // slate-900
      pdf.rect(0, 260, pageWidth, 37, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('AI Portrait Pro - Powered by Deepseek v3', margin, 275);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Rapport professionnel généré par intelligence artificielle', margin, 285);
      pdf.text(`© ${new Date().getFullYear()} - Tous droits réservés`, margin, 292);

      console.log('✅ PDF créé avec succès');
      return pdf.output('blob');
      
    } catch (error) {
      console.error('❌ Erreur création PDF:', error);
      throw new Error('Impossible de créer le PDF');
    }
  }

  static async generatePdf(formData: FormData): Promise<PdfGenerationResponse> {
    try {
      console.log('🚀 Démarrage génération PDF IA...');
      
      // Étape 1: Génération contenu IA (optimisé)
      const aiContent = await this.generateAIContent(formData);
      
      // Étape 2: Création PDF professionnel
      const pdfBlob = this.createPdfFromContent(aiContent, formData);
      
      // Étape 3: URLs pour téléchargement et prévisualisation
      const downloadUrl = URL.createObjectURL(pdfBlob);
      const pdfUrl = downloadUrl;
      
      console.log('🎉 PDF généré avec succès !');
      
      return {
        success: true,
        pdfUrl,
        downloadUrl,
        pdfBlob,
        message: `🤖 Portrait Prédictif IA généré avec succès pour ${formData.name} ! 
        
📊 Secteur analysé : ${formData.sector}
💼 Profil évalué : ${formData.position}
🎯 Vision intégrée : ${formData.ambitions}

Votre rapport PDF professionnel est prêt à être consulté et téléchargé.`
      };
      
    } catch (error) {
      console.error('❌ Erreur processus génération:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la génération du PDF'
      };
    }
  }
}
