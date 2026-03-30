import { usePerformancePage } from '../../hooks/Performance/usePerformancePage';

import {
  Content,
  Title,
  Status,
  Separator,
  SongsList,
  SongItem,
  Play,
  Info,
  Actions,
} from './styles';

import { IconButton } from '../../components/ui/IconButton';
import { UploadButton } from '../../components/ui/UploadButton';
import { PlayIcon } from '../../components/icons/PlayIcon';
import { StopIcon } from '../../components/icons/StopIcon';
import { AddIcon } from '../../components/icons/AddIcon';
import { UpdateIcon } from '../../components/icons/UpdateIcon';
import { DeleteIcon } from '../../components/icons/DeleteIcon';
import { ExportIcon } from '../../components/icons/ExportIcon';
import { ImportIcon } from '../../components/icons/ImportIcon';
import { SongEditor } from '../../components/ui/SongEditor';
import { StagePanel } from '../../components/ui/StagePanel';

export function PerformancePage() {
  const { performanceState, songs, actions, editor, panel } =
    usePerformancePage();

  const { playing, currentSong, currentSectionIndex } = performanceState;

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
          <strong>Seção: </strong>
          <span>
            {currentSong
              ? (currentSong.sections[currentSectionIndex]?.name ?? '---')
              : '---'}
          </span>
        </p>
      </Status>

      <Separator />

      <SongsList>
        <header>
          <h2>Músicas</h2>

          <div>
            <IconButton
              icon={<AddIcon />}
              title="Adicionar música"
              onClick={editor.actions.openEditorToAdd}
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
          <SongItem
            key={song.id}
            $isPlaying={actions.isPlayingCurrentSong(song)}
          >
            <Play
              onClick={() => {
                if (actions.isPlayingCurrentSong(song)) actions.stop();
                else actions.play(song);
              }}
            >
              {actions.isPlayingCurrentSong(song) ? <StopIcon /> : <PlayIcon />}
            </Play>

            <Info>
              <strong>{song.name}</strong>
              <span>({song.bpm} BPM)</span>
            </Info>

            <Actions>
              <IconButton
                icon={<UpdateIcon />}
                title="Editar música"
                onClick={() => editor.actions.openEditorToEdit(song)}
              />
              <IconButton
                icon={<DeleteIcon />}
                title="Deletar música"
                onClick={() => actions.deleteSong(song.id)}
              />
            </Actions>
          </SongItem>
        ))}
      </SongsList>

      <SongEditor
        key={editor.songToEdit?.id || 'new'}
        open={editor.isEditorOpen}
        initial={editor.songToEdit || undefined}
        onSubmit={editor.actions.handleEditorSubmit}
        onClose={editor.actions.handleEditorClose}
      />

      <StagePanel
        open={panel.isPanelOpen}
        song={currentSong}
        sectionIndex={currentSectionIndex}
        onChangeSection={(index) => panel.actions.selectSection(index)}
      />
    </Content>
  );
}
