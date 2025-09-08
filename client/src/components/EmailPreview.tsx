import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DemoDigestEmail from "./DemoDigestEmail";

interface EmailPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  bannerImageUrl?: string;
  chartImageUrl?: string;
}

export default function EmailPreview({ isOpen, onClose, companyName, bannerImageUrl, chartImageUrl }: EmailPreviewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden" data-testid="modal-email-preview">
        <DialogHeader>
          <DialogTitle>Email Preview</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          <div className="border border-border rounded-lg p-6 bg-gray-50">
            <DemoDigestEmail 
              companyName={companyName || "Demo Company"} 
              bannerImageUrl={bannerImageUrl}
              chartImageUrl={chartImageUrl}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
