import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  recipientEmail: z.string().email("Please enter a valid email address"),
  
  // Optional customer names for personalization
  customerName1: z.string().optional().or(z.literal('')),
  customerName2: z.string().optional().or(z.literal('')),
  customerName3: z.string().optional().or(z.literal('')),
  
  // Optional images - support both URLs and uploads
  bannerImageUrl: z.string().optional().or(z.literal('')),
  chartImageUrl: z.string().optional().or(z.literal('')),
  logoImageUrl: z.string().optional().or(z.literal('')),
  complaintChartUrl: z.string().optional().or(z.literal('')),
  metricsImageUrl: z.string().optional().or(z.literal('')),
  scorecardImageUrl: z.string().optional().or(z.literal('')),
  serviceIssuesImageUrl: z.string().optional().or(z.literal(''))
});

type FormData = z.infer<typeof formSchema>;

interface EmailFormProps {
  onPreview: (data: FormData) => void;
}

export default function EmailForm({ onPreview }: EmailFormProps) {
  const { toast } = useToast();
  const [isCopying, setIsCopying] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      recipientEmail: "",
      customerName1: "",
      customerName2: "", 
      customerName3: "",
      bannerImageUrl: "",
      chartImageUrl: "",
      logoImageUrl: "",
      complaintChartUrl: "",
      metricsImageUrl: "",
      scorecardImageUrl: "",
      serviceIssuesImageUrl: "",
    },
  });

  const sendEmailMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/send-email", data);
      return response.json();
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Email sent successfully!",
        description: `Demo email sent to ${variables.recipientEmail}`,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send email",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  const generateEmailMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/generate-email", data);
      return response.json();
    },
    onSuccess: (data) => {
      navigator.clipboard
        .writeText(data.html)
        .then(() => {
          toast({
            title: "HTML copied to clipboard!",
            description: "Email HTML has been copied to your clipboard",
          });
        })
        .catch(() => {
          toast({
            title: "Failed to copy",
            description: "Could not copy HTML to clipboard",
            variant: "destructive",
          });
        });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to generate HTML",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    sendEmailMutation.mutate(data);
  };

  const handlePreview = () => {
    const data = form.getValues();
    const validation = formSchema.safeParse(data);

    if (!validation.success) {
      validation.error.errors.forEach((error) => {
        form.setError(error.path[0] as keyof FormData, {
          message: error.message,
        });
      });
      return;
    }

    onPreview(data);
  };

  const handleCopyHTML = async () => {
    const data = form.getValues();
    const validation = formSchema.safeParse(data);

    if (!validation.success) {
      validation.error.errors.forEach((error) => {
        form.setError(error.path[0] as keyof FormData, {
          message: error.message,
        });
      });
      return;
    }

    setIsCopying(true);
    generateEmailMutation.mutate(data);
    setIsCopying(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Input Fields */}
      <div className="space-y-6">
        {/* Required Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name Input */}
          <div>
            <Label
              htmlFor="companyName"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Enter Company Name"
              {...form.register("companyName")}
              data-testid="input-company-name"
              className="w-full"
            />
            {form.formState.errors.companyName && (
              <p className="text-destructive text-sm mt-1">
                {form.formState.errors.companyName.message}
              </p>
            )}
          </div>

          {/* Recipient Email Input */}
          <div>
            <Label
              htmlFor="recipientEmail"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Recipient Email
            </Label>
            <Input
              id="recipientEmail"
              type="email"
              placeholder="Enter Recipient Email"
              {...form.register("recipientEmail")}
              data-testid="input-recipient-email"
              className="w-full"
            />
            {form.formState.errors.recipientEmail && (
              <p className="text-destructive text-sm mt-1">
                {form.formState.errors.recipientEmail.message}
              </p>
            )}
          </div>
        </div>

        {/* Customer Names for Personalization */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Customer Names (Optional)</h3>
          <p className="text-sm text-muted-foreground">Add customer names to personalize the email stories</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="customerName1" className="block text-sm font-medium text-foreground mb-2">
                Customer 1 Name
              </Label>
              <Input
                id="customerName1"
                type="text"
                placeholder="Alex Johnson"
                {...form.register("customerName1")}
                data-testid="input-customer-name-1"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="customerName2" className="block text-sm font-medium text-foreground mb-2">
                Customer 2 Name
              </Label>
              <Input
                id="customerName2"
                type="text"
                placeholder="Sarah Mitchell"
                {...form.register("customerName2")}
                data-testid="input-customer-name-2"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="customerName3" className="block text-sm font-medium text-foreground mb-2">
                Customer 3 Name
              </Label>
              <Input
                id="customerName3"
                type="text"
                placeholder="David Chen"
                {...form.register("customerName3")}
                data-testid="input-customer-name-3"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Images (Optional)</h3>
          <p className="text-sm text-muted-foreground">Add images to customize your email. Paste URLs or upload files.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Banner/Header Image */}
            <div>
              <Label htmlFor="bannerImageUrl" className="block text-sm font-medium text-foreground mb-2">
                Header/Banner Image
              </Label>
              <Input
                id="bannerImageUrl"
                type="url"
                placeholder="Paste image URL or upload"
                {...form.register("bannerImageUrl")}
                data-testid="input-banner-image"
                className="w-full"
              />
            </div>

            {/* Company Logo */}
            <div>
              <Label htmlFor="logoImageUrl" className="block text-sm font-medium text-foreground mb-2">
                Company Logo
              </Label>
              <Input
                id="logoImageUrl"
                type="url"
                placeholder="Paste logo URL or upload"
                {...form.register("logoImageUrl")}
                data-testid="input-logo-image"
                className="w-full"
              />
            </div>
            
            {/* Metrics Chart */}
            <div>
              <Label htmlFor="metricsImageUrl" className="block text-sm font-medium text-foreground mb-2">
                Metrics/Chart Image
              </Label>
              <Input
                id="metricsImageUrl"
                type="url"
                placeholder="Paste chart URL or upload"
                {...form.register("metricsImageUrl")}
                data-testid="input-metrics-image"
                className="w-full"
              />
            </div>
            
            {/* Chart Image URL */}
            <div>
              <Label htmlFor="chartImageUrl" className="block text-sm font-medium text-foreground mb-2">
                Additional Chart
              </Label>
              <Input
                id="chartImageUrl"
                type="url"
                placeholder="Paste chart URL or upload"
                {...form.register("chartImageUrl")}
                data-testid="input-chart-image"
                className="w-full"
              />
            </div>
            
            {/* Complaint Chart */}
            <div>
              <Label htmlFor="complaintChartUrl" className="block text-sm font-medium text-foreground mb-2">
                Complaints Breakdown Chart
              </Label>
              <Input
                id="complaintChartUrl"
                type="url"
                placeholder="Paste complaints chart URL or upload"
                {...form.register("complaintChartUrl")}
                data-testid="input-complaint-chart"
                className="w-full"
              />
            </div>
            
            {/* Scorecard Performance Image */}
            <div>
              <Label htmlFor="scorecardImageUrl" className="block text-sm font-medium text-foreground mb-2">
                Scorecard Performance Image
              </Label>
              <Input
                id="scorecardImageUrl"
                type="url"
                placeholder="Paste scorecard image URL or upload"
                {...form.register("scorecardImageUrl")}
                data-testid="input-scorecard-image"
                className="w-full"
              />
            </div>
            
            {/* Service Issues Image */}
            <div>
              <Label htmlFor="serviceIssuesImageUrl" className="block text-sm font-medium text-foreground mb-2">
                Service Issues Chart
              </Label>
              <Input
                id="serviceIssuesImageUrl"
                type="url"
                placeholder="Paste service issues chart URL or upload"
                {...form.register("serviceIssuesImageUrl")}
                data-testid="input-service-issues-image"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap gap-4 pt-4">
        {/* Preview Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handlePreview}
          data-testid="button-preview-email"
        >
          Preview Email
        </Button>

        {/* Send Button */}
        <Button
          type="submit"
          disabled={sendEmailMutation.isPending}
          data-testid="button-send-email"
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          {sendEmailMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Email"
          )}
        </Button>

        {/* Copy HTML Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleCopyHTML}
          disabled={generateEmailMutation.isPending || isCopying}
          data-testid="button-copy-html"
          className="text-muted-foreground"
        >
          {generateEmailMutation.isPending || isCopying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Copying...
            </>
          ) : (
            "Copy HTML"
          )}
        </Button>
      </div>
    </form>
  );
}
