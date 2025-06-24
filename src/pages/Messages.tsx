
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Send, 
  MoreVertical, 
  Shield, 
  Star,
  Archive,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock conversation data
  const conversations = [
    {
      id: 1,
      name: "Sarah Chen - TechCorp Recruiter",
      company: "TechCorp Ltd",
      lastMessage: "Thank you for your interest in the Senior Software Engineer position. We'd like to schedule an interview.",
      timestamp: "2 hours ago",
      unread: true,
      avatar: null,
      role: "recruiter"
    },
    {
      id: 2,
      name: "James Wilson - StartupXYZ",
      company: "StartupXYZ",
      lastMessage: "Your CV looks impressive! Could we arrange a quick call this week?",
      timestamp: "1 day ago",
      unread: false,
      avatar: null,
      role: "hiring_manager"
    },
    {
      id: 3,
      name: "Emily Rodriguez - Creative Agency",
      company: "Creative Agency",
      lastMessage: "We've reviewed your portfolio and would love to discuss the UX Designer role further.",
      timestamp: "3 days ago",
      unread: false,
      avatar: null,
      role: "recruiter"
    }
  ];

  // Mock messages for selected conversation
  const messages = [
    {
      id: 1,
      sender: "other",
      content: "Hello! Thank you for applying to our Senior Software Engineer position. Your verified credentials look excellent.",
      timestamp: "Yesterday at 14:30",
      senderName: "Sarah Chen"
    },
    {
      id: 2,
      sender: "me",
      content: "Thank you for getting in touch! I'm very interested in the role and would love to learn more about the opportunity.",
      timestamp: "Yesterday at 15:45",
      senderName: "You"
    },
    {
      id: 3,
      sender: "other",
      content: "Brilliant! I've had a look at your verified qualifications and they align perfectly with what we're looking for. Would you be available for a video interview next week?",
      timestamp: "Today at 09:15",
      senderName: "Sarah Chen"
    },
    {
      id: 4,
      sender: "me",
      content: "That sounds perfect! I'm available most days next week. What would work best for your schedule?",
      timestamp: "Today at 10:30",
      senderName: "You"
    },
    {
      id: 5,
      sender: "other",
      content: "Thank you for your interest in the Senior Software Engineer position. We'd like to schedule an interview.",
      timestamp: "2 hours ago",
      senderName: "Sarah Chen"
    }
  ];

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);
  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", messageText);
      setMessageText("");
    }
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
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>
                          {conversation.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-sm font-medium truncate ${
                            conversation.unread ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {conversation.name}
                          </h4>
                          {conversation.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{conversation.company}</p>
                        <p className={`text-sm truncate ${
                          conversation.unread ? 'font-medium text-gray-900' : 'text-gray-600'
                        }`}>
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{conversation.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message View */}
          <Card className="lg:col-span-2">
            {selectedConversationData ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversationData.avatar} />
                        <AvatarFallback>
                          {selectedConversationData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedConversationData.name}</h3>
                        <p className="text-sm text-gray-600">{selectedConversationData.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col h-full p-0">
                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-80">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'me'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the left to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
