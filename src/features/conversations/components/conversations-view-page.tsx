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
import {
  TrendingUp,
  AlertTriangle,
  BarChart3,
  MessageSquare,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAgent } from '@/contexts/agentContext';

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_AGENT_ID;

export default function ConversationsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedConversations, setExpandedConversations] = useState(new Set());
  const [dataSource, setDataSource] = useState(''); // 'api' or 'file'
  const [refreshing, setRefreshing] = useState(false);

  // @ts-ignore
  const { agentId, setAgentId } = useAgent();

  const loadDataFromAPI = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/agent/${agentId}/conversations`
      );
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
      const response = await fetch('/conversations.json');
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
      setError('Failed to load conversations from both API and local file');
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

  const getSentimentColor = (label: string) => {
    switch (label) {
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

  const getSentimentBadgeColor = (label: string) => {
    switch (label) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSentimentIcon = (label: string) => {
    switch (label) {
      case 'positive':
        return <TrendingUp className='h-4 w-4' />;
      case 'negative':
        return <AlertTriangle className='h-4 w-4' />;
      case 'neutral':
        return <BarChart3 className='h-4 w-4' />;
      default:
        return <BarChart3 className='h-4 w-4' />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const toggleExpanded = (conversationId: string) => {
    const newExpanded = new Set(expandedConversations);
    if (newExpanded.has(conversationId)) {
      newExpanded.delete(conversationId);
    } else {
      newExpanded.add(conversationId);
    }
    setExpandedConversations(newExpanded);
  };

  if (loading) {
    return (
      <div className='bg-background flex min-h-screen items-center justify-center p-6'>
        <div className='text-center'>
          <div className='mx-auto h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900'></div>
          <p className='text-muted-foreground mt-4 text-lg'>
            Loading conversations...
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
        <p className='text-muted-foreground text-lg'>
          No conversations available
        </p>
      </div>
    );
  }

  return (
    <div className='bg-background min-h-screen p-6'>
      <div className='max-w-8xl mx-auto space-y-8'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Conversations</h1>
            <div className='mt-1 flex items-center space-x-2'>
              <p className='text-muted-foreground'>
                All customer interactions and feedback {agentId}
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
              {data.conversations.length} Conversations
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

        {/* Conversations List */}
        <div className='space-y-4'>
          {data.conversations.map((conversation) => {
            const isExpanded = expandedConversations.has(conversation.id);
            const shouldTruncate = conversation.transcript.length > 200;

            return (
              <Card
                key={conversation.id}
                className='transition-shadow hover:shadow-md'
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        <Badge
                          variant='outline'
                          className={`capitalize ${getSentimentBadgeColor(conversation.sentiment.sentiment_label)}`}
                        >
                          {getSentimentIcon(
                            conversation.sentiment.sentiment_label
                          )}
                          <span className='ml-1'>
                            {conversation.sentiment.sentiment_label}
                          </span>
                        </Badge>
                        <Badge variant='secondary' className='text-xs'>
                          Score:{' '}
                          {conversation.sentiment.sentiment_score.toFixed(2)}
                        </Badge>
                        <Badge variant='secondary' className='text-xs'>
                          Confidence:{' '}
                          {(conversation.sentiment.confidence * 100).toFixed(0)}
                          %
                        </Badge>
                      </div>
                      <div className='text-muted-foreground flex items-center space-x-4 text-sm'>
                        <div className='flex items-center space-x-1'>
                          <Calendar className='h-4 w-4' />
                          <span>{formatDate(conversation.created_at)}</span>
                        </div>
                        <div className='flex items-center space-x-1'>
                          <Clock className='h-4 w-4' />
                          <span>{formatDuration(conversation.duration)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div>
                      <h4 className='text-muted-foreground mb-2 text-sm font-medium'>
                        Transcript
                      </h4>
                      <p className='text-sm leading-relaxed'>
                        {isExpanded || !shouldTruncate
                          ? conversation.transcript
                          : truncateText(conversation.transcript)}
                      </p>
                      {shouldTruncate && (
                        <button
                          onClick={() => toggleExpanded(conversation.id)}
                          className='mt-2 flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800'
                        >
                          {isExpanded ? (
                            <>
                              <span>Show less</span>
                              <ChevronUp className='h-4 w-4' />
                            </>
                          ) : (
                            <>
                              <span>Show more</span>
                              <ChevronDown className='h-4 w-4' />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {data.conversations.length === 0 && (
          <div className='py-12 text-center'>
            <MessageSquare className='text-muted-foreground mx-auto mb-4 h-16 w-16' />
            <h3 className='text-muted-foreground text-lg font-semibold'>
              No conversations found
            </h3>
            <p className='text-muted-foreground'>
              There are no conversations to display at this time.
            </p>
            <Button onClick={handleRefresh}>
              <RefreshCw className='h-4 w-4' />
              <span>Refresh</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
