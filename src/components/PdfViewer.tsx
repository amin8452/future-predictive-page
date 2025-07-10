
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, Mail, X, FileText, Eye, Sparkles, Clock, Star, Zap, Award } from "lucide-react";
import { EmailService } from "@/services/EmailService";
import { useToast } from "@/hooks/use-toast";

interface PdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfBlob?: Blob;
  downloadUrl: string;
  userEmail: string;
  userName: string;
}

const PdfViewer = ({ isOpen, onClose, pdfBlob, downloadUrl, userEmail, userName }: PdfViewerProps) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string>('');
  const { toast } = useToast();

  // Créer URL de prévisualisation quand le PDF blob est disponible
  useEffect(() => {
    console.log('PdfViewer - pdfBlob:', pdfBlob); // Debug log
    if (pdfBlob) {
      const previewUrl = URL.createObjectURL(pdfBlob);
      console.log('PdfViewer - previewUrl créée:', previewUrl); // Debug log
      setPdfPreviewUrl(previewUrl);
      return () => {
        console.log('PdfViewer - nettoyage URL'); // Debug log
        URL.revokeObjectURL(previewUrl);
      };
    }
  }, [pdfBlob]);

  const handleDownload = () => {
    console.log('Tentative de téléchargement - pdfBlob:', pdfBlob); // Debug log
    
    if (!pdfBlob) {
      toast({
        title: "❌ Erreur",
        description: "PDF non disponible pour le téléchargement",
        variant: "destructive",
      });
      return;
    }

    try {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Portrait-Predictif-IA-${userName.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "🎉 Téléchargement réussi !",
        description: "Votre Portrait Prédictif IA a été téléchargé avec succès",
      });
    } catch (error) {
      console.error('Erreur téléchargement:', error); // Debug log
      toast({
        title: "❌ Erreur de téléchargement",
        description: "Impossible de télécharger le PDF",
        variant: "destructive",
      });
    }
  };

  const handleSendEmail = async () => {
    if (!pdfBlob) return;
    
    setIsSendingEmail(true);
    try {
      const result = await EmailService.sendPdfReport({
        to: userEmail,
        subject: `🤖 Votre Portrait Prédictif IA - ${userName}`,
        content: `Bonjour ${userName},

Votre Portrait Prédictif IA personnalisé a été généré avec succès !

Ce rapport contient :
✅ Analyse approfondie de votre profil professionnel
✅ Prédictions stratégiques pour 2025-2027
✅ Recommandations personnalisées
✅ Plan d'action concret

Généré par Intelligence Artificielle de pointe

Cordialement,
L'équipe AI Portrait Pro`,
        pdfContent: await pdfBlobToBase64(pdfBlob),
        senderName: userName
      });

      if (result.success) {
        toast({
          title: "📧 Email envoyé !",
          description: `Votre rapport a été envoyé à ${userEmail}`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "❌ Erreur d'envoi",
        description: "Impossible d'envoyer l'email. Réessayez plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const pdfBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  console.log('PdfViewer render - isOpen:', isOpen, 'pdfPreviewUrl:', pdfPreviewUrl); // Debug log

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 section-background border-0 shadow-2xl">
        {/* Header avec design moderne */}
        <DialogHeader className="relative px-8 py-8 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 glass-card rounded-2xl">
                <Sparkles className="w-8 h-8 text-cyan-200" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-bold gradient-text-primary">
                  Portrait Prédictif IA
                </DialogTitle>
                <p className="text-cyan-100 text-lg mt-1">
                  Rapport personnalisé pour {userName}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="glass-button text-white hover:bg-white/20 rounded-full p-3"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          
          {/* Indicateurs de qualité */}
          <div className="relative z-10 flex items-center space-x-6 mt-6">
            <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-xl">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm text-cyan-100">IA Avancée</span>
            </div>
            <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-xl">
              <Zap className="w-4 h-4 text-green-300" />
              <span className="text-sm text-cyan-100">AI v3</span>
            </div>
            <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-xl">
              <Award className="w-4 h-4 text-purple-300" />
              <span className="text-sm text-cyan-100">Professionnel</span>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-full bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950">
          {/* Barre d'actions moderne */}
          <div className="px-8 py-6 border-b border-white/10">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4">
                <Button
                  onClick={handleDownload}
                  className="btn-primary px-8 py-3 text-lg font-bold shadow-xl"
                >
                  <Download className="w-5 h-5 mr-3" />
                  Télécharger PDF
                </Button>
                
                <Button
                  onClick={handleSendEmail}
                  disabled={isSendingEmail}
                  className="btn-secondary px-8 py-3 text-lg font-bold shadow-xl"
                >
                  {isSendingEmail ? (
                    <>
                      <Clock className="w-5 h-5 mr-3 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-3" />
                      Envoyer par email
                    </>
                  )}
                </Button>
              </div>
              
              <div className="glass-card px-6 py-3 rounded-xl">
                <div className="flex items-center gap-3 text-cyan-400">
                  <Eye className="w-5 h-5" />
                  <span className="text-white font-semibold">Rapport IA Premium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Zone de prévisualisation moderne */}
          <div className="flex-1 p-8">
            <div className="glass-card rounded-3xl overflow-hidden h-full border border-white/20 shadow-2xl">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-cyan-500/20 rounded-xl">
                      <FileText className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Prévisualisation du rapport</h3>
                      <p className="text-slate-300 text-sm">Généré par intelligence artificielle</p>
                    </div>
                  </div>
                  <div className="glass-card px-4 py-2 rounded-xl">
                    <span className="text-cyan-400 text-sm font-semibold">PDF • Premium</span>
                  </div>
                </div>
              </div>
              
              <div className="h-[65vh] w-full bg-white/5">
                {pdfPreviewUrl ? (
                  <iframe
                    src={pdfPreviewUrl}
                    className="w-full h-full border-0 rounded-b-3xl"
                    title="Prévisualisation PDF"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center animate-pulse">
                      <div className="p-6 glass-card rounded-3xl mb-6 inline-block">
                        <FileText className="w-16 h-16 text-cyan-400 mx-auto" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Chargement en cours...</h4>
                      <p className="text-slate-400">Préparation de votre rapport IA</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer premium */}
          <div className="px-8 py-6 bg-gradient-to-r from-slate-900 via-indigo-900/50 to-slate-900 border-t border-white/10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-cyan-400 text-lg font-bold mb-2">
                <Sparkles className="w-5 h-5" />
                AI Portrait Pro
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-slate-400 text-sm">
                Powered by AI • Intelligence Artificielle de Nouvelle Génération
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;
