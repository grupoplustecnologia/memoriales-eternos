'use client';

import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface TagsManagerProps {
  profileId: string;
  isOwner?: boolean;
}

export function TagsManager({ profileId, isOwner = false }: TagsManagerProps) {
  const { session } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchTags();
  }, [profileId]);

  async function fetchTags() {
    try {
      const response = await fetch(`/api/tags?profileId=${profileId}`);
      const data = await response.json();

      if (data.success) {
        setTags(data.data.map((t: any) => t.tag));
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  }

  async function searchTags(query: string) {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `/api/tags?action=search&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.success) {
        setSuggestions(data.data.filter((t: Tag) => !tags.find(tag => tag.id === t.id)));
      }
    } catch (error) {
      console.error('Error searching tags:', error);
    }
  }

  async function addTag(tag: Tag) {
    if (!session?.token || !isOwner) return;

    setLoading(true);
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileId,
          tagId: tag.id,
          action: 'add',
        }),
      });

      if (response.ok) {
        setTags([...tags, tag]);
        setSearchQuery('');
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error adding tag:', error);
    } finally {
      setLoading(false);
    }
  }

  async function removeTag(tagId: string) {
    if (!session?.token || !isOwner) return;

    try {
      const response = await fetch('/api/tags', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId, tagId }),
      });

      if (response.ok) {
        setTags(tags.filter((t) => t.id !== tagId));
      }
    } catch (error) {
      console.error('Error removing tag:', error);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
          >
            {tag.name}
            {isOwner && (
              <button
                onClick={() => removeTag(tag.id)}
                className="hover:text-red-600 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {isOwner && (
        <div className="relative">
          <div className="flex gap-2">
            <Input
              placeholder="Buscar o agregar etiqueta..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchTags(e.target.value);
              }}
              onFocus={() => setShowSuggestions(true)}
              disabled={loading}
            />
            <Button
              size="sm"
              disabled={!searchQuery.trim() || loading}
              onClick={() => {
                if (searchQuery.trim()) {
                  addTag({
                    id: `new-${Date.now()}`,
                    name: searchQuery,
                    slug: searchQuery.toLowerCase().replace(/\s+/g, '-'),
                  });
                }
              }}
            >
              <Plus size={16} />
            </Button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50">
              {suggestions.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => {
                    addTag(tag);
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 border-b last:border-b-0 transition-colors"
                >
                  {tag.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
