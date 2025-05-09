
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import DraggableMessages from "@/components/messages/DraggableMessages";
import TicketSummary from "@/components/tickets/TicketSummary";

const Index = () => {
  const [clientMessage, setClientMessage] = useState("");
  const [analysis, setAnalysis] = useState<{
    sentiment: "positive" | "neutral" | "negative" | null;
    escalationRisk: "low" | "medium" | "high" | null;
    suggestedTone: string | null;
    suggestedResponse: string | null;
  }>({
    sentiment: null,
    escalationRisk: null,
    suggestedTone: null,
    suggestedResponse: null
  });

  const [ticketSummary, setTicketSummary] = useState<{
    issue: string;
    urgency: "low" | "medium" | "high";
    assignee: string;
  } | null>(null);

  // Handle drop of draggable messages
  const handleMessageDrop = (message: string) => {
    setClientMessage(message);
  };

  const analyzeMessage = () => {
    if (!clientMessage.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a client message to analyze",
        variant: "destructive"
      });
      return;
    }

    // Simple sentiment analysis logic - in a real app, this would use NLP or an API
    let sentiment: "positive" | "neutral" | "negative";
    let escalationRisk: "low" | "medium" | "high";
    let suggestedTone: string;
    let suggestedResponse: string;

    const message = clientMessage.toLowerCase();
    
    // Analyze sentiment
    if (message.match(/love|great|amazing|excellent|thank|happy|pleased|impressed/g)) {
      sentiment = "positive";
    } else if (message.match(/hate|terrible|awful|angry|frustrated|disappointing|worst|refund|cancel/g)) {
      sentiment = "negative";
    } else {
      sentiment = "neutral";
    }
    
    // Analyze escalation risk
    if (message.match(/urgent|immediately|manager|supervisor|escalate|lawsuit|legal|attorney|refund|cancel subscription/g)) {
      escalationRisk = "high";
    } else if (message.match(/disappointed|not working|problem|issue|bug|error|not happy|fix|waiting/g)) {
      escalationRisk = "medium";
    } else {
      escalationRisk = "low";
    }
    
    // Generate suggested tone based on analysis
    if (sentiment === "positive") {
      suggestedTone = "Appreciative and friendly";
    } else if (sentiment === "negative" && escalationRisk === "high") {
      suggestedTone = "Empathetic, urgent, and solution-focused";
    } else if (sentiment === "negative") {
      suggestedTone = "Empathetic and solution-focused";
    } else if (escalationRisk === "medium") {
      suggestedTone = "Helpful and proactive";
    } else {
      suggestedTone = "Professional and informative";
    }
    
    // Generate a suggested response template
    if (sentiment === "positive") {
      suggestedResponse = "Thank you for your kind words! We're delighted to hear about your positive experience. Is there anything else we can assist you with today?";
    } else if (sentiment === "negative" && escalationRisk === "high") {
      suggestedResponse = "I sincerely apologize for the frustration this has caused. I understand this is urgent, and I'm escalating this to our senior team right away. In the meantime, could you please provide more details so we can resolve this as quickly as possible?";
    } else if (sentiment === "negative") {
      suggestedResponse = "I apologize for the inconvenience you're experiencing. I'm here to help resolve this situation. Could you please provide more details about the issue so I can assist you better?";
    } else if (escalationRisk === "medium") {
      suggestedResponse = "Thank you for bringing this to our attention. I understand you're facing an issue with our service. Let's work together to resolve this promptly. Could you share more specific details?";
    } else {
      suggestedResponse = "Thank you for reaching out to us. I'd be happy to assist you with your inquiry. Could you please provide more information so I can better address your needs?";
    }

    setAnalysis({
      sentiment,
      escalationRisk,
      suggestedTone,
      suggestedResponse
    });

    // Generate ticket summary
    let issue = "Customer inquiry";
    let urgency: "low" | "medium" | "high" = "low";
    let assignee = "Support agent";

    if (sentiment === "negative" && escalationRisk === "high") {
      issue = "Urgent customer complaint";
      urgency = "high";
      assignee = "Senior Support Specialist";
    } else if (sentiment === "negative") {
      issue = "Customer complaint";
      urgency = "medium";
      assignee = "Support agent";
    } else if (message.match(/bug|error|crash|not working|technical|issue|broken/g)) {
      issue = "Technical issue report";
      urgency = escalationRisk === "high" ? "high" : "medium";
      assignee = "Developer";
    } else if (message.match(/account|login|password|access|permission|security/g)) {
      issue = "Account access issue";
      urgency = escalationRisk === "high" ? "high" : "medium";
      assignee = "Security team";
    } else if (message.match(/billing|charge|payment|invoice|subscription|refund/g)) {
      issue = "Billing inquiry";
      urgency = escalationRisk === "high" ? "high" : "medium";
      assignee = "Billing team";
    }

    setTicketSummary({
      issue,
      urgency,
      assignee
    });

    toast({
      title: "Analysis complete",
      description: "Client message has been analyzed",
    });
  };

  const getSentimentColor = (sentiment: string | null) => {
    if (sentiment === "positive") return "bg-green-100 text-green-800";
    if (sentiment === "negative") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const getEscalationColor = (risk: string | null) => {
    if (risk === "high") return "bg-red-100 text-red-800";
    if (risk === "medium") return "bg-amber-100 text-amber-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - 1/3 width - Draggable Messages */}
          <div className="md:w-1/3">
            <DraggableMessages onDrop={handleMessageDrop} />
          </div>
          
          {/* Right column - 2/3 width - Client Sentiment Decoder and Ticket Summary */}
          <div className="md:w-2/3">
            {/* Client Sentiment Decoder */}
            <Card className="mb-6 border-t-4 border-t-purple-500 bg-gradient-to-br from-white to-purple-50 shadow-md">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600">
                  Client Sentiment Decoder
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Analyze client messages to understand sentiment and determine appropriate response strategies
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <label htmlFor="client-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Client Message
                  </label>
                  <Textarea
                    id="client-message"
                    placeholder="Enter or paste client message here... ✍️ 💬"
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    className="min-h-[120px] border-2 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                    onDrop={(e) => {
                      e.preventDefault();
                      const data = e.dataTransfer.getData("text/plain");
                      if (data) setClientMessage(data);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  />
                </div>
                
                <Button 
                  onClick={analyzeMessage} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Analyze Message
                </Button>
                
                {analysis.sentiment && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-purple-100 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Sentiment:</p>
                        <Badge className={`${getSentimentColor(analysis.sentiment)} capitalize`}>
                          {analysis.sentiment}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Escalation Risk:</p>
                        <Badge className={`${getEscalationColor(analysis.escalationRisk)} capitalize`}>
                          {analysis.escalationRisk}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Suggested Tone:</p>
                      <p className="text-sm bg-blue-50 border border-blue-100 rounded p-2 text-blue-800">
                        {analysis.suggestedTone}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">How would you answer this politely yet firmly?</p>
                      <div className="bg-white border rounded p-3 text-sm text-gray-800">
                        {analysis.suggestedResponse}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="bg-gray-50 border-t text-xs text-gray-500 justify-center">
                This analysis is a guideline only. Always use your best judgment when responding to clients.
              </CardFooter>
            </Card>

            {/* Ticket Summary Generator */}
            {analysis.sentiment && ticketSummary && (
              <TicketSummary 
                issue={ticketSummary.issue}
                urgency={ticketSummary.urgency}
                assignee={ticketSummary.assignee}
                clientMessage={clientMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
