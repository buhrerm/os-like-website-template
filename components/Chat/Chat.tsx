import React from 'react';
import { LCDText } from '../utils/LCDComponents';
import { useAIEngine } from './useAiEngine';
import ChatInterface from './ChatInterface';
import AIEngineControls from './AIEngineControls';
import ContactInfo from './ContactInfo';
import { VolumeAppProps } from '../../types/app';

const MessagingCenter: React.FC<VolumeAppProps> = ({
  colors,
  backlightOn,
  frontlightOn,
  displayOn,
}) => {
  const {
    status,
    useOllama,
    ollamaModels,
    selectedOllamaModel,
    isOllamaConnected,
    handleToggleOllama,
    setSelectedOllamaModel,
    handleAiMessage,
  } = useAIEngine();

  return (
    <div
      className="relative p-4 h-full flex flex-col"
      style={{
        backgroundColor: colors.background,
      }}
    >
      <div className="mb-4 flex justify-between items-center">
        <LCDText
          colors={colors}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
          displayOn={displayOn}
          className="text-2xl font-bold"
        >
          Buh.re Chat
        </LCDText>
        <div className="flex items-center">
          <LCDText
            colors={colors}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            displayOn={displayOn}
            className="mr-2"
            size="sm"
          >
            {status}
          </LCDText>
          <div
            className={`w-3 h-3 rounded-full ${
              displayOn && frontlightOn
                ? status.startsWith('Online')
                  ? 'bg-green-500'
                  : status === 'Error'
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
                : ''
            }`}
          ></div>
        </div>
      </div>

      <AIEngineControls
        isOllamaConnected={isOllamaConnected}
        useOllama={useOllama}
        handleToggleOllama={handleToggleOllama}
        ollamaModels={ollamaModels}
        selectedOllamaModel={selectedOllamaModel}
        setSelectedOllamaModel={setSelectedOllamaModel}
        colors={colors}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        displayOn={displayOn}
      />

      <ChatInterface
        handleAiMessage={handleAiMessage}
        colors={colors}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        displayOn={displayOn}
      />

      <ContactInfo
        colors={colors}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        displayOn={displayOn}
      />
    </div>
  );
};

export default MessagingCenter;
