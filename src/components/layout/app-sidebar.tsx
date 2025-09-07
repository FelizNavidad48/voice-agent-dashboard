'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useUser } from '@clerk/nextjs';
import {
  IconBell,
  IconChevronRight,
  IconChevronsDown,
  IconCreditCard,
  IconLogout,
  IconPhotoUp,
  IconUserCircle,
  IconRobot,
  IconPlus,
  IconDashboard,
  IconMessageCircle,
  IconPlugConnected,
  IconSelector
} from '@tabler/icons-react';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';
import { OrgSwitcher } from '../org-switcher';
import { useAgent } from '@/contexts/agentContext';

// Agents dummy data
const agents = [
  {
    id: 'agent-id-1',
    name: 'Sales Assistant',
    description: 'Handles customer inquiries and sales support'
  },
  {
    id: 'agent-id-2',
    name: 'Support Bot',
    description: 'Provides technical support and troubleshooting'
  },
  {
    id: 'agent-id-3',
    name: 'Analytics Agent',
    description: 'Analyzes data and generates reports'
  }
];

const projects = [
  {
    id: 'project-id-1',
    name: 'Q4 2025',
    description: 'Handles customer inquiries and sales support'
  },
  {
    id: 'project-id-2',
    name: 'Q2 2024',
    description: 'Provides technical support and troubleshooting'
  }
];

// Project wide overview navigation items
const projectWideNavItems = [
  {
    title: 'Agents',
    url: '/dashboard/agents',
    icon: IconRobot,
    isActive: false
  },
  {
    title: 'Create New Agent',
    url: '/dashboard/configuration',
    icon: IconPlus,
    isActive: false
  }
];

// Agent wise overview navigation items
const agentWiseNavItems = [
  {
    title: 'Overview',
    url: '/dashboard/overview',
    icon: IconDashboard,
    isActive: false
  },
  {
    title: 'Conversations',
    url: '/dashboard/conversations',
    icon: IconMessageCircle,
    isActive: false
  },
  {
    title: 'Integrations',
    url: '/dashboard/integrations',
    icon: IconPlugConnected,
    isActive: false
  }
];

export default function AppSidebar() {
  const pathname = usePathname();
  // @ts-ignore
  const { agentId, setAgentId } = useAgent();

  const { isOpen } = useMediaQuery();
  const { user } = useUser();
  const router = useRouter();

  // Set active agent based on agentId or default to first agent
  const activeAgent = agents.find((agent) => agent.id === agentId) || agents[0];

  const activeProject = projects[0];

  const handleSwitchAgent = (agentId: string) => {
    setAgentId(agentId);
  };

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  const renderNavigationItems = (items: typeof projectWideNavItems) => {
    return items.map((item) => {
      const Icon = item.icon;
      return item?.items && item?.items?.length > 0 ? (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={item.isActive}
          className='group/collapsible'
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={pathname === item.url}
              >
                {item.icon && <Icon />}
                <span>{item.title}</span>
                <IconChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === subItem.url}
                    >
                      <Link href={subItem.url}>
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ) : (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            tooltip={item.title}
            isActive={pathname === item.url}
          >
            <Link href={item.url}>
              <Icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <OrgSwitcher agents={projects} defaultAgent={activeProject} />
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        {/* Project wide overview section */}
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            {renderNavigationItems(projectWideNavItems)}
          </SidebarMenu>
        </SidebarGroup>

        {/* Agent wise overview section */}
        <SidebarGroup>
          <div className='mb-2 flex items-center justify-between'>
            <SidebarGroupLabel>Agents</SidebarGroupLabel>
          </div>

          {/* Agent Selector */}
          <div className='mb-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full'
                >
                  <div className='flex flex-col gap-0.5 text-left leading-none'>
                    <span className='font-semibold'>Agent</span>
                    <span className='text-muted-foreground text-sm'>
                      {activeAgent.name}
                    </span>
                  </div>
                  <IconSelector className='ml-auto size-8' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width]'
                align='start'
                sideOffset={8}
              >
                {agents.map((agent) => (
                  <DropdownMenuItem
                    key={agent.id}
                    onSelect={() => handleSwitchAgent(agent.id)}
                  >
                    <span className='flex-1'>{agent.name}</span>
                    {activeAgent.id === agent.id && (
                      <span className='ml-auto text-xs'>✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <SidebarMenu>{renderNavigationItems(agentWiseNavItems)}</SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  {user && (
                    <UserAvatarProfile
                      className='h-8 w-8 rounded-lg'
                      showInfo
                      user={user}
                    />
                  )}
                  <IconChevronsDown className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='px-1 py-1.5'>
                    {user && (
                      <UserAvatarProfile
                        className='h-8 w-8 rounded-lg'
                        showInfo
                        user={user}
                      />
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push('/dashboard/profile')}
                  >
                    <IconUserCircle className='mr-2 h-4 w-4' />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconCreditCard className='mr-2 h-4 w-4' />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconBell className='mr-2 h-4 w-4' />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <IconLogout className='mr-2 h-4 w-4' />
                  <SignOutButton redirectUrl='/auth/sign-in' />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
