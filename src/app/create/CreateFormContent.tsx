'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { AnimalProfile } from '@/types';

const MapboxMapSelector = dynamic(() => import('@/components/MapboxMapSelector'), { ssr: false });

export default function CreateFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    animalType: '',
    customAnimalType: '', // Para tipo personalizado
    breed: '',
    birthDate: '',
    deathDate: '',
    latitude: '',
    longitude: '',
    photoFile: null as File | null,
    photoPreview: '',
    story: '',
    epitaph: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Load profile for editing
  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId) {
      setIsEditMode(true);
      setEditingProfileId(editId);
      setIsLoadingProfile(true);
      
      const loadProfile = async () => {
        try {
          const response = await fetch(`/api/profiles/user`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          });
          const result = await response.json();
          
          if (result.success && result.data) {
            const profile = result.data.find((p: AnimalProfile) => p.id === editId);
            if (profile) {
              setFormData({
                name: profile.name,
                animalType: profile.animalType,
                customAnimalType: profile.animalType === 'otro' ? profile.animalType : '',
                breed: profile.breed || '',
                birthDate: profile.birthDate?.split('T')[0] || '',
                deathDate: profile.deathDate?.split('T')[0] || '',
                latitude: String(profile.latitude),
                longitude: String(profile.longitude),
                photoFile: null,
                photoPreview: profile.photoUrl,
                story: profile.story,
                epitaph: profile.epitaph
              });
              setSelectedLocation({ lat: profile.latitude, lng: profile.longitude });
            }
          }
        } catch (error) {
          console.error('Error loading profile:', error);
          alert('Error al cargar el memorial para editar');
        } finally {
          setIsLoadingProfile(false);
        }
      };
      
      loadProfile();
    }
  }, [searchParams]);

  const animalTypes = [
    { value: 'perro', label: 'Perro', emoji: '🐕' },
    { value: 'gato', label: 'Gato', emoji: '🐈' },
    { value: 'ave', label: 'Ave', emoji: '🦜' },
    { value: 'roedor', label: 'Roedor', emoji: '🐹' },
    { value: 'reptil', label: 'Reptil', emoji: '🦎' },
    { value: 'otro', label: 'Otro', emoji: '🐾' },
  ];

  const totalSteps = 5;

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('La foto es muy grande. Máximo 5MB.');
        return;
      }

      setFormData(prev => ({ ...prev, photoFile: file }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          photoPreview: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6)
    }));
    setSelectedLocation({ lat, lng });
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('Por favor ingresa el nombre de tu mascota');
      return;
    }
    if (!formData.animalType) {
      alert('Por favor selecciona el tipo de animal');
      return;
    }
    if (formData.animalType === 'otro' && !formData.customAnimalType.trim()) {
      alert('Por favor especifica qué tipo de mascota era');
      return;
    }
    if (!formData.deathDate) {
      alert('Por favor ingresa la fecha de fallecimiento');
      return;
    }
    if (!formData.latitude || !formData.longitude) {
      alert('Por favor selecciona la ubicación en el mapa');
      return;
    }
    if (!formData.story.trim()) {
      alert('Por favor comparte una historia o recuerdo');
      return;
    }
    if (!formData.epitaph.trim()) {
      alert('Por favor ingresa un epitafio o mensaje especial');
      return;
    }
    if (!formData.photoPreview) {
      alert('Por favor selecciona una foto');
      return;
    }

    setIsSubmitting(true);
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('animalType', formData.animalType === 'otro' ? formData.customAnimalType : formData.animalType);
      formDataToSend.append('breed', formData.breed);
      formDataToSend.append('birthDate', formData.birthDate);
      formDataToSend.append('deathDate', formData.deathDate);
      formDataToSend.append('latitude', String(formData.latitude));
      formDataToSend.append('longitude', String(formData.longitude));
      formDataToSend.append('story', formData.story);
      formDataToSend.append('epitaph', formData.epitaph);
      // Send the base64 encoded photo (from photoPreview)
      if (formData.photoPreview) {
        formDataToSend.append('photoUrl', formData.photoPreview);
      }

      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      
      // If in edit mode, use PUT; otherwise POST for new memorial
      const method = isEditMode ? 'PUT' : 'POST';
      const endpoint = isEditMode ? `/api/profiles?id=${editingProfileId}` : '/api/profiles';
      
      console.log(`${method === 'PUT' ? 'Actualizando' : 'Enviando'} memorial:`, {
        name: formData.name,
        animalType: formData.animalType === 'otro' ? formData.customAnimalType : formData.animalType,
        coordinates: [formData.latitude, formData.longitude],
        userId: user?.id
      });

      const response = await fetch(endpoint, {
        method: method,
        body: formDataToSend,
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || `Error al ${isEditMode ? 'actualizar' : 'crear'} el memorial`);
      }

      const successMessage = isEditMode ? '¡Memorial actualizado con éxito! ✏️' : '¡Memorial creado con éxito! 🎉';
      const profileId = isEditMode ? editingProfileId : result.id;
      
      console.log(`Memorial ${isEditMode ? 'actualizado' : 'creado'}:`, result);
      alert(successMessage);
      router.push(`/profile/${profileId}`);
    } catch (error) {
      console.error(`Error al ${isEditMode ? 'actualizar' : 'crear'} memorial:`, error);
      const message = error instanceof Error ? error.message : `Hubo un error al ${isEditMode ? 'actualizar' : 'crear'} el memorial. Intenta nuevamente.`;
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                    ${step >= s ? 'bg-nature-600 text-white' : 'bg-nature-200 text-nature-600'}
                  `}
                >
                  {s}
                </div>
                {s < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      step > s ? 'bg-nature-600' : 'bg-nature-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs md:text-sm text-nature-600 mt-2">
            <span>Info</span>
            <span>Fechas</span>
            <span>Historia</span>
            <span>Ubicación</span>
            <span>Foto</span>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-nature-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              {step === 1 && `Paso 1: ${isEditMode ? 'Editar' : 'Información'} Básica`}
              {step === 2 && 'Paso 2: Fechas Importantes'}
              {step === 3 && 'Paso 3: Su Historia'}
              {step === 4 && 'Paso 4: Ubicación en el Mapa'}
              {step === 5 && `Paso 5: Foto y ${isEditMode ? 'Confirmación' : 'Resumen'}`}
            </CardTitle>
            <CardDescription>
              {step === 1 && `${isEditMode ? 'Edita el' : 'Cuéntanos el'} nombre y tipo de tu compañero`}
              {step === 2 && 'Ingresa las fechas importantes'}
              {step === 3 && 'Comparte su historia y un mensaje especial'}
              {step === 4 && 'Selecciona la ubicación en el mapa'}
              {step === 5 && `${isEditMode ? 'Confirma los cambios y actualiza' : 'Sube una foto y confirma'} tu memorial`}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Información Básica */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base">
                    Nombre *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Max, Luna, Rocky..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 border-nature-300"
                  />
                </div>

                <div>
                  <Label className="text-base">Tipo de Animal *</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-3">
                    {animalTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setFormData({ ...formData, animalType: type.value, customAnimalType: '' })}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          formData.animalType === type.value
                            ? 'border-nature-600 bg-nature-100'
                            : 'border-nature-200 bg-white hover:border-nature-400'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{type.emoji}</span>
                        <span className="text-xs font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Campo personalizado cuando selecciona "Otro" */}
                {formData.animalType === 'otro' && (
                  <div className="bg-golden-50 border-2 border-golden-300 rounded-lg p-4 space-y-3 animate-in">
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">🐾</span>
                      <div className="flex-1">
                        <Label htmlFor="customAnimal" className="text-base font-semibold text-golden-900">
                          ¿Qué tipo de mascota era? *
                        </Label>
                        <p className="text-sm text-golden-700 mt-1">
                          Cuéntanos qué especie era tu compañero. Ej: Conejo, Tortuga, Iguana, Loro, Pez, Hamster, Chinchilla, etc.
                        </p>
                        <Input
                          id="customAnimal"
                          placeholder="Ej: Conejo, Tortuga, Iguana, Loro, Pez..."
                          value={formData.customAnimalType}
                          onChange={(e) => setFormData({ ...formData, customAnimalType: e.target.value })}
                          className="mt-3 border-golden-300 bg-white text-golden-900 placeholder:text-golden-600"
                        />
                        <p className="text-xs text-golden-600 mt-2">
                          💡 Escribe el tipo de animal con cuidado, será mostrado en el memorial
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="breed" className="text-base">
                    Raza (Opcional)
                  </Label>
                  <Input
                    id="breed"
                    placeholder="Golden Retriever, Siamés..."
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    className="mt-2 border-nature-300"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Fechas */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="birthDate" className="text-base">
                    Fecha de Nacimiento
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="mt-2 border-nature-300"
                  />
                </div>

                <div>
                  <Label htmlFor="deathDate" className="text-base">
                    Fecha de Fallecimiento *
                  </Label>
                  <Input
                    id="deathDate"
                    type="date"
                    value={formData.deathDate}
                    onChange={(e) => setFormData({ ...formData, deathDate: e.target.value })}
                    className="mt-2 border-nature-300"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Este dato es importante para tu memorial
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Historia */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="story" className="text-base">
                    Su Historia *
                  </Label>
                  <Textarea
                    id="story"
                    placeholder="Comparte recuerdos especiales, anécdotas divertidas, lo que lo hacía especial..."
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    className="mt-2 border-nature-300"
                    rows={6}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.story.length} caracteres
                  </p>
                </div>

                <div>
                  <Label htmlFor="epitaph" className="text-base">
                    Epitafio o Mensaje Especial *
                  </Label>
                  <Textarea
                    id="epitaph"
                    placeholder="Un mensaje corto que resuma su esencia..."
                    value={formData.epitaph}
                    onChange={(e) => setFormData({ ...formData, epitaph: e.target.value })}
                    className="mt-2 border-nature-300"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Ejemplos: "El mejor amigo que pudimos tener", "Siempre en nuestros corazones"
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Ubicación */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                  <p className="text-sm text-sky-800">
                    💡 <strong>Consejo:</strong> Puedes elegir la ubicación de tu casa, un parque favorito, o cualquier lugar especial que compartas con tu mascota.
                  </p>
                </div>

                <div>
                  <Label className="text-base mb-3 block">
                    Ubicación en el Mapa *
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    👆 Haz clic en el mapa para seleccionar
                  </p>
                  <MapboxMapSelector 
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={selectedLocation}
                  />
                </div>

                {formData.latitude && formData.longitude && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✅ Ubicación: <strong>{formData.latitude}, {formData.longitude}</strong>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Foto */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base block mb-3">
                    📸 Foto del Memorial *
                  </Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sube una foto hermosa de tu mascota. Máximo 5MB.
                  </p>

                  {!formData.photoPreview ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-nature-300 rounded-lg p-8 text-center cursor-pointer hover:border-nature-600 hover:bg-nature-50 transition-all"
                    >
                      <svg className="w-12 h-12 mx-auto mb-3 text-nature-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg font-semibold text-nature-700 mb-1">
                        📱 Sube una foto
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Arrastra aquí o haz clic para seleccionar
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative border-2 border-green-300 bg-green-50 rounded-lg p-4">
                        <img
                          src={formData.photoPreview}
                          alt="Vista previa"
                          className="w-full max-w-xs mx-auto rounded-lg shadow-md h-auto max-h-72"
                        />
                        <Badge className="absolute top-3 right-3 bg-green-600">✅ Foto OK</Badge>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-nature-300"
                      >
                        🔄 Cambiar foto
                      </Button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                </div>

                {/* Resumen */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-nature-800 mb-4">📋 Resumen del Memorial</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-nature-50 p-3 rounded-lg">
                      <p className="text-muted-foreground text-xs">Nombre</p>
                      <p className="font-semibold text-nature-800">{formData.name}</p>
                    </div>
                    <div className="bg-nature-50 p-3 rounded-lg">
                      <p className="text-muted-foreground text-xs">Tipo</p>
                      <p className="font-semibold text-nature-800">
                        {formData.animalType === 'otro' 
                          ? formData.customAnimalType 
                          : animalTypes.find(t => t.value === formData.animalType)?.label}
                      </p>
                    </div>
                    {formData.breed && (
                      <div className="bg-nature-50 p-3 rounded-lg">
                        <p className="text-muted-foreground text-xs">Raza</p>
                        <p className="font-semibold text-nature-800">{formData.breed}</p>
                      </div>
                    )}
                    {formData.deathDate && (
                      <div className="bg-nature-50 p-3 rounded-lg">
                        <p className="text-muted-foreground text-xs">Fallecimiento</p>
                        <p className="font-semibold text-nature-800">
                          {new Date(formData.deathDate).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-6 border-t space-y-4">
              {/* Plan Info - Centered */}
              <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="flex justify-center gap-2 items-start">
                  <span className="text-2xl">ℹ️</span>
                  <div>
                    <p className="font-semibold text-blue-900">
                      Plan Actual: {user?.subscriptionTier === 'santuario-premium' ? '👑 Premium' : 'Gratuito'}
                    </p>
                    <p className="text-sm text-blue-800">
                      {user?.subscriptionTier === 'santuario-premium' 
                        ? 'Tienes memoriales ilimitados. ¡Crea todos los que desees!'
                        : 'Plan gratuito: Puedes crear hasta 3 memoriales. Actualiza a Premium para crear ilimitados.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={step === 1}
                  className="border-nature-300"
                >
                  ← Anterior
                </Button>

                {step < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    className="bg-nature-600 hover:bg-nature-700 text-white"
                  >
                    Siguiente →
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-nature-600 to-sky-600 hover:from-nature-700 hover:to-sky-700 text-white"
                  >
                    {isSubmitting ? `⏳ ${isEditMode ? 'Actualizando' : 'Creando'}...` : `${isEditMode ? '✏️ Actualizar Memorial' : '✨ Crear Memorial'}`}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - Empty or for future use */}
      <div className="lg:col-span-1">
        {/* Space reservado para futuro contenido */}
      </div>
    </div>
  );
}
