'use client';

import { useState } from 'react';
import { FakeChat } from './FakeChat';
import { ChatEmbed } from './ChatEmbed';

interface ChatSectionProps {
  t: {
    splashHeadline: string;
    splashSub: string;
    splashCta: string;
    splashNote: string;
  };
}

export function ChatSection({ t }: ChatSectionProps) {
  const [showReal, setShowReal] = useState(false);

  if (showReal) {
    return <ChatEmbed t={t} />;
  }

  return <FakeChat onStartReal={() => setShowReal(true)} />;
}
