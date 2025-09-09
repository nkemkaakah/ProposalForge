import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DemoDigestEmail from "@shared/email/DemoDigestEmail";

interface EmailPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  customerName1?: string;
  customerName2?: string;
  customerName3?: string;
  bannerImageUrl?: string;
  chartImageUrl?: string;
  logoImageUrl?: string;
  complaintChartUrl?: string;
  metricsImageUrl?: string;
  scorecardImageUrl?: string;
  serviceIssuesImageUrl?: string;
}

export default function EmailPreview({ 
  isOpen, 
  onClose, 
  companyName, 
  customerName1,
  customerName2,
  customerName3,
  bannerImageUrl, 
  chartImageUrl,
  logoImageUrl,
  complaintChartUrl,
  metricsImageUrl,
  scorecardImageUrl,
  serviceIssuesImageUrl
}: EmailPreviewProps) {
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
              customerName1={customerName1}
              customerName2={customerName2}
              customerName3={customerName3}
              bannerImageUrl={bannerImageUrl}
              chartImageUrl={chartImageUrl}
              logoImageUrl={logoImageUrl}
              complaintChartUrl={complaintChartUrl}
              metricsImageUrl={metricsImageUrl}
              scorecardImageUrl={scorecardImageUrl}
              serviceIssuesImageUrl={serviceIssuesImageUrl}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
