'use client';

import React, { createContext, useContext, useState } from 'react';

const AgentContext = createContext();

export function AgentProvider({ children }) {
  const [agentId, setAgentId] = useState('my-agent-123');

  return (
    <AgentContext.Provider value={{ agentId, setAgentId }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}
