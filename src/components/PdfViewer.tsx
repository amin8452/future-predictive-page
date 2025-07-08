
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
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `Portrait-Predictif-${userName.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "📥 Téléchargement démarré",
      description: "Votre rapport PDF est en cours de téléchargement...",
    });
  };

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    try {
      const result = await EmailService.sendPdfReport({
        to: userEmail,
        subject: `Votre Portrait Prédictif IA - ${userName}`,
        content: `Bonjour ${userName},\n\nVeuillez trouver ci-joint votre Portrait Prédictif IA personnalisé.\n\nCordialement,\nL'équipe AI Portrait Pro`,
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
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 border border-white/20">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <FileText className="w-6 h-6 mr-2 text-cyan-400" />
            Portrait Prédictif IA - {userName}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          {/* Actions Bar */}
          <div className="flex flex-wrap gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger PDF
            </Button>
            
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              <Mail className="w-4 h-4 mr-2" />
              {isSendingEmail ? 'Envoi...' : 'Envoyer par email'}
            </Button>
            
            <div className="flex items-center text-slate-300 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              Prévisualisation du rapport
            </div>
          </div>

          {/* PDF Content Viewer */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-h-[60vh] overflow-y-auto">
            <pre className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-mono">
              {pdfContent}
            </pre>
          </div>

          {/* Footer Info */}
          <div className="text-center text-slate-400 text-xs p-2">
            Rapport généré par AI Portrait Pro • Powered by Deepseek v3
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;
