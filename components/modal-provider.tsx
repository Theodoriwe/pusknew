"use client";

import { ContactModal } from "@/components/contact-modal";
import { QuizModal } from "@/components/quiz-modal";
import { CallModal } from "@/components/call-modal";
import { ChatModal } from "@/components/chat-modal";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ContactModal />
      <QuizModal />
      <CallModal />
      <ChatModal />
    </>
  );
}
