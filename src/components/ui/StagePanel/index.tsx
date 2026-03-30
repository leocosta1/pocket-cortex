import { useState, useRef } from 'react';
import type { PointerEvent } from 'react';
import type { Song } from '../../../core/performance/songStore';

import { mapIndexToPatchLetter } from '../../../utils/patchLetters';

import { Container, Swipe, Sections, Button, Patch } from './styles';

interface StagePanelProps {
  open: boolean;
  song: Song | null;
  sectionIndex: number;
  onChangeSection: (index: number) => void;
}

const FOLDED_OFFSET = 80;
const DRAG_THRESHOLD = 40;
const DRAG_UP_LIMIT = -100;

export function StagePanel({
  open,
  song,
  sectionIndex,
  onChangeSection,
}: StagePanelProps) {
  const [isFolded, setIsFolded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const startY = useRef(0);

  const getBaseTranslate = () => {
    if (!open) return '100%';
    if (isFolded) return `calc(100% - ${FOLDED_OFFSET}px)`;
    return '0px';
  };

  const handlePointerDown = (e: PointerEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;

    const delta = e.clientY - startY.current;

    if (delta < DRAG_UP_LIMIT) return;

    setDragOffset(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (dragOffset > DRAG_THRESHOLD) {
      setIsFolded(true);
    } else if (dragOffset < -DRAG_THRESHOLD) {
      setIsFolded(false);
    }

    setDragOffset(0);
  };

  const base = getBaseTranslate();
  const translate = isDragging ? `calc(${base} + ${dragOffset}px)` : base;

  return (
    <Container
      $translate={translate}
      $dragging={isDragging}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Swipe />

      <Sections>
        {song?.sections.map((section, index) => {
          const isActive = index === sectionIndex;

          return (
            <Button
              key={section.id}
              $active={isActive}
              onClick={() => onChangeSection(index)}
            >
              <span>{section.name}</span>
              <Patch>
                {section.bank}-{mapIndexToPatchLetter(section.patch)}
              </Patch>
            </Button>
          );
        })}
      </Sections>
    </Container>
  );
}
