import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { apiFetch, ApiError } from "../../../lib/api";
import { vehicleTypes } from "../../components/reservation/data";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface Tarif {
  id: number;
  vehicle_type: string;
  package_name: string;
  price: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
}

interface TarifFormState {
  vehicle_type: string;
  package_name: string;
  price: string;
  description: string;
  is_active: boolean;
}

const emptyForm: TarifFormState = {
  vehicle_type: vehicleTypes[0]?.key ?? "",
  package_name: "",
  price: "",
  description: "",
  is_active: true,
};

function vehicleTypeLabel(key: string): string {
  return vehicleTypes.find((vehicle) => vehicle.key === key)?.name ?? key;
}

export default function AdminTarifsPage() {
  const { token } = useAdminAuth();
  const [tarifs, setTarifs] = useState<Tarif[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<TarifFormState>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadTarifs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiFetch<Tarif[]>("/admin/tarifs", { token });
      setTarifs(data);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Impossible de charger les tarifs. Veuillez réessayer.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTarifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const openCreateDialog = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (tarif: Tarif) => {
    setEditingId(tarif.id);
    setForm({
      vehicle_type: tarif.vehicle_type,
      package_name: tarif.package_name,
      price: tarif.price,
      description: tarif.description ?? "",
      is_active: tarif.is_active,
    });
    setFormError(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setFormError(null);

    const body = {
      vehicle_type: form.vehicle_type,
      package_name: form.package_name,
      price: Number(form.price),
      description: form.description || null,
      is_active: form.is_active,
    };

    try {
      if (editingId) {
        await apiFetch<Tarif>(`/admin/tarifs/${editingId}`, {
          method: "PATCH",
          token,
          body,
        });
      } else {
        await apiFetch<Tarif>("/admin/tarifs", {
          method: "POST",
          token,
          body,
        });
      }
      setIsDialogOpen(false);
      await loadTarifs();
    } catch (err) {
      setFormError(
        err instanceof ApiError ? err.message : "Une erreur est survenue. Veuillez réessayer.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (tarif: Tarif) => {
    if (!window.confirm(`Supprimer le tarif "${tarif.package_name}" ?`)) {
      return;
    }

    setDeletingId(tarif.id);

    try {
      await apiFetch(`/admin/tarifs/${tarif.id}`, { method: "DELETE", token });
      setTarifs((prev) => (prev ? prev.filter((item) => item.id !== tarif.id) : prev));
    } catch {
      // Best-effort: leave the list unchanged if the delete fails.
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tarifs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gestion des tarifs et forfaits proposés.
          </p>
        </div>
        <Button type="button" onClick={openCreateDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau tarif
        </Button>
      </div>

      {isLoading && (
        <div className="mt-8 flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement des tarifs...
        </div>
      )}

      {!isLoading && error && (
        <div className="mt-8 rounded-md border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {!isLoading && !error && tarifs && tarifs.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-muted-foreground">
          Aucun tarif pour le moment.
        </div>
      )}

      {!isLoading && !error && tarifs && tarifs.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Véhicule</TableHead>
                <TableHead>Forfait</TableHead>
                <TableHead>Prix (MAD)</TableHead>
                <TableHead>Actif</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tarifs.map((tarif) => (
                <TableRow key={tarif.id}>
                  <TableCell>{vehicleTypeLabel(tarif.vehicle_type)}</TableCell>
                  <TableCell>
                    <p className="font-medium text-gray-900">{tarif.package_name}</p>
                    {tarif.description && (
                      <p className="text-xs text-muted-foreground">{tarif.description}</p>
                    )}
                  </TableCell>
                  <TableCell>{Number(tarif.price).toFixed(0)}</TableCell>
                  <TableCell>{tarif.is_active ? "Oui" : "Non"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => openEditDialog(tarif)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        disabled={deletingId === tarif.id}
                        onClick={() => handleDelete(tarif)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Modifier le tarif" : "Nouveau tarif"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle_type">Type de véhicule</Label>
              <Select
                value={form.vehicle_type}
                onValueChange={(value) => setForm((prev) => ({ ...prev, vehicle_type: value }))}
              >
                <SelectTrigger id="vehicle_type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((vehicle) => (
                    <SelectItem key={vehicle.key} value={vehicle.key}>
                      {vehicle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="package_name">Nom du forfait</Label>
              <Input
                id="package_name"
                required
                value={form.package_name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, package_name: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix (MAD)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="1"
                required
                value={form.price}
                onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, description: event.target.value }))
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={form.is_active}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Actif</Label>
            </div>

            {formError && <p className="text-sm text-destructive">{formError}</p>}

            <DialogFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
