
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, Mail, X, FileText, Eye, Sparkles, Clock } from "lucide-react";
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
  useState(() => {
    if (pdfBlob) {
      const previewUrl = URL.createObjectURL(pdfBlob);
      setPdfPreviewUrl(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [pdfBlob]);

  const handleDownload = () => {
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
      link.download = `Portrait-Predictif-${userName.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "🎉 Téléchargement réussi !",
        description: "Votre Portrait Prédictif IA a été téléchargé avec succès",
      });
    } catch (error) {
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

Généré par Deepseek v3 - Intelligence Artificielle de pointe

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0 bg-gradient-to-br from-slate-50 to-white border-0 shadow-2xl">
        <DialogHeader className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            Portrait Prédictif IA
            <span className="text-cyan-100 text-lg font-normal">• {userName}</span>
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:bg-white/20 rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Actions Bar Moderne */}
          <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-white border-b">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4">
                <Button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger PDF
                </Button>
                
                <Button
                  onClick={handleSendEmail}
                  disabled={isSendingEmail}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {isSendingEmail ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    'Envoyer par email'
                  )}
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-slate-600 text-sm bg-slate-100 px-4 py-2 rounded-xl">
                <Eye className="w-4 h-4 text-cyan-500" />
                Rapport IA professionnel
              </div>
            </div>
          </div>

          {/* Prévisualisation PDF Moderne */}
          <div className="flex-1 p-8">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden h-full">
              <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-6 py-4 border-b flex items-center gap-3">
                <FileText className="w-5 h-5 text-cyan-500" />
                <h3 className="font-semibold text-slate-800">Prévisualisation du rapport</h3>
                <div className="ml-auto text-xs text-slate-500 bg-white px-3 py-1 rounded-full">
                  PDF • Généré par IA
                </div>
              </div>
              
              <div className="h-[60vh] w-full">
                {pdfPreviewUrl ? (
                  <iframe
                    src={pdfPreviewUrl}
                    className="w-full h-full border-0"
                    title="Prévisualisation PDF"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-slate-50">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Prévisualisation en cours de chargement...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Professionnel */}
          <div className="px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-center">
            <div className="text-slate-300 text-sm mb-1">
              Rapport généré par <span className="text-cyan-400 font-semibold">AI Portrait Pro</span>
            </div>
            <div className="text-slate-500 text-xs">
              Powered by Deepseek v3 • Intelligence Artificielle Avancée
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;
