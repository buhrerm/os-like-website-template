import React, { useState } from 'react';
import { LCDText, LCDButton, LCDInput, LCDContainer } from '../utils/LCDComponents';
import { AppProps } from '../../types/app';
import { CHAT_INTRO_MESSAGES, AUTHOR_NICKNAME } from '../../constants/constants';

interface ChatInterfaceProps extends AppProps {
  handleAiMessage: (text: string) => Promise<string>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  handleAiMessage,
  colors,
  backlightOn,
  frontlightOn,
  displayOn,
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(CHAT_INTRO_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: message,
          sender: 'You',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setMessage('');
      setIsTyping(true);
      const response = await handleAiMessage(message);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: response,
          sender: `${AUTHOR_NICKNAME}AI`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  };

  return (
    <>
      <LCDContainer
        colors={colors}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        displayOn={displayOn}
        inset={true}
        className="flex-grow overflow-y-auto mb-4"
      >
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <LCDText
              colors={colors}
              backlightOn={backlightOn}
              frontlightOn={frontlightOn}
              displayOn={displayOn}
              size="sm"
            >
              [{msg.timestamp}] {msg.sender}: {msg.text}
            </LCDText>
          </div>
        ))}
        {isTyping && (
          <LCDText
            colors={colors}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            displayOn={displayOn}
            size="sm"
            className="italic"
          >
            {AUTHOR_NICKNAME}AI is typing...
          </LCDText>
        )}
      </LCDContainer>

      <div className="flex mb-2">
        <LCDInput
          colors={colors}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
          displayOn={displayOn}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow rounded-l"
          placeholder=""
        />
        <LCDButton
          colors={colors}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
          displayOn={displayOn}
          onClick={handleSend}
          className="px-4 py-1 rounded-r"
        >
          Send
        </LCDButton>
      </div>
    </>
  );
};

export default ChatInterface;
