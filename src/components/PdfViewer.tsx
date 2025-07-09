
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, Mail, X, FileText, Eye } from "lucide-react";
import { EmailService } from "@/services/EmailService";
import { useToast } from "@/hooks/use-toast";

interface PdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfContent: string;
  downloadUrl: string;
  userEmail: string;
  userName: string;
}

const PdfViewer = ({ isOpen, onClose, pdfContent, downloadUrl, userEmail, userName }: PdfViewerProps) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    // Create a proper PDF blob
    const pdfBlob = new Blob([pdfContent], { 
      type: 'application/pdf' 
    });
    
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Portrait-Predictif-${userName.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "📥 Téléchargement démarré",
      description: "Votre rapport PDF professionnel est en cours de téléchargement...",
    });
  };

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    try {
      const result = await EmailService.sendPdfReport({
        to: userEmail,
        subject: `Votre Portrait Prédictif IA - ${userName}`,
        content: `Bonjour ${userName},\n\nVeuillez trouver ci-joint votre Portrait Prédictif IA personnalisé généré par Deepseek v3.\n\nCe rapport contient une analyse approfondie de votre profil professionnel et des recommandations stratégiques personnalisées.\n\nCordialement,\nL'équipe AI Portrait Pro`,
        pdfContent: pdfContent,
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
        description: "Impossible d'envoyer l'email. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 border border-white/20 shadow-2xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-white/10">
          <DialogTitle className="text-3xl font-bold text-white flex items-center">
            <FileText className="w-8 h-8 mr-3 text-cyan-400" />
            Portrait Prédictif IA
            <span className="ml-3 text-xl text-cyan-300">• {userName}</span>
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10 rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="flex flex-col space-y-6">
          {/* Modern Actions Bar */}
          <div className="flex flex-wrap gap-4 p-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger PDF
            </Button>
            
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              {isSendingEmail ? 'Envoi en cours...' : 'Envoyer par email'}
            </Button>
            
            <div className="flex items-center text-slate-300 text-sm bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              <Eye className="w-4 h-4 mr-2 text-cyan-400" />
              Rapport professionnel généré par IA
            </div>
          </div>

          {/* Enhanced PDF Content Viewer */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <FileText className="w-5 h-5 mr-2 text-cyan-400" />
                Prévisualisation du rapport
              </h3>
            </div>
            <div className="p-6 max-h-[50vh] overflow-y-auto scrollbar-thin">
              <pre className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-mono bg-slate-900/30 p-6 rounded-xl border border-white/10">
                {pdfContent}
              </pre>
            </div>
          </div>

          {/* Professional Footer */}
          <div className="text-center py-4">
            <div className="text-slate-400 text-sm mb-2">
              Rapport généré par <span className="text-cyan-400 font-semibold">AI Portrait Pro</span>
            </div>
            <div className="text-slate-500 text-xs">
              Powered by Deepseek v3 • Analyse prédictive professionnelle
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;
