'use client';

import { useState } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { MemorialCollaborator, CollaboratorRole } from '@/types/roles';

interface CollaboratorsManagerProps {
  memorialId: string;
  isMemorialOwner: boolean;
  collaborators: MemorialCollaborator[];
  onAddCollaborator?: (email: string, role: CollaboratorRole) => Promise<void>;
  onRemoveCollaborator?: (userId: string) => Promise<void>;
  onUpdateRole?: (userId: string, role: CollaboratorRole) => Promise<void>;
}

export default function CollaboratorsManager({
  memorialId,
  isMemorialOwner,
  collaborators,
  onAddCollaborator,
  onRemoveCollaborator,
  onUpdateRole,
}: CollaboratorsManagerProps) {
  const { canInviteCollaborators, canAssignCoAdmin, getLimit } = usePermissions();
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<CollaboratorRole>('editor');
  const [isLoading, setIsLoading] = useState(false);

  const canInvite = canInviteCollaborators(collaborators.length);
  const maxCollaborators = getLimit('collaborators_per_memorial');

  const handleAddCollaborator = async () => {
    if (!newEmail || !onAddCollaborator) return;

    setIsLoading(true);
    try {
      await onAddCollaborator(newEmail, newRole);
      setNewEmail('');
      setNewRole('editor');
    } catch (error) {
      console.error('Error al añadir colaborador:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (userId: string) => {
    if (!onRemoveCollaborator) return;
    setIsLoading(true);
    try {
      await onRemoveCollaborator(userId);
    } catch (error) {
      console.error('Error al eliminar colaborador:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string, role: CollaboratorRole) => {
    if (!onUpdateRole) return;
    setIsLoading(true);
    try {
      await onUpdateRole(userId, role);
    } catch (error) {
      console.error('Error al actualizar rol:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleBadgeColor = (role: CollaboratorRole) => {
    switch (role) {
      case 'viewer':
        return 'bg-blue-100 text-blue-800';
      case 'editor':
        return 'bg-yellow-100 text-yellow-800';
      case 'co-admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>👥 Colaboradores</CardTitle>
        <CardDescription>
          Gestiona quién puede acceder y editar este memorial
          {maxCollaborators > 0 && (
            <span className="ml-2">
              ({collaborators.length}/{maxCollaborators})
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Sección para añadir nuevo colaborador */}
        {isMemorialOwner && canInvite && (
          <div className="border-b pb-6">
            <h3 className="font-semibold mb-3">➕ Invitar Colaborador</h3>
            <div className="flex gap-2 flex-wrap">
              <Input
                type="email"
                placeholder="Email del colaborador"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="flex-1 min-w-48"
              />
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as CollaboratorRole)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="viewer">Ver</option>
                <option value="editor">Editar</option>
                {canAssignCoAdmin(isMemorialOwner) && (
                  <option value="co-admin">Co-Admin</option>
                )}
              </select>
              <Button
                onClick={handleAddCollaborator}
                disabled={!newEmail || isLoading}
                className="bg-nature-600 hover:bg-nature-700"
              >
                Invitar
              </Button>
            </div>
          </div>
        )}

        {/* Lista de colaboradores */}
        <div>
          <h3 className="font-semibold mb-3">📋 Colaboradores Actuales</h3>
          {collaborators.length === 0 ? (
            <p className="text-muted-foreground text-sm">No hay colaboradores aún</p>
          ) : (
            <div className="space-y-3">
              {collaborators.map((collab) => (
                <div
                  key={collab.userId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{collab.name}</p>
                    <p className="text-xs text-muted-foreground">{collab.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getRoleBadgeColor(collab.role)}>
                      {collab.role === 'viewer' && '👁️ Ver'}
                      {collab.role === 'editor' && '✏️ Editar'}
                      {collab.role === 'co-admin' && '👑 Co-Admin'}
                    </Badge>
                    <Badge className={getStatusBadgeColor(collab.status)}>
                      {collab.status === 'pending' && 'Pendiente'}
                      {collab.status === 'accepted' && 'Aceptado'}
                      {collab.status === 'rejected' && 'Rechazado'}
                    </Badge>
                  </div>

                  {isMemorialOwner && (
                    <div className="flex gap-2 ml-3">
                      {collab.role !== 'co-admin' && canAssignCoAdmin(isMemorialOwner) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateRole(collab.userId, 'co-admin')}
                          disabled={isLoading}
                        >
                          Promover
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemove(collab.userId)}
                        disabled={isLoading}
                      >
                        Eliminar
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Información sobre permisos */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">📖 Niveles de Acceso</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              <strong>👁️ Ver:</strong> Solo puede ver el memorial sin editar
            </li>
            <li>
              <strong>✏️ Editar:</strong> Puede ver y editar la información del memorial
            </li>
            <li>
              <strong>👑 Co-Admin:</strong> Control total incluyendo gestión de colaboradores
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
