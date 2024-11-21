import React from 'react';
import { LCDText, LCDLink, LCDToggle, LCDDropdown } from '../utils/LCDComponents';
import { AppProps } from '../../types/app';

interface AIEngineControlsProps extends AppProps {
  isOllamaConnected: boolean;
  useOllama: boolean;
  handleToggleOllama: () => void;
  ollamaModels: string[];
  selectedOllamaModel: string;
  setSelectedOllamaModel: (model: string) => void;
}

const AIEngineControls: React.FC<AIEngineControlsProps> = ({
  isOllamaConnected,
  useOllama,
  handleToggleOllama,
  ollamaModels,
  selectedOllamaModel,
  setSelectedOllamaModel,
  colors,
  backlightOn,
  frontlightOn,
  displayOn,
}) => {
  return (
    <div className="relative flex flex-col" style={{ backgroundColor: colors.background }}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <LCDText
            colors={colors}
            displayOn={displayOn}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            className="mr-2"
            size="xs"
          >
            WebLLM
          </LCDText>
          <LCDToggle
            isOn={false}
            colors={colors}
            displayOn={displayOn}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            disabled={true}
            onToggle={() => {}}
          />
        </div>
        <div className="flex items-center">
          <LCDText
            colors={colors}
            displayOn={displayOn}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            className="mr-2"
            size="xs"
          >
            "WebLLM Coming Soon!"
          </LCDText>
          <LCDLink
            href={'https://webgpureport.org/'}
            colors={colors}
            displayOn={displayOn}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            className="mb-2 overflow-hidden whitespace-nowrap block"
            style={{
              animation: 'marquee 15s linear infinite',
            }}
          >
            <LCDText
              size="sm"
              colors={colors}
              displayOn={displayOn}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
            >
              {'Click for Browser Compatibility Check'}
            </LCDText>
          </LCDLink>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <LCDText
            colors={colors}
            displayOn={displayOn}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            className="mr-2"
            size="xs"
          >
            Ollama
          </LCDText>
          <LCDToggle
            colors={colors}
            displayOn={displayOn}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            isOn={useOllama}
            onToggle={handleToggleOllama}
            disabled={!isOllamaConnected}
          />
        </div>
        {useOllama && (
          <LCDDropdown
            options={ollamaModels.map((model) => ({ value: model, label: model }))}
            value={selectedOllamaModel}
            onChange={setSelectedOllamaModel}
            colors={colors}
            displayOn={displayOn}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            label="Model"
            dropDirection="center"
          />
        )}
        <LCDText
          colors={colors}
          displayOn={displayOn}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
          className="ml-2"
          size="xs"
        >
          {isOllamaConnected ? 'Connected' : 'Not Connected'}
        </LCDText>
      </div>
    </div>
  );
};

export default AIEngineControls;
