
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Send, User, AtSign, FileText, X } from "lucide-react";
import { EmailService } from "@/services/EmailService";
import { useToast } from "@/hooks/use-toast";

interface EmailViewProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
  defaultName?: string;
  pdfContent?: string;
}

const EmailView = ({ isOpen, onClose, defaultEmail = "", defaultName = "", pdfContent = "" }: EmailViewProps) => {
  const [formData, setFormData] = useState({
    email: defaultEmail,
    name: defaultName,
    subject: "Votre Portrait Prédictif IA",
    message: `Bonjour,

Veuillez trouver ci-joint votre Portrait Prédictif IA personnalisé généré par notre intelligence artificielle Deepseek v3.

Ce rapport contient :
- Une analyse approfondie de votre profil professionnel
- Des prédictions pour les 3 prochaines années
- Des recommandations stratégiques personnalisées
- Un plan d'action concret

Cordialement,
L'équipe AI Portrait Pro`
  });
  
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendEmail = async () => {
    if (!formData.email || !formData.name) {
      toast({
        title: "❌ Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const result = await EmailService.sendPdfReport({
        to: formData.email,
        subject: formData.subject,
        content: formData.message,
        pdfContent: pdfContent,
        senderName: formData.name
      });

      if (result.success) {
        toast({
          title: "📧 Email envoyé avec succès !",
          description: `Le rapport a été envoyé à ${formData.email}`,
        });
        onClose();
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
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 border border-white/20">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <Mail className="w-6 h-6 mr-2 text-cyan-400" />
            Envoyer le rapport par email
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

        <div className="space-y-6">
          {/* Recipient Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white flex items-center">
                <User className="w-4 h-4 mr-1 text-cyan-400" />
                Nom du destinataire *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Jean Dupont"
                className="bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white flex items-center">
                <AtSign className="w-4 h-4 mr-1 text-cyan-400" />
                Email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="jean.dupont@entreprise.com"
                className="bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white flex items-center">
              <FileText className="w-4 h-4 mr-1 text-cyan-400" />
              Sujet
            </label>
            <Input
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              className="bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">
              Message
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={8}
              className="bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-cyan-400"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <div className="text-slate-400 text-sm">
              Le rapport PDF sera joint automatiquement
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Annuler
              </Button>
              
              <Button
                onClick={handleSendEmail}
                disabled={isSending}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSending ? 'Envoi...' : 'Envoyer'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailView;
