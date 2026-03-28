import { useHomePage } from '../../hooks/Home/useHomePage';

import { mapIndexToPatchLetter } from '../../utils/patchLetters';

import {
  Content,
  Title,
  Status,
  Separator,
  Configs,
  Config,
  Display,
  Info,
  Preset,
  Divider,
  Tempo,
  Actions,
} from './styles';

import { ConnectionIcon } from '../../components/icons/ConnectionIcon';
import { DisconnectIcon } from '../../components/icons/DisconnectIcon';
import { SaveIcon } from '../../components/icons/SaveIcon';

import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';
import { ProtectedInput } from '../../components/ui/ProtectedInput';
import { Select } from '../../components/ui/Select';

export function HomePage() {
  const { pedalState, appConfig, actions } = useHomePage();

  return (
    <Content>
      <Title>Pocket Cortex</Title>

      <Status>
        <div>
          <p>
            <strong>Status: </strong>
            <span>
              {pedalState.connected ? '🟢 Conectado' : '⚫ Desconectado'}
            </span>
          </p>

          <p>
            <strong>Dispositivo: </strong>
            <span>{pedalState.connected ? 'GP-200' : ''}</span>
          </p>
        </div>

        <Button
          variant={pedalState.connected ? 'danger' : 'primary'}
          onClick={pedalState.connected ? actions.disconnect : actions.connect}
        >
          {pedalState.connected ? <DisconnectIcon /> : <ConnectionIcon />}
          <span>{pedalState.connected ? 'Desconectar' : 'Conectar'}</span>
        </Button>
      </Status>

      <Separator />

      <Configs>
        <header>
          <h2>Configurações</h2>

          <IconButton icon={<SaveIcon />} onClick={actions.saveConfig} />
        </header>

        <Config>
          <strong>Preset Inicial:</strong>
          <ProtectedInput
            type="number"
            min={1}
            max={64}
            value={appConfig.initialBank}
            onChange={actions.setInitialBank}
          />
          <ProtectedInput
            type="text"
            pattern="^[ABCD]$"
            maxLength={1}
            value={mapIndexToPatchLetter(appConfig.initialPatch)}
            onChange={actions.setInitialPatch}
          />
        </Config>

        <Config>
          <strong>Tap Tempo Global:</strong>
          <input
            type="checkbox"
            checked={appConfig.globalTapTempo}
            onChange={actions.setGlobalTapTempo}
          />
        </Config>

        <Config>
          <strong>Clique Duplo CTRL:</strong>
          <input
            type="checkbox"
            checked={appConfig.ctrlDoubleClickable}
            onChange={actions.setCtrlDoubleClickable}
          />

          <Select
            disabled={!appConfig.ctrlDoubleClickable}
            options={[
              { value: 'absolute', label: 'Absoluto' },
              { value: 'relative', label: 'Relativo' },
            ]}
            value={appConfig.ctrlDoubleClickMode}
            onChange={actions.setCtrlDoubleClickMode}
          />
        </Config>
      </Configs>

      <Separator />

      <Display>
        <Info>
          <Preset>
            <span>PRESET</span>
            <strong>
              {pedalState.bank ?? '-'}-
              {pedalState.patch ? mapIndexToPatchLetter(pedalState.patch) : '-'}
            </strong>
          </Preset>

          <Divider />

          <Tempo onClick={actions.tapTempo}>
            <strong>{pedalState.bpm ?? '---'}</strong>
            <span>BPM</span>
          </Tempo>
        </Info>

        <Actions>
          <Button onClick={actions.bankMinus}>BANK-</Button>
          <Button onClick={actions.bankPlus}>BANK+</Button>
          <Button onClick={actions.patchMinus}>PATCH-</Button>
          <Button onClick={actions.patchPlus}>PATCH+</Button>

          <Button onClick={() => actions.selectPatch('A')}>A</Button>
          <Button onClick={() => actions.selectPatch('B')}>B</Button>
          <Button onClick={() => actions.selectPatch('C')}>C</Button>
          <Button onClick={() => actions.selectPatch('D')}>D</Button>

          <Button onClick={() => actions.ctrl(1)}>CTRL 1</Button>
          <Button onClick={() => actions.ctrl(2)}>CTRL 2</Button>
          <Button onClick={() => actions.ctrl(3)}>CTRL 3</Button>
          <Button onClick={() => actions.ctrl(4)}>CTRL 4</Button>

          <Button onClick={() => actions.ctrl(5)}>CTRL 5</Button>
          <Button onClick={() => actions.ctrl(6)}>CTRL 6</Button>
          <Button onClick={() => actions.ctrl(7)}>CTRL 7</Button>
          <Button onClick={() => actions.ctrl(8)}>CTRL 8</Button>
        </Actions>
      </Display>
    </Content>
  );
}
