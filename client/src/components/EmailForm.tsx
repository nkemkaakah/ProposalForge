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
  bannerImageUrl: z.string().url().optional().or(z.literal("")),
  chartImageUrl: z.string().url().optional().or(z.literal("")),
  dateRange: z.string().optional().or(z.literal("")),
  totalTickets: z.string().optional().or(z.literal("")),
  qaScore: z.string().optional().or(z.literal("")),
  totalInteractions: z.string().optional().or(z.literal("")),
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
      bannerImageUrl: "",
      chartImageUrl: "",
      dateRange: "September 1, 2025 - September 7, 2025",
      totalTickets: "928",
      qaScore: "95",
      totalInteractions: "5387",
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

        {/* Data Customization Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Range */}
          <div>
            <Label htmlFor="dateRange" className="block text-sm font-medium text-foreground mb-2">
              Report Date Range <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Input
              id="dateRange"
              type="text"
              placeholder="September 1, 2025 - September 7, 2025"
              {...form.register("dateRange")}
              data-testid="input-date-range"
              className="w-full"
            />
          </div>

          {/* Total Tickets */}
          <div>
            <Label htmlFor="totalTickets" className="block text-sm font-medium text-foreground mb-2">
              Total Tickets <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Input
              id="totalTickets"
              type="text"
              placeholder="928"
              {...form.register("totalTickets")}
              data-testid="input-total-tickets"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QA Score */}
          <div>
            <Label htmlFor="qaScore" className="block text-sm font-medium text-foreground mb-2">
              QA Score <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Input
              id="qaScore"
              type="text"
              placeholder="95"
              {...form.register("qaScore")}
              data-testid="input-qa-score"
              className="w-full"
            />
          </div>

          {/* Total Interactions */}
          <div>
            <Label htmlFor="totalInteractions" className="block text-sm font-medium text-foreground mb-2">
              Total Interactions <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Input
              id="totalInteractions"
              type="text"
              placeholder="5387"
              {...form.register("totalInteractions")}
              data-testid="input-total-interactions"
              className="w-full"
            />
          </div>
        </div>

        {/* Optional Image Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner Image URL */}
          <div>
            <Label
              htmlFor="bannerImageUrl"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Banner Image URL{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Input
              id="bannerImageUrl"
              type="url"
              placeholder="Enter Banner Image URL"
              {...form.register("bannerImageUrl")}
              data-testid="input-banner-image"
              className="w-full"
            />
            {form.formState.errors.bannerImageUrl && (
              <p className="text-destructive text-sm mt-1">
                {form.formState.errors.bannerImageUrl.message}
              </p>
            )}
          </div>

          {/* Chart Image URL */}
          <div>
            <Label
              htmlFor="chartImageUrl"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Chart Image URL{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Input
              id="chartImageUrl"
              type="url"
              placeholder="Enter Chart Image URL"
              {...form.register("chartImageUrl")}
              data-testid="input-chart-image"
              className="w-full"
            />
            {form.formState.errors.chartImageUrl && (
              <p className="text-destructive text-sm mt-1">
                {form.formState.errors.chartImageUrl.message}
              </p>
            )}
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
