import { useState } from "react";
import EmailForm from "@/components/EmailForm";
import EmailPreview from "@/components/EmailPreview";
import RoleAccessControls from "@/components/RoleAccessControls";

export default function Home() {
  const [previewData, setPreviewData] = useState<{
    companyName: string;
    recipientEmail: string;
    bannerImageUrl?: string;
    chartImageUrl?: string;
  } | null>(null);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (data: { companyName: string; recipientEmail: string; bannerImageUrl?: string; chartImageUrl?: string }) => {
    setPreviewData(data);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Demo Email Sender
          </h1>
          <p className="text-muted-foreground text-sm">
            Send demo customer service reports to prospects with customizable company branding
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Email Form */}
        <div className="bg-white rounded-lg border border-border p-8 shadow-sm">
          <EmailForm onPreview={handlePreview} />
        </div>

      
      </main>

      {/* Email Preview Modal */}
      <EmailPreview
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        companyName={previewData?.companyName || ""}
        bannerImageUrl={previewData?.bannerImageUrl}
        chartImageUrl={previewData?.chartImageUrl}
      />
    </div>
  );
}
