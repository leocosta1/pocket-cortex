import { useState, useEffect, useRef } from 'react';
import type { Song, Section } from '../../../core/performance/songStore';

import {
  mapIndexToPatchLetter,
  mapPatchLetterToIndex,
} from '../../../utils/patchLetters';

import {
  Overlay,
  Card,
  Fields,
  Field,
  SectionsList,
  SectionItem,
  Drag,
  RemoveButton,
  AddButton,
} from './styles';

import { Button } from '../Button';
import { AddIcon } from '../../icons/AddIcon';
import { SaveIcon } from '../../icons/SaveIcon';
import { RemoveIcon } from '../../icons/RemoveIcon';
import { DragIcon } from '../../icons/DragIcon';

interface SongEditorProps {
  open: boolean;
  initial?: Song;
  onSubmit: (song: Omit<Song, 'id'>) => void;
  onClose: () => void;
}

export function SongEditor({
  open,
  initial,
  onSubmit,
  onClose,
}: SongEditorProps) {
  const [name, setName] = useState<string>(
    () => initial?.name ?? 'Nova música'
  );
  const [bpm, setBpm] = useState<number>(() => initial?.bpm ?? 120);
  const [sections, setSections] = useState<Section[]>(
    () =>
      initial?.sections.map((section) => ({ ...section })) ?? [
        { id: crypto.randomUUID(), name: 'Nova seção', bank: 1, patch: 1 },
      ]
  );

  function addSection() {
    setSections((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: 'Nova seção', bank: 1, patch: 1 },
    ]);
  }

  function updateSection<T extends keyof Section>(
    index: number,
    field: T,
    value: Section[T]
  ) {
    setSections((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  function removeSection(index: number) {
    if (sections.length === 1) return;

    setSections((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSave() {
    if (!name.trim() || !bpm || !sections.length) {
      alert('Preencha todos os campos corretamente para salvar a música.');
      return;
    }

    onSubmit({ name, bpm, sections });
  }

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeHandler = (event: Event) => {
      if (cardRef.current && !event.composedPath().includes(cardRef.current)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', closeHandler);

      return () => {
        document.removeEventListener('mousedown', closeHandler);
      };
    }
  }, [open, onClose]);

  const [dragIndex, setDragIndex] = useState<number | null>(null);

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragDrop(index: number) {
    if (dragIndex === null || dragIndex === index) return;

    setSections((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(index, 0, moved);
      return updated;
    });

    setDragIndex(index);
  }

  if (!open) return null;

  return (
    <Overlay>
      <Card ref={cardRef}>
        <h3>Editor de Músicas</h3>

        <Fields>
          <Field>
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>

          <Field>
            <label>BPM</label>
            <input
              type="number"
              min={40}
              max={250}
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value))}
              onFocus={(e) => e.target.select()}
              onBlur={(e) => {
                const value = parseInt(e.target.value);

                if (isNaN(value) || value < 40) {
                  setBpm(40);
                } else if (value > 250) {
                  setBpm(250);
                }
              }}
            />
          </Field>

          <SectionsList>
            <strong>Seções</strong>

            {sections.map((section, index) => (
              <SectionItem
                key={section.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDragDrop(index)}
              >
                <Drag>
                  <DragIcon />
                </Drag>

                <input
                  type="text"
                  placeholder="Nome"
                  value={section.name}
                  onChange={(e) => updateSection(index, 'name', e.target.value)}
                />

                <input
                  type="number"
                  min={1}
                  max={64}
                  value={section.bank}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);

                    if (isNaN(value) || value < 1 || value > 64) return;

                    updateSection(index, 'bank', value);
                  }}
                  onFocus={(e) => e.target.select()}
                />

                <input
                  type="text"
                  pattern="^[ABCD]$"
                  maxLength={1}
                  value={mapIndexToPatchLetter(section.patch)}
                  onChange={(e) => {
                    const letter = e.target.value.toUpperCase();

                    if (!/^[ABCD]$/.test(letter)) return;

                    const patchIndex = mapPatchLetterToIndex(letter);

                    updateSection(index, 'patch', patchIndex);
                  }}
                  onFocus={(e) => e.target.select()}
                />

                <RemoveButton onClick={() => removeSection(index)}>
                  <RemoveIcon />
                </RemoveButton>
              </SectionItem>
            ))}

            <AddButton onClick={addSection}>
              <AddIcon />
            </AddButton>
          </SectionsList>
        </Fields>

        <Button onClick={handleSave}>
          <SaveIcon />
          Salvar
        </Button>
      </Card>
    </Overlay>
  );
}
