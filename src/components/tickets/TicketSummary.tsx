
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Copy } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface TicketSummaryProps {
  issue: string;
  urgency: "low" | "medium" | "high";
  assignee: string;
  clientMessage: string;
}

const TicketSummary = ({ issue, urgency, assignee, clientMessage }: TicketSummaryProps) => {
  const [copied, setCopied] = useState(false);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const generateTicketContent = () => {
    // Extract first sentence or up to 150 chars from client message
    const shortDescription = clientMessage.split('.')[0].substring(0, 150) + (clientMessage.length > 150 ? '...' : '');
    
    return `ISSUE: ${issue}
URGENCY: ${urgency.toUpperCase()}
ASSIGNEE: ${assignee}

Description: ${shortDescription}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateTicketContent()).then(() => {
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Ticket summary has been copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive"
      });
    });
  };

  return (
    <Card className="border-t-4 border-t-blue-500 bg-gradient-to-br from-white to-blue-50 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-700 flex justify-between items-center">
          <span>Ticket Summary</span>
          <Button
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 border-blue-200 hover:border-blue-400"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Key Issue:</p>
            <p className="font-medium text-blue-800">{issue}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Urgency:</p>
            <Badge className={`${getUrgencyColor(urgency)} capitalize`}>
              {urgency}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Suggested Assignee:</p>
            <p className="text-gray-800">{assignee}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Generated Ticket Summary:</p>
          <div className="bg-gray-50 border rounded-md p-3 font-mono text-sm whitespace-pre-line">
            {generateTicketContent()}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This summary can be copied and pasted into your ticketing system or sent via API integration.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketSummary;
