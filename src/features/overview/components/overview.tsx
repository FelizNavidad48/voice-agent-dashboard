'use client';

import React, { useState } from 'react';
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
  AlertTriangle,
  CheckCircle,
  Users,
  MessageSquare,
  Target,
  BarChart3,
  PaperclipIcon,
  MicIcon,
  Plus,
  Send,
  Bot,
  FileText,
  Search,
  Presentation
} from 'lucide-react';

export default function CustomerInsightsDashboard() {
  const [chatInput, setChatInput] = useState('');

  // Sample live intelligence data
  const liveInsights = [
    {
      id: 1,
      title: 'Export Functionality Failures Driving User Churn',
      priority: 'P0',
      description:
        'Critical issue affecting multiple users daily with significant business impact',
      userQuote:
        "Pretty much every time I try to export anything over 50MB, so that's like daily for us. It's becoming a real workflow blocker.",
      sentiment: -0.7,
      userType: 'Power Users, Enterprise',
      metrics: {
        successRate: '42%',
        targetRate: '95%',
        usersAffected: 23,
        revenueAtRisk: '$45,000/month',
        churnProbability: '67%',
        npsImpact: '-15 points'
      },
      recommendation:
        'Fix export timeout issue in backend service - prioritize files >50MB'
    },
    {
      id: 2,
      title: 'Pricing Structure Confusion',
      priority: 'P1',
      description:
        'Users struggling to understand Pro vs Enterprise differences',
      userQuote:
        'I spent way too long trying to understand what the difference between Pro and Enterprise was...',
      metrics: {
        checkoutAbandonment: '77%',
        sessionLength: '3.2x longer pricing page sessions'
      },
      recommendation: 'Simplify pricing tiers and clarify value propositions'
    },
    {
      id: 3,
      title: 'Support Response Time Issues',
      priority: 'P2',
      description: 'Extended wait times leading to user frustration',
      userQuote:
        "Had to hang up after waiting 20 minutes for support. That's just too long when you need help urgently.",
      metrics: {
        avgWaitTime: '18 minutes',
        targetTime: '2 minutes',
        impact: 'Frustration leading to negative reviews'
      },
      recommendation: 'Implement chat-first support with AI assistance'
    }
  ];

  const agents = [
    {
      id: 1,
      name: 'Customer Feedback Analyzer',
      description: 'Analyzes customer feedback and generates insights',
      icon: <MessageSquare className='h-5 w-5' />,
      lastRun: '2 hours ago'
    },
    {
      id: 2,
      name: 'Deep Research Agent',
      description: 'Conducts comprehensive market and user research',
      icon: <Search className='h-5 w-5' />,
      lastRun: '1 day ago'
    },
    {
      id: 3,
      name: 'Presentation Generator',
      description: 'Creates executive presentations from insights',
      icon: <Presentation className='h-5 w-5' />,
      lastRun: '3 days ago'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P0':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'P1':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'P2':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleChatSubmit = () => {
    console.log('Chat message:', chatInput);
    setChatInput('');
  };

  return (
    <div className='bg-background min-h-screen p-6'>
      <div className='max-w-8xl mx-auto space-y-8'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Product Intelligence Dashboard
            </h1>
            <p className='text-muted-foreground mt-1'>
              AI-powered insights and automated reporting
            </p>
          </div>
        </div>

        {/* AI Chat Interface */}

        <div className='flex space-x-4'>
          <div className='flex-1'>
            <div className='flex items-center space-x-2 rounded-lg border bg-white p-3 py-5'>
              <input
                type='text'
                placeholder='Ask me anything about your product insights...'
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className='flex-1 border-none outline-none'
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
              />
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                <PaperclipIcon className='h-4 w-4' />
              </Button>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                <MicIcon className='h-4 w-4' />
              </Button>
              <Button
                onClick={handleChatSubmit}
                size='sm'
                className='h-8 w-8 p-0'
              >
                <Send className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Live Intelligence - Takes up 2 columns */}
          <div className='space-y-6 lg:col-span-2'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold'>Live Intelligence</h2>
              <Badge variant='outline' className='text-sm'>
                <BarChart3 className='mr-2 h-4 w-4' />
                Real-time insights
              </Badge>
            </div>

            <div className='space-y-4'>
              {liveInsights.map((insight) => (
                <Card key={insight.id}>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='mb-2 flex items-center space-x-3'>
                          <Badge className={getPriorityColor(insight.priority)}>
                            {insight.priority} Priority
                          </Badge>
                        </div>
                        <CardTitle className='mb-2 text-lg'>
                          {insight.title}
                        </CardTitle>
                        <CardDescription>{insight.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    {/* User Quote */}
                    <div className='rounded-r-lg border-l-4 border-gray-300 bg-gray-50 p-3'>
                      <p className='text-sm text-gray-700 italic'>
                        "{insight.userQuote}"
                      </p>
                      {insight.userType && (
                        <p className='mt-1 text-xs text-gray-500'>
                          • {insight.userType}
                        </p>
                      )}
                    </div>

                    {/* Metrics Grid */}
                    <div className='grid grid-cols-2 gap-4 text-sm md:grid-cols-3'>
                      {Object.entries(insight.metrics).map(([key, value]) => (
                        <div key={key}>
                          <p className='text-muted-foreground capitalize'>
                            {key == 'npsImpact'
                              ? 'NPS Impact'
                              : key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </p>
                          <p className='font-semibold'>{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Recommendation */}
                    <div className='rounded-lg border border-green-200 bg-green-50 p-3'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-start space-x-2'>
                          <CheckCircle className='mt-0.5 h-4 w-4 text-green-600' />
                          <div>
                            <p className='mb-1 text-sm font-medium text-green-800'>
                              Recommended Action
                            </p>
                            <p className='text-sm text-green-700'>
                              {insight.recommendation}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant='outline'
                          className='border border-green-200 bg-green-50 text-green-800 hover:bg-green-200/10 hover:text-green-900'
                        >
                          Add ticket
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Agents Section - Takes up 1 column */}
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold'>Workflow Agents</h2>
              <Button size='sm' variant='outline'>
                <Plus className='mr-2 h-4 w-4' />
                Add Agent
              </Button>
            </div>

            <div className='space-y-4'>
              {agents.map((agent) => (
                <Card key={agent.id}>
                  <CardHeader className='pb-3'>
                    <div className='flex items-start space-x-3'>
                      <div className='rounded-lg bg-gray-100 p-2'>
                        {agent.icon}
                      </div>
                      <div className='flex-1'>
                        <CardTitle className='text-base'>
                          {agent.name}
                        </CardTitle>
                        <CardDescription className='text-sm'>
                          {agent.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='pt-0'>
                    <div className='flex items-center justify-between'>
                      <p className='text-muted-foreground text-xs'>
                        Last run: {agent.lastRun}
                      </p>
                      <Button size='sm' variant='outline'>
                        Run Now
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
  );
}
