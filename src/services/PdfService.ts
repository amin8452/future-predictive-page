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

interface AIResponse {
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
      console.log('🤖 Génération du contenu IA...');
      
      const response = await fetch(`${this.API_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Portrait Pro'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Vous êtes un consultant senior expert en stratégie d\'entreprise. Rédigez des rapports professionnels détaillés avec des données concrètes et des recommandations actionables.'
            },
            {
              role: 'user',
              content: `En tant qu'expert en stratégie d'entreprise, créez un portrait prédictif professionnel DÉTAILLÉ et PERSONNALISÉ pour :

📋 PROFIL CLIENT :
• Nom : ${formData.name}
• Secteur : ${formData.sector}
• Poste : ${formData.position}
• Vision : ${formData.ambitions}

📊 STRUCTURE REQUISE (rapport de 8-10 pages) :

# 1. RÉSUMÉ EXÉCUTIF
Synthèse du profil et potentiel de ${formData.name}
3 prédictions clés pour 2025-2027

# 2. ANALYSE SECTEUR ${formData.sector.toUpperCase()}
## Tendances actuelles et futures
- Innovation technologique
- Évolutions réglementaires
- Opportunités de croissance

## Opportunités spécifiques pour ${formData.position}
- Nouveaux marchés
- Partenariats stratégiques
- Avantages concurrentiels

# 3. PROFIL PROFESSIONNEL ${formData.position.toUpperCase()}
## Compétences actuelles évaluées
- Leadership et management
- Expertise technique
- Vision stratégique

## Forces et axes d'amélioration
- Points forts identifiés
- Domaines de développement
- Recommandations d'amélioration

# 4. PRÉDICTIONS STRATÉGIQUES 2025-2027
## 2025 : Opportunités immédiates
- Tendances émergentes
- Actions à court terme
- ROI attendu

## 2026 : Évolutions technologiques
- Innovations disruptives
- Adaptation nécessaire
- Investissements recommandés

## 2027 : Leadership et impact
- Position de marché
- Influence sectorielle
- Legacy professionnel

# 5. PLAN D'ACTION STRATÉGIQUE
## 6 mois : Actions prioritaires
1. Formation et certification
2. Réseautage professionnel
3. Projets pilotes

## 18 mois : Développement compétences
1. Leadership avancé
2. Innovation technologique
3. Expansion marché

## 36 mois : Objectifs long terme
1. Position d'expert reconnu
2. Influence sectorielle
3. Impact organisationnel

# 6. RECOMMANDATIONS PERSONNALISÉES
Basées sur : "${formData.ambitions}"

## KPIs de suivi
- Indicateurs de performance
- Métriques de succès
- Objectifs mesurables

## Prochaines étapes
- Actions immédiates
- Ressources nécessaires
- Timeline de mise en œuvre

IMPORTANT : Utilisez des données concrètes, des chiffres du marché, et personnalisez chaque section selon le profil ${formData.name} dans ${formData.sector}.`
            }
          ],
          max_tokens: 3000,
          temperature: 0.3,
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur API IA:', response.status, errorText);
        throw new Error(`Erreur API IA: ${response.status} - ${errorText}`);
      }

      const result: AIResponse = await response.json();
      const aiContent = result.choices[0]?.message?.content;
      
      if (!aiContent) {
        throw new Error('Contenu IA vide');
      }
      
      console.log('✅ Contenu IA généré avec succès');
      return aiContent;
      
    } catch (error) {
      console.error('❌ Erreur génération contenu IA:', error);
      // Retourner du contenu par défaut en cas d'erreur
      return this.generateFallbackContent(formData);
    }
  }

  private static generateFallbackContent(formData: FormData): string {
    return `# PORTRAIT PRÉDICTIF IA - ${formData.name}

## RÉSUMÉ EXÉCUTIF

Profil analysé : ${formData.name}
Secteur d'activité : ${formData.sector}
Poste actuel : ${formData.position}

### Synthèse Stratégique
Ce rapport présente une analyse approfondie du potentiel professionnel de ${formData.name} dans le secteur ${formData.sector}.

### Prédictions Clés 2025-2027
1. **2025** : Consolidation des compétences actuelles et identification de nouvelles opportunités
2. **2026** : Développement de l'expertise sectorielle et expansion du réseau professionnel  
3. **2027** : Positionnement en tant qu'expert reconnu avec influence sectorielle significative

## ANALYSE SECTEUR ${formData.sector.toUpperCase()}

### Tendances Actuelles
Le secteur ${formData.sector} connaît une transformation digitale accélérée avec :
- Innovation technologique constante
- Évolution des attentes client
- Nouveaux modèles économiques

### Opportunités Spécifiques
Pour un profil ${formData.position} :
- Leadership dans l'innovation
- Développement de solutions client
- Expansion vers de nouveaux marchés

## PROFIL PROFESSIONNEL

### Compétences Évaluées
- **Leadership** : Capacité à diriger et inspirer les équipes
- **Expertise Technique** : Maîtrise des outils et technologies sectorielles
- **Vision Stratégique** : Anticipation des tendances et opportunités

### Forces Identifiées
- Expérience solide dans ${formData.sector}
- Position de ${formData.position} avec responsabilités clés
- Vision claire : "${formData.ambitions}"

## PRÉDICTIONS STRATÉGIQUES 2025-2027

### 2025 : Opportunités Immédiates
- Renforcement des compétences core
- Développement du réseau professionnel
- Participation à des projets innovants

### 2026 : Évolutions Technologiques
- Intégration de l'IA dans les processus métier
- Adaptation aux nouvelles technologies
- Formation continue et certification

### 2027 : Leadership et Impact
- Position d'expert reconnu
- Influence sur les décisions sectorielles
- Contribution à l'innovation de l'industrie

## PLAN D'ACTION STRATÉGIQUE

### 6 Mois : Actions Prioritaires
1. **Formation** : Certification dans les technologies émergentes
2. **Réseautage** : Participation aux événements sectoriels clés
3. **Innovation** : Lancement d'un projet pilote

### 18 Mois : Développement Compétences
1. **Leadership Avancé** : Formation management et stratégie
2. **Expertise Technique** : Maîtrise des outils de pointe
3. **Vision Marché** : Analyse concurrentielle approfondie

### 36 Mois : Objectifs Long Terme
1. **Reconnaissance Sectorielle** : Expert référent reconnu
2. **Impact Organisationnel** : Influence sur la stratégie d'entreprise
3. **Innovation Continue** : Contribution aux évolutions du secteur

## RECOMMANDATIONS PERSONNALISÉES

### Basées sur vos ambitions
"${formData.ambitions}"

### Actions Recommandées
1. Développer votre expertise dans les technologies émergentes
2. Renforcer votre réseau professionnel sectoriel
3. Participer activement aux initiatives d'innovation
4. Cultiver votre personal branding et votre visibilité

### KPIs de Suivi
- Nombre de certifications obtenues
- Taille et qualité du réseau professionnel
- Projets innovants menés à bien
- Reconnaissance sectorielle (publications, conférences)

### Prochaines Étapes
1. **Immédiat** : Identifier 3 formations prioritaires
2. **30 jours** : Rejoindre 2 associations professionnelles
3. **90 jours** : Lancer votre premier projet d'innovation

## CONCLUSION

Votre profil ${formData.position} dans ${formData.sector} présente un potentiel exceptionnel. 
Avec une stratégie structurée et les bonnes actions, vous pouvez devenir un leader reconnu de votre secteur d'ici 2027.

---
*Rapport généré par Intelligence Artificielle - AI Portrait Pro*
*Confidential - Usage personnel uniquement*`;
  }

  private static createPdfFromContent(aiContent: string, formData: FormData): Blob {
    try {
      console.log('📄 Création du PDF avec design moderne...');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = 30;

      // Page de couverture moderne
      this.createCoverPage(pdf, formData, pageWidth, pageHeight);
      
      // Nouvelle page pour le contenu
      pdf.addPage();
      yPosition = 30;

      // En-tête de contenu
      this.createContentHeader(pdf, formData, pageWidth, margin, yPosition);
      yPosition += 40;

      // Traitement du contenu IA avec formatage moderne
      const formattedContent = this.formatAIContent(aiContent);
      this.addFormattedContent(pdf, formattedContent, pageWidth, margin, yPosition);

      // Pied de page sur toutes les pages
      this.addFooterToAllPages(pdf, formData);

      console.log('✅ PDF moderne créé avec succès');
      return pdf.output('blob');
      
    } catch (error) {
      console.error('❌ Erreur création PDF:', error);
      throw new Error('Impossible de créer le PDF');
    }
  }

  private static createCoverPage(pdf: jsPDF, formData: FormData, pageWidth: number, pageHeight: number) {
    // Arrière-plan dégradé simulé
    pdf.setFillColor(15, 23, 42); // slate-900
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Bande décorative en haut
    pdf.setFillColor(6, 182, 212); // cyan-500
    pdf.rect(0, 0, pageWidth, 30, 'F');
    
    // Titre principal
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(36);
    pdf.setFont('helvetica', 'bold');
    const titleY = 80;
    pdf.text('PORTRAIT', pageWidth/2, titleY, { align: 'center' });
    
    pdf.setFontSize(32);
    pdf.setTextColor(6, 182, 212);
    pdf.text('PRÉDICTIF IA', pageWidth/2, titleY + 15, { align: 'center' });
    
    // Sous-titre
    pdf.setFontSize(18);
    pdf.setTextColor(148, 163, 184);
    pdf.text('Analyse Stratégique IA Personnalisée', pageWidth/2, 115, { align: 'center' });
    
    // Informations client dans un cadre moderne
    const boxY = 140;
    pdf.setFillColor(30, 41, 59); // slate-800
    pdf.roundedRect(30, boxY, pageWidth - 60, 80, 10, 10, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROFIL CLIENT', pageWidth/2, boxY + 15, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(203, 213, 225); // slate-300
    let infoY = boxY + 30;
    pdf.text(`👤 ${formData.name}`, 40, infoY);
    infoY += 8;
    pdf.text(`🏢 ${formData.sector}`, 40, infoY);
    infoY += 8;
    pdf.text(`💼 ${formData.position}`, 40, infoY);
    infoY += 8;
    pdf.text(`🎯 ${formData.ambitions.substring(0, 50)}...`, 40, infoY);
    
    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth/2, 250, { align: 'center' });
    pdf.text('Powered by IA', pageWidth/2, 260, { align: 'center' });
    
    // Logo/Badge IA
    pdf.setFillColor(6, 182, 212);
    pdf.circle(pageWidth/2, 280, 15, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('IA', pageWidth/2, 285, { align: 'center' });
  }

  private static createContentHeader(pdf: jsPDF, formData: FormData, pageWidth: number, margin: number, yPosition: number) {
    // En-tête de section
    pdf.setFillColor(6, 182, 212);
    pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 25, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ANALYSE PRÉDICTIVE IA', margin + 5, yPosition + 8);
    
    pdf.setFontSize(10);
    pdf.text(`Rapport personnalisé pour ${formData.name}`, margin + 5, yPosition + 16);
  }

  private static formatAIContent(content: string): Array<{type: string, content: string, level?: number}> {
    const lines = content.split('\n');
    const formatted = [];
    
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      
      // Détection des titres et sections
      if (line.match(/^#{1,6}\s/)) {
        const level = (line.match(/^#+/) || [''])[0].length;
        const title = line.replace(/^#+\s*/, '');
        formatted.push({type: 'heading', content: title, level});
      } else if (line.match(/^\*\s/) || line.match(/^-\s/) || line.match(/^\d+\.\s/)) {
        const cleanLine = line.replace(/^[\*\-\d+\.]\s*/, '');
        formatted.push({type: 'bullet', content: cleanLine});
      } else if (line.match(/^\|.*\|$/)) {
        // Ignorer les tableaux markdown pour une meilleure présentation
        continue;
      } else {
        formatted.push({type: 'paragraph', content: line});
      }
    }
    
    return formatted;
  }

  private static addFormattedContent(pdf: jsPDF, content: Array<{type: string, content: string, level?: number}>, pageWidth: number, margin: number, startY: number) {
    let yPosition = startY;
    const lineHeight = 6;
    const maxWidth = pageWidth - 2 * margin;
    
    for (const item of content) {
      // Vérifier si nouvelle page nécessaire
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 30;
      }
      
      switch (item.type) {
        case 'heading':
          yPosition += 10; // Espacement avant titre
          const fontSize = item.level === 1 ? 16 : item.level === 2 ? 14 : 12;
          pdf.setFontSize(fontSize);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(6, 182, 212); // cyan-500
          
          // Ligne décorative pour les titres principaux
          if (item.level === 1) {
            pdf.setDrawColor(6, 182, 212);
            pdf.setLineWidth(2);
            pdf.line(margin, yPosition - 2, margin + 50, yPosition - 2);
          }
          
          const titleLines = pdf.splitTextToSize(item.content, maxWidth);
          pdf.text(titleLines, margin, yPosition);
          yPosition += titleLines.length * (fontSize * 0.4) + 8;
          break;
          
        case 'bullet':
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(51, 65, 85); // slate-700
          
          // Puce colorée
          pdf.setFillColor(6, 182, 212);
          pdf.circle(margin + 3, yPosition - 2, 1, 'F');
          
          const bulletLines = pdf.splitTextToSize(item.content, maxWidth - 10);
          pdf.text(bulletLines, margin + 8, yPosition);
          yPosition += bulletLines.length * lineHeight + 3;
          break;
          
        case 'paragraph':
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(51, 65, 85);
          
          const paragraphLines = pdf.splitTextToSize(item.content, maxWidth);
          pdf.text(paragraphLines, margin, yPosition);
          yPosition += paragraphLines.length * lineHeight + 5;
          break;
      }
    }
  }

  private static addFooterToAllPages(pdf: jsPDF, formData: FormData) {
    const totalPages = pdf.getNumberOfPages();
    
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      
      // Ligne décorative
      pdf.setDrawColor(6, 182, 212);
      pdf.setLineWidth(0.5);
      pdf.line(20, 280, 190, 280);
      
      // Texte du pied de page
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      pdf.text('AI Portrait Pro - Powered by IA', 20, 285);
      pdf.text(`Page ${i}/${totalPages}`, 190, 285, { align: 'right' });
      pdf.text(`© ${new Date().getFullYear()} - Rapport confidentiel généré pour ${formData.name}`, 105, 290, { align: 'center' });
    }
  }

  static async generatePdf(formData: FormData): Promise<PdfGenerationResponse> {
    try {
      console.log('🚀 Démarrage génération PDF IA...');
      
      // Étape 1: Génération contenu IA
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
