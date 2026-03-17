import { useState } from 'react';

import {
  Content,
  Title,
  Connect,
  Separator,
  Configs,
  Config,
  Display,
  Info,
  Patch,
  Divider,
  Tempo,
  Actions,
} from './styles';

import { ConnectionIcon } from '../../components/icons/ConnectionIcon';
import { ResetIcon } from '../../components/icons/ResetIcon';
import { SaveIcon } from '../../components/icons/SaveIcon';

import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';
import { ProtectedInput } from '../../components/ui/ProtectedInput';
import { Select } from '../../components/ui/Select';

export function HomePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [initialBank, setInitialBank] = useState(35);
  const [initialSlot, setInitialSlot] = useState('A');
  const [globalBPM] = useState(120);
  const [isTapTempoGlobal, setIsTapTempoGlobal] = useState(true);
  const [isCtrlDoubleClickable, setIsCtrlDoubleClickable] = useState(true);
  const [ctrlMode, setCtrlMode] = useState<'absolute' | 'relative'>('absolute');

  return (
    <Content>
      <Title>Pocket Cortex</Title>

      <Connect>
        <div>
          <p>
            <strong>Status: </strong>
            <span>{isConnected ? '🟢 Conectado' : '⚫ Desconectado'}</span>
          </p>

          <p>
            <strong>Dispositivo: </strong>
            <span>{isConnected ? 'GP-200' : ''}</span>
          </p>
        </div>

        <Button
          variant={isConnected ? 'danger' : 'primary'}
          onClick={() => setIsConnected((prev) => !prev)}
        >
          {isConnected ? <ResetIcon /> : <ConnectionIcon />}
          <span>{isConnected ? 'Resetar' : 'Conectar'}</span>
        </Button>
      </Connect>

      <Separator />

      <Configs>
        <header>
          <h2>Configurações</h2>

          <IconButton icon={<SaveIcon />} />
        </header>

        <Config>
          <strong>Patch Inicial:</strong>
          <ProtectedInput
            type="number"
            min={1}
            max={64}
            value={initialBank}
            onChange={(e) => {
              const min = Number(e.currentTarget.min);
              const max = Number(e.currentTarget.max);
              const value = Number(e.currentTarget.value);

              if (value >= min && value <= max) {
                setInitialBank(value);
              }
            }}
          />
          <ProtectedInput
            type="text"
            pattern="^[ABCD]$"
            maxLength={1}
            value={initialSlot}
            onChange={(e) => {
              const pattern = e.currentTarget.pattern;
              const value = e.currentTarget.value.toUpperCase();

              if (new RegExp(pattern).test(value)) {
                setInitialSlot(value);
              }
            }}
          />
        </Config>

        <Config>
          <strong>Tap Tempo Global:</strong>
          <input
            type="checkbox"
            checked={isTapTempoGlobal}
            onChange={(e) => setIsTapTempoGlobal(e.currentTarget.checked)}
          />
        </Config>

        <Config>
          <strong>Clique Duplo CTRL:</strong>
          <input
            type="checkbox"
            checked={isCtrlDoubleClickable}
            onChange={(e) => setIsCtrlDoubleClickable(e.currentTarget.checked)}
          />

          <Select
            disabled={!isCtrlDoubleClickable}
            options={[
              { value: 'absolute', label: 'Absoluto' },
              { value: 'relative', label: 'Relativo' },
            ]}
            value={ctrlMode}
            onChange={(e) =>
              setCtrlMode(e.currentTarget.value as 'absolute' | 'relative')
            }
          />
        </Config>
      </Configs>

      <Separator />

      <Display>
        <Info>
          <Patch>
            <span>PATCH</span>
            <strong>{`${initialBank}-${initialSlot}`}</strong>
          </Patch>

          <Divider />

          <Tempo>
            <strong>{globalBPM}</strong>
            <span>BPM</span>
          </Tempo>
        </Info>

        <Actions>
          <Button>BANK-</Button>
          <Button>BANK+</Button>
          <Button>PATCH-</Button>
          <Button>PATCH+</Button>

          <Button>A</Button>
          <Button>B</Button>
          <Button>C</Button>
          <Button>D</Button>

          <Button>CTRL 1</Button>
          <Button>CTRL 2</Button>
          <Button>CTRL 3</Button>
          <Button>CTRL 4</Button>

          <Button>CTRL 5</Button>
          <Button>CTRL 6</Button>
          <Button>CTRL 7</Button>
          <Button>CTRL 8</Button>
        </Actions>
      </Display>
    </Content>
  );
}
