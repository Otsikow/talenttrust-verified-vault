
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ConversationItem from "./ConversationItem";

interface Conversation {
  id: number;
  name: string;
  company: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar: string | null;
  role: string;
  isFavorite: boolean;
  isArchived: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: number;
  searchTerm: string;
  onConversationSelect: (id: number) => void;
  onSearchChange: (term: string) => void;
}

const ConversationList = ({
  conversations,
  selectedConversation,
  searchTerm,
  onConversationSelect,
  onSearchChange
}: ConversationListProps) => {
  const filteredConversations = conversations.filter(conversation =>
    !conversation.isArchived &&
    (conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Conversations</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedConversation === conversation.id}
              onClick={() => onConversationSelect(conversation.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationList;
