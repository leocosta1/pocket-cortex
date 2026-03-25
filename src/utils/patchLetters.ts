const PATCH_LETTERS = ['A', 'B', 'C', 'D'];

export function mapIndexToPatchLetter(index: number) {
  if (index < 1 || index > PATCH_LETTERS.length) {
    throw new Error(
      `Patch index must be between 1 and ${PATCH_LETTERS.length}`
    );
  }

  return PATCH_LETTERS[index - 1];
}

export function mapPatchLetterToIndex(letter: string) {
  const index = PATCH_LETTERS.indexOf(letter.toUpperCase());

  if (index === -1) {
    throw new Error(`Letter must be one of ${PATCH_LETTERS.join(', ')}`);
  }

  return index + 1;
}
