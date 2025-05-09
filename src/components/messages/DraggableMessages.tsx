
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample technical issue messages
const sampleMessages = [
  {
    id: "msg1",
    text: "I'm unable to log in to my account. Every time I enter my credentials, I get an 'Invalid username or password' error even though I'm sure the information is correct. I've tried resetting my password twice with no success.",
    category: "Account Access"
  },
  {
    id: "msg2",
    text: "Your latest update completely broke the export functionality. I can't export any reports to PDF or Excel. This is urgent as I have a presentation with the board tomorrow morning and need this data!",
    category: "Technical"
  },
  {
    id: "msg3",
    text: "Thank you for the excellent service on my recent issue. Your support team went above and beyond to resolve my problem quickly. I'm really impressed with the level of professionalism and care.",
    category: "Feedback"
  },
  {
    id: "msg4",
    text: "The dashboard is showing incorrect data for the past month. The numbers don't match what we have in our internal systems. This is causing major confusion in our reporting. Please fix ASAP.",
    category: "Data Issue"
  },
  {
    id: "msg5",
    text: "I've been charged twice for my monthly subscription. I have already contacted my bank and they confirmed the double charge. This is unacceptable and I want an immediate refund.",
    category: "Billing"
  },
  {
    id: "msg6",
    text: "The mobile app keeps crashing whenever I try to upload images. I've tried reinstalling it and clearing cache but nothing works. This is happening on my iPhone 12 with latest iOS.",
    category: "Technical"
  },
  {
    id: "msg7",
    text: "I need to speak with a manager immediately. This is the third time I've contacted support about the same issue and nobody seems to be able to help me. This level of service is unacceptable.",
    category: "Escalation"
  },
  {
    id: "msg8",
    text: "Just wanted to let you know the new feature for batch processing is amazing! It's saved me hours of work already. Great job to your development team.",
    category: "Feedback"
  },
  {
    id: "msg9",
    text: "We're experiencing intermittent connectivity issues with the API. Requests are timing out randomly, which is affecting our production environment. We need this resolved as soon as possible.",
    category: "Technical"
  },
  {
    id: "msg10",
    text: "There seems to be a security vulnerability in your password reset flow. I was able to reset my colleague's password without proper verification. This is a serious security concern that needs immediate attention.",
    category: "Security"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Technical":
      return "bg-blue-100 text-blue-800";
    case "Account Access":
      return "bg-purple-100 text-purple-800";
    case "Billing":
      return "bg-green-100 text-green-800";
    case "Feedback":
      return "bg-amber-100 text-amber-800";
    case "Escalation":
      return "bg-red-100 text-red-800";
    case "Data Issue":
      return "bg-cyan-100 text-cyan-800";
    case "Security":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface DraggableMessagesProps {
  onDrop: (message: string) => void;
}

const DraggableMessages = ({ onDrop }: DraggableMessagesProps) => {
  const handleDragStart = (e: React.DragEvent, message: string) => {
    e.dataTransfer.setData("text/plain", message);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          Sample Messages
        </CardTitle>
        <p className="text-sm text-gray-600">Drag and drop into the message box</p>
      </CardHeader>
      
      <CardContent className="space-y-3 max-h-[80vh] overflow-y-auto pb-10">
        {sampleMessages.map((message) => (
          <div 
            key={message.id}
            className="bg-white border rounded-md p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, message.text)}
          >
            <div className="flex justify-between items-start mb-2">
              <Badge className={getCategoryColor(message.category)}>
                {message.category}
              </Badge>
            </div>
            <p className="text-sm text-gray-800">{message.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DraggableMessages;
