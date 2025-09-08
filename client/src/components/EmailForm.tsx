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
      navigator.clipboard.writeText(data.html).then(() => {
        toast({
          title: "HTML copied to clipboard!",
          description: "Email HTML has been copied to your clipboard",
        });
      }).catch(() => {
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
      {/* Input Fields Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name Input */}
        <div>
          <Label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
            Company Name
          </Label>
          <Input
            id="companyName"
            type="text"
            placeholder="Demo Company"
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
          <Label htmlFor="recipientEmail" className="block text-sm font-medium text-foreground mb-2">
            Recipient Email
          </Label>
          <Input
            id="recipientEmail"
            type="email"
            placeholder="nkemkaomeiza@gmail.com"
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
