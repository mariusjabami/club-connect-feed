import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

export const EditProfileDialog = () => {
  const { profile, refreshProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    username: profile?.username || "",
    bio: profile?.bio || "",
    position: profile?.position || "",
    age: profile?.age?.toString() || "",
    height: profile?.height || "",
    preferred_foot: profile?.preferred_foot || "",
    location: profile?.location || "",
    founded_year: profile?.founded_year?.toString() || "",
    stadium: profile?.stadium || "",
    colors: profile?.colors || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);

    const updateData: Record<string, unknown> = {
      name: formData.name,
      username: formData.username,
      bio: formData.bio || null,
    };

    if (profile.user_type === "player") {
      updateData.position = formData.position || null;
      updateData.age = formData.age ? parseInt(formData.age) : null;
      updateData.height = formData.height || null;
      updateData.preferred_foot = formData.preferred_foot || null;
    } else {
      updateData.location = formData.location || null;
      updateData.founded_year = formData.founded_year ? parseInt(formData.founded_year) : null;
      updateData.stadium = formData.stadium || null;
      updateData.colors = formData.colors || null;
    }

    const { error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", profile.id);

    setLoading(false);

    if (error) {
      toast.error("Erro ao atualizar perfil");
      console.error(error);
    } else {
      toast.success("Perfil atualizado!");
      await refreshProfile();
      setOpen(false);
    }
  };

  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Pencil className="w-4 h-4" />
          Editar perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full input-field mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full input-field mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full input-field mt-1 min-h-[80px]"
              rows={3}
            />
          </div>

          {profile.user_type === "player" ? (
            <>
              <div>
                <label className="text-sm font-medium">Posição</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full input-field mt-1"
                  placeholder="Ex: Atacante"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Idade</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full input-field mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Altura</label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full input-field mt-1"
                    placeholder="Ex: 1.80m"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Pé preferido</label>
                <select
                  name="preferred_foot"
                  value={formData.preferred_foot}
                  onChange={handleChange}
                  className="w-full input-field mt-1"
                >
                  <option value="">Selecione</option>
                  <option value="right">Direito</option>
                  <option value="left">Esquerdo</option>
                  <option value="both">Ambos</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium">Localização</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full input-field mt-1"
                  placeholder="Ex: São Paulo, SP"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Ano de fundação</label>
                  <input
                    type="number"
                    name="founded_year"
                    value={formData.founded_year}
                    onChange={handleChange}
                    className="w-full input-field mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Cores</label>
                  <input
                    type="text"
                    name="colors"
                    value={formData.colors}
                    onChange={handleChange}
                    className="w-full input-field mt-1"
                    placeholder="Ex: Azul e Branco"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Estádio</label>
                <input
                  type="text"
                  name="stadium"
                  value={formData.stadium}
                  onChange={handleChange}
                  className="w-full input-field mt-1"
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Salvando..." : "Salvar alterações"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
