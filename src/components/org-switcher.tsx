'use client';

import { Check, ChevronsUpDown, GalleryVerticalEnd, Plus } from 'lucide-react';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { useAgent } from '@/contexts/agentContext';
import { useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
}

export function OrgSwitcher({
  agents,
  defaultAgent,
  onAgentSwitch
}: {
  agents: Agent[];
  defaultAgent: Agent;
  onAgentSwitch?: (agentId: string) => void;
}) {
  const router = useRouter();
  const [selectedAgent, setSelectedAgent] = React.useState<Agent | undefined>(
    defaultAgent || (agents.length > 0 ? agents[0] : undefined)
  );

  // @ts-ignore
  const { agentId, setAgentId } = useAgent();
  const [agentsList, setAgentsList] = React.useState<Agent[]>(agents);

  useEffect(() => {
    setAgentId(defaultAgent.id);
  }, []);

  const handleAgentSwitch = (agent: Agent) => {
    setSelectedAgent(agent);
    if (onAgentSwitch) {
      onAgentSwitch(agent.id);
    }
    setAgentId(agent.id);
  };

  const handleCreateNewAgent = () => {
    // Create new agent with incremented number
    const newAgentNumber = agentsList.length + 1;
    const newAgent: Agent = {
      id: `agent-${newAgentNumber}`,
      name: `Agent ${newAgentNumber}`
    };

    // Add to agents list
    setAgentsList((prev) => [...prev, newAgent]);

    // Set as selected agent
    setSelectedAgent(newAgent);

    // Call the callback if provided
    if (onAgentSwitch) {
      onAgentSwitch(newAgent.id);
    }

    // Navigate to configuration page
    router.push('/dashboard/configuration');
  };

  if (!selectedAgent) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                <GalleryVerticalEnd className='size-4' />
              </div>
              <div className='flex flex-col gap-0.5 leading-none'>
                <span className='font-semibold'>Agent</span>
                <span className=''>{selectedAgent.name}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width]'
            align='start'
          >
            {agentsList.map((agent) => (
              <DropdownMenuItem
                key={agent.id}
                onSelect={() => handleAgentSwitch(agent)}
              >
                {agent.name}{' '}
                {agent.id === selectedAgent.id && <Check className='ml-auto' />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleCreateNewAgent}>
              <Plus className='mr-2 h-4 w-4' />
              Create New Agent
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
