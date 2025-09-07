'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  MessageSquare,
  Target,
  BarChart3,
  PaperclipIcon,
  MicIcon,
  RefreshCw
} from 'lucide-react';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSubmit,
  PromptInputTools,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem
} from '@/components/ui/shadcn-io/ai/prompt-input';
import { Button } from '@/components/ui/button';
import { useAgent } from '@/contexts/agentContext';

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_AGENT_ID;

export default function CustomerInsightsDashboard() {
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState(''); // 'api' or 'file'
  const [refreshing, setRefreshing] = useState(false);

  // @ts-ignore
  const { agentId, setAgentId } = useAgent();

  const loadDataFromAPI = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/agent/${agentId}/overview`);
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
      setDataSource('api');
      setError(null);
      return true;
    } catch (err) {
      console.error('API request failed:', err);
      return false;
    }
  };

  const loadDataFromFile = async () => {
    try {
      const response = await fetch('/analysis1.json');
      if (!response.ok) {
        throw new Error('Failed to load backup data');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setDataSource('file');
      setError(null);
      return true;
    } catch (err) {
      console.error('File loading failed:', err);
      throw err;
    }
  };

  const loadData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // Try API first
      const apiSuccess = await loadDataFromAPI();

      if (!apiSuccess) {
        console.log('API failed, falling back to local file...');
        await loadDataFromFile();
      }
    } catch (err) {
      console.error('All data loading methods failed:', err);
      setError('Failed to load dashboard data from both API and local file');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    loadData(true);
  };

  const getSentimentColor = (classification: string) => {
    switch (classification) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      case 'neutral':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSentimentIcon = (classification: string) => {
    switch (classification) {
      case 'positive':
        return <TrendingUp className='h-5 w-5 text-green-600' />;
      case 'negative':
        return <AlertTriangle className='h-5 w-5 text-red-600' />;
      case 'neutral':
        return <BarChart3 className='h-5 w-5 text-yellow-600' />;
      default:
        return <BarChart3 className='h-5 w-5 text-gray-600' />;
    }
  };

  const handleSubmit = () => {
    console.log('Message submitted:', input);
    setInput('');
  };

  const models = [
    { id: 'gpt-4o', name: 'GPT-4o' },
    { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet' },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' }
  ];

  const [text, setText] = useState<string>('');
  const [model, setModel] = useState<string>(models[0].id);
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');

  if (loading) {
    return (
      <div className='bg-background flex min-h-screen items-center justify-center p-6'>
        <div className='text-center'>
          <div className='mx-auto h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900'></div>
          <p className='text-muted-foreground mt-4 text-lg'>
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-background flex min-h-screen items-center justify-center p-6'>
        <div className='text-center'>
          <AlertTriangle className='mx-auto mb-4 h-16 w-16 text-red-600' />
          <h2 className='mb-2 text-2xl font-bold text-red-600'>Error</h2>
          <p className='text-muted-foreground mb-4'>{error}</p>
          <button
            onClick={handleRefresh}
            className='mx-auto flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            <RefreshCw className='h-4 w-4' />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='bg-background flex min-h-screen items-center justify-center p-6'>
        <p className='text-muted-foreground text-lg'>No data available</p>
      </div>
    );
  }

  return (
    <div className='bg-background min-h-screen p-6'>
      <div className='max-w-8xl mx-auto space-y-8'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Customer Insights Dashboard
            </h1>
            <div className='mt-1 flex items-center space-x-2'>
              <p className='text-muted-foreground'>
                Customer feedback overview {agentId}
              </p>
              {dataSource === 'file' && (
                <span className='text-xs text-amber-600'>
                  Using backup data
                </span>
              )}
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <Badge variant='outline' className='text-sm'>
              <MessageSquare className='mr-2 h-4 w-4' />
              {data.total_conversations} Conversations
            </Badge>
            <Button
              variant='default'
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
              />
              {/*<span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>*/}
            </Button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='md:col-span-2 lg:col-span-1'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Overall Sentiment
              </CardTitle>
              {getSentimentIcon(data.overall_sentiment.classification)}
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold capitalize ${getSentimentColor(data.overall_sentiment.classification)}`}
              >
                {data.overall_sentiment.classification}
              </div>
              <p className='text-foreground mt-2 text-lg font-semibold'>
                Score: {data.overall_sentiment.average_score.toFixed(3)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Positive Conversations
              </CardTitle>
              <CheckCircle className='h-4 w-4 text-green-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {data.sentiment_breakdown.counts.positive}
              </div>
              <Progress
                value={data.sentiment_breakdown.percentages.positive}
                className='mt-2 h-2'
              />
              <p className='text-muted-foreground mt-1 text-xs'>
                {data.sentiment_breakdown.percentages.positive}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Negative Conversations
              </CardTitle>
              <AlertTriangle className='h-4 w-4 text-red-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {data.sentiment_breakdown.counts.negative}
              </div>
              <Progress
                value={data.sentiment_breakdown.percentages.negative}
                className='mt-2 h-2'
              />
              <p className='text-muted-foreground mt-1 text-xs'>
                {data.sentiment_breakdown.percentages.negative}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Neutral Conversations
              </CardTitle>
              <Users className='h-4 w-4 text-yellow-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {data.sentiment_breakdown.counts.neutral}
              </div>
              <Progress
                value={data.sentiment_breakdown.percentages.neutral}
                className='mt-2 h-2'
              />
              <p className='text-muted-foreground mt-1 text-xs'>
                {data.sentiment_breakdown.percentages.neutral}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid - Key Insights Only */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {/* What Customers Love */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center text-green-600'>
                <CheckCircle className='mr-2 h-5 w-5' />
                What Customers Love
              </CardTitle>
              <CardDescription>Positive feedback highlights</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              {data.key_insights.what_customers_love.length > 0 ? (
                data.key_insights.what_customers_love.map((insight, index) => (
                  <div
                    key={index}
                    className='rounded-r-lg border-l-4 border-green-500 bg-green-50 p-3'
                  >
                    <p className='text-sm text-green-800'>{insight}</p>
                  </div>
                ))
              ) : (
                <p className='text-muted-foreground text-sm'>
                  No positive insights available yet.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center text-amber-600'>
                <Target className='mr-2 h-5 w-5' />
                Areas for Improvement
              </CardTitle>
              <CardDescription>
                Focus areas for better experience
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              {data.key_insights.areas_for_improvement.length > 0 ? (
                data.key_insights.areas_for_improvement.map(
                  (insight, index) => (
                    <div
                      key={index}
                      className='rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-3'
                    >
                      <p className='text-sm text-amber-800'>{insight}</p>
                    </div>
                  )
                )
              ) : (
                <p className='text-muted-foreground text-sm'>
                  No improvement areas identified yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat Input */}
        <div className='w-full'>
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputTextarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder='Type your message...'
            />
            <PromptInputToolbar>
              <PromptInputTools>
                <PromptInputButton>
                  <PaperclipIcon size={16} />
                </PromptInputButton>
                <PromptInputButton>
                  <MicIcon size={16} />
                  <span>Voice</span>
                </PromptInputButton>
                <PromptInputModelSelect onValueChange={setModel} value={model}>
                  <PromptInputModelSelectTrigger>
                    <PromptInputModelSelectValue />
                  </PromptInputModelSelectTrigger>
                  <PromptInputModelSelectContent>
                    {models.map((model) => (
                      <PromptInputModelSelectItem
                        key={model.id}
                        value={model.id}
                      >
                        {model.name}
                      </PromptInputModelSelectItem>
                    ))}
                  </PromptInputModelSelectContent>
                </PromptInputModelSelect>
              </PromptInputTools>
              <PromptInputSubmit disabled={!text} status={status} />
            </PromptInputToolbar>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
