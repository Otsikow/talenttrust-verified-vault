import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ConversationList from "@/components/messages/ConversationList";
import MessageView from "@/components/messages/MessageView";

const Messages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Mock conversation data with additional state
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Sarah Chen - TechCorp Recruiter",
      company: "TechCorp Ltd",
      lastMessage: "Thank you for your interest in the Senior Software Engineer position. We'd like to schedule an interview.",
      timestamp: "2 hours ago",
      unread: true,
      avatar: null,
      role: "recruiter",
      isFavorite: false,
      isArchived: false
    },
    {
      id: 2,
      name: "James Wilson - StartupXYZ",
      company: "StartupXYZ",
      lastMessage: "Your CV looks impressive! Could we arrange a quick call this week?",
      timestamp: "1 day ago",
      unread: false,
      avatar: null,
      role: "hiring_manager",
      isFavorite: false,
      isArchived: false
    },
    {
      id: 3,
      name: "Emily Rodriguez - Creative Agency",
      company: "Creative Agency",
      lastMessage: "We've reviewed your portfolio and would love to discuss the UX Designer role further.",
      timestamp: "3 days ago",
      unread: false,
      avatar: null,
      role: "recruiter",
      isFavorite: true,
      isArchived: false
    }
  ]);

  // Mock messages for selected conversation with state
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "other" as const,
      content: "Hello! Thank you for applying to our Senior Software Engineer position. Your verified credentials look excellent.",
      timestamp: "Yesterday at 14:30",
      senderName: "Sarah Chen"
    },
    {
      id: 2,
      sender: "me" as const,
      content: "Thank you for getting in touch! I'm very interested in the role and would love to learn more about the opportunity.",
      timestamp: "Yesterday at 15:45",
      senderName: "You"
    },
    {
      id: 3,
      sender: "other" as const,
      content: "Brilliant! I've had a look at your verified qualifications and they align perfectly with what we're looking for. Would you be available for a video interview next week?",
      timestamp: "Today at 09:15",
      senderName: "Sarah Chen"
    },
    {
      id: 4,
      sender: "me" as const,
      content: "That sounds perfect! I'm available most days next week. What would work best for your schedule?",
      timestamp: "Today at 10:30",
      senderName: "You"
    },
    {
      id: 5,
      sender: "other" as const,
      content: "Thank you for your interest in the Senior Software Engineer position. We'd like to schedule an interview.",
      timestamp: "2 hours ago",
      senderName: "Sarah Chen"
    }
  ]);

  const selectedConversationData = conversations.find(c => c.id === selectedConversation && !c.isArchived);

  const handleSendMessage = (messageText: string) => {
    const newMessage = {
      id: messages.length + 1,
      sender: "me" as const,
      content: messageText,
      timestamp: new Date().toLocaleString(),
      senderName: "You"
    };
    
    setMessages([...messages, newMessage]);
    
    // Update the last message in conversations
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, lastMessage: messageText, timestamp: "Just now" }
        : conv
    ));
  };

  const handleToggleFavorite = () => {
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, isFavorite: !conv.isFavorite }
        : conv
    ));
    
    const isFavorite = selectedConversationData?.isFavorite;
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Conversation removed from favorites." : "Conversation added to favorites.",
    });
  };

  const handleArchiveConversation = () => {
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, isArchived: true }
        : conv
    ));
    
    // Select another conversation if current one is archived
    const remainingConversations = conversations.filter(c => c.id !== selectedConversation && !c.isArchived);
    if (remainingConversations.length > 0) {
      setSelectedConversation(remainingConversations[0].id);
    } else {
      setSelectedConversation(0);
    }
    
    toast({
      title: "Conversation archived",
      description: "The conversation has been moved to your archive.",
    });
  };

  const handleDeleteConversation = () => {
    setConversations(prev => prev.filter(conv => conv.id !== selectedConversation));
    
    // Select another conversation if current one is deleted
    const remainingConversations = conversations.filter(c => c.id !== selectedConversation);
    if (remainingConversations.length > 0) {
      setSelectedConversation(remainingConversations[0].id);
    } else {
      setSelectedConversation(0);
    }
    
    toast({
      title: "Conversation deleted",
      description: "The conversation has been permanently deleted.",
      variant: "destructive",
    });
  };

  const handleToggleFavoritesFilter = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TrustTalent</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" onClick={() => navigate("/dashboard/seeker")}>Dashboard</Button>
              <Button variant="ghost" onClick={() => navigate("/jobs")}>Find Jobs</Button>
              <Button variant="ghost" onClick={() => navigate("/vault")}>My Vault</Button>
              <Button variant="ghost" className="font-medium">Messages</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/notifications")}>
              <span className="sr-only">Notifications</span>
              🔔
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
              <span className="sr-only">Profile</span>
              👤
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with recruiters and hiring managers</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            searchTerm={searchTerm}
            showFavoritesOnly={showFavoritesOnly}
            onConversationSelect={setSelectedConversation}
            onSearchChange={setSearchTerm}
            onToggleFavoritesFilter={handleToggleFavoritesFilter}
          />
          
          <MessageView
            conversation={selectedConversationData}
            messages={messages}
            onSendMessage={handleSendMessage}
            onToggleFavorite={handleToggleFavorite}
            onArchiveConversation={handleArchiveConversation}
            onDeleteConversation={handleDeleteConversation}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
