import { usePerformancePage } from '../../hooks/Performance/usePerformancePage';

import {
  Content,
  Title,
  Status,
  Sections,
  Separator,
  Songs,
  Song,
  Play,
  Info,
} from './styles';

import { IconButton } from '../../components/ui/IconButton';
import { UploadButton } from '../../components/ui/UploadButton';
import { PlayIcon } from '../../components/icons/PlayIcon';
import { StopIcon } from '../../components/icons/StopIcon';
import { AddIcon } from '../../components/icons/AddIcon';
import { DeleteIcon } from '../../components/icons/DeleteIcon';
import { ExportIcon } from '../../components/icons/ExportIcon';
import { ImportIcon } from '../../components/icons/ImportIcon';

export function PerformancePage() {
  const { performanceState, songs, actions } = usePerformancePage();

  const { playing, currentSong, currentSectionIndex } = performanceState;

  function handleCreateSong() {
    const name = prompt('Nome da música');
    if (!name) return;

    const bpm = prompt('BPM');
    if (!bpm) return;

    const sections = prompt('Quantas seções?');
    if (!sections) return;

    const sectionsCount = parseInt(sections);
    const sectionsArray = [];

    for (let i = 0; i < sectionsCount; i++) {
      const sectionName = prompt(`Nome da seção ${i + 1}`);
      if (!sectionName) return;

      const bank = prompt(`Banco da seção ${i + 1}`);
      if (!bank) return;

      const patch = prompt(`Patch da seção ${i + 1}`);
      if (!patch) return;

      sectionsArray.push({
        name: sectionName,
        bank: parseInt(bank),
        patch: parseInt(patch),
      });
    }

    actions.createSong({
      name: name,
      bpm: parseInt(bpm),
      sections: sectionsArray,
    });
  }

  return (
    <Content>
      <Title>Performance</Title>

      <Status>
        <p>
          <strong>Status: </strong>
          <span>{playing ? '▶️ Tocando' : '⏹️ Parado'}</span>
        </p>

        <p>
          <strong>Música: </strong>
          <span>{currentSong ? currentSong.name : '---'}</span>
        </p>

        <p>
          <strong>Seções: </strong>
          {currentSong?.sections.length ? (
            <Sections>
              {currentSong.sections.map((section, index) => (
                <>
                  <span
                    key={section.name}
                    className={currentSectionIndex === index ? 'current' : ''}
                  >
                    {section.name}
                  </span>
                  {index < currentSong.sections.length - 1 && <span>|</span>}
                </>
              ))}
            </Sections>
          ) : (
            <span>---</span>
          )}
        </p>
      </Status>

      <Separator />

      <Songs>
        <header>
          <h2>Músicas</h2>

          <div>
            <IconButton
              icon={<AddIcon />}
              title="Adicionar música"
              onClick={handleCreateSong}
            />
            <IconButton
              icon={<ExportIcon />}
              title="Exportar músicas"
              onClick={actions.exportSongs}
            />
            <UploadButton
              icon={<ImportIcon />}
              title="Importar músicas"
              accept=".json"
              onFileSelect={actions.importSongs}
            />
          </div>
        </header>

        {songs.map((song) => (
          <Song key={song.id}>
            <Play
              onClick={() => {
                if (playing && currentSong?.id === song.id) actions.stop();
                else actions.play(song);
              }}
            >
              {playing && currentSong?.id === song.id ? (
                <StopIcon />
              ) : (
                <PlayIcon />
              )}
            </Play>

            <Info>
              <strong>{song.name}</strong>
              <span>({song.bpm} BPM)</span>
            </Info>

            <IconButton
              icon={<DeleteIcon />}
              title="Deletar música"
              onClick={() => {
                if (confirm('Tem certeza que deseja deletar essa música?')) {
                  actions.deleteSong(song.id);
                }
              }}
            />
          </Song>
        ))}
      </Songs>
    </Content>
  );
}
