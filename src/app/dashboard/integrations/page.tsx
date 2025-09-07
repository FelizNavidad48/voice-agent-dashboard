'use client';

import React, { useState } from 'react';
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
  BarChart3,
  Activity,
  Eye,
  MousePointer,
  Zap,
  TrendingUp,
  Users,
  Target,
  Gauge,
  Play,
  Settings
} from 'lucide-react';

const IntegrationsPage = () => {
  const [connectingTo, setConnectingTo] = useState(null);

  // Connected integrations
  const connectedIntegrations = [
    {
      id: 'posthog',
      name: 'PostHog',
      description:
        'Open-source product analytics platform with event tracking, feature flags, and session recordings.',
      category: 'Product Analytics',
      icon: <BarChart3 className='h-8 w-8 text-orange-600' />,
      connectedAt: '2 months ago',
      status: 'active'
    },
    {
      id: 'statsig',
      name: 'Statsig',
      description:
        'Feature management and experimentation platform for A/B testing and feature flags.',
      category: 'Feature Management',
      icon: <Zap className='h-8 w-8 text-blue-600' />,
      connectedAt: '1 month ago',
      status: 'active'
    }
  ];

  // Available integrations
  const availableIntegrations = [
    {
      id: 'amplitude',
      name: 'Amplitude',
      description:
        'Enterprise-grade product analytics with advanced user journey analysis and segmentation.',
      category: 'Product Analytics',
      icon: <TrendingUp className='h-8 w-8 text-blue-700' />,
      popular: true
    },
    {
      id: 'mixpanel',
      name: 'Mixpanel',
      description:
        'Real-time user behavior analytics with powerful event tracking and funnel analysis.',
      category: 'Product Analytics',
      icon: <Activity className='h-8 w-8 text-purple-600' />,
      popular: true
    },
    {
      id: 'heap',
      name: 'Heap',
      description:
        'Automatically captures every user interaction without requiring code changes.',
      category: 'Product Analytics',
      icon: <MousePointer className='h-8 w-8 text-green-600' />
    },
    {
      id: 'fullstory',
      name: 'FullStory',
      description:
        'Complete user experience analytics with session replays and click tracking.',
      category: 'User Experience',
      icon: <Eye className='h-8 w-8 text-red-600' />
    },
    {
      id: 'pendo',
      name: 'Pendo',
      description:
        'Product analytics combined with in-app guidance and user feedback collection.',
      category: 'Product Analytics',
      icon: <Users className='h-8 w-8 text-indigo-600' />
    },
    {
      id: 'hotjar',
      name: 'Hotjar',
      description:
        'User behavior analytics with heatmaps, session recordings, and user surveys.',
      category: 'User Experience',
      icon: <Target className='h-8 w-8 text-orange-500' />
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics 4',
      description:
        'Comprehensive web and app analytics with advanced reporting capabilities.',
      category: 'Web Analytics',
      icon: <Gauge className='h-8 w-8 text-yellow-600' />
    },
    {
      id: 'logrocket',
      name: 'LogRocket',
      description:
        'Session replay and performance monitoring with error tracking and debugging tools.',
      category: 'Performance',
      icon: <Play className='h-8 w-8 text-purple-700' />
    }
  ];

  const handleConnect = async (integrationId) => {
    setConnectingTo(integrationId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setConnectingTo(null);
    // Here you would handle the actual connection logic
    console.log(`Connecting to ${integrationId}`);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Product Analytics':
        return 'bg-blue-100 text-blue-800';
      case 'User Experience':
        return 'bg-green-100 text-green-800';
      case 'Feature Management':
        return 'bg-purple-100 text-purple-800';
      case 'Web Analytics':
        return 'bg-yellow-100 text-yellow-800';
      case 'Performance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
                title='Integrations'
                description='Connect your analytics tools to get a complete view of customer behavior'
              />
            </div>
            <div className='flex items-center space-x-3'>
              <Badge variant='outline' className='text-sm'>
                <Settings className='mr-2 h-4 w-4' />
                {connectedIntegrations.length} Connected
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Connected Integrations */}
          <div className='space-y-6'>
            <div>
              <h2 className='text-foreground mb-4 text-xl font-semibold'>
                Connected Integrations
              </h2>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {connectedIntegrations.map((integration) => (
                  <Card key={integration.id} className='relative'>
                    <CardHeader className='pb-3'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center space-x-3'>
                          {integration.icon}
                          <div>
                            <CardTitle className='text-lg'>
                              {integration.name}
                            </CardTitle>
                            <Badge className='mt-1 bg-green-100 text-green-800 hover:bg-green-100'>
                              <CheckCircle className='mr-1 h-3 w-3' />
                              Connected
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground mb-3 text-sm'>
                        {integration.description}
                      </p>
                      <div className='flex items-center justify-between'>
                        <Badge
                          variant='secondary'
                          className={getCategoryColor(integration.category)}
                        >
                          {integration.category}
                        </Badge>
                        <span className='text-muted-foreground text-xs'>
                          Connected {integration.connectedAt}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Available Integrations */}
            <div>
              <h2 className='text-foreground mb-4 text-xl font-semibold'>
                Available Integrations
              </h2>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {availableIntegrations.map((integration) => (
                  <Card
                    key={integration.id}
                    className='relative transition-shadow hover:shadow-md'
                  >
                    {integration.popular && (
                      <div className='absolute -top-2 -right-2'>
                        <Badge className='bg-orange-100 text-orange-800 hover:bg-orange-100'>
                          Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className='pb-3'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center space-x-3'>
                          {integration.icon}
                          <div>
                            <CardTitle className='text-lg'>
                              {integration.name}
                            </CardTitle>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-muted-foreground mb-4 text-sm'>
                        {integration.description}
                      </p>
                      <div className='flex items-center justify-between'>
                        <Badge
                          variant='secondary'
                          className={getCategoryColor(integration.category)}
                        >
                          {integration.category}
                        </Badge>
                        <Button
                          size='sm'
                          onClick={() => handleConnect(integration.id)}
                          disabled={connectingTo === integration.id}
                          className='ml-2'
                        >
                          {connectingTo === integration.id ? (
                            <>
                              <div className='mr-2 h-3 w-3 animate-spin rounded-full border-b-2 border-white'></div>
                              Connecting...
                            </>
                          ) : (
                            <>
                              <Plus className='mr-2 h-4 w-4' />
                              Connect
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

          {/* Integration Categories Overview */}
          {/*<div className='rounded-lg border bg-muted/50 p-6'>*/}
          {/*    <h3 className='text-lg font-semibold mb-4'>Integration Categories</h3>*/}
          {/*    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>*/}
          {/*        <div className='text-center'>*/}
          {/*            <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>*/}
          {/*                <BarChart3 className='h-6 w-6 text-blue-600' />*/}
          {/*            </div>*/}
          {/*            <h4 className='font-medium'>Product Analytics</h4>*/}
          {/*            <p className='text-sm text-muted-foreground'>Track user behavior and product usage</p>*/}
          {/*        </div>*/}
          {/*        <div className='text-center'>*/}
          {/*            <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>*/}
          {/*                <Eye className='h-6 w-6 text-green-600' />*/}
          {/*            </div>*/}
          {/*            <h4 className='font-medium'>User Experience</h4>*/}
          {/*            <p className='text-sm text-muted-foreground'>Understand user interactions and pain points</p>*/}
          {/*        </div>*/}
          {/*        <div className='text-center'>*/}
          {/*            <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100'>*/}
          {/*                <Zap className='h-6 w-6 text-purple-600' />*/}
          {/*            </div>*/}
          {/*            <h4 className='font-medium'>Feature Management</h4>*/}
          {/*            <p className='text-sm text-muted-foreground'>A/B testing and feature flag management</p>*/}
          {/*        </div>*/}
          {/*        <div className='text-center'>*/}
          {/*            <div className='mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100'>*/}
          {/*                <Gauge className='h-6 w-6 text-yellow-600' />*/}
          {/*            </div>*/}
          {/*            <h4 className='font-medium'>Performance</h4>*/}
          {/*            <p className='text-sm text-muted-foreground'>Monitor app performance and errors</p>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </PageContainer>
  );
};

export default IntegrationsPage;
