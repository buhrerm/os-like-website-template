import { useState, useEffect, useCallback } from 'react';
import { getSimulatedResponse, fetchOllamaModels, generateOllamaResponse } from './aiEngines';

export const useAIEngine = () => {
  const [status, setStatus] = useState('Offline');
  const [useOllama, setUseOllama] = useState(false);
  const [ollamaModels, setOllamaModels] = useState<string[]>([]);
  const [selectedOllamaModel, setSelectedOllamaModel] = useState('');
  const [isOllamaConnected, setIsOllamaConnected] = useState(false);
  const [hasError, setHasError] = useState(false);

  const updateStatus = useCallback(() => {
    if (useOllama && isOllamaConnected) {
      setStatus(`Online (Ollama - ${selectedOllamaModel})`);
    } else if (hasError) {
      setStatus('Error');
    } else {
      setStatus('Offline (Simulated)');
    }
  }, [useOllama, isOllamaConnected, hasError, selectedOllamaModel]);

  useEffect(() => {
    const initOllama = async () => {
      try {
        const models = await fetchOllamaModels();
        setOllamaModels(models);
        setIsOllamaConnected(models.length > 0);
        console.log('Available Ollama models:', models);

        if (models.length > 0) {
          const llama32Model = models.find((model) => model.startsWith('llama3.2'));
          const defaultModel = llama32Model || models[0];
          setSelectedOllamaModel(defaultModel);
          console.log('Selected Ollama model:', defaultModel);
        }
      } catch (error) {
        console.error('Failed to initialize Ollama:', error);
        setIsOllamaConnected(false);
        setHasError(true);
      }
    };

    initOllama();
  }, []);

  useEffect(() => {
    updateStatus();
  }, [updateStatus]);

  const handleToggleOllama = useCallback(() => {
    if (isOllamaConnected) {
      setUseOllama((prev) => !prev);
    } else {
      alert('Ollama is not connected. Please make sure Ollama is running and try again.');
    }
  }, [isOllamaConnected]);

  const handleAiMessage = useCallback(
    async (text: string) => {
      try {
        let response;
        if (useOllama && isOllamaConnected) {
          response = await generateOllamaResponse(
            [{ role: 'user', content: text }],
            selectedOllamaModel
          );
        } else {
          response = getSimulatedResponse(text);
        }
        return response;
      } catch (error) {
        console.error('Error generating AI response:', error);
        return 'Sorry, I encountered an error. Please try again or switch to a different mode.';
      }
    },
    [useOllama, isOllamaConnected, selectedOllamaModel]
  );

  return {
    status,
    useOllama,
    ollamaModels,
    selectedOllamaModel,
    isOllamaConnected,
    hasError,
    handleToggleOllama,
    setSelectedOllamaModel,
    handleAiMessage,
  };
};
