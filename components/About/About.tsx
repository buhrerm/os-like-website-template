import React, { useState } from 'react';
import { LCDText, LCDContainer, LCDButton } from '../utils/LCDComponents';
import { VolumeAppProps } from '../../types/app';
import {
  ABOUT_BIO,
  ABOUT_SKILLS,
  AUTHOR_NAME,
  ABOUT_INTERESTS,
  AUTHOR_EMAIL,
  GITHUB_USERNAME,
} from '../../constants/constants';

const AboutMe: React.FC<VolumeAppProps> = ({ colors, backlightOn, frontlightOn, displayOn }) => {
  const [activeSection, setActiveSection] = useState<'bio' | 'skills' | 'interests'>('bio');

  const renderContent = () => {
    switch (activeSection) {
      case 'bio':
        return (
          <LCDText
            colors={colors}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            displayOn={displayOn}
            className="text-sm mb-4"
          >
            {ABOUT_BIO}
          </LCDText>
        );
      case 'skills':
        return (
          <ul className="space-y-2">
            {ABOUT_SKILLS.map((skill) => (
              <li key={skill} className="flex items-start">
                <LCDText
                  colors={colors}
                  backlightOn={backlightOn}
                  frontlightOn={frontlightOn}
                  displayOn={displayOn}
                  className="text-sm flex-shrink-0 mr-2"
                >
                  -
                </LCDText>
                <LCDText
                  colors={colors}
                  backlightOn={backlightOn}
                  frontlightOn={frontlightOn}
                  displayOn={displayOn}
                  className="text-sm"
                >
                  {skill}
                </LCDText>
              </li>
            ))}
          </ul>
        );
      case 'interests':
        return (
          <ul className="space-y-2">
            {ABOUT_INTERESTS.map((interest) => (
              <li key={interest} className="flex items-start">
                <LCDText
                  colors={colors}
                  backlightOn={backlightOn}
                  frontlightOn={frontlightOn}
                  displayOn={displayOn}
                  className="text-sm flex-shrink-0 mr-2"
                >
                  -
                </LCDText>
                <LCDText
                  colors={colors}
                  backlightOn={backlightOn}
                  frontlightOn={frontlightOn}
                  displayOn={displayOn}
                  className="text-sm"
                >
                  {interest}
                </LCDText>
              </li>
            ))}
          </ul>
        );
    }
  };

  return (
    <div
      className="relative p-4 h-full flex flex-col"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mb-4 flex justify-between items-center">
        <LCDText
          colors={colors}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
          displayOn={displayOn}
          className="text-2xl font-bold"
        >
          {AUTHOR_NAME}
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
            Status: Online
          </LCDText>
          <div
            className={
              displayOn && frontlightOn
                ? 'bg-green-500 w-3 h-3 rounded-full'
                : 'w-3 h-3 rounded-full'
            }
          ></div>
        </div>
      </div>

      <div className="flex mb-4 space-x-2">
        {['bio', 'skills', 'interests'].map((section) => (
          <LCDButton
            key={section}
            onClick={() => setActiveSection(section as 'bio' | 'skills' | 'interests')}
            colors={colors}
            backlightOn={backlightOn}
            frontlightOn={frontlightOn}
            displayOn={displayOn}
            className={activeSection === section ? 'bg-opacity-50' : 'bg-opacity-20'}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </LCDButton>
        ))}
      </div>

      <LCDContainer
        colors={colors}
        backlightOn={backlightOn}
        frontlightOn={frontlightOn}
        displayOn={displayOn}
        inset={true}
        className="flex-grow p-4 overflow-auto"
      >
        {renderContent()}
      </LCDContainer>

      <div className="mt-4">
        <LCDText
          colors={colors}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
          displayOn={displayOn}
          className="text-sm"
        >
          Contact: {AUTHOR_EMAIL}
        </LCDText>
        <LCDText
          colors={colors}
          backlightOn={backlightOn}
          frontlightOn={frontlightOn}
          displayOn={displayOn}
          className="text-sm"
        >
          Github: {GITHUB_USERNAME}
        </LCDText>
      </div>
    </div>
  );
};

export default AboutMe;
