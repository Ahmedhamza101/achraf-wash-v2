import { useEffect, useState } from "react";
import { Loader2, Mail, MailOpen } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { apiFetch, ApiError } from "../../../lib/api";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

interface AdminMessage {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "read" | "unread";
  created_at: string;
}

export default function AdminMessagesPage() {
  const { token } = useAdminAuth();
  const [messages, setMessages] = useState<AdminMessage[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMessages() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await apiFetch<AdminMessage[]>("/admin/messages", { token });
        if (!cancelled) {
          setMessages(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Impossible de charger les messages. Veuillez réessayer.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const toggleStatus = async (targetMessage: AdminMessage) => {
    const nextStatus = targetMessage.status === "unread" ? "read" : "unread";
    setUpdatingId(targetMessage.id);

    try {
      const updated = await apiFetch<AdminMessage>(`/admin/messages/${targetMessage.id}`, {
        method: "PATCH",
        token,
        body: { status: nextStatus },
      });
      setMessages((prev) =>
        prev ? prev.map((message) => (message.id === updated.id ? updated : message)) : prev,
      );
    } catch {
      // Best-effort: leave the message state unchanged if the update fails.
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Messages reçus depuis le formulaire de contact.
      </p>

      {isLoading && (
        <div className="mt-8 flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement des messages...
        </div>
      )}

      {!isLoading && error && (
        <div className="mt-8 rounded-md border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {!isLoading && !error && messages && messages.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-muted-foreground">
          Aucun message pour le moment.
        </div>
      )}

      {!isLoading && !error && messages && messages.length > 0 && (
        <div className="mt-6 space-y-3">
          {messages.map((message) => (
            <Card key={message.id} className={message.status === "unread" ? "border-blue-200" : ""}>
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div>
                  <p className="font-medium text-gray-900">
                    {message.first_name} {message.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{message.email}</p>
                  {message.phone && (
                    <p className="text-sm text-muted-foreground">{message.phone}</p>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(message.created_at).toLocaleString("fr-FR")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={message.status === "unread" ? "default" : "secondary"}>
                    {message.status === "unread" ? "Non lu" : "Lu"}
                  </Badge>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={updatingId === message.id}
                    onClick={() => toggleStatus(message)}
                  >
                    {message.status === "unread" ? (
                      <MailOpen className="h-4 w-4" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                    {message.status === "unread" ? "Marquer comme lu" : "Marquer comme non lu"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm text-gray-700">{message.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
