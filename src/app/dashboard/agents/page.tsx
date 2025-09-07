'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  Plus,
  Bot,
  MessageSquare,
  UserMinus,
  Star,
  RotateCcw,
  UserPlus,
  Search,
  Settings,
  Play,
  Pause,
  Calendar,
  Activity
} from 'lucide-react';

const AgentsPage = () => {
  const router = useRouter();
  const [deployingAgent, setDeployingAgent] = useState(null);

  // Active agents
  const activeAgents = [
    {
      id: 'nps-agent-01',
      name: 'NPS Follow-up Assistant',
      description:
        'Conducts automated follow-up interviews with customers who submitted NPS scores to gather detailed feedback.',
      interviewType: 'NPS follow up',
      icon: <Star className='h-5 w-5 text-gray-600' />,
      createdAt: '3 weeks ago',
      status: 'active',
      conversationsToday: 24
    },
    {
      id: 'churn-agent-01',
      name: 'Churn Prevention Bot',
      description:
        'Identifies at-risk customers and conducts retention interviews to understand pain points.',
      interviewType: 'Churn',
      icon: <UserMinus className='h-5 w-5 text-gray-600' />,
      createdAt: '2 months ago',
      status: 'active',
      conversationsToday: 12
    },
    {
      id: 'onboarding-agent-01',
      name: 'New User Experience Guide',
      description:
        'Helps new users through their first experience and gathers feedback on the onboarding process.',
      interviewType: 'Onboarding',
      icon: <UserPlus className='h-5 w-5 text-gray-600' />,
      createdAt: '1 month ago',
      status: 'paused',
      conversationsToday: 0
    }
  ];

  // Available agent templates
  const agentTemplates = [
    {
      id: 'feature-feedback-template',
      name: 'Feature Feedback Collector',
      description:
        'Gathers detailed feedback on specific features from users who have recently interacted with them.',
      interviewType: 'Feature Feedback',
      icon: <MessageSquare className='h-5 w-5 text-gray-600' />,
      popular: true
    },
    {
      id: 'renewal-template',
      name: 'Renewal Interview Agent',
      description:
        'Conducts strategic interviews with customers approaching renewal to understand satisfaction and needs.',
      interviewType: 'Renewal',
      icon: <RotateCcw className='h-5 w-5 text-gray-600' />,
      popular: true
    },
    {
      id: 'discovery-template',
      name: 'Product Discovery Researcher',
      description:
        'Conducts discovery interviews to understand user needs and validate product hypotheses.',
      interviewType: 'Product Discovery',
      icon: <Search className='h-5 w-5 text-gray-600' />,
      popular: false
    },
    {
      id: 'nps-template',
      name: 'NPS Deep Dive Agent',
      description:
        'Advanced NPS follow-up agent with customizable question flows based on score ranges.',
      interviewType: 'NPS follow up',
      icon: <Star className='h-5 w-5 text-gray-600' />,
      popular: false
    },
    {
      id: 'advanced-churn-template',
      name: 'Advanced Churn Analysis Agent',
      description:
        'Sophisticated churn prevention agent with predictive triggers and personalized approaches.',
      interviewType: 'Churn',
      icon: <UserMinus className='h-5 w-5 text-gray-600' />,
      popular: false
    },
    {
      id: 'onboarding-template',
      name: 'Onboarding Optimization Agent',
      description:
        'Comprehensive onboarding agent that adapts based on user behavior and provides personalized guidance.',
      interviewType: 'Onboarding',
      icon: <UserPlus className='h-5 w-5 text-gray-600' />,
      popular: false
    }
  ];

  const handleDeploy = async (templateId) => {
    setDeployingAgent(templateId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setDeployingAgent(null);
    // Here you would handle the actual deployment logic
    console.log(`Deploying agent template ${templateId}`);
  };

  const handleCreateNewAgent = () => {
    router.push('/dashboard/configuration');
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <Badge
          variant='default'
          className='border-green-200 bg-green-100 text-xs text-green-800'
        >
          <CheckCircle className='mr-1 h-3 w-3' />
          Active
        </Badge>
      );
    } else if (status === 'paused') {
      return (
        <Badge variant='secondary' className='text-xs'>
          <Pause className='mr-1 h-3 w-3' />
          Paused
        </Badge>
      );
    }
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4 p-4 pt-6 md:p-6'>
        <div className='max-w-8xl mx-auto space-y-8'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div>
              <Heading
                title='Agents'
                description='Deploy AI agents to conduct automated customer interviews and gather valuable insights'
              />
            </div>
            <div className='flex items-center space-x-3'>
              <Badge variant='outline' className='text-sm'>
                <Bot className='mr-2 h-4 w-4' />
                {activeAgents.length} Active Agents
              </Badge>
              <Button onClick={handleCreateNewAgent}>
                <Plus className='mr-2 h-4 w-4' />
                Create New Agent
              </Button>
            </div>
          </div>

          <Separator />

          {/* Active Agents */}
          <div className='space-y-6'>
            <div>
              <h2 className='text-foreground mb-4 text-xl font-semibold'>
                Active Agents
              </h2>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {activeAgents.map((agent) => (
                  <Card key={agent.id} className='relative'>
                    <CardHeader className='pb-3'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center space-x-3'>
                          {agent.icon}
                          <div>
                            <CardTitle className='text-lg'>
                              {agent.name}
                            </CardTitle>
                            {getStatusBadge(agent.status)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground mb-3 text-sm'>
                        {agent.description}
                      </p>
                      <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <Badge variant='secondary' className='text-xs'>
                            {agent.interviewType}
                          </Badge>
                          <span className='text-muted-foreground flex items-center text-xs'>
                            <Calendar className='mr-1 h-3 w-3' />
                            Created {agent.createdAt}
                          </span>
                        </div>
                        <div className='flex items-center justify-between border-t pt-2'>
                          <span className='text-muted-foreground flex items-center text-xs'>
                            <Activity className='mr-1 h-3 w-3' />
                            {agent.conversationsToday} conversations today
                          </span>
                          <Button size='sm' variant='outline'>
                            <Settings className='mr-2 h-4 w-4' />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Agent Templates */}
            <div>
              <h2 className='text-foreground mb-4 text-xl font-semibold'>
                Agent Templates
              </h2>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {agentTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className='relative transition-shadow hover:shadow-md'
                  >
                    {template.popular && (
                      <div className='absolute -top-2 -right-2'>
                        <Badge variant='outline' className='text-xs'>
                          Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className='pb-3'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center space-x-3'>
                          {template.icon}
                          <div>
                            <CardTitle className='text-lg'>
                              {template.name}
                            </CardTitle>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground mb-4 text-sm'>
                        {template.description}
                      </p>
                      <div className='flex items-center justify-between'>
                        <Badge variant='secondary' className='text-xs'>
                          {template.interviewType}
                        </Badge>
                        <Button
                          size='sm'
                          onClick={() => handleDeploy(template.id)}
                          disabled={deployingAgent === template.id}
                          className='ml-2'
                        >
                          {deployingAgent === template.id ? (
                            <>
                              <div className='mr-2 h-3 w-3 animate-spin rounded-full border-b-2 border-white'></div>
                              Deploying...
                            </>
                          ) : (
                            <>
                              <Play className='mr-2 h-4 w-4' />
                              Deploy
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AgentsPage;
